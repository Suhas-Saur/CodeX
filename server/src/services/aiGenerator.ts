import { IQuestion } from '../models/Schemas';

export const generateAIQuizQuestions = (topic: string, difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert', count: number = 5): IQuestion[] => {
  const dsaTopicLower = topic.toLowerCase();
  
  const questionPool: Record<string, Partial<IQuestion>[]> = {
    array: [
      {
        type: 'mcq',
        question: `What is the time complexity of accessing an element by index in a contiguous array?`,
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(1)',
        explanation: 'Arrays store elements in contiguous memory locations, allowing direct memory address calculation in O(1) constant time.',
        visualizerType: 'array'
      },
      {
        type: 'mcq',
        question: `Which searching algorithm works in O(log n) time on a sorted array?`,
        options: ['Linear Search', 'Binary Search', 'Bubble Search', 'Exponential Jump'],
        correctAnswer: 'Binary Search',
        explanation: 'Binary Search repeatedly divides the sorted search interval in half, achieving logarithmic time complexity O(log n).',
        visualizerType: 'array'
      },
      {
        type: 'true_false',
        question: `Inserting an element at the beginning of an array takes O(1) time complexity.`,
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'Inserting at index 0 requires shifting all existing elements one position to the right, taking O(n) time.',
        visualizerType: 'array'
      }
    ],
    'linked list': [
      {
        type: 'mcq',
        question: `In a Singly Linked List, what does each node store?`,
        options: ['Data and Pointer to Next Node', 'Data and Pointer to Previous Node', 'Data and Index Number', 'Two Data Values'],
        correctAnswer: 'Data and Pointer to Next Node',
        explanation: 'A singly linked list node contains the payload data and a reference (pointer) to the next node in sequence.',
        visualizerType: 'linked_list'
      },
      {
        type: 'mcq',
        question: `What is the time complexity to insert a node at the head of a Linked List when head pointer is known?`,
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(1)',
        explanation: 'Updating head pointer to point to the new node requires constant time operations.',
        visualizerType: 'linked_list'
      }
    ],
    stack: [
      {
        type: 'mcq',
        question: `Which Principle does a Stack data structure follow?`,
        options: ['LIFO (Last In First Out)', 'FIFO (First In First Out)', 'LILO (Last In Last Out)', 'Priority Order'],
        correctAnswer: 'LIFO (Last In First Out)',
        explanation: 'Stacks operate under Last In, First Out (LIFO), where the last pushed element is the first one removed.',
        visualizerType: 'stack'
      },
      {
        type: 'mcq',
        question: `Which operation adds an element to the top of a Stack?`,
        options: ['Push', 'Pop', 'Peek', 'Enqueue'],
        correctAnswer: 'Push',
        explanation: 'The Push operation places a new item on top of the stack.',
        visualizerType: 'stack'
      }
    ],
    queue: [
      {
        type: 'mcq',
        question: `Which Data Structure follows First In First Out (FIFO) order?`,
        options: ['Queue', 'Stack', 'Tree', 'Graph'],
        correctAnswer: 'Queue',
        explanation: 'Queues process elements in the order they arrive (FIFO), like a real-world checkout queue.',
        visualizerType: 'queue'
      }
    ],
    tree: [
      {
        type: 'mcq',
        question: `In a Binary Search Tree (BST), elements in the left subtree of a node must be:`,
        options: ['Smaller than the node value', 'Greater than the node value', 'Equal to the node value', 'Unordered'],
        correctAnswer: 'Smaller than the node value',
        explanation: 'The BST property states that all left subtree nodes have values strictly smaller than their root node.',
        visualizerType: 'tree'
      },
      {
        type: 'mcq',
        question: `Which Tree Traversal visits nodes in Left -> Root -> Right order?`,
        options: ['Inorder', 'Preorder', 'Postorder', 'Level Order'],
        correctAnswer: 'Inorder',
        explanation: 'Inorder traversal visits the left subtree first, then the root node, followed by the right subtree, producing sorted output in BSTs.',
        visualizerType: 'tree'
      }
    ],
    graph: [
      {
        type: 'mcq',
        question: `Which Data Structure is commonly used to implement Breadth-First Search (BFS) on a Graph?`,
        options: ['Queue', 'Stack', 'Priority Queue', 'Array'],
        correctAnswer: 'Queue',
        explanation: 'BFS uses a Queue to explore adjacent neighbor nodes level-by-level.',
        visualizerType: 'graph'
      },
      {
        type: 'mcq',
        question: `Depth-First Search (DFS) on a Graph uses which order or auxiliary data structure?`,
        options: ['Stack (or Recursion)', 'Queue', 'Deque', 'Binary Heap'],
        correctAnswer: 'Stack (or Recursion)',
        explanation: 'DFS explores as deep as possible along each branch before backtracking using a Stack or recursive call stack.',
        visualizerType: 'graph'
      }
    ],
    sorting: [
      {
        type: 'mcq',
        question: `What is the worst-case time complexity of Quick Sort algorithm?`,
        options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'],
        correctAnswer: 'O(n²)',
        explanation: 'Quick Sort degrades to O(n²) when the pivot selection consistently chooses the extreme minimum or maximum element.',
        visualizerType: 'sorting'
      },
      {
        type: 'mcq',
        question: `Which sorting algorithm guarantees O(n log n) time complexity in all cases (Best, Average, Worst)?`,
        options: ['Merge Sort', 'Quick Sort', 'Bubble Sort', 'Insertion Sort'],
        correctAnswer: 'Merge Sort',
        explanation: 'Merge Sort consistently divides the array into halves and merges them, guaranteeing O(n log n) performance regardless of initial array order.',
        visualizerType: 'sorting'
      }
    ]
  };

  // Matched topic questions or generic DSA pool
  let selectedTemplates = questionPool[dsaTopicLower];
  if (!selectedTemplates) {
    const matchedKey = Object.keys(questionPool).find(k => dsaTopicLower.includes(k));
    selectedTemplates = matchedKey ? questionPool[matchedKey] : [
      ...questionPool.array,
      ...questionPool.stack,
      ...questionPool.tree,
      ...questionPool.sorting
    ];
  }

  const generated: IQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const template = selectedTemplates[i % selectedTemplates.length];
    generated.push({
      id: `ai_q_${Date.now()}_${i + 1}`,
      type: (template.type as any) || 'mcq',
      question: template.question || `What is the algorithmic complexity of ${topic} operation #${i + 1}?`,
      options: template.options || ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correctAnswer: template.correctAnswer || 'O(n)',
      explanation: template.explanation || `Understanding ${topic} operations is fundamental to computer science problem solving.`,
      points: difficulty === 'Easy' ? 100 : difficulty === 'Medium' ? 150 : 200,
      difficulty: difficulty,
      order: i + 1,
      visualizerType: template.visualizerType || 'array'
    });
  }

  return generated;
};
