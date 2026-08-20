import { Request, Response } from 'express';
import { Quiz, IQuiz } from '../models/Schemas';
import { isInMemoryFallback } from '../config/db';
import { generateAIQuizQuestions } from '../services/aiGenerator';

export const memoryQuizzes: Map<string, any> = new Map();

export const getQuizzes = async (req: Request, res: Response) => {
  try {
    const { subject, difficulty, search, creatorId } = req.query;

    if (isInMemoryFallback) {
      let list = Array.from(memoryQuizzes.values());
      if (subject) list = list.filter(q => q.subject.toLowerCase() === String(subject).toLowerCase());
      if (difficulty) list = list.filter(q => q.difficulty === difficulty);
      if (creatorId) list = list.filter(q => q.creatorId === creatorId);
      if (search) {
        const s = String(search).toLowerCase();
        list = list.filter(q => q.title.toLowerCase().includes(s) || q.topic.toLowerCase().includes(s) || q.subject.toLowerCase().includes(s));
      }
      return res.json(list);
    }

    const filter: any = { published: true };
    if (subject) filter.subject = new RegExp(String(subject), 'i');
    if (difficulty) filter.difficulty = difficulty;
    if (creatorId) filter.creatorId = creatorId;
    if (search) {
      filter.$or = [
        { title: new RegExp(String(search), 'i') },
        { topic: new RegExp(String(search), 'i') },
        { subject: new RegExp(String(search), 'i') }
      ];
    }

    const quizzes = await Quiz.find(filter).sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching quizzes' });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isInMemoryFallback) {
      const quiz = memoryQuizzes.get(id);
      if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
      return res.json(quiz);
    }

    const quiz = await Quiz.findById(id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error getting quiz' });
  }
};

export const createQuiz = async (req: any, res: Response) => {
  try {
    const { title, description, subject, topic, difficulty, questions, settings, published } = req.body;
    const creatorId = req.user?.id || 'teacher_demo';
    const creatorName = req.user?.name || 'Prof. Saurabh';

    const quizData = {
      creatorId,
      creatorName,
      title,
      description,
      subject,
      topic,
      difficulty: difficulty || 'Medium',
      questions: questions || [],
      settings: settings || {
        questionOrder: 'fixed',
        timerMode: 'per_question',
        timeLimitSeconds: 30,
        showExplanation: 'immediate',
        speedBonus: true,
        allowRetry: true,
        leaderboardEnabled: true
      },
      published: published !== undefined ? published : true,
      attemptsCount: 0,
      rating: 4.9,
      createdAt: new Date()
    };

    if (isInMemoryFallback) {
      const id = `quiz_${Date.now()}`;
      const newQuiz = { id, _id: id, ...quizData };
      memoryQuizzes.set(id, newQuiz);
      return res.status(201).json(newQuiz);
    }

    const quiz = new Quiz(quizData);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error creating quiz' });
  }
};

export const generateAIQuiz = async (req: Request, res: Response) => {
  try {
    const { topic, difficulty = 'Medium', count = 5 } = req.body;
    if (!topic) {
      return res.status(400).json({ message: 'Topic is required for AI question generation' });
    }

    const questions = generateAIQuizQuestions(topic, difficulty, Number(count));
    res.json({
      title: `${topic} ${difficulty} Challenge`,
      description: `AI-Generated DSA practice set covering ${topic} key concepts and operations.`,
      subject: 'Data Structures & Algorithms',
      topic,
      difficulty,
      questions
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'AI Generation error' });
  }
};

export const updateQuiz = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    if (isInMemoryFallback) {
      const existing = memoryQuizzes.get(id);
      if (!existing) return res.status(404).json({ message: 'Quiz not found' });
      const updated = { ...existing, ...req.body };
      memoryQuizzes.set(id, updated);
      return res.json(updated);
    }

    const quiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
    res.json(quiz);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Update error' });
  }
};

export const deleteQuiz = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    if (isInMemoryFallback) {
      memoryQuizzes.delete(id);
      return res.json({ message: 'Quiz deleted successfully' });
    }

    await Quiz.findByIdAndDelete(id);
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Delete error' });
  }
};
