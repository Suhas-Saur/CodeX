import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export function VisualizerPage() {
  const { topic } = useParams();

  return (
    <div className="min-h-screen w-full bg-[#050810] text-slate-300 flex flex-col">
      <header className="p-4 border-b border-white/[0.08] bg-white/[0.02]">
        <h1 className="text-xl font-display font-bold text-white capitalize">{topic || 'Visualizer'}</h1>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Info Panel */}
        <aside className="w-80 border-r border-white/[0.08] bg-black/20 p-4 overflow-y-auto">
          <h2 className="text-lg font-bold text-cyan-400 mb-4">Information</h2>
          <p className="text-sm text-slate-400">Select a topic or interact with the visualization to see details here.</p>
        </aside>
        
        {/* Main Vis */}
        <main className="flex-1 relative flex items-center justify-center p-8">
          {topic ? (
            <div className="text-center">
              <h2 className="text-3xl text-white/50 mb-4">Rendering {topic} Visualizer...</h2>
              {/* Dynamic import or switch statement to render actual visualizer component would go here */}
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl text-white/50 mb-4">Select a Topic to Visualize</h2>
            </div>
          )}
        </main>
        
        {/* State Panel */}
        <aside className="w-80 border-l border-white/[0.08] bg-black/20 p-4 overflow-y-auto">
          <h2 className="text-lg font-bold text-purple-400 mb-4">State & Variables</h2>
          <div className="font-mono text-sm space-y-2">
            <div className="p-2 rounded bg-white/[0.04] border border-white/[0.08]">No active state</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
export default VisualizerPage;
