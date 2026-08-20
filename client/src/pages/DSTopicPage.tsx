import React, { Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Lazy load visualizers
const ArrayVisualizer = lazy(() => import('../visualizers/arrays/ArrayVisualizer'));
const LinkedListVisualizer = lazy(() => import('../visualizers/linkedlists/LinkedListVisualizer'));
const StackVisualizer = lazy(() => import('../visualizers/stacks/StackVisualizer'));
const QueueVisualizer = lazy(() => import('../visualizers/queues/QueueVisualizer'));
const HashMapVisualizer = lazy(() => import('../visualizers/hashmaps/HashMapVisualizer'));
const HeapVisualizer = lazy(() => import('../visualizers/heaps/HeapVisualizer'));
const TrieVisualizer = lazy(() => import('../visualizers/tries/TrieVisualizer'));

const DS_META: Record<string, { title: string; subtitle: string; color: string }> = {
  array: { title: 'Arrays', subtitle: 'Sequential collection with O(1) random access', color: 'cyan' },
  linkedlist: { title: 'Linked Lists', subtitle: 'Dynamic sequential structure with pointer-linked nodes', color: 'purple' },
  stack: { title: 'Stack', subtitle: 'LIFO data structure — Last In, First Out', color: 'green' },
  queue: { title: 'Queue', subtitle: 'FIFO data structure — First In, First Out', color: 'yellow' },
  hashmap: { title: 'Hash Table', subtitle: 'Key-value mapping with O(1) average access', color: 'orange' },
  heap: { title: 'Heap', subtitle: 'Complete binary tree maintaining heap property', color: 'red' },
  trie: { title: 'Trie', subtitle: 'Prefix tree for efficient string operations', color: 'pink' },
};

function VisualizerForTopic({ topic }: { topic: string }) {
  switch (topic) {
    case 'array': return <ArrayVisualizer />;
    case 'linkedlist': return <LinkedListVisualizer />;
    case 'stack': return <StackVisualizer />;
    case 'queue': return <QueueVisualizer />;
    case 'hashmap': return <HashMapVisualizer />;
    case 'heap': return <HeapVisualizer />;
    case 'trie': return <TrieVisualizer />;
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

function Loader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export function DSTopicPage() {
  const { topic = 'array' } = useParams();
  const meta = DS_META[topic] || { title: topic, subtitle: 'Data Structure', color: 'cyan' };

  return (
    <div className="min-h-full w-full">
      {/* Header */}
      <div className="px-6 py-6 border-b border-white/[0.06] bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Data Structure
            </span>
          </div>
          <h1 className="text-3xl font-display font-bold text-white">{meta.title}</h1>
          <p className="text-slate-400 mt-1">{meta.subtitle}</p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Suspense fallback={<Loader />}>
          <VisualizerForTopic topic={topic} />
        </Suspense>
      </div>
    </div>
  );
}

export default DSTopicPage;
