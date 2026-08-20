import { Request, Response } from 'express';
import { Class, Assignment } from '../models/Schemas';
import { isInMemoryFallback } from '../config/db';

export const memoryClasses: Map<string, any> = new Map();
export const memoryAssignments: Map<string, any> = new Map();

export const createClass = async (req: any, res: Response) => {
  try {
    const { name, subject } = req.body;
    const teacherId = req.user?.id || 'teacher_demo';
    const teacherName = req.user?.name || 'Prof. Saurabh';

    const joinCode = `CLS-${Math.floor(1000 + Math.random() * 9000)}`;

    const classData = {
      teacherId,
      teacherName,
      name,
      subject,
      joinCode,
      studentCount: 0,
      students: [],
      createdAt: new Date()
    };

    if (isInMemoryFallback) {
      const id = `class_${Date.now()}`;
      const newClass = { id, _id: id, ...classData };
      memoryClasses.set(id, newClass);
      return res.status(201).json(newClass);
    }

    const newClass = new Class(classData);
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error creating class' });
  }
};

export const getClasses = async (req: any, res: Response) => {
  try {
    const teacherId = req.user?.id;
    if (isInMemoryFallback) {
      const list = Array.from(memoryClasses.values()).filter(c => !teacherId || c.teacherId === teacherId);
      return res.json(list);
    }

    const filter = teacherId ? { teacherId } : {};
    const classes = await Class.find(filter);
    res.json(classes);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error getting classes' });
  }
};

export const joinClassByCode = async (req: any, res: Response) => {
  try {
    const { joinCode } = req.body;
    const studentId = req.user?.id || 'student_demo';
    const studentName = req.user?.name || 'Rahul Sharma';
    const email = req.user?.email || 'student@quizarena.com';

    if (isInMemoryFallback) {
      const cls = Array.from(memoryClasses.values()).find(c => c.joinCode === joinCode);
      if (!cls) return res.status(404).json({ message: 'Invalid class join code' });
      if (!cls.students.some((s: any) => s.studentId === studentId)) {
        cls.students.push({ studentId, studentName, email });
        cls.studentCount = cls.students.length;
      }
      return res.json({ message: 'Successfully joined class', class: cls });
    }

    const cls = await Class.findOne({ joinCode });
    if (!cls) return res.status(404).json({ message: 'Invalid class join code' });

    if (!cls.students.some(s => s.studentId === studentId)) {
      cls.students.push({ studentId, studentName, email });
      cls.studentCount = cls.students.length;
      await cls.save();
    }
    res.json({ message: 'Successfully joined class', class: cls });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error joining class' });
  }
};

export const createAssignment = async (req: any, res: Response) => {
  try {
    const { quizId, quizTitle, classId, className, deadline, attemptLimit } = req.body;
    const teacherId = req.user?.id || 'teacher_demo';

    const assignData = {
      quizId,
      quizTitle,
      teacherId,
      classId,
      className,
      deadline: new Date(deadline),
      attemptLimit: attemptLimit || 1,
      completedStudents: [],
      createdAt: new Date()
    };

    if (isInMemoryFallback) {
      const id = `assign_${Date.now()}`;
      const newAssign = { id, _id: id, ...assignData };
      memoryAssignments.set(id, newAssign);
      return res.status(201).json(newAssign);
    }

    const assign = new Assignment(assignData);
    await assign.save();
    res.status(201).json(assign);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error creating assignment' });
  }
};

export const getAssignments = async (req: any, res: Response) => {
  try {
    if (isInMemoryFallback) {
      return res.json(Array.from(memoryAssignments.values()));
    }
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error getting assignments' });
  }
};
