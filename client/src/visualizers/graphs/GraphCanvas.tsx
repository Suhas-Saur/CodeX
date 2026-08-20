import React, { useState, useRef, useCallback, useEffect } from 'react';
import { AlgoStep, VisualState } from '../../engine/types';
import { bfsSteps, dfsSteps, dijkstraSteps, bellmanFordSteps, primMSTSteps, kruskalMSTSteps, topologicalSortSteps, detectCycleSteps } from './graphAlgorithms';
import { Plus, Minus, Trash2, Shuffle, Play, Settings, Table } from 'lucide-react';

export type GraphNode = { x: number; y: number; label: string };
export type GraphEdge = { from: string; to: string; weight: number };

export default function GraphCanvas() {
  const [nodes, setNodes] = useState<Map<string, GraphNode>>(new Map());
  const [edges, setEdges] = useState<Map<string, GraphEdge>>(new Map());
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [mode, setMode] = useState<'select' | 'addNode' | 'delete'>('select');
  const [directed, setDirected] = useState(false);
  const [weighted, setWeighted] = useState(true);
  const [algorithm, setAlgorithm] = useState('bfs');
  const [sourceNode, setSourceNode] = useState<string | null>(null);
  const [visualStates, setVisualStates] = useState<Record<string, VisualState>>({});
  const [edgeStates, setEdgeStates] = useState<Record<string, VisualState>>({});
  const [stepInfo, setStepInfo] = useState('');
  const [algoData, setAlgoData] = useState<any>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const nextNodeLabel = useRef(65); // 'A'

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const CTM = svgRef.current.getScreenCTM();
    if (!CTM) return { x: 0, y: 0 };
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    return {
      x: (clientX - CTM.e) / CTM.a,
      y: (clientY - CTM.f) / CTM.d
    };
  };

  const handleSvgClick = (e: React.MouseEvent) => {
    if (mode === 'addNode' && (e.target as Element).tagName === 'svg') {
      const coords = getCoordinates(e);
      const id = `node-${Date.now()}`;
      const label = String.fromCharCode(nextNodeLabel.current);
      nextNodeLabel.current++;
      setNodes(prev => {
        const next = new Map(prev);
        next.set(id, { x: coords.x, y: coords.y, label });
        return next;
      });
      if (!sourceNode) setSourceNode(id);
    } else if (mode === 'select' && (e.target as Element).tagName === 'svg') {
      setSelectedNode(null);
    }
  };

  const handleNodeClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (mode === 'delete') {
      deleteNode(id);
    } else if (mode === 'select') {
      if (selectedNode && selectedNode !== id) {
        // Create edge
        const edgeId = `edge-${selectedNode}-${id}-${Date.now()}`;
        setEdges(prev => {
          const next = new Map(prev);
          next.set(edgeId, { from: selectedNode, to: id, weight: Math.floor(Math.random() * 10) + 1 });
          return next;
        });
        setSelectedNode(null);
      } else {
        setSelectedNode(id);
      }
    }
  };

  const handleNodeMouseDown = (id: string, e: React.MouseEvent) => {
    if (mode === 'select') {
      setDraggedNode(id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedNode && mode === 'select') {
      const coords = getCoordinates(e);
      setNodes(prev => {
        const next = new Map(prev);
        const node = next.get(draggedNode);
        if (node) {
          next.set(draggedNode, { ...node, x: coords.x, y: coords.y });
        }
        return next;
      });
    }
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  const deleteNode = (id: string) => {
    setNodes(prev => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
    setEdges(prev => {
      const next = new Map(prev);
      for (const [edgeId, edge] of next.entries()) {
        if (edge.from === id || edge.to === id) {
          next.delete(edgeId);
        }
      }
      return next;
    });
    if (sourceNode === id) setSourceNode(null);
    if (selectedNode === id) setSelectedNode(null);
  };

  const deleteEdge = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (mode === 'delete') {
      setEdges(prev => {
        const next = new Map(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const editEdgeWeight = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!weighted) return;
    const current = edges.get(id);
    if (current) {
      const newWeightStr = prompt('Enter new weight:', current.weight.toString());
      if (newWeightStr) {
        const newWeight = parseInt(newWeightStr, 10);
        if (!isNaN(newWeight)) {
          setEdges(prev => {
            const next = new Map(prev);
            next.set(id, { ...current, weight: newWeight });
            return next;
          });
        }
      }
    }
  };

  const runAlgorithm = () => {
    setVisualStates({});
    setEdgeStates({});
    setAlgoData(null);
    setStepInfo('');

    const graphData = { nodes, edges, directed, weighted };
    let steps: AlgoStep[] = [];
    
    if (algorithm === 'bfs' && sourceNode) steps = bfsSteps(graphData, sourceNode);
    else if (algorithm === 'dfs' && sourceNode) steps = dfsSteps(graphData, sourceNode);
    else if (algorithm === 'dijkstra' && sourceNode) steps = dijkstraSteps(graphData, sourceNode);
    else if (algorithm === 'bellmanFord' && sourceNode) steps = bellmanFordSteps(graphData, sourceNode);
    else if (algorithm === 'prim') steps = primMSTSteps(graphData);
    else if (algorithm === 'kruskal') steps = kruskalMSTSteps(graphData);
    else if (algorithm === 'topoSort') steps = topologicalSortSteps(graphData);
    else if (algorithm === 'cycle') steps = detectCycleSteps(graphData);

    // Simple simulation runner for preview
    let i = 0;
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval);
        return;
      }
      const step = steps[i];
      setStepInfo(step.description);
      
      const newVisualStates: Record<string, VisualState> = {};
      const newEdgeStates: Record<string, VisualState> = {};
      
      (step.nodeIds || []).forEach(nId => {
        if (step.type === 'visit') newVisualStates[nId] = 'active';
        else if (step.type === 'compare') newVisualStates[nId] = 'comparing';
        else if (step.type === 'relaxEdge') newVisualStates[nId] = 'swapping';
        else if (step.type === 'info') newVisualStates[nId] = 'sorted';
        else newVisualStates[nId] = 'visited';
      });

      (step.edgeIds || []).forEach(eId => {
        if (step.type === 'markMST') newEdgeStates[eId] = 'sorted';
        else if (step.type === 'relaxEdge') newEdgeStates[eId] = 'swapping';
        else newEdgeStates[eId] = 'active';
      });

      setVisualStates(prev => ({ ...prev, ...newVisualStates }));
      setEdgeStates(prev => ({ ...prev, ...newEdgeStates }));
      setAlgoData(step.extra);
      
      i++;
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#050810] text-slate-300 font-display">
      <div className="flex items-center p-4 gap-4 bg-white/[0.04] backdrop-blur-xl border-b border-white/[0.08]">
        <div className="flex gap-2">
          <button className={`p-2 rounded ${mode === 'select' ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-white/10'}`} onClick={() => setMode('select')} title="Select / Move / Add Edge"><Plus className="w-5 h-5 rotate-45" /></button>
          <button className={`p-2 rounded ${mode === 'addNode' ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-white/10'}`} onClick={() => setMode('addNode')} title="Add Node"><Plus className="w-5 h-5" /></button>
          <button className={`p-2 rounded ${mode === 'delete' ? 'bg-red-500/20 text-red-400' : 'hover:bg-white/10'}`} onClick={() => setMode('delete')} title="Delete"><Trash2 className="w-5 h-5" /></button>
        </div>
        <div className="h-6 w-px bg-white/10" />
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={directed} onChange={e => setDirected(e.target.checked)} className="accent-cyan-400" /> Directed
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={weighted} onChange={e => setWeighted(e.target.checked)} className="accent-cyan-400" /> Weighted
          </label>
        </div>
        <div className="h-6 w-px bg-white/10" />
        <div className="flex items-center gap-2">
          <select value={algorithm} onChange={e => setAlgorithm(e.target.value)} className="bg-slate-800 text-sm p-1.5 rounded border border-white/10 outline-none focus:border-cyan-400">
            <option value="bfs">Breadth First Search</option>
            <option value="dfs">Depth First Search</option>
            <option value="dijkstra">Dijkstra's Shortest Path</option>
            <option value="bellmanFord">Bellman-Ford</option>
            <option value="prim">Prim's MST</option>
            <option value="kruskal">Kruskal's MST</option>
            <option value="topoSort">Topological Sort</option>
            <option value="cycle">Cycle Detection</option>
          </select>
          {['bfs', 'dfs', 'dijkstra', 'bellmanFord'].includes(algorithm) && (
            <select value={sourceNode || ''} onChange={e => setSourceNode(e.target.value)} className="bg-slate-800 text-sm p-1.5 rounded border border-white/10 outline-none focus:border-cyan-400">
              <option value="" disabled>Select Source</option>
              {Array.from(nodes.entries()).map(([id, n]) => (
                <option key={id} value={id}>{n.label}</option>
              ))}
            </select>
          )}
          <button onClick={runAlgorithm} className="px-4 py-1.5 bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 rounded hover:bg-cyan-500/30 transition-all flex items-center gap-2">
            <Play className="w-4 h-4" /> Run
          </button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden relative">
        <svg 
          ref={svgRef}
          className="w-full h-full cursor-crosshair"
          onClick={handleSvgClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="25" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
            <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="25" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#22d3ee" />
            </marker>
          </defs>
          
          {Array.from(edges.entries()).map(([id, edge]) => {
            const fromNode = nodes.get(edge.from);
            const toNode = nodes.get(edge.to);
            if (!fromNode || !toNode) return null;
            
            const state = edgeStates[id] || 'normal';
            const color = state === 'active' ? '#22d3ee' : state === 'sorted' ? '#34d399' : state === 'swapping' ? '#f59e0b' : '#475569';
            const markerId = state !== 'normal' ? 'url(#arrowhead-active)' : 'url(#arrowhead)';
            
            return (
              <g key={id} onClick={(e) => deleteEdge(id, e)} onDoubleClick={(e) => editEdgeWeight(id, e)}>
                <line
                  x1={fromNode.x} y1={fromNode.y}
                  x2={toNode.x} y2={toNode.y}
                  stroke={color}
                  strokeWidth="2"
                  markerEnd={directed ? markerId : undefined}
                  className="transition-all duration-300 hover:stroke-cyan-500 cursor-pointer"
                />
                {weighted && (
                  <text
                    x={(fromNode.x + toNode.x) / 2}
                    y={(fromNode.y + toNode.y) / 2 - 10}
                    fill={color}
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="font-mono bg-[#050810] cursor-pointer"
                  >
                    {edge.weight}
                  </text>
                )}
              </g>
            );
          })}
          
          {Array.from(nodes.entries()).map(([id, node]) => {
            const state = visualStates[id] || 'normal';
            const isSelected = selectedNode === id;
            
            let bgClass = "fill-slate-800";
            let strokeClass = "stroke-slate-600";
            let textClass = "fill-slate-300";
            
            if (state === 'active') { bgClass = "fill-cyan-500/20"; strokeClass = "stroke-cyan-400"; textClass = "fill-cyan-300"; }
            else if (state === 'visited') { bgClass = "fill-purple-500/20"; strokeClass = "stroke-purple-400"; textClass = "fill-purple-300"; }
            else if (state === 'comparing') { bgClass = "fill-yellow-500/20"; strokeClass = "stroke-yellow-400"; textClass = "fill-yellow-300"; }
            else if (state === 'swapping') { bgClass = "fill-orange-500/20"; strokeClass = "stroke-orange-400"; textClass = "fill-orange-300"; }
            else if (state === 'sorted') { bgClass = "fill-emerald-500/20"; strokeClass = "stroke-emerald-400"; textClass = "fill-emerald-300"; }
            
            if (isSelected) {
              strokeClass = "stroke-cyan-400";
            }
            
            return (
              <g key={id} 
                 transform={`translate(${node.x}, ${node.y})`}
                 onClick={(e) => handleNodeClick(id, e)}
                 onMouseDown={(e) => handleNodeMouseDown(id, e)}
                 className="cursor-pointer"
              >
                <circle 
                  r="20" 
                  className={`${bgClass} ${strokeClass} transition-all duration-300 hover:stroke-cyan-300`} 
                  strokeWidth={isSelected ? "3" : "2"}
                />
                <text 
                  textAnchor="middle" 
                  dy=".3em" 
                  className={`${textClass} font-mono font-bold select-none`}
                >
                  {node.label}
                </text>
                {algoData?.distances && algoData.distances[id] !== undefined && algoData.distances[id] !== Infinity && (
                  <text y="-25" textAnchor="middle" className="fill-cyan-400 text-xs font-mono">
                    {algoData.distances[id]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        
        {/* Algo State Overlay */}
        <div className="absolute top-4 right-4 w-64 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] p-4 rounded-lg pointer-events-none">
          <h3 className="font-bold text-cyan-400 mb-2 border-b border-white/10 pb-2">Step Info</h3>
          <p className="text-sm mb-4 text-slate-300 min-h-[3rem]">{stepInfo || 'Ready to run.'}</p>
          
          {algoData && (
            <div className="text-xs font-mono text-slate-400 space-y-2">
              {algoData.queue && <div>Queue: [{algoData.queue.map((id: string) => nodes.get(id)?.label).join(', ')}]</div>}
              {algoData.stack && <div>Stack: [{algoData.stack.map((id: string) => nodes.get(id)?.label).join(', ')}]</div>}
              {algoData.visited && <div>Visited: {algoData.visited.map((id: string) => nodes.get(id)?.label).join(', ')}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
