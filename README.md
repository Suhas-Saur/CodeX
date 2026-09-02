<div align="center">

# ⚡ AlgoForge (CodeX)
### *See the logic. Trace the execution. Master DSA.*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-suhas--saur.github.io%2FCodeX-00d4ff?style=for-the-badge&logo=googlechrome&logoColor=white)](https://suhas-saur.github.io/CodeX/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-7c3aed?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Suhas-Saur/CodeX)
[![License](https://img.shields.io/badge/License-MIT-00ff9f?style=for-the-badge)](LICENSE)

<br />

[![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br />

**AlgoForge** is a next-generation, dark-first interactive visual learning platform and algorithm simulator designed for software engineers, computer science students, and interview candidates. Built from scratch with a futuristic glassmorphism developer interface, AlgoForge turns abstract data structures and complex algorithms into step-by-step, inspectable execution models.

[Explore Visualizers](#-interactive-labs--visualizers) • [Live Demo](#-live-demo--deployment) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Command Palette](#-keyboard-shortcuts)

---

</div>

<br />

## 🌐 Live Demo & Deployment

> ### 🔗 **Official Web Application**: [https://suhas-saur.github.io/CodeX/](https://suhas-saur.github.io/CodeX/)
> *(Localhost preview: `http://localhost:5174/CodeX/`)*

<details open>
<summary><b>ℹ️ Is the Live Demo link returning 404? Click here for the quick 1-minute fix!</b></summary>

<br />

If you see a GitHub **404 Not Found** page when opening the link, it is because **GitHub Pages requires the repository to be Public** (or configured in your repo settings):

1. **Set Repository to Public** *(GitHub Pages is free for public repositories)*:
   - Go to your repository: [github.com/Suhas-Saur/CodeX](https://github.com/Suhas-Saur/CodeX)
   - Click **Settings** ⚙️ $\rightarrow$ Scroll down to **Danger Zone** $\rightarrow$ Click **Change repository visibility** $\rightarrow$ Select **Make public**.
2. **Enable GitHub Pages**:
   - Go to **Settings** $\rightarrow$ **Pages** (in the left sidebar).
   - Under **Build and deployment** $\rightarrow$ **Source**:
     - **Option A (Instant - Recommended)**: Select **Deploy from a branch** $\rightarrow$ Branch: **`gh-pages`** $\rightarrow$ Folder: **`/ (root)`** $\rightarrow$ Click **Save**.
     - **Option B (Automated Actions)**: Select **GitHub Actions** (the included `.github/workflows/deploy.yml` will automatically build and deploy on every push).
3. Wait ~60 seconds and refresh [https://suhas-saur.github.io/CodeX/](https://suhas-saur.github.io/CodeX/).

</details>

---

## 📸 Platform Highlights

```
+---------------------------------------------------------------------------------------+
|  ⚡ AlgoForge           [ Home ]  [ Learn ]  [ Data Structures ]  [ Algorithms ]      |
+---------------------------------------------------------------------------------------+
|                                                                                       |
|      __  __           _              _____   _____            __      ___             |
|     |  \/  |         | |            |  __ \ / ____|  /\       \ \    / (_)            |
|     | \  / | __ _ ___| |_ ___ _ __  | |  | | (___   /  \       \ \  / / _ ______      |
|     | |\/| |/ _` / __| __/ _ \ '__| | |  | |\___ \ / /\ \       \ \/ / | |_  /        |
|     | |  | | (_| \__ \ ||  __/ |    | |__| |____) / ____ \       \  /  | |/ /         |
|     |_|  |_|\__,_|___/\__\___|_|    |_____/|_____/_/    \_\       \/   |_/___|        |
|                                                                                       |
|             "See every operation, pointer movement, comparison, and                  |
|                   recursive tree execution step by step in real time."                |
|                                                                                       |
|             [ 🚀 Start Learning ]         [ 🧪 Open Interactive Labs ]                |
+---------------------------------------------------------------------------------------+
```

---

## 🧪 Interactive Labs & Visualizers

AlgoForge contains dedicated, fully-functional simulation engines — **zero placeholder buttons, zero static mockups**. Every interaction computes real algorithm states:

| Laboratory | Features & Algorithms Supported | Visual Highlights |
| :--- | :--- | :--- |
| 🌐 **Graph Lab** | **BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Prim's MST, Kruskal's MST, Topological Sort, Cycle Detection** | SVG interactive canvas, drag-and-drop nodes, create directed/undirected edges, edit weights, live Dijkstra distance table |
| 🌲 **Tree Lab** | **Binary Search Tree (BST), AVL Tree, Tree Traversals** | Auto-calculated node balance factors, animated LL/RR/LR/RL tree rotations, live Inorder/Preorder/Postorder/Level-order playback |
| 📊 **Sorting Lab** | **Bubble, Selection, Insertion, Merge, Quick, Heap, Counting, Shell Sort** | Real-time bar animations, comparison & swap counter, pivot & partition indicators, custom array inputs, speed slider |
| 🔍 **Searching Lab** | **Linear, Binary, Jump, Interpolation, Exponential, Ternary Search** | L/R/M pointer movement, dynamically shrinking search intervals, eliminated range shading |
| 🧮 **Dynamic Programming** | **Fibonacci, LCS, 0/1 Knapsack, Coin Change, LIS, Climbing Stairs** | Interactive 2D/1D DP grids, dependency cell arrows, live recurrence formula tracking |
| ♟️ **Backtracking Lab** | **N-Queens, Sudoku Solver, Rat in a Maze, Permutations** | Interactive chessboard simulator, tried/safe/conflict states, recursive exploration and backtrack rewinding |
| 🔄 **Recursion Visualizer** | **Fibonacci, Factorial, Tower of Hanoi, Binary Search Tree calls** | Dynamic SVG call tree expansion, call stack frame inspection, returning value propagation |
| 🔤 **String Algorithms** | **Knuth-Morris-Pratt (KMP), Rabin-Karp, Z-Algorithm** | Character-by-character alignment, Longest Proper Prefix-Suffix (LPS) table generator |
| 📈 **Complexity Lab** | **$O(1)$, $O(\log n)$, $O(n)$, $O(n \log n)$, $O(n^2)$, $O(2^n)$, $O(n!)$** | Interactive Big-O chart with dynamic $n$-slider, operation count estimations, algorithm comparison tables |

---

## 📦 Data Structures Covered

All data structures feature memory address representation, array/pointer inspection, multi-language code snippets (**C++**, **Java**, **Python**, **JavaScript**), and Big-O breakdown:

- **Arrays**: Insert, Delete, Search, Update, Reverse, Rotate Left/Right, Traverse.
- **Singly Linked List**: Insert/Delete at Head, Tail, or Arbitrary Index; Search; In-place Reversal.
- **Doubly Linked List**: Bidirectional pointer updates (`prev` $\leftrightarrow$ `next`).
- **Circular Linked List**: Continuous ring structure traversal.
- **Stacks & Queues**: LIFO vertical stack container, FIFO linear & circular queues.
- **Hash Table**: Dynamic hash function visualizer with bucket array, collision resolution via chaining and open addressing.
- **Binary Heap**: Dual representation — synchronized SVG binary tree & contiguous array view with Min/Max heapify.
- **Trie (Prefix Tree)**: Character-by-character tree insertion, auto-complete prefix search, word deletion.

---

## 🎮 Gamification & Practice

- **Quiz Arena**: Timed interview challenges (10-question sprint, 30-question marathon, timed mock interview), immediate visual explanation for correct & incorrect answers.
- **Practice Mode**: Categorized challenges (*Predict Output, Find the Bug, Identify Complexity, Algorithm Tracing*).
- **Progress Tracking**: `localStorage`-persisted user profile tracking XP points, accuracy percentage, topics mastered, and day streaks without requiring an account.
- **Interview Cheat Sheets**: Quick-reference guides covering patterns, complexities, invariants, and standard templates.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd> | Open Global Command Palette & Fuzzy Search |
| <kbd>Space</kbd> | Play / Pause current algorithm animation |
| <kbd>→</kbd> | Step forward one execution frame |
| <kbd>←</kbd> | Step backward one execution frame |
| <kbd>R</kbd> | Restart current visualization |
| <kbd>Esc</kbd> | Close modals / Command palette |

---

## 🏗️ Architecture

AlgoForge follows a decoupled engine architecture separating algorithm execution, visual state representation, and UI controls:

```mermaid
flowchart TD
    subgraph UI_Layer [User Interface & Labs]
        Canvas[SVG / Canvas Stage]
        Controls[AnimationControls Bar]
        Panel[CodePanel & Complexity Tabs]
    end

    subgraph Engine [AlgoForge Execution Engine]
        EngineHook[useAnimationEngine Hook]
        StepQueue[Step Queue & Frame Buffer]
        StateRebuilder[State Rebuilder & Time Traveler]
    end

    subgraph Algorithms [Pure Algorithm Generators]
        SortGen[Sorting Generators]
        GraphGen[Graph Algorithms]
        TreeGen[Tree & Rotation Logics]
        DPGen[DP & Backtracking Engines]
    end

    Algorithms -->|Generate AlgoStep[]| EngineHook
    EngineHook --> StepQueue
    StepQueue --> StateRebuilder
    StateRebuilder -->|Render Frame| Canvas
    Controls -->|Play / Pause / Step| EngineHook
    EngineHook -->|Sync Code Line| Panel
```

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or 20+)
- [npm](https://www.npmjs.com/) (version 9+)

### 1. Clone the repository
```bash
git clone https://github.com/Suhas-Saur/CodeX.git
cd CodeX
```

### 2. Install dependencies
```bash
cd client
npm install --legacy-peer-deps
```

### 3. Start local development server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173/CodeX/
```

### 4. Build for production
```bash
npm run build
```
The optimized bundle will be created in `client/dist` (including `index.html` and SPA fallback `404.html`).

---

## 🛠️ Technology Stack

- **Client**: [React 18](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/), [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with custom neon & glassmorphism theme tokens
- **Animations**: [Framer Motion 11](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics & Charts**: [Recharts](https://recharts.org/)
- **Deployment**: [GitHub Pages](https://pages.github.com/) via GitHub Actions / `gh-pages`

---

## 🤝 Contributing

Contributions are always welcome! If you'd like to add a new algorithm or visualization:

1. Fork the Project (`https://github.com/Suhas-Saur/CodeX/fork`)
2. Create your Feature Branch (`git checkout -b feature/NewVisualizer`)
3. Commit your Changes (`git commit -m 'feat: add Red-Black Tree visualizer'`)
4. Push to the Branch (`git push origin feature/NewVisualizer`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ for developers mastering Data Structures & Algorithms.</sub>
</div>
