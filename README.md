# ⚡ AlgoForge (CodeX) — Interactive DSA Visual Learning Platform

**AlgoForge** (in repo **CodeX**) is a modern, dark-first, highly visual Data Structures and Algorithms (DSA) learning platform and simulator. Designed like a professional educational SaaS tool rather than a basic college project, AlgoForge allows users to understand DSA by seeing every operation, pointer movement, comparison, tree restructuring, and greedy/DP decision step-by-step in real time.

> *"See the logic. Trace the execution. Master DSA."*

---

## 🌟 Features & Labs

### 1. 🎨 Dark-First Glassmorphism Design
- **Cyberpunk / Education Aesthetic**: Deep space background (`#050810`), glassmorphic frosted cards, subtle gradients, and neon state highlights (Cyan, Purple, Emerald, Yellow, Pink).
- **Animated Hero Section**: Real-time live visual simulation of graph traversals, binary search trees, and array operations.
- **Global Search / Command Palette (`Ctrl + K`)**: Instant keyboard navigation to jump across Data Structures, Algorithms, Labs, Quizzes, Practice, and Cheat Sheets.

### 2. 🗂️ Data Structure Visualizers
Every data structure features interactive manipulation, memory address & index display, complexity analysis, and code templates (C++, Java, Python, JavaScript):
- **Arrays**: Insert, delete, search, update, reverse, rotate, and traverse.
- **Linked Lists**: Singly, Doubly, and Circular Linked Lists with pointer animation (head/tail, previous/next pointers).
- **Stack & Queue**: Vertical stack with LIFO animations, horizontal queues with FIFO/Circular Queue indicators.
- **Hash Table**: Hash function computation visualizer with modulo bucket mapping and collision handling (chaining/open addressing).
- **Heap & Trie**: Min/Max heap with dual SVG tree and array representation during heapify, character-by-character prefix trie search.

### 3. 🧪 Interactive Specialized Labs
- **Graph Lab**: SVG canvas editor. Drag nodes, add directed/undirected edges, edit weights. Run BFS, DFS, Dijkstra (with live distance table), Bellman-Ford, Floyd-Warshall, Prim's & Kruskal's MST, Topological Sort, and Cycle Detection.
- **Tree Lab**: Dedicated BST and AVL tree simulator featuring balance factors on every node and rotation animations (LL, RR, LR, RL) plus Inorder, Preorder, Postorder, and Level-Order traversals.
- **Sorting Lab**: Animated bar visualizer supporting 8 algorithms (Bubble, Selection, Insertion, Merge, Quick, Heap, Counting, Shell Sort) with custom array input and speed controls.
- **Searching Lab**: Linear, Binary, Jump, Interpolation, Exponential, and Ternary Search with shrinking search bounds and pointer indicators ($L, R, M$).
- **Dynamic Programming Lab**: 1D & 2D interactive DP tables for Fibonacci, LCS, Knapsack, Coin Change, LIS, and Matrix Chain Multiplication with dependency arrows and formulas.
- **Backtracking Lab**: N-Queens chessboard simulator, Sudoku solver, Rat in a Maze, and Permutation generators with backtrack state highlights.
- **Recursion Visualizer**: Function call stack tree expansion and unwinding animation.
- **String Algorithms**: KMP (with LPS table construction), Rabin-Karp, and Z-Algorithm character-by-character matching.
- **Complexity Lab**: Interactive Big-O curves ($O(1)$ to $O(2^n)$) with dynamic $n$ slider, operation count estimation, and comparative lookup tables.

### 4. 🏆 Practice Mode & Quiz Arena
- **Quiz Arena**: Gamified quiz system with timers, streaks, XP, difficulty tiers, and instant explanations.
- **Interactive Practice**: Algorithmic tracing questions, complexity prediction, bug finding, and output prediction.
- **Progress Tracking**: LocalStorage-backed activity charts, XP badges, accuracy stats, and streak counters.

### 5. 📚 Searchable Cheat Sheets
- Comprehensive lookup tables for Sorting, Searching, Linear DS, Trees, Graphs, DP patterns, and String matching.

---

## 🛠️ Tech Stack

- **Framework**: React 18, Vite 5, TypeScript 5
- **Styling & Motion**: Tailwind CSS 3, Framer Motion 11
- **Icons & UI**: Lucide React
- **Charts**: Recharts & Custom SVG Canvas engines

---

## 🚀 Quick Start Guide

### 1. Installation
```bash
cd client
npm install --legacy-peer-deps
```

### 2. Development Server
Start local Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173/CodeX/` (or the port specified in terminal output).

### 3. Production Build
```bash
npm run build
```

---

## 📂 Project Structure

```
CodeX/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/          # Sidebar, TopBar, Layout wrapper
│   │   │   ├── ui/              # AnimationControls, CodePanel, CommandPalette, AlgoCard
│   │   │   └── charts/          # BigOChart, Progress charts
│   │   ├── engine/
│   │   │   ├── types.ts         # AlgoStep & VisualState types
│   │   │   ├── useAnimationEngine.ts  # Play/pause/step animation engine
│   │   │   └── useProgress.ts   # LocalStorage progress hook
│   │   ├── visualizers/         # 15+ DSA visualizer modules
│   │   │   ├── arrays/          # ArrayVisualizer & algorithms
│   │   │   ├── linkedlists/     # LinkedListVisualizer
│   │   │   ├── stacks/          # StackVisualizer
│   │   │   ├── queues/          # QueueVisualizer
│   │   │   ├── hashmaps/        # HashMapVisualizer
│   │   │   ├── heaps/           # HeapVisualizer
│   │   │   ├── tries/           # TrieVisualizer
│   │   │   ├── trees/           # BST, AVL, Traversals
│   │   │   ├── graphs/          # GraphCanvas & graph algorithms
│   │   │   ├── sorting/         # SortingVisualizer & 8 sorts
│   │   │   ├── searching/       # SearchVisualizer & 6 searches
│   │   │   ├── dp/              # DPVisualizer & table logic
│   │   │   ├── backtracking/    # N-Queens, Sudoku, Maze
│   │   │   ├── strings/         # StringVisualizer (KMP, Z, etc.)
│   │   │   └── recursion/       # RecursionVisualizer
│   │   ├── pages/               # HomePage, Learn, Labs, QuizArena, CheatSheets, etc.
│   │   ├── data/                # DSA educational content, quiz bank, cheat sheets
│   │   ├── styles/              # Dark glassmorphism global CSS
│   │   ├── App.tsx              # Router setup
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── .github/workflows/deploy.yml # GitHub Actions deployment
└── README.md
```

---

## 🌐 Deployment

This project deploys automatically to GitHub Pages via GitHub Actions:
- **Live URL**: [https://suhas-saur.github.io/CodeX/](https://suhas-saur.github.io/CodeX/)
