import { useState, useCallback, useEffect } from 'react';
import { UserProgress } from './types';

const DEFAULT_PROGRESS: UserProgress = {
  topicsViewed: [],
  visualizationsRun: {},
  quizzesCompleted: 0,
  totalQuestions: 0,
  correctAnswers: 0,
  xp: 0,
  streak: 0,
  lastActive: '',
  topicScores: {},
  weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
  badges: [],
};

const STORAGE_KEY = 'algoforge_progress';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...DEFAULT_PROGRESS, ...JSON.parse(stored) };
    } catch {}
    return DEFAULT_PROGRESS;
  });

  const save = useCallback((p: UserProgress) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
  }, []);

  const update = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setProgress(prev => {
      const next = updater(prev);
      save(next);
      return next;
    });
  }, [save]);

  const markTopicViewed = useCallback((topicId: string) => {
    update(p => ({
      ...p,
      topicsViewed: p.topicsViewed.includes(topicId) ? p.topicsViewed : [...p.topicsViewed, topicId],
      xp: p.topicsViewed.includes(topicId) ? p.xp : p.xp + 10,
    }));
  }, [update]);

  const markVisualizationRun = useCallback((vizId: string) => {
    update(p => ({
      ...p,
      visualizationsRun: { ...p.visualizationsRun, [vizId]: (p.visualizationsRun[vizId] || 0) + 1 },
      xp: p.xp + 5,
    }));
  }, [update]);

  const recordQuizResult = useCallback((correct: number, total: number, topic: string) => {
    update(p => {
      const newCorrect = p.correctAnswers + correct;
      const newTotal = p.totalQuestions + total;
      const accuracy = newTotal > 0 ? Math.round((newCorrect / newTotal) * 100) : 0;
      const xpGained = correct * 20 + (correct === total ? 50 : 0);
      return {
        ...p,
        quizzesCompleted: p.quizzesCompleted + 1,
        totalQuestions: newTotal,
        correctAnswers: newCorrect,
        xp: p.xp + xpGained,
        topicScores: { ...p.topicScores, [topic]: accuracy },
      };
    });
  }, [update]);

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    update(p => {
      if (p.lastActive === today) return p;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = p.lastActive === yesterday ? p.streak + 1 : 1;
      const dayOfWeek = new Date().getDay();
      const newActivity = [...p.weeklyActivity];
      newActivity[dayOfWeek] = (newActivity[dayOfWeek] || 0) + 1;
      return { ...p, streak: newStreak, lastActive: today, weeklyActivity: newActivity };
    });
  }, [update]);

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    save(DEFAULT_PROGRESS);
  }, [save]);

  useEffect(() => { updateStreak(); }, []);

  const accuracy = progress.totalQuestions > 0 
    ? Math.round((progress.correctAnswers / progress.totalQuestions) * 100) 
    : 0;

  return { progress, markTopicViewed, markVisualizationRun, recordQuizResult, updateStreak, resetProgress, accuracy };
}
