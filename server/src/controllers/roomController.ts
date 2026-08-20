import { Request, Response } from 'express';
import { Room } from '../models/Schemas';
import { memoryQuizzes } from './quizController';
import { isInMemoryFallback } from '../config/db';

export const memoryRooms: Map<string, any> = new Map();

// Helper for 6-digit room code generation
export const generateRoomCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const createLiveRoom = async (req: any, res: Response) => {
  try {
    const { quizId, settings } = req.body;
    const teacherId = req.user?.id || 'teacher_demo';
    const teacherName = req.user?.name || 'Prof. Saurabh';

    let quiz: any;
    if (isInMemoryFallback) {
      quiz = memoryQuizzes.get(quizId);
    } else {
      quiz = await Room.findById(quizId);
    }

    const roomCode = generateRoomCode();
    const roomData = {
      roomCode,
      quizId,
      teacherId,
      teacherName,
      quizTitle: quiz ? quiz.title : 'DSA Challenge Live',
      status: 'WAITING',
      participants: [],
      currentQuestionIndex: 0,
      settings: settings || {
        mode: 'teacher_led',
        timeLimitSeconds: 30,
        showLeaderboardPerQuestion: true
      },
      createdAt: new Date()
    };

    if (isInMemoryFallback) {
      const id = `room_${roomCode}`;
      const newRoom = { id, _id: id, ...roomData };
      memoryRooms.set(roomCode, newRoom);
      return res.status(201).json(newRoom);
    }

    const room = new Room(roomData);
    await room.save();
    res.status(201).json(room);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error creating live room' });
  }
};

export const getRoomByCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    if (isInMemoryFallback) {
      const room = memoryRooms.get(code);
      if (!room) return res.status(404).json({ message: `Room with code ${code} not found` });
      return res.json(room);
    }

    const room = await Room.findOne({ roomCode: code });
    if (!room) return res.status(404).json({ message: `Room with code ${code} not found` });
    res.json(room);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error finding room' });
  }
};
