import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

const SortingVisualizer = lazy(() => import('../visualizers/sorting/SortingVisualizer').then(m => ({ default: m.SortingVisualizer })));
const SearchVisualizer = lazy(() => import('../visualizers/searching/SearchVisualizer').then(m => ({ default: m.SearchVisualizer })));
const DPVisualizer = lazy(() => import('../visualizers/dp/DPVisualizer').then(m => ({ default: m.DPVisualizer })));
const BacktrackingVisualizer = lazy(() => import('../visualizers/backtracking/BacktrackingVisualizer').then(m => ({ default: m.BacktrackingVisualizer })));
const StringVisualizer = lazy(() => import('../visualizers/strings/StringVisualizer').then(m => ({ default: m.StringVisualizer })));
const RecursionVisualizer = lazy(() => import('../visualizers/recursion/RecursionVisualizer').then(m => ({ default: m.RecursionVisualizer })));

const ALGO_META: Record<string, { title: string; subtitle: string }> = {
  sorting: { title: 'Sorting Algorithms', subtitle: 'Visualize and compare 8 sorting algorithms with animated bars' },
  searching: { title: 'Searching Algorithms', subtitle: 'See binary search, linear search, and more with pointer animations' },
  dp: { title: 'Dynamic Programming', subtitle: 'Fill DP tables cell by cell and understand optimal substructure' },
  backtracking: { title: 'Backtracking', subtitle: 'Watch the algorithm explore and backtrack through decision trees' },
  strings: { title: 'String Algorithms', subtitle: 'Visualize KMP, Rabin-Karp, and Z-algorithm character by character' },
  recursion: { title: 'Recursion Visualizer', subtitle: 'See recursive calls expand and unwind in a tree structure' },
  greedy: { title: 'Greedy Algorithms', subtitle: 'Understand greedy choices and why they work' },
};

function VisualizerForTopic({ topic }: { topic: string }) {
  switch (topic) {
    case 'sorting': return <SortingVisualizer />;
    case 'searching': return <SearchVisualizer />;
    case 'dp': return <DPVisualizer />;
    case 'backtracking': return <BacktrackingVisualizer />;
    case 'strings': return <StringVisualizer />;
    case 'recursion': return <RecursionVisualizer />;
    default:
      return (
        <div className="flex items-center justify-center h-64 text-slate-500">
          <div className="text-center">
            <div className="text-4xl mb-3">🔧</div>
            <p className="text-lg">Visualizer for "{topic}" coming soon</p>
          </div>
        </div>
      );
  }
}

export function AlgoTopicPage() {
  const { topic = 'sorting' } = useParams();
  const meta = ALGO_META[topic] || { title: topic, subtitle: 'Algorithm' };

  return (
    <div className="min-h-full w-full">
      <div className="px-6 py-6 border-b border-white/[0.06] bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Algorithm
            </span>
          </div>
          <h1 className="text-3xl font-display font-bold text-white">{meta.title}</h1>
          <p className="text-slate-400 mt-1">{meta.subtitle}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <VisualizerForTopic topic={topic} />
        </Suspense>
      </div>
    </div>
  );
}

export default AlgoTopicPage;
