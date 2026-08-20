import { memoryQuizzes } from '../controllers/quizController';
import { memoryUsers } from '../controllers/authController';
import { Quiz, User } from '../models/Schemas';
import bcrypt from 'bcryptjs';

export const seedDatabase = async () => {
  console.log('[Seed] Populating QuizArena with 20+ DSA & CS Quizzes and Demo Accounts...');

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('password123', salt);

  // Demo Teacher
  const teacherDemo = {
    id: 'teacher_demo',
    _id: 'teacher_demo',
    name: 'Prof. Saurabh (DSA Lead)',
    email: 'teacher@quizarena.com',
    passwordHash,
    role: 'teacher',
    institution: 'IIT Computer Science Institute',
    subject: 'Data Structures & Algorithms',
    teacherId: 'TCH-9081',
    avatar: 'avatar_teacher',
    xp: 2500,
    level: 12,
    streak: 14,
    badges: ['Master Educator', 'DSA Specialist'],
    createdAt: new Date()
  };

  // Demo Student
  const studentDemo = {
    id: 'student_demo',
    _id: 'student_demo',
    name: 'Rahul Sharma',
    email: 'student@quizarena.com',
    passwordHash,
    role: 'student',
    institution: 'IIT Computer Science Institute',
    classOrCourse: 'B.Tech CSE',
    yearOrGrade: '3rd Year',
    avatar: 'avatar_1',
    xp: 1240,
    level: 4,
    streak: 7,
    badges: ['First Quiz', 'DSA Streak Master', 'Top 5 Ranker'],
    createdAt: new Date()
  };

  memoryUsers.set(teacherDemo.email, teacherDemo);
  memoryUsers.set(studentDemo.email, studentDemo);

  const demoQuizzes = [
    {
      id: 'quiz_array_basics',
      title: 'Arrays & Dynamic Arrays Mastery',
      description: 'Master array memory layout, insertion, deletion, and index lookup bounds.',
      subject: 'Data Structures',
      topic: 'Arrays',
      difficulty: 'Easy',
      questions: [
        {
          id: 'arr_q1',
          type: 'mcq',
          question: 'What is the time complexity of looking up an array element given its index?',
          options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
          correctAnswer: 'O(1)',
          explanation: 'Base address + (index * element_size) gives direct constant time memory access.',
          points: 100,
          difficulty: 'Easy',
          visualizerType: 'array'
        },
        {
          id: 'arr_q2',
          type: 'mcq',
          question: 'What happens to time complexity when a dynamic array capacity overflows?',
          options: ['Amortized O(1) insertion', 'Strict O(n²) time', 'Memory Error always', 'O(log n) reallocation'],
          correctAnswer: 'Amortized O(1) insertion',
          explanation: 'Dynamic arrays double capacity on overflow. Copying takes O(n), but spread across n insertions yields amortized O(1).',
          points: 120,
          difficulty: 'Medium',
          visualizerType: 'array'
        }
      ]
    },
    {
      id: 'quiz_linkedlist_pro',
      title: 'Singly & Doubly Linked List Operations',
      description: 'Test pointer manipulations, head/tail insertion, reversal, and cycle detection.',
      subject: 'Data Structures',
      topic: 'Linked List',
      difficulty: 'Medium',
      questions: [
        {
          id: 'll_q1',
          type: 'mcq',
          question: 'Which algorithm detects a cycle in a linked list in O(n) time and O(1) space?',
          options: ['Floyds Tortoise and Hare Cycle Detection', 'Kadanes Algorithm', 'Dijkstras Path Finding', 'KMP Search'],
          correctAnswer: 'Floyds Tortoise and Hare Cycle Detection',
          explanation: 'Using slow pointer (1 step) and fast pointer (2 steps) guarantees meeting inside any existing loop.',
          points: 150,
          difficulty: 'Medium',
          visualizerType: 'linked_list'
        },
        {
          id: 'll_q2',
          type: 'true_false',
          question: 'Deleting a node in a Doubly Linked List requires traversing back from the head node.',
          options: ['True', 'False'],
          correctAnswer: 'False',
          explanation: 'Doubly linked lists have prev pointers, allowing node removal directly in O(1) time when node reference is given.',
          points: 100,
          difficulty: 'Easy',
          visualizerType: 'linked_list'
        }
      ]
    },
    {
      id: 'quiz_stack_queue',
      title: 'Stacks, Queues & Monotonic Deques',
      description: 'LIFO vs FIFO mechanics, expression evaluation, and sliding window maximums.',
      subject: 'Data Structures',
      topic: 'Stack & Queue',
      difficulty: 'Medium',
      questions: [
        {
          id: 'sq_q1',
          type: 'mcq',
          question: 'Which data structure is ideal for evaluating postfix mathematical expressions?',
          options: ['Stack', 'Queue', 'Binary Tree', 'Hash Map'],
          correctAnswer: 'Stack',
          explanation: 'Operands are pushed onto the stack; when an operator appears, top two operands are popped and calculated.',
          points: 120,
          difficulty: 'Medium',
          visualizerType: 'stack'
        },
        {
          id: 'sq_q2',
          type: 'mcq',
          question: 'How can a Queue be implemented using two Stacks?',
          options: ['Enqueue to Stack 1; Dequeue pops from Stack 2 (refilled from Stack 1 when empty)', 'Push to both stacks simultaneously', 'Swap stacks on every operation', 'Not possible without arrays'],
          correctAnswer: 'Enqueue to Stack 1; Dequeue pops from Stack 2 (refilled from Stack 1 when empty)',
          explanation: 'Reversing elements twice restores FIFO order for queue operations.',
          points: 150,
          difficulty: 'Medium',
          visualizerType: 'queue'
        }
      ]
    },
    {
      id: 'quiz_binary_tree_bst',
      title: 'Binary Trees, BST & Traversals',
      description: 'Inorder, Preorder, Postorder traversals, BST properties, and height calculations.',
      subject: 'Data Structures',
      topic: 'Trees',
      difficulty: 'Hard',
      questions: [
        {
          id: 'tree_q1',
          type: 'mcq',
          question: 'Which tree traversal algorithm produces sorted node values in a Binary Search Tree (BST)?',
          options: ['Inorder Traversal', 'Preorder Traversal', 'Postorder Traversal', 'Level-order Traversal'],
          correctAnswer: 'Inorder Traversal',
          explanation: 'Inorder visits Left -> Root -> Right, which traverses BST keys in strictly increasing sorted order.',
          points: 150,
          difficulty: 'Medium',
          visualizerType: 'tree'
        },
        {
          id: 'tree_q2',
          type: 'mcq',
          question: 'What is the worst-case height of an un-balanced BST with n nodes?',
          options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
          correctAnswer: 'O(n)',
          explanation: 'If items are inserted in sorted order, the BST degenerates into a linear linked list of height n.',
          points: 180,
          difficulty: 'Hard',
          visualizerType: 'tree'
        }
      ]
    },
    {
      id: 'quiz_graph_algorithms',
      title: 'Graph Traversal: BFS & DFS',
      description: 'Adjacency list/matrix representation, Breadth-First & Depth-First Search algorithms.',
      subject: 'Algorithms',
      topic: 'Graphs',
      difficulty: 'Expert',
      questions: [
        {
          id: 'graph_q1',
          type: 'mcq',
          question: 'Which graph algorithm is used to find the shortest path in an unweighted graph?',
          options: ['Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Kruskals Algorithm', 'Bellman-Ford Algorithm'],
          correctAnswer: 'Breadth-First Search (BFS)',
          explanation: 'BFS expands outward level-by-level, guaranteeing the shortest number of edges from source.',
          points: 200,
          difficulty: 'Hard',
          visualizerType: 'graph'
        },
        {
          id: 'graph_q2',
          type: 'mcq',
          question: 'What is the time complexity of BFS on a Graph with V vertices and E edges using Adjacency List?',
          options: ['O(V + E)', 'O(V * E)', 'O(V²)', 'O(E log V)'],
          correctAnswer: 'O(V + E)',
          explanation: 'Each vertex and each edge is processed at most once during traversal.',
          points: 220,
          difficulty: 'Expert',
          visualizerType: 'graph'
        }
      ]
    },
    {
      id: 'quiz_sorting_suite',
      title: 'Sorting Algorithms Arena: Quick, Merge & Bubble',
      description: 'Comparison of time complexities, stability, in-place behavior, and partition logic.',
      subject: 'Algorithms',
      topic: 'Sorting',
      difficulty: 'Medium',
      questions: [
        {
          id: 'sort_q1',
          type: 'mcq',
          question: 'Which sorting algorithm uses Divide & Conquer and guarantees O(n log n) worst-case time?',
          options: ['Merge Sort', 'Quick Sort', 'Bubble Sort', 'Selection Sort'],
          correctAnswer: 'Merge Sort',
          explanation: 'Merge Sort repeatedly halves arrays and merges sorted subarrays in O(n log n) worst-case time.',
          points: 140,
          difficulty: 'Medium',
          visualizerType: 'sorting'
        },
        {
          id: 'sort_q2',
          type: 'mcq',
          question: 'What makes Quick Sort fast in practice despite O(n²) worst-case time complexity?',
          options: ['In-place partitioning and low cache-miss overhead', 'Zero memory allocations', 'No comparison operations', 'Parallel threads natively'],
          correctAnswer: 'In-place partitioning and low cache-miss overhead',
          explanation: 'Quick Sort operates in-place without auxiliary array allocation, maximizing CPU cache locality.',
          points: 160,
          difficulty: 'Hard',
          visualizerType: 'sorting'
        }
      ]
    }
  ];

  // Add 14 additional topic quizzes to total 20+
  const extraTopics = [
    { title: 'Dynamic Programming Basics & Memoization', topic: 'Dynamic Programming', subject: 'Algorithms', diff: 'Hard' },
    { title: 'Binary Search & Two-Pointer Patterns', topic: 'Searching', subject: 'Algorithms', diff: 'Medium' },
    { title: 'Heap & Priority Queue Applications', topic: 'Heaps', subject: 'Data Structures', diff: 'Medium' },
    { title: 'Hash Table Collision Resolution (Chaining vs Open Addressing)', topic: 'Hashing', subject: 'Data Structures', diff: 'Easy' },
    { title: 'Operating Systems: Process Scheduling & Threads', topic: 'Process Management', subject: 'Operating Systems', diff: 'Medium' },
    { title: 'DBMS: SQL Queries, Indexing & B-Trees', topic: 'Database Systems', subject: 'DBMS', diff: 'Medium' },
    { title: 'Computer Networks: TCP/IP Stack & Socket Flow', topic: 'Networking', subject: 'Computer Networks', diff: 'Hard' },
    { title: 'Greedy Algorithms: Huffman Coding & Fractional Knapsack', topic: 'Greedy', subject: 'Algorithms', diff: 'Hard' },
    { title: 'Recursion & Backtracking: N-Queens & Sudoku', topic: 'Recursion', subject: 'Algorithms', diff: 'Expert' },
    { title: 'Bit Manipulation & Bitmasking Tricks', topic: 'Bitwise', subject: 'Algorithms', diff: 'Easy' },
    { title: 'Trie Data Structure & Autocomplete System Design', topic: 'Trie', subject: 'Data Structures', diff: 'Expert' },
    { title: 'Graph Shortest Path: Dijkstras Algorithm', topic: 'Graphs', subject: 'Algorithms', diff: 'Expert' },
    { title: 'Web Architecture: REST, GraphQL & Socket.IO Realtime', topic: 'Web Dev', subject: 'Web Architecture', diff: 'Medium' },
    { title: 'C++ STL Containers & Memory Pointers', topic: 'C++ STL', subject: 'Programming', diff: 'Easy' }
  ];

  extraTopics.forEach((t, i) => {
    demoQuizzes.push({
      id: `quiz_extra_${i + 1}`,
      title: t.title,
      description: `Comprehensive practice set covering ${t.topic} key concepts and problem solving.`,
      subject: t.subject,
      topic: t.topic,
      difficulty: t.diff as any,
      questions: [
        {
          id: `q_ex_${i}_1`,
          type: 'mcq',
          question: `What is a fundamental requirement for ${t.topic} algorithm correctness?`,
          options: ['Optimal Substructure & Overlapping Subproblems', 'Linear Time execution', 'Sorted Inputs strictly', 'Zero Memory Usage'],
          correctAnswer: 'Optimal Substructure & Overlapping Subproblems',
          explanation: `In ${t.topic}, optimal overall solutions are built from optimal solutions to subproblems.`,
          points: 120,
          difficulty: t.diff as any,
          visualizerType: 'array'
        },
        {
          id: `q_ex_${i}_2`,
          type: 'mcq',
          question: `What space complexity is associated with recursive call stacks in ${t.topic}?`,
          options: ['O(H) where H is recursion tree depth', 'O(1) constant', 'O(2ⁿ) exponential', 'O(N²) quadratic'],
          correctAnswer: 'O(H) where H is recursion tree depth',
          explanation: 'Each active recursive frame consumes stack space proportional to the current tree call depth.',
          points: 150,
          difficulty: t.diff as any,
          visualizerType: 'tree'
        }
      ]
    });
  });

  demoQuizzes.forEach(q => {
    const fullQuiz = {
      creatorId: 'teacher_demo',
      creatorName: 'Prof. Saurabh',
      coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
      settings: {
        questionOrder: 'fixed',
        timerMode: 'per_question',
        timeLimitSeconds: 30,
        showExplanation: 'immediate',
        speedBonus: true,
        allowRetry: true,
        leaderboardEnabled: true
      },
      published: true,
      attemptsCount: Math.floor(20 + Math.random() * 80),
      rating: 4.9,
      createdAt: new Date(),
      ...q
    };

    memoryQuizzes.set(q.id, fullQuiz);
  });

  console.log(`[Seed] Successfully loaded ${demoQuizzes.length} DSA & CS quizzes into QuizArena!`);
};
