// ============================================================
// AlgoForge Engine Types
// ============================================================

// Visual states for algorithm elements
export type VisualState =
  | 'normal' | 'active' | 'comparing' | 'swapping' | 'visited'
  | 'selected' | 'sorted' | 'error' | 'target' | 'current'
  | 'highlighted' | 'mst' | 'path' | 'head' | 'tail' | 'pivot'
  | 'minimum' | 'backtrack' | 'success';

export type StepType =
  | 'compare' | 'swap' | 'highlight' | 'visit' | 'insert' | 'delete'
  | 'markSorted' | 'markActive' | 'setPointer' | 'setDistance' | 'relaxEdge'
  | 'markMST' | 'enqueue' | 'dequeue' | 'push' | 'pop' | 'hash'
  | 'place' | 'backtrack' | 'fillCell' | 'updatePointer' | 'rotate'
  | 'recolor' | 'updateBalance' | 'info' | 'setLeft' | 'setRight'
  | 'setMid' | 'eliminateRange' | 'found' | 'notFound' | 'setPivot'
  | 'markMin' | 'partition' | 'merge' | 'heapify' | 'connect'
  | 'disconnect' | 'traverse' | 'error' | 'success' | 'relax'
  | 'highlight_range' | 'reset' | 'call' | 'return' | 'check'
  | 'shift' | 'update' | 'set' | 'clear' | 'assign' | 'add' | 'remove';

export interface AlgoStep {
  type: StepType;
  description: string;
  indices?: number[];
  nodeIds?: string[];
  edgeIds?: string[];
  value?: any;
  extra?: Record<string, any>;
}

export interface ArrayElement {
  value: number;
  state: VisualState;
  index: number;
}

export interface GraphNode {
  id: string;
  x: number;
  y: number;
  label: string;
  state: VisualState;
  distance?: number;
  parent?: string;
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
  weight?: number;
  state: VisualState;
}

export interface TreeNode {
  id: string;
  value: number;
  left?: TreeNode;
  right?: TreeNode;
  height?: number;
  balance?: number;
  color?: 'red' | 'black';
  state: VisualState;
  x?: number;
  y?: number;
}

export interface ListNode {
  id: string;
  value: number;
  next?: string;
  prev?: string;
  state: VisualState;
}

export interface StackElement {
  id: string;
  value: number | string;
  state: VisualState;
}

export interface HashBucket {
  index: number;
  items: Array<{ key: string; value: any; state: VisualState }>;
}

export interface HeapElement {
  value: number;
  state: VisualState;
  index: number;
}

export interface DPCell {
  value: number | string;
  state: VisualState;
  row: number;
  col: number;
  formula?: string;
}

export interface TrieNodeData {
  id: string;
  char: string;
  children: Record<string, TrieNodeData>;
  isEnd: boolean;
  state: VisualState;
  x?: number;
  y?: number;
}

export interface UserProgress {
  topicsViewed: string[];
  visualizationsRun: Record<string, number>;
  quizzesCompleted: number;
  totalQuestions: number;
  correctAnswers: number;
  xp: number;
  streak: number;
  lastActive: string;
  topicScores: Record<string, number>;
  weeklyActivity: number[];
  badges: string[];
}

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
  visual?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  children?: NavItem[];
  badge?: string;
}

export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category =
  | 'array' | 'linkedlist' | 'stack' | 'queue' | 'hashmap'
  | 'heap' | 'tree' | 'graph' | 'sorting' | 'searching'
  | 'dp' | 'backtracking' | 'string' | 'recursion' | 'greedy';
