export interface DSAContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  whenToUse: string;
  whenToAvoid: string;
  timeComplexity: { operation: string; best: string; average: string; worst: string }[];
  spaceComplexity: string;
  keyInsights: string[];
  commonMistakes: string[];
  interviewTips: string[];
  code: {
    cpp: string;
    java: string;
    python: string;
    javascript: string;
  };
}

export const DSA_CONTENT: Record<string, DSAContent> = {
  array: {
    id: 'array',
    title: 'Arrays',
    subtitle: 'Contiguous block of memory',
    description: 'An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together, which allows calculating the position of each element by simply adding an offset to a base value.',
    whenToUse: 'When you need fast access to elements by index, and you know the number of elements in advance. Good for caches, lookup tables, and implementing other data structures like stacks and queues.',
    whenToAvoid: 'When you need frequent insertions and deletions at arbitrary positions, or when the size of the collection needs to change dynamically and unpredictably.',
    timeComplexity: [
      { operation: 'Access', best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
      { operation: 'Search', best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      { operation: 'Insertion', best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      { operation: 'Deletion', best: 'O(1)', average: 'O(n)', worst: 'O(n)' }
    ],
    spaceComplexity: 'O(n)',
    keyInsights: [
      'Arrays provide O(1) random access by index.',
      'Insertion and deletion at the end are fast, but slow elsewhere due to shifting elements.',
      'Memory is allocated in a contiguous block, providing good cache locality.'
    ],
    commonMistakes: [
      'Off-by-one errors when accessing indices.',
      'Not considering the cost of resizing dynamic arrays.',
      'Assuming all array operations are O(1).'
    ],
    interviewTips: [
      'Consider using the two-pointer technique for array problems.',
      'Sorting the array can often simplify the problem (e.g., finding duplicates or pairs).',
      'Be careful with in-place modifications vs. returning a new array.'
    ],
    code: {
      cpp: 'int arr[] = {1, 2, 3};\nint val = arr[0];',
      java: 'int[] arr = {1, 2, 3};\nint val = arr[0];',
      python: 'arr = [1, 2, 3]\nval = arr[0]',
      javascript: 'const arr = [1, 2, 3];\nconst val = arr[0];'
    }
  },
  linkedlist: {
    id: 'linkedlist',
    title: 'Singly Linked List',
    subtitle: 'Linear collection of data elements',
    description: 'A linked list is a linear data structure where elements are not stored at contiguous memory locations. Instead, each element points to the next, forming a chain.',
    whenToUse: 'When you need frequent insertions and deletions, and you do not need fast random access. Good for implementing stacks, queues, and adjacency lists for graphs.',
    whenToAvoid: 'When you need frequent access to elements by index, or when memory overhead is a concern (due to pointers).',
    timeComplexity: [
      { operation: 'Access', best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      { operation: 'Search', best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      { operation: 'Insertion', best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
      { operation: 'Deletion', best: 'O(1)', average: 'O(1)', worst: 'O(1)' }
    ],
    spaceComplexity: 'O(n)',
    keyInsights: [
      'Nodes are scattered in memory, so cache locality is poor.',
      'Insertions and deletions are O(1) if you have a pointer to the location.',
      'A dummy head node can simplify edge cases (e.g., empty list, operations at head).'
    ],
    commonMistakes: [
      'Losing the head pointer.',
      'Not updating the next pointer properly during insertions and deletions.',
      'Memory leaks (if not using garbage collection).'
    ],
    interviewTips: [
      'Use the runner technique (slow and fast pointers) to find the middle or detect cycles.',
      'Practice reversing a linked list, as it is a common building block for other problems.',
      'Dummy nodes are your friend.'
    ],
    code: {
      cpp: 'struct Node {\n  int data;\n  Node* next;\n};',
      java: 'class Node {\n  int data;\n  Node next;\n}',
      python: 'class Node:\n  def __init__(self, data):\n    self.data = data\n    self.next = None',
      javascript: 'class Node {\n  constructor(data) {\n    this.data = data;\n    this.next = null;\n  }\n}'
    }
  }
};
