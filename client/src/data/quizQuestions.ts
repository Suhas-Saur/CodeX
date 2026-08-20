export interface QuizQuestion {
  id: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'mcq' | 'trace' | 'complexity' | 'output' | 'bugfix';
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  code?: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'arr-1',
    topic: 'Arrays',
    difficulty: 'easy',
    type: 'complexity',
    question: 'What is the time complexity of accessing an element in an array by index?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    correct: 0,
    explanation: 'Arrays allow O(1) time complexity for random access because elements are stored in contiguous memory locations, allowing direct memory address calculation.'
  },
  {
    id: 'arr-2',
    topic: 'Arrays',
    difficulty: 'medium',
    type: 'output',
    question: 'What does the following Python code output?',
    options: ['[1, 2, 3]', '[3, 2, 1]', '[1, 3, 2]', 'IndexError'],
    correct: 1,
    explanation: 'The slice [::-1] in Python returns a reversed copy of the list.',
    code: 'arr = [1, 2, 3]\nprint(arr[::-1])'
  }
];
