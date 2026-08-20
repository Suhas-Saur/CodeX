import mongoose from 'mongoose';

export let isInMemoryFallback = false;

export const connectDB = async () => {
  const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quizarena';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`[Database] Connected to MongoDB: ${mongoose.connection.host}`);
  } catch (error) {
    console.warn(`[Database] Local MongoDB connection timed out. Enabling QuizArena In-Memory Data Store fallback.`);
    isInMemoryFallback = true;
  }
};
