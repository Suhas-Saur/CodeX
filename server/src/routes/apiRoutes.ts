import { Router } from 'express';
import { registerStudent, registerTeacher, loginUser, getMe } from '../controllers/authController';
import { getQuizzes, getQuizById, createQuiz, generateAIQuiz, updateQuiz, deleteQuiz } from '../controllers/quizController';
import { createLiveRoom, getRoomByCode } from '../controllers/roomController';
import { createClass, getClasses, joinClassByCode, createAssignment, getAssignments } from '../controllers/classController';
import { submitAttempt, getStudentProgress } from '../controllers/attemptController';
import { getTeacherReport, exportReportCSV } from '../controllers/reportController';
import { authenticateJWT, requireTeacher, requireStudent } from '../middleware/auth';

const router = Router();

// AUTH ROUTES
router.post('/auth/register/student', registerStudent);
router.post('/auth/register/teacher', registerTeacher);
router.post('/auth/login', loginUser);
router.get('/auth/me', authenticateJWT, getMe);

// QUIZ ROUTES
router.get('/quizzes', getQuizzes);
router.get('/quizzes/:id', getQuizById);
router.post('/quizzes', authenticateJWT, requireTeacher, createQuiz);
router.post('/quizzes/generate-ai', authenticateJWT, requireTeacher, generateAIQuiz);
router.put('/quizzes/:id', authenticateJWT, requireTeacher, updateQuiz);
router.delete('/quizzes/:id', authenticateJWT, requireTeacher, deleteQuiz);

// ROOM ROUTES
router.post('/rooms', authenticateJWT, requireTeacher, createLiveRoom);
router.get('/rooms/:code', getRoomByCode);

// CLASS & ASSIGNMENT ROUTES
router.post('/classes', authenticateJWT, requireTeacher, createClass);
router.get('/classes', authenticateJWT, getClasses);
router.post('/classes/join', authenticateJWT, requireStudent, joinClassByCode);

router.post('/assignments', authenticateJWT, requireTeacher, createAssignment);
router.get('/assignments', authenticateJWT, getAssignments);

// ATTEMPTS & STUDENT PROGRESS
router.post('/attempts', authenticateJWT, submitAttempt);
router.get('/student/progress', authenticateJWT, requireStudent, getStudentProgress);

// TEACHER REPORTS
router.get('/reports/:quizId', authenticateJWT, requireTeacher, getTeacherReport);
router.get('/reports/:quizId/csv', authenticateJWT, requireTeacher, exportReportCSV);

// GLOBAL LEADERBOARDS
router.get('/leaderboards/global', (req, res) => {
  res.json([
    { rank: 1, name: 'Suhas (DSA Master)', xp: 4850, institution: 'IIT Bombay', streak: 18, avatar: 'avatar_3' },
    { rank: 2, name: 'Ananya Verma', xp: 4200, institution: 'BITS Pilani', streak: 14, avatar: 'avatar_2' },
    { rank: 3, name: 'Rahul Sharma', xp: 3950, institution: 'IIT Delhi', streak: 12, avatar: 'avatar_1' },
    { rank: 4, name: 'Arjun Gupta', xp: 3400, institution: 'NIT Trichy', streak: 9, avatar: 'avatar_4' },
    { rank: 5, name: 'Priya Singh', xp: 3100, institution: 'DTU Delhi', streak: 7, avatar: 'avatar_5' }
  ]);
});

export default router;
