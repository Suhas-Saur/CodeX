import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

const BSTVisualizer = lazy(() => import('../visualizers/trees/BSTVisualizer'));
const AVLVisualizer = lazy(() => import('../visualizers/trees/AVLVisualizer'));
const TraversalVisualizer = lazy(() => import('../visualizers/trees/TraversalVisualizer'));

const TREE_META: Record<string, { title: string; subtitle: string }> = {
  bst: { title: 'Binary Search Tree', subtitle: 'Insert, delete, search and traverse a BST with animated node highlighting' },
  avl: { title: 'AVL Tree', subtitle: 'Self-balancing BST with rotation animations and balance factor display' },
  traversals: { title: 'Tree Traversals', subtitle: 'Inorder, Preorder, Postorder, and Level Order — visualized step by step' },
};

function TreeVisualizerForVariant({ variant }: { variant: string }) {
  switch (variant) {
    case 'bst': return <BSTVisualizer />;
    case 'avl': return <AVLVisualizer />;
    case 'traversals': return <TraversalVisualizer />;
    default: return <BSTVisualizer />;
  }
}

export function TreeLabPage() {
  const { variant = 'bst' } = useParams();
  const meta = TREE_META[variant] || TREE_META.bst;

  return (
    <div className="min-h-full w-full">
      <div className="px-6 py-6 border-b border-white/[0.06] bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Tree Lab
            </span>
          </div>
          <h1 className="text-3xl font-display font-bold text-white">{meta.title}</h1>
          <p className="text-slate-400 mt-1">{meta.subtitle}</p>
          
          {/* Variant selector */}
          <div className="flex gap-4 mt-4">
            {Object.entries(TREE_META).map(([key, info]) => (
              <a
                key={key}
                href={`/CodeX/trees/${key}`}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all
                  ${variant === key
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.06]'}`}
              >
                {info.title}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <TreeVisualizerForVariant variant={variant} />
        </Suspense>
      </div>
    </div>
  );
}

export default TreeLabPage;
