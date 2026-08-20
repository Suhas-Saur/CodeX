import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function HashMapVisualizer() {
  const [key, setKey] = useState('hello');
  const buckets = 8;
  const hashSum = key.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-[#050810] text-slate-300 font-['Syne']">
      <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-6 rounded-2xl flex flex-col gap-8 min-h-[500px]">
        
        <div className="flex gap-4">
          <input 
            type="text" 
            value={key} 
            onChange={(e) => setKey(e.target.value)} 
            className="bg-slate-900 border border-slate-700 rounded px-4 py-2"
            placeholder="Enter key to hash..."
          />
        </div>

        <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5">
          <div className="text-sm text-slate-400 mb-2">Hash Function Visualization</div>
          <div className="font-mono text-sm break-all">
            <span className="text-cyan-400">{key}</span>
            <span className="text-slate-500"> → hash = </span>
            {key.split('').map((c, i) => (
              <span key={i}><span className="text-yellow-400">{c.charCodeAt(0)}</span>{i < key.length-1 ? ' + ' : ''}</span>
            ))}
            {key.length > 0 && (
              <>
                <span className="text-slate-500"> = {hashSum}</span>
                <span className="text-slate-500"> → </span>
                <span className="text-yellow-400">{hashSum}</span>
                <span className="text-slate-500"> % {buckets} = </span>
                <span className="text-emerald-400 font-bold">{hashSum % buckets}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto p-4 flex-1">
          {Array.from({ length: buckets }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 min-w-[100px]">
              <div className="bg-slate-800 border-2 border-slate-700 text-center py-2 font-mono rounded">
                Bucket {i}
              </div>
              {i === hashSum % buckets && key.length > 0 && (
                <motion.div layout className="bg-cyan-900/40 border border-cyan-500/50 p-2 rounded text-center text-sm">
                  {key}
                </motion.div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
