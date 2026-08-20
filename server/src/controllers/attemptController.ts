import { Request, Response } from 'express';
import { Attempt, User } from '../models/Schemas';
import { isInMemoryFallback } from '../config/db';
import { memoryUsers } from './authController';

export const memoryAttempts: Map<string, any> = new Map();

export const submitAttempt = async (req: any, res: Response) => {
  try {
    const { quizId, quizTitle, subject, score, maxScore, accuracy, timeTakenSeconds, answers } = req.body;
    const studentId = req.user?.id || 'student_demo';
    const studentName = req.user?.name || 'Rahul Sharma';

    const attemptData = {
      studentId,
      studentName,
      quizId,
      quizTitle: quizTitle || 'DSA Practice Quiz',
      subject: subject || 'Data Structures',
      score,
      maxScore: maxScore || 1000,
      accuracy: accuracy || Math.round((score / (maxScore || 1000)) * 100),
      timeTakenSeconds: timeTakenSeconds || 120,
      answers: answers || [],
      completedAt: new Date()
    };

    // Calculate XP earned (1 XP per 10 points + bonus for perfection)
    const xpEarned = Math.round(score / 10) + (accuracy >= 90 ? 50 : 0);

    if (isInMemoryFallback) {
      const id = `attempt_${Date.now()}`;
      const newAttempt = { id, _id: id, ...attemptData };
      memoryAttempts.set(id, newAttempt);

      // Award XP to memory user
      const user = Array.from(memoryUsers.values()).find(u => (u.id || u._id) === studentId);
      if (user) {
        user.xp = (user.xp || 0) + xpEarned;
        user.level = Math.floor(user.xp / 500) + 1;
      }
      return res.status(201).json({ attempt: newAttempt, xpEarned });
    }

    const attempt = new Attempt(attemptData);
    await attempt.save();

    // Award XP in DB
    await User.findByIdAndUpdate(studentId, {
      $inc: { xp: xpEarned },
      $set: { lastActiveDate: new Date().toISOString() }
    });

    res.status(201).json({ attempt, xpEarned });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error submitting attempt' });
  }
};

export const getStudentProgress = async (req: any, res: Response) => {
  try {
    const studentId = req.user?.id || 'student_demo';

    let attempts: any[] = [];
    if (isInMemoryFallback) {
      attempts = Array.from(memoryAttempts.values()).filter(a => a.studentId === studentId);
    } else {
      attempts = await Attempt.find({ studentId }).sort({ completedAt: -1 });
    }

    const totalQuizzes = attempts.length;
    const averageScore = totalQuizzes ? Math.round(attempts.reduce((acc, a) => acc + a.score, 0) / totalQuizzes) : 820;
    const accuracy = totalQuizzes ? Math.round(attempts.reduce((acc, a) => acc + a.accuracy, 0) / totalQuizzes) : 85;

    // Weakest / Best subject computation
    const subjectMap: Record<string, { totalAccuracy: number; count: number }> = {};
    attempts.forEach(a => {
      const subj = a.subject || 'Data Structures';
      if (!subjectMap[subj]) subjectMap[subj] = { totalAccuracy: 0, count: 0 };
      subjectMap[subj].totalAccuracy += a.accuracy;
      subjectMap[subj].count += 1;
    });

    let bestSubject = 'Arrays & Searching';
    let weakestSubject = 'Graph Algorithms';
    let minAcc = 101;
    let maxAcc = -1;

    Object.keys(subjectMap).forEach(subj => {
      const avgAcc = subjectMap[subj].totalAccuracy / subjectMap[subj].count;
      if (avgAcc > maxAcc) {
        maxAcc = avgAcc;
        bestSubject = subj;
      }
      if (avgAcc < minAcc) {
        minAcc = avgAcc;
        weakestSubject = subj;
      }
    });

    res.json({
      totalQuizzes: totalQuizzes || 12,
      averageScore,
      accuracy,
      bestSubject,
      weakestSubject,
      streak: 4,
      longestStreak: 9,
      recentAttempts: attempts.slice(0, 5),
      recommendations: [
        { title: 'Graph BFS & DFS Traversal', topic: 'Graph', difficulty: 'Hard' },
        { title: 'Binary Search Tree Insertion', topic: 'Tree', difficulty: 'Medium' },
        { title: 'Quick Sort Partitioning', topic: 'Sorting', difficulty: 'Medium' }
      ]
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error loading progress' });
  }
};
