import mongoose, { Schema, Document } from 'mongoose';

// USER SCHEMA
export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'student' | 'teacher';
  institution?: string;
  classOrCourse?: string;
  yearOrGrade?: string;
  subject?: string;
  teacherId?: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate?: string;
  badges: string[];
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], required: true },
  institution: { type: String },
  classOrCourse: { type: String },
  yearOrGrade: { type: String },
  subject: { type: String },
  teacherId: { type: String },
  avatar: { type: String, default: 'avatar_default' },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
  lastActiveDate: { type: String },
  badges: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>('User', UserSchema);

// QUESTION INTERFACE
export interface IQuestion {
  id: string;
  type: 'mcq' | 'true_false' | 'multi_select' | 'fill_in_blank';
  question: string;
  options: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  order: number;
  visualizerType?: 'array' | 'linked_list' | 'stack' | 'queue' | 'tree' | 'graph' | 'sorting';
  codeSnippet?: string;
}

// QUIZ SCHEMA
export interface IQuiz extends Document {
  creatorId: string;
  creatorName: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  coverImage?: string;
  questions: IQuestion[];
  settings: {
    questionOrder: 'fixed' | 'random';
    timerMode: 'off' | 'per_question' | 'whole_quiz';
    timeLimitSeconds: number;
    showExplanation: 'immediate' | 'end' | 'never';
    speedBonus: boolean;
    allowRetry: boolean;
    leaderboardEnabled: boolean;
  };
  published: boolean;
  attemptsCount: number;
  rating: number;
  createdAt: Date;
}

const QuizSchema: Schema = new Schema({
  creatorId: { type: String, required: true },
  creatorName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard', 'Expert'], default: 'Medium' },
  coverImage: { type: String },
  questions: [{
    id: { type: String, required: true },
    type: { type: String, enum: ['mcq', 'true_false', 'multi_select', 'fill_in_blank'], required: true },
    question: { type: String, required: true },
    options: [{ type: String }],
    correctAnswer: { type: Schema.Types.Mixed, required: true },
    explanation: { type: String, default: '' },
    points: { type: Number, default: 100 },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard', 'Expert'], default: 'Medium' },
    order: { type: Number, default: 0 },
    visualizerType: { type: String },
    codeSnippet: { type: String }
  }],
  settings: {
    questionOrder: { type: String, default: 'fixed' },
    timerMode: { type: String, default: 'per_question' },
    timeLimitSeconds: { type: Number, default: 30 },
    showExplanation: { type: String, default: 'immediate' },
    speedBonus: { type: Boolean, default: true },
    allowRetry: { type: Boolean, default: true },
    leaderboardEnabled: { type: Boolean, default: true }
  },
  published: { type: Boolean, default: true },
  attemptsCount: { type: Number, default: 0 },
  rating: { type: Number, default: 4.8 },
  createdAt: { type: Date, default: Date.now }
});

export const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema);

// ROOM PARTICIPANT SCHEMA
export interface IParticipant {
  studentId: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  correctAnswers: number;
  answers: Array<{
    questionIndex: number;
    answer: string | string[];
    isCorrect: boolean;
    timeSpentSeconds: number;
    pointsEarned: number;
  }>;
  ready: boolean;
  connected: boolean;
}

// ROOM SCHEMA
export interface IRoom extends Document {
  roomCode: string;
  quizId: string;
  teacherId: string;
  teacherName: string;
  quizTitle: string;
  status: 'WAITING' | 'STARTING' | 'QUESTION_ACTIVE' | 'QUESTION_ENDED' | 'RESULTS' | 'COMPLETED';
  participants: IParticipant[];
  currentQuestionIndex: number;
  questionStartTime?: number;
  settings: {
    mode: 'classic' | 'teacher_led' | 'student_paced' | 'speed_challenge';
    timeLimitSeconds: number;
    showLeaderboardPerQuestion: boolean;
  };
  createdAt: Date;
  expiresAt?: Date;
}

