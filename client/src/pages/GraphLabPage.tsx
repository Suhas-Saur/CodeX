import React, { Suspense, lazy } from 'react';

const GraphCanvas = lazy(() => import('../visualizers/graphs/GraphCanvas'));

export function GraphLabPage() {
  return (
    <div className="min-h-full w-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/[0.06] bg-black/20 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Interactive Lab
              </span>
            </div>
            <h1 className="text-2xl font-display font-bold text-white">Graph Lab</h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Build graphs interactively. Run BFS, DFS, Dijkstra, MST, and more with real-time visualization.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Click canvas → Add node</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <span>Click node → Select</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Select + click → Add edge</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Drag → Move node</span>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas - takes remaining height */}
      <div className="flex-1 overflow-hidden">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-slate-400">Loading Graph Lab...</span>
            </div>
          </div>
        }>
          <GraphCanvas />
        </Suspense>
      </div>
    </div>
  );
}

export default GraphLabPage;
