export interface AlgorithmComparison {
  id: string;
  name: string;
  category: string;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  stable: boolean;
  inPlace: boolean;
  bestUseCase: string;
  worstCase: string;
  notes: string;
}

export const SORTING_ALGORITHMS: AlgorithmComparison[] = [
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false,
    bestUseCase: 'When stability is needed and extra memory is not a concern.',
    worstCase: 'When memory is highly constrained.',
    notes: 'Often used for linked lists where extra space for pointers is already allocated.'
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'Sorting',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n^2)' },
    spaceComplexity: 'O(log n)',
    stable: false,
    inPlace: true,
    bestUseCase: 'General purpose sorting, widely used in practice.',
    worstCase: 'Already sorted array with poor pivot choice.',
    notes: 'Fastest in practice due to good cache locality.'
  }
];

export const GRAPH_ALGORITHMS: AlgorithmComparison[] = [
  {
    id: 'dijkstra',
    name: 'Dijkstra',
    category: 'Graph',
    timeComplexity: { best: 'O(E + V log V)', average: 'O(E + V log V)', worst: 'O(E + V log V)' },
    spaceComplexity: 'O(V)',
    stable: false,
    inPlace: false,
    bestUseCase: 'Finding shortest path from a single source on a graph with non-negative edge weights.',
    worstCase: 'Dense graphs where E ~ V^2 can be slow if not using optimal priority queue.',
    notes: 'Fails with negative weight edges.'
  }
];

export const SEARCH_ALGORITHMS: AlgorithmComparison[] = [
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    bestUseCase: 'Finding elements in a sorted array.',
    worstCase: 'Array is not sorted (cannot be used).',
    notes: 'A fundamental algorithm for logarithmic search.'
  }
];