const RoomSchema: Schema = new Schema({
  roomCode: { type: String, required: true, unique: true },
  quizId: { type: String, required: true },
  teacherId: { type: String, required: true },
  teacherName: { type: String, required: true },
  quizTitle: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['WAITING', 'STARTING', 'QUESTION_ACTIVE', 'QUESTION_ENDED', 'RESULTS', 'COMPLETED'], 
    default: 'WAITING' 
  },
  participants: [{
    studentId: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, default: 'avatar_1' },
    score: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    answers: [{
      questionIndex: { type: Number, required: true },
      answer: { type: Schema.Types.Mixed, required: true },
      isCorrect: { type: Boolean, required: true },
      timeSpentSeconds: { type: Number, required: true },
      pointsEarned: { type: Number, required: true }
    }],
    ready: { type: Boolean, default: true },
    connected: { type: Boolean, default: true }
  }],
  currentQuestionIndex: { type: Number, default: 0 },
  questionStartTime: { type: Number },
  settings: {
    mode: { type: String, default: 'teacher_led' },
    timeLimitSeconds: { type: Number, default: 30 },
    showLeaderboardPerQuestion: { type: Boolean, default: true }
  },
  createdAt: { type: Date, default: Date.now }
});

export const Room = mongoose.model<IRoom>('Room', RoomSchema);

// ATTEMPT SCHEMA
export interface IAttempt extends Document {
  studentId: string;
  studentName: string;
  quizId: string;
  quizTitle: string;
  subject: string;
  score: number;
  maxScore: number;
  accuracy: number;
  timeTakenSeconds: number;
  answers: Array<{
    questionId: string;
    question: string;
    userAnswer: string | string[];
    correctAnswer: string | string[];
    isCorrect: boolean;
    explanation: string;
  }>;
  completedAt: Date;
}

const AttemptSchema: Schema = new Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  quizId: { type: String, required: true },
  quizTitle: { type: String, required: true },
  subject: { type: String, required: true },
  score: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  timeTakenSeconds: { type: Number, required: true },
  answers: [{
    questionId: { type: String, required: true },
    question: { type: String, required: true },
    userAnswer: { type: Schema.Types.Mixed, required: true },
    correctAnswer: { type: Schema.Types.Mixed, required: true },
    isCorrect: { type: Boolean, required: true },
    explanation: { type: String, default: '' }
  }],
  completedAt: { type: Date, default: Date.now }
});

export const Attempt = mongoose.model<IAttempt>('Attempt', AttemptSchema);

// CLASS SCHEMA
export interface IClass extends Document {
  teacherId: string;
  teacherName: string;
  name: string;
  subject: string;
  joinCode: string;
  studentCount: number;
  students: Array<{ studentId: string; studentName: string; email: string }>;
  createdAt: Date;
}

const ClassSchema: Schema = new Schema({
  teacherId: { type: String, required: true },
  teacherName: { type: String, required: true },
  name: { type: String, required: true },
  subject: { type: String, required: true },
  joinCode: { type: String, required: true, unique: true },
  studentCount: { type: Number, default: 0 },
  students: [{
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    email: { type: String, required: true }
  }],
  createdAt: { type: Date, default: Date.now }
});

export const Class = mongoose.model<IClass>('Class', ClassSchema);

// ASSIGNMENT SCHEMA
export interface IAssignment extends Document {
  quizId: string;
  quizTitle: string;
  teacherId: string;
  classId?: string;
  className?: string;
  deadline: Date;
  attemptLimit: number;
  completedStudents: string[];
  createdAt: Date;
}

const AssignmentSchema: Schema = new Schema({
  quizId: { type: String, required: true },
  quizTitle: { type: String, required: true },
  teacherId: { type: String, required: true },
  classId: { type: String },
  className: { type: String },
  deadline: { type: Date, required: true },
  attemptLimit: { type: Number, default: 1 },
  completedStudents: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export const Assignment = mongoose.model<IAssignment>('Assignment', AssignmentSchema);

// NOTIFICATION SCHEMA
export interface INotification extends Document {
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
