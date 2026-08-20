import { Server, Socket } from 'socket.io';
import { memoryRooms } from '../controllers/roomController';
import { memoryQuizzes } from '../controllers/quizController';
import { Room, Quiz } from '../models/Schemas';
import { isInMemoryFallback } from '../config/db';

interface RoomState {
  roomCode: string;
  quizId: string;
  teacherSocketId: string;
  status: 'WAITING' | 'STARTING' | 'QUESTION_ACTIVE' | 'QUESTION_ENDED' | 'RESULTS' | 'COMPLETED';
  currentQuestionIndex: number;
  questionStartTime: number;
  questionTimer: any;
  participants: Map<string, {
    socketId: string;
    studentId: string;
    name: string;
    avatar: string;
    score: number;
    streak: number;
    correctAnswers: number;
    answeredCurrent: boolean;
    lastAnswerCorrect?: boolean;
    pointsEarnedLast?: number;
  }>;
}

const activeLiveRooms: Map<string, RoomState> = new Map();

export const setupSocketIO = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    // TEACHER CREATES / HOSTS ROOM LOBBY
    socket.on('room:host', async ({ roomCode, quizId }) => {
      socket.join(roomCode);
      
      let roomState = activeLiveRooms.get(roomCode);
      if (!roomState) {
        roomState = {
          roomCode,
          quizId,
          teacherSocketId: socket.id,
          status: 'WAITING',
          currentQuestionIndex: 0,
          questionStartTime: 0,
          questionTimer: null,
          participants: new Map()
        };
        activeLiveRooms.set(roomCode, roomState);
      } else {
        roomState.teacherSocketId = socket.id;
      }

      socket.emit('room:hosted', { roomCode, status: roomState.status });
      console.log(`[Socket.IO] Teacher hosting room ${roomCode}`);
    });

    // STUDENT JOINS LOBBY
    socket.on('room:join', ({ roomCode, studentId, name, avatar }) => {
      const roomState = activeLiveRooms.get(roomCode);
      if (!roomState) {
        return socket.emit('error:room', { message: `Room ${roomCode} is not active or has ended` });
      }

      socket.join(roomCode);

      roomState.participants.set(studentId, {
        socketId: socket.id,
        studentId,
        name: name || 'Student',
        avatar: avatar || 'avatar_1',
        score: 0,
        streak: 0,
        correctAnswers: 0,
        answeredCurrent: false
      });

      const participantList = Array.from(roomState.participants.values()).map(p => ({
        studentId: p.studentId,
        name: p.name,
        avatar: p.avatar,
        score: p.score,
        ready: true
      }));

      // Confirm to joining student
      socket.emit('room:joined', {
        roomCode,
        quizTitle: 'Live DSA Challenge',
        status: roomState.status,
        participants: participantList
      });

      // Broadcast participant update to everyone in room
      io.to(roomCode).emit('room:participant-update', { participants: participantList });
      console.log(`[Socket.IO] Student ${name} joined room ${roomCode}`);
    });

    // TEACHER STARTS LIVE QUIZ
    socket.on('room:start', async ({ roomCode }) => {
      const roomState = activeLiveRooms.get(roomCode);
      if (!roomState) return;

      roomState.status = 'STARTING';
      io.to(roomCode).emit('room:status-changed', { status: 'STARTING' });

      setTimeout(async () => {
        await broadcastQuestion(io, roomState, 0);
      }, 3000);
    });

    // STUDENT SUBMITS ANSWER
    socket.on('quiz:answer', async ({ roomCode, studentId, questionIndex, answer, timeTakenSeconds }) => {
      const roomState = activeLiveRooms.get(roomCode);
      if (!roomState || roomState.status !== 'QUESTION_ACTIVE') return;

      const participant = roomState.participants.get(studentId);
      if (!participant || participant.answeredCurrent) return;

      // Fetch quiz question details
      let quiz: any;
      if (isInMemoryFallback) {
        quiz = memoryQuizzes.get(roomState.quizId);
      } else {
        quiz = await Quiz.findById(roomState.quizId);
      }

      const questions = quiz ? quiz.questions : [];
      const currentQ = questions[roomState.currentQuestionIndex];

      let isCorrect = false;
      if (currentQ) {
        if (Array.isArray(currentQ.correctAnswer)) {
          isCorrect = JSON.stringify((answer as string[]).sort()) === JSON.stringify((currentQ.correctAnswer as string[]).sort());
        } else {
          isCorrect = String(answer).trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase();
        }
      }

      // Calculate score & speed bonus
      let points = 0;
      if (isCorrect) {
        const basePoints = currentQ?.points || 100;
        const timeRemaining = Math.max(0, 30 - (timeTakenSeconds || 5));
        const speedBonus = Math.round((timeRemaining / 30) * 50);
        const streakMultiplier = Math.min(participant.streak * 10, 50);
        points = basePoints + speedBonus + streakMultiplier;

        participant.score += points;
        participant.streak += 1;
        participant.correctAnswers += 1;
      } else {
        participant.streak = 0;
      }

      participant.answeredCurrent = true;
      participant.lastAnswerCorrect = isCorrect;
      participant.pointsEarnedLast = points;

      // Confirm submission to student
      socket.emit('quiz:answer-received', {
        isCorrect,
        pointsEarned: points,
        totalScore: participant.score,
        explanation: currentQ?.explanation || ''
      });

      // Broadcast answer stats to teacher
      const totalParticipants = roomState.participants.size;
      const answeredCount = Array.from(roomState.participants.values()).filter(p => p.answeredCurrent).length;

      io.to(roomState.teacherSocketId).emit('room:live-progress', {
        answeredCount,
        totalParticipants
      });

      // If all answered, trigger question end early
      if (answeredCount >= totalParticipants && totalParticipants > 0) {
        if (roomState.questionTimer) clearTimeout(roomState.questionTimer);
        endQuestion(io, roomState);
      }
    });

    // TEACHER NEXT QUESTION / SHOW LEADERBOARD
    socket.on('quiz:next-question', async ({ roomCode }) => {
      const roomState = activeLiveRooms.get(roomCode);
      if (!roomState) return;

      const nextIndex = roomState.currentQuestionIndex + 1;
      await broadcastQuestion(io, roomState, nextIndex);
    });

    // DISCONNECT
    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });
};

