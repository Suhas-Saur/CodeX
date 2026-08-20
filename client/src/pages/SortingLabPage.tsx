import React, { Suspense, lazy } from 'react';

const SortingVisualizer = lazy(() => import('../visualizers/sorting/SortingVisualizer').then(m => ({ default: m.SortingVisualizer })));

export function SortingLabPage() {
  return (
    <div className="min-h-full w-full flex flex-col">
      <div className="px-6 py-4 border-b border-white/[0.06] bg-black/20 flex-shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            Interactive Lab
          </span>
        </div>
        <h1 className="text-2xl font-display font-bold text-white">Sorting Lab</h1>
        <p className="text-slate-400 text-sm mt-0.5">
          Visualize 8 sorting algorithms with animated bars. Control speed, step through, and compare.
        </p>
      </div>
      <div className="flex-1">
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <SortingVisualizer />
        </Suspense>
      </div>
    </div>
  );
}

export default SortingLabPage;
