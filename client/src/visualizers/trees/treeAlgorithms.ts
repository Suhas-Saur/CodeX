import { AlgoStep, TreeNode } from '../../engine/types';

export function bstInsertSteps(root: TreeNode | null, value: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  steps.push({ type: 'info', description: `Inserting ${value} into BST`, indices: [] });
  
  function trace(node: TreeNode | null, depth: number): void {
    if (!node) {
      steps.push({ type: 'insert', description: `Found empty spot! Inserting ${value} here`, nodeIds: [] });
      return;
    }
    steps.push({ 
      type: 'compare', 
      description: `At node ${node.value}: Is ${value} < ${node.value}? ${value < node.value ? 'Yes, go left' : 'No, go right'}`,
      nodeIds: [node.id]
    });
    if (value < node.value) {
      steps.push({ type: 'highlight', description: `Going left from ${node.value}`, nodeIds: [node.id], extra: { direction: 'left' } });
      trace(node.left || null, depth + 1);
    } else {
      steps.push({ type: 'highlight', description: `Going right from ${node.value}`, nodeIds: [node.id], extra: { direction: 'right' } });
      trace(node.right || null, depth + 1);
    }
  }
  trace(root, 0);
  return steps;
}

export function bstDeleteSteps(root: TreeNode | null, value: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  steps.push({ type: 'info', description: `Deleting ${value} from BST`, indices: [] });
  // Simplified for illustration
  return steps;
}

export function bstSearchSteps(root: TreeNode | null, target: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  steps.push({ type: 'info', description: `Searching for ${target} in BST`, indices: [] });
  let current = root;
  while (current) {
    steps.push({ type: 'compare', description: `Comparing ${target} with ${current.value}`, nodeIds: [current.id] });
    if (target === current.value) {
      steps.push({ type: 'success', description: `Found ${target}!`, nodeIds: [current.id] });
      return steps;
    }
    if (target < current.value) {
      steps.push({ type: 'highlight', description: `${target} < ${current.value}, going left`, nodeIds: [current.id], extra: { direction: 'left' } });
      current = current.left || null;
    } else {
      steps.push({ type: 'highlight', description: `${target} > ${current.value}, going right`, nodeIds: [current.id], extra: { direction: 'right' } });
      current = current.right || null;
    }
  }
  steps.push({ type: 'error', description: `${target} not found in BST`, nodeIds: [] });
  return steps;
}

export function bstMinSteps(root: TreeNode | null): AlgoStep[] {
  const steps: AlgoStep[] = [];
  steps.push({ type: 'info', description: `Finding minimum value`, indices: [] });
  let current = root;
  while (current) {
    steps.push({ type: 'highlight', description: `At ${current.value}`, nodeIds: [current.id] });
    if (!current.left) {
      steps.push({ type: 'success', description: `No left child. Minimum is ${current.value}`, nodeIds: [current.id] });
      break;
    }
    current = current.left;
  }
  return steps;
}

export function bstMaxSteps(root: TreeNode | null): AlgoStep[] {
  const steps: AlgoStep[] = [];
  steps.push({ type: 'info', description: `Finding maximum value`, indices: [] });
  let current = root;
  while (current) {
    steps.push({ type: 'highlight', description: `At ${current.value}`, nodeIds: [current.id] });
    if (!current.right) {
      steps.push({ type: 'success', description: `No right child. Maximum is ${current.value}`, nodeIds: [current.id] });
      break;
    }
    current = current.right;
  }
  return steps;
}

export function inorderSteps(root: TreeNode | null): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const result: number[] = [];
  
  function traverse(node: TreeNode | null): void {
    if (!node) return;
    steps.push({ type: 'visit', description: `Calling inorder(${node.value}): First go LEFT`, nodeIds: [node.id] });
    traverse(node.left || null);
    steps.push({ type: 'markActive', description: `Visiting ${node.value} (Left done, now process ROOT)`, nodeIds: [node.id], extra: { result: [...result, node.value] } });
    result.push(node.value);
    steps.push({ type: 'visit', description: `Now go RIGHT from ${node.value}`, nodeIds: [node.id] });
    traverse(node.right || null);
    steps.push({ type: 'info', description: `Done with subtree rooted at ${node.value}`, nodeIds: [node.id] });
  }
  
  steps.push({ type: 'info', description: 'Inorder traversal: Left → Root → Right (gives sorted output for BST)', indices: [] });
  traverse(root);
  steps.push({ type: 'info', description: `Inorder result: [${result.join(', ')}]`, indices: [], extra: { result } });
  return steps;
}

export function preorderSteps(root: TreeNode | null): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const result: number[] = [];
  function traverse(node: TreeNode | null): void {
    if (!node) return;
    steps.push({ type: 'markActive', description: `Visiting ${node.value} (Process ROOT first)`, nodeIds: [node.id], extra: { result: [...result, node.value] } });
    result.push(node.value);
    steps.push({ type: 'visit', description: `Calling preorder(${node.value}): Now go LEFT`, nodeIds: [node.id] });
    traverse(node.left || null);
    steps.push({ type: 'visit', description: `Calling preorder(${node.value}): Now go RIGHT`, nodeIds: [node.id] });
    traverse(node.right || null);
  }
  steps.push({ type: 'info', description: 'Preorder traversal: Root → Left → Right', indices: [] });
  traverse(root);
  return steps;
}

export function postorderSteps(root: TreeNode | null): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const result: number[] = [];
  function traverse(node: TreeNode | null): void {
    if (!node) return;
    steps.push({ type: 'visit', description: `Calling postorder(${node.value}): First go LEFT`, nodeIds: [node.id] });
    traverse(node.left || null);
    steps.push({ type: 'visit', description: `Calling postorder(${node.value}): Now go RIGHT`, nodeIds: [node.id] });
    traverse(node.right || null);
    steps.push({ type: 'markActive', description: `Visiting ${node.value} (Left and Right done, process ROOT)`, nodeIds: [node.id], extra: { result: [...result, node.value] } });
    result.push(node.value);
  }
  steps.push({ type: 'info', description: 'Postorder traversal: Left → Right → Root', indices: [] });
  traverse(root);
  return steps;
}

export function levelOrderSteps(root: TreeNode | null): AlgoStep[] {
  const steps: AlgoStep[] = [];
  if (!root) return steps;
  const queue = [root];
  const result: number[] = [];
  steps.push({ type: 'info', description: 'Level Order traversal using a Queue', indices: [] });
  
  while (queue.length > 0) {
    const node = queue.shift()!;
    steps.push({ type: 'markActive', description: `Visiting ${node.value} from queue`, nodeIds: [node.id], extra: { result: [...result, node.value] } });
    result.push(node.value);
    if (node.left) {
      queue.push(node.left);
      steps.push({ type: 'visit', description: `Enqueuing left child ${node.left.value}`, nodeIds: [node.left.id] });
    }
    if (node.right) {
      queue.push(node.right);
      steps.push({ type: 'visit', description: `Enqueuing right child ${node.right.value}`, nodeIds: [node.right.id] });
    }
  }
  return steps;
}

export function avlInsertSteps(root: TreeNode | null, value: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  steps.push({ type: 'info', description: `Inserting ${value} into AVL Tree`, indices: [] });
  // Simplified for illustration, AVL rotation steps would be here
  return steps;
}