const broadcastQuestion = async (io: Server, roomState: RoomState, questionIndex: number) => {
  let quiz: any;
  if (isInMemoryFallback) {
    quiz = memoryQuizzes.get(roomState.quizId);
  } else {
    quiz = await Quiz.findById(roomState.quizId);
  }

  const questions = quiz ? quiz.questions : [];

  if (questionIndex >= questions.length || questions.length === 0) {
    // End Quiz
    roomState.status = 'COMPLETED';
    const finalLeaderboard = getLeaderboard(roomState);
    io.to(roomState.roomCode).emit('quiz:ended', { leaderboard: finalLeaderboard });
    return;
  }

  roomState.currentQuestionIndex = questionIndex;
  roomState.status = 'QUESTION_ACTIVE';
  roomState.questionStartTime = Date.now();

  // Reset participant answer state
  roomState.participants.forEach(p => {
    p.answeredCurrent = false;
    p.lastAnswerCorrect = undefined;
    p.pointsEarnedLast = 0;
  });

  const q = questions[questionIndex];
  
  // Safe Question Payload without answer key
  const safeQuestion = {
    index: questionIndex,
    totalQuestions: questions.length,
    questionId: q.id,
    type: q.type,
    question: q.question,
    options: q.options,
    points: q.points,
    difficulty: q.difficulty,
    visualizerType: q.visualizerType,
    codeSnippet: q.codeSnippet,
    timeLimitSeconds: 30
  };

  io.to(roomState.roomCode).emit('quiz:question', safeQuestion);

  // Auto question end timer (30s)
  if (roomState.questionTimer) clearTimeout(roomState.questionTimer);
  roomState.questionTimer = setTimeout(() => {
    endQuestion(io, roomState);
  }, 30000);
};

const endQuestion = (io: Server, roomState: RoomState) => {
  if (roomState.status !== 'QUESTION_ACTIVE') return;
  roomState.status = 'QUESTION_ENDED';

  const leaderboard = getLeaderboard(roomState);

  io.to(roomState.roomCode).emit('quiz:question-ended', {
    leaderboard,
    currentQuestionIndex: roomState.currentQuestionIndex
  });
};

const getLeaderboard = (roomState: RoomState) => {
  return Array.from(roomState.participants.values())
    .map(p => ({
      studentId: p.studentId,
      name: p.name,
      avatar: p.avatar,
      score: p.score,
      streak: p.streak,
      correctAnswers: p.correctAnswers
    }))
    .sort((a, b) => b.score - a.score);
};
