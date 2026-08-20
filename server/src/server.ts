import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import apiRoutes from './routes/apiRoutes';
import { setupSocketIO } from './socket/roomHandler';
import { seedDatabase } from './seed/seedData';

dotenv.config();

const app = express();
const server = http.createServer(app);

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: 'QuizArena Backend', time: new Date() });
});

// Setup Socket.IO
setupSocketIO(io);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await seedDatabase();

  server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 QuizArena Backend Running on http://localhost:${PORT}`);
    console.log(`=======================================================`);
  });
};

startServer();
