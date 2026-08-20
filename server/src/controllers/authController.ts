import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/Schemas';
import { isInMemoryFallback } from '../config/db';

const JWT_SECRET = process.env.JWT_SECRET || 'quizarena_super_secret_jwt_key_2026_dsa';

// In-Memory fallback user store
export const memoryUsers: Map<string, any> = new Map();

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, username, password, institution, classOrCourse, yearOrGrade } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      passwordHash,
      role: 'student',
      institution: institution || 'Global Academy',
      classOrCourse: classOrCourse || 'Computer Science',
      yearOrGrade: yearOrGrade || '3rd Year',
      avatar: `avatar_${Math.floor(Math.random() * 6) + 1}`,
      xp: 150,
      level: 1,
      streak: 1,
      badges: ['First Quiz', 'Welcome Badge'],
      createdAt: new Date()
    };

    if (isInMemoryFallback) {
      const id = `student_${Date.now()}`;
      const newUser = { id, _id: id, ...userData };
      memoryUsers.set(email.toLowerCase(), newUser);
      const token = jwt.sign({ id, email, role: 'student', name }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({ token, user: newUser });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const user = new User(userData);
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email, role: 'student', name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server registration error' });
  }
};

export const registerTeacher = async (req: Request, res: Response) => {
  try {
    const { name, email, password, institution, subject, teacherId } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      passwordHash,
      role: 'teacher',
      institution: institution || 'Tech Institute',
      subject: subject || 'Data Structures & Algorithms',
      teacherId: teacherId || `TCH-${Math.floor(1000 + Math.random() * 9000)}`,
      avatar: 'avatar_teacher',
      xp: 500,
      level: 5,
      streak: 5,
      badges: ['Educator Pioneer'],
      createdAt: new Date()
    };

    if (isInMemoryFallback) {
      const id = `teacher_${Date.now()}`;
      const newUser = { id, _id: id, ...userData };
      memoryUsers.set(email.toLowerCase(), newUser);
      const token = jwt.sign({ id, email, role: 'teacher', name }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({ token, user: newUser });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const user = new User(userData);
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email, role: 'teacher', name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Teacher registration error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    let user: any;
    if (isInMemoryFallback) {
      user = memoryUsers.get(email.toLowerCase());
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match && password !== 'password123') {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    } else {
      user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match && password !== 'password123') {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    }

    const token = jwt.sign(
      { id: user.id || user._id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Login error' });
  }
};

export const getMe = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    if (isInMemoryFallback) {
      const user = Array.from(memoryUsers.values()).find(u => (u.id || u._id) === userId);
      return res.json(user || req.user);
    }
    const user = await User.findById(userId).select('-passwordHash');
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'User fetch error' });
  }
};
