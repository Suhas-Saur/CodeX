# 🎮 QuizArena — Learn. Practice. Compete.

**QuizArena** is a modern, full-stack educational SaaS platform combining real-time Kahoot/Wayground-style live multiplayer quizzes, QuizKhelo-style self-paced practice quizzes, interactive DSA data structure visualizers, and dedicated role-based portals for **Students** and **Teachers**.

---

## 🌟 Key Features

### 1. Dual Role-Based Accounts & Auth
- **Student Flow**: Dedicated registration and login flows tracking XP, level progression, daily practice streaks, badges, global/class leaderboards, and recent attempt history.
- **Teacher Portal**: Separate dashboard equipped with quiz creation tools, AI question generation, classroom live session hosting, student performance analytics, and downloadable CSV gradebook reports.
- **Role Security**: Protected routes and API authorization ensuring students cannot access teacher controls.

### 2. Kahoot / Wayground-Style Live Multiplayer Rooms
- **6-Digit Room Codes & QR Codes**: Teachers generate unique 6-digit join codes (e.g. `482731`) and instant QR codes for classroom scanning.
- **Real-Time Socket.IO Engine**: Synchronized lobby, real-time question broadcast, server-side countdown timers, speed bonuses, and live leaderboard position shifts.
- **Classroom Host Display (`/host/:roomCode`)**: Optimized view for classroom projectors showing real-time student join cards, countdown rings, and round leaderboards.

### 3. QuizKhelo-Inspired Practice Arena
- Search and filter quizzes by Subject, Topic, Difficulty (*Easy, Medium, Hard, Expert*), and Question count.
- Self-paced practice with instant or end-of-quiz answer explanations.

### 4. Interactive DSA Visual Learning Studio
Graphical interactive visualizers integrated directly into learning modules:
- **Arrays & Searching**: Step-by-step contiguous memory indexing and $O(\log n)$ Binary Search animation.
- **Linked Lists**: Singly & Doubly Linked List pointer animations (head/tail insertions & deletions).
- **Stacks & Queues**: Interactive LIFO Push/Pop containers and FIFO Enqueue/Dequeue queues.
- **Binary Search Trees (BST)**: SVG tree layout with Inorder, Preorder, and Postorder traversal step highlighting.
- **Graph Traversal**: Vertices and weighted edges with Breadth-First Search (BFS) and Depth-First Search (DFS) animations.
- **Sorting Algorithms**: Animated bar graphs comparing Bubble Sort, Quick Sort, and Selection Sort.

### 5. AI Quiz Generator
- Built-in AI question generation service abstraction. Generates structured DSA & CS questions for any requested topic and difficulty.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Lucide React, Framer Motion, Recharts, Socket.IO Client, Canvas-Confetti, QRCode SVG.
- **Backend**: Node.js, Express, TypeScript, Socket.IO, MongoDB (with automatic in-memory fallback), JWT Authentication, bcryptjs.

---

## 🚀 Quick Start Guide

### 1. Installation
Clone the repository and install dependencies for root, server, and client:
```bash
# Install dependencies across root, server, and client
npm run install:all
```

### 2. Pre-load Seed Data
Populate 20+ DSA & CS quizzes along with demo teacher and student accounts:
```bash
npm run seed
```

### 3. Run Development Servers
Start both backend (PORT 5000) and frontend (PORT 5173) concurrently:
```bash
# Terminal 1: Start Backend
npm run dev:server

# Terminal 2: Start Frontend
npm run dev:client
```
Open `http://localhost:5173` in your browser.

---

## 🔑 Demo Credentials

| Role | Email | Password | Features Access |
| :--- | :--- | :--- | :--- |
| **Teacher** | `teacher@quizarena.com` | `password123` | Quiz builder, AI generator, Host live rooms, View reports & CSV export |
| **Student** | `student@quizarena.com` | `password123` | Join live rooms via code, Practice quizzes, DSA Studio, Leaderboards |

---

## 📂 Project Structure

```
CodeX/
├── server/                      # Node.js + Express + Socket.IO Backend
│   ├── src/
│   │   ├── config/              # DB connection & fallback store
│   │   ├── controllers/         # Auth, Quiz, Room, Class, Report controllers
│   │   ├── middleware/          # JWT & Role authorization middleware
│   │   ├── models/              # Mongoose database schemas
│   │   ├── routes/              # Express API endpoints
│   │   ├── seed/                # Seed database script
│   │   ├── services/            # AI Generator service abstraction
│   │   ├── socket/              # Real-time Socket.IO room state machine
│   │   └── server.ts            # Main server entry
│   ├── package.json
│   └── tsconfig.json
├── client/                      # Vite + React + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components & Navbar
│   │   ├── context/             # AuthContext, SocketContext, ThemeContext
│   │   ├── pages/               # Landing, Auth, Dashboards, Live Room, Studio
│   │   ├── services/            # Axios API client
│   │   ├── types/               # TypeScript interfaces
│   │   ├── visualizers/         # Interactive DSA Visualizer components
│   │   ├── App.tsx              # Router & Protected routes
│   │   └── main.tsx
│   ├── package.json
│   └── tsconfig.json
└── README.md
```
