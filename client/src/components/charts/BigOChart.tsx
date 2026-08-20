import React, { useState } from 'react';

const COMPLEXITIES = [
  { name: 'O(1)', color: '#00ff9f', fn: (_n: number) => 1, examples: ['Hash lookup', 'Array access', 'Stack push/pop'] },
  { name: 'O(log n)', color: '#00d4ff', fn: (n: number) => Math.log2(n), examples: ['Binary search', 'BST operations', 'Heap insert'] },
  { name: 'O(n)', color: '#7c3aed', fn: (n: number) => n, examples: ['Linear search', 'Array traversal', 'Linked list traversal'] },
  { name: 'O(n log n)', color: '#ffe600', fn: (n: number) => n * Math.log2(n), examples: ['Merge sort', 'Quick sort avg', 'Heap sort'] },
  { name: 'O(n²)', color: '#ff8c00', fn: (n: number) => n * n, examples: ['Bubble sort', 'Selection sort', 'Insertion sort worst'] },
  { name: 'O(2ⁿ)', color: '#ff3366', fn: (n: number) => Math.pow(2, n), examples: ['Fibonacci naive', 'Subset generation', 'Travelling salesman brute'] },
];

export function BigOChart() {
  const [hoveredComplexity, setHoveredComplexity] = useState<string | null>(null);
  const [n, setN] = useState(10);

  const W = 500;
  const H = 300;
  const PADDING = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartW = W - PADDING.left - PADDING.right;
  const chartH = H - PADDING.top - PADDING.bottom;

  const maxN = n;
  const maxVal = Math.min(n * n * 1.2, H * 2);

  const toX = (xVal: number) => PADDING.left + (xVal / maxN) * chartW;
  const toY = (yVal: number) => PADDING.top + chartH - Math.min((yVal / maxVal) * chartH, chartH);

  const makePath = (fn: (n: number) => number) => {
    const pts = [];
    for (let i = 0; i <= maxN; i += 0.5) {
      const y = fn(i);
      if (y > maxVal * 1.5) break;
      pts.push(`${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(y).toFixed(1)}`);
    }
    return pts.join(' ');
  };

  const hovered = COMPLEXITIES.find(c => c.name === hoveredComplexity);

  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Big-O Complexity</h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">n =</span>
          <input
            type="range" min={5} max={20} value={n}
            onChange={e => setN(Number(e.target.value))}
            className="w-24 accent-cyan-400"
          />
          <span className="text-sm font-mono text-cyan-400 w-6">{n}</span>
        </div>
      </div>

      <div className="flex gap-6">
        <svg viewBox={`0 0 ${W} ${H}`} className="flex-1" style={{ maxWidth: 500 }}>
          {/* Grid */}
          {[0.25, 0.5, 0.75, 1].map(f => (
            <line key={f}
              x1={PADDING.left} y1={toY(maxVal * f)}
              x2={W - PADDING.right} y2={toY(maxVal * f)}
              stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3"
            />
          ))}
          {/* Axes */}
          <line x1={PADDING.left} y1={PADDING.top} x2={PADDING.left} y2={H - PADDING.bottom} stroke="rgba(255,255,255,0.2)" />
          <line x1={PADDING.left} y1={H - PADDING.bottom} x2={W - PADDING.right} y2={H - PADDING.bottom} stroke="rgba(255,255,255,0.2)" />
          <text x={PADDING.left / 2} y={H / 2} fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle" transform={`rotate(-90, ${PADDING.left / 2}, ${H / 2})`}>Operations</text>
          <text x={W / 2} y={H - 5} fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">n (input size)</text>

          {/* Curves */}
          {COMPLEXITIES.map(c => (
            <path
              key={c.name}
              d={makePath(c.fn)}
              fill="none"
              stroke={c.color}
              strokeWidth={hoveredComplexity === c.name ? 3 : hoveredComplexity ? 1 : 2}
              opacity={hoveredComplexity && hoveredComplexity !== c.name ? 0.2 : 1}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          ))}
        </svg>

        <div className="w-44 space-y-2">
          {COMPLEXITIES.map(c => (
            <button
              key={c.name}
              onMouseEnter={() => setHoveredComplexity(c.name)}
              onMouseLeave={() => setHoveredComplexity(null)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-left
                ${hoveredComplexity === c.name ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'}`}
            >
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: c.color }} />
              <span className="font-mono text-sm text-slate-300">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {hovered && (
        <div className="mt-4 p-3 bg-white/[0.04] rounded-xl border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ background: hovered.color }} />
            <span className="font-mono font-bold text-white">{hovered.name}</span>
            <span className="text-slate-500 text-sm">at n={n}: ~{Math.round(hovered.fn(n)).toLocaleString()} ops</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {hovered.examples.map(ex => (
              <span key={ex} className="text-xs px-2 py-1 bg-white/[0.06] rounded-full text-slate-400">{ex}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
