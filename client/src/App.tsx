import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

// Pages — loaded lazily for performance
const HomePage = React.lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const LearnPage = React.lazy(() => import('./pages/LearnPage').then(m => ({ default: m.LearnPage })));
const DataStructuresPage = React.lazy(() => import('./pages/DataStructuresPage').then(m => ({ default: m.DataStructuresPage })));
const AlgorithmsPage = React.lazy(() => import('./pages/AlgorithmsPage').then(m => ({ default: m.AlgorithmsPage })));
const GraphLabPage = React.lazy(() => import('./pages/GraphLabPage').then(m => ({ default: m.GraphLabPage })));
const SortingLabPage = React.lazy(() => import('./pages/SortingLabPage').then(m => ({ default: m.SortingLabPage })));
const ComplexityLabPage = React.lazy(() => import('./pages/ComplexityLabPage').then(m => ({ default: m.ComplexityLabPage })));
const PracticePage = React.lazy(() => import('./pages/PracticePage').then(m => ({ default: m.PracticePage })));
const QuizArenaPage = React.lazy(() => import('./pages/QuizArenaPage').then(m => ({ default: m.QuizArenaPage })));
const ProgressPage = React.lazy(() => import('./pages/ProgressPage').then(m => ({ default: m.ProgressPage })));
const CheatSheetsPage = React.lazy(() => import('./pages/CheatSheetsPage').then(m => ({ default: m.CheatSheetsPage })));
const DSTopicPage = React.lazy(() => import('./pages/DSTopicPage').then(m => ({ default: m.DSTopicPage })));
const TreeLabPage = React.lazy(() => import('./pages/TreeLabPage').then(m => ({ default: m.TreeLabPage })));
const AlgoTopicPage = React.lazy(() => import('./pages/AlgoTopicPage').then(m => ({ default: m.AlgoTopicPage })));

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-slate-400">Loading...</span>
      </div>
    </div>
  );
}

// Keyboard shortcut handler for Ctrl+K
function KeyboardShortcutProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function App() {
  return (
    <Router basename="/CodeX">
      <KeyboardShortcutProvider>
        <Layout>
          <React.Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/visualizer" element={<DataStructuresPage />} />
              <Route path="/data-structures" element={<DataStructuresPage />} />
              <Route path="/algorithms" element={<AlgorithmsPage />} />
              
              {/* Data Structure pages */}
              <Route path="/ds/:topic" element={<DSTopicPage />} />
              
              {/* Tree Lab */}
              <Route path="/trees" element={<TreeLabPage />} />
              <Route path="/trees/:variant" element={<TreeLabPage />} />
              
              {/* Algorithm pages */}
              <Route path="/algo/:topic" element={<AlgoTopicPage />} />
              
              {/* Labs */}
              <Route path="/graph-lab" element={<GraphLabPage />} />
              <Route path="/sorting-lab" element={<SortingLabPage />} />
              <Route path="/complexity-lab" element={<ComplexityLabPage />} />
              
              {/* Practice */}
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/quiz" element={<QuizArenaPage />} />
              
              {/* Progress & Reference */}
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/cheat-sheets" element={<CheatSheetsPage />} />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </React.Suspense>
        </Layout>
      </KeyboardShortcutProvider>
    </Router>
  );
}
