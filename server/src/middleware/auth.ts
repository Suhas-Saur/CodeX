import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'student' | 'teacher';
    name: string;
  };
}

const JWT_SECRET = process.env.JWT_SECRET || 'quizarena_super_secret_jwt_key_2026_dsa';

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
      req.user = decoded as any;
      next();
    });
  } else {
    res.status(401).json({ message: 'Authorization header required' });
  }
};

export const requireTeacher = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Access denied: Teacher role required' });
  }
  next();
};

export const requireStudent = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'student') {
    return res.status(403).json({ message: 'Access denied: Student role required' });
  }
  next();
};
