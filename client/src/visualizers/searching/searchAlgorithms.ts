import { AlgoStep } from '../../engine/types';

export function linearSearchSteps(arr: number[], target: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const n = arr.length;

  steps.push({ type: 'info', description: `Starting Linear Search for ${target}`, indices: [] });

  for (let i = 0; i < n; i++) {
    steps.push({
      type: 'compare',
      description: `Comparing a[${i}]=${arr[i]} with target ${target}`,
      indices: [i]
    });
    
    if (arr[i] === target) {
      steps.push({
        type: 'markSorted',
        description: `Found target ${target} at index ${i}`,
        indices: [i],
        extra: { found: true, target }
      });
      return steps;
    }
  }

  steps.push({
    type: 'error',
    description: `Target ${target} not found in array`,
    indices: [],
    extra: { found: false, target }
  });
  return steps;
}

export function binarySearchSteps(arr: number[], target: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  let left = 0;
  let right = arr.length - 1;
  const eliminated: number[] = [];

  steps.push({ type: 'info', description: `Starting Binary Search for ${target}`, indices: [] });

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    steps.push({
      type: 'info',
      description: `Search range [${left}...${right}], mid is ${mid}`,
      indices: [left, right, mid],
      extra: { left, right, mid, searchRange: [left, right], eliminated: [...eliminated] }
    });

    steps.push({
      type: 'compare',
      description: `Comparing a[${mid}]=${arr[mid]} with target ${target}`,
      indices: [mid],
      extra: { left, right, mid, searchRange: [left, right], eliminated: [...eliminated] }
    });

    if (arr[mid] === target) {
      steps.push({
        type: 'markSorted',
        description: `Found target ${target} at index ${mid}`,
        indices: [mid],
        extra: { left, right, mid, found: true, target, eliminated: [...eliminated] }
      });
      return steps;
    }

    if (arr[mid] < target) {
      for(let i=left; i<=mid; i++) eliminated.push(i);
      left = mid + 1;
    } else {
      for(let i=mid; i<=right; i++) eliminated.push(i);
      right = mid - 1;
    }
  }

  steps.push({
    type: 'error',
    description: `Target ${target} not found in array`,
    indices: [],
    extra: { found: false, target, eliminated: [...eliminated] }
  });
  return steps;
}

export function jumpSearchSteps(arr: number[], target: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const n = arr.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;
  const eliminated: number[] = [];

  steps.push({ type: 'info', description: `Starting Jump Search for ${target} with jump size ${step}`, indices: [] });

  while (arr[Math.min(step, n) - 1] < target) {
    steps.push({
      type: 'compare',
      description: `Comparing a[${Math.min(step, n) - 1}]=${arr[Math.min(step, n) - 1]} with target ${target}`,
      indices: [Math.min(step, n) - 1],
      extra: { left: prev, right: step, eliminated: [...eliminated] }
    });
    
    for (let i = prev; i < Math.min(step, n); i++) eliminated.push(i);
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) {
      steps.push({ type: 'error', description: `Target ${target} not found`, indices: [], extra: { found: false, target, eliminated: [...eliminated] } });
      return steps;
    }
  }

  steps.push({
    type: 'compare',
    description: `Target is within block [${prev}...${Math.min(step, n) - 1}]`,
    indices: [Math.min(step, n) - 1],
    extra: { left: prev, right: Math.min(step, n) - 1, eliminated: [...eliminated] }
  });

  while (arr[prev] < target) {
    steps.push({
      type: 'compare',
      description: `Linear search within block: a[${prev}]=${arr[prev]} vs ${target}`,
      indices: [prev],
      extra: { left: prev, eliminated: [...eliminated] }
    });
    eliminated.push(prev);
    prev++;
    if (prev === Math.min(step, n)) {
      steps.push({ type: 'error', description: `Target ${target} not found`, indices: [], extra: { found: false, target, eliminated: [...eliminated] } });
      return steps;
    }
  }

  steps.push({
    type: 'compare',
    description: `Comparing a[${prev}]=${arr[prev]} with target ${target}`,
    indices: [prev],
    extra: { left: prev, eliminated: [...eliminated] }
  });

  if (arr[prev] === target) {
    steps.push({ type: 'markSorted', description: `Found target ${target} at index ${prev}`, indices: [prev], extra: { found: true, target, eliminated: [...eliminated] } });
  } else {
    steps.push({ type: 'error', description: `Target ${target} not found`, indices: [], extra: { found: false, target, eliminated: [...eliminated] } });
  }

  return steps;
}

export function interpolationSearchSteps(arr: number[], target: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  let low = 0;
  let high = arr.length - 1;
  const eliminated: number[] = [];

  steps.push({ type: 'info', description: `Starting Interpolation Search for ${target}`, indices: [] });

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low === high) {
      steps.push({ type: 'compare', description: `Checking low==high a[${low}]`, indices: [low], extra: { left: low, right: high, eliminated: [...eliminated] } });
      if (arr[low] === target) {
        steps.push({ type: 'markSorted', description: `Found target at ${low}`, indices: [low], extra: { found: true, target, eliminated: [...eliminated] } });
      } else {
        steps.push({ type: 'error', description: `Target not found`, indices: [], extra: { found: false, target, eliminated: [...eliminated] } });
      }
      return steps;
    }

    let pos = low + Math.floor(((high - low) / (arr[high] - arr[low])) * (target - arr[low]));
    
    steps.push({
      type: 'info',
      description: `Calculated probe pos ${pos}`,
      indices: [low, high, pos],
      extra: { left: low, right: high, mid: pos, searchRange: [low, high], eliminated: [...eliminated] }
    });

    steps.push({
      type: 'compare',
      description: `Comparing a[${pos}]=${arr[pos]} with ${target}`,
      indices: [pos],
      extra: { left: low, right: high, mid: pos, searchRange: [low, high], eliminated: [...eliminated] }
    });

    if (arr[pos] === target) {
      steps.push({ type: 'markSorted', description: `Found target at ${pos}`, indices: [pos], extra: { found: true, target, eliminated: [...eliminated] } });
      return steps;
    }

    if (arr[pos] < target) {
      for(let i=low; i<=pos; i++) eliminated.push(i);
      low = pos + 1;
    } else {
      for(let i=pos; i<=high; i++) eliminated.push(i);
      high = pos - 1;
    }
  }

  steps.push({ type: 'error', description: `Target not found`, indices: [], extra: { found: false, target, eliminated: [...eliminated] } });
  return steps;
}

export function exponentialSearchSteps(arr: number[], target: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const n = arr.length;
  
  if (n === 0) return steps;
  
  steps.push({ type: 'compare', description: `Checking first element`, indices: [0] });
  if (arr[0] === target) {
    steps.push({ type: 'markSorted', description: `Found at index 0`, indices: [0], extra: { found: true } });
    return steps;
  }

  let i = 1;
  const eliminated: number[] = [0];
  
  while (i < n && arr[i] <= target) {
    steps.push({ type: 'compare', description: `Checking i=${i}, a[${i}]=${arr[i]}`, indices: [i], extra: { eliminated: [...eliminated] } });
    if (arr[i] === target) {
      steps.push({ type: 'markSorted', description: `Found at index ${i}`, indices: [i], extra: { found: true, eliminated: [...eliminated] } });
      return steps;
    }
    for(let j=i/2; j<=i; j++) if(j!==i) eliminated.push(Math.floor(j));
    i = i * 2;
  }

  let right = Math.min(i, n - 1);
  let left = Math.floor(i / 2);
  steps.push({ type: 'info', description: `Performing binary search in range [${left}...${right}]`, indices: [left, right], extra: { left, right, eliminated: [...eliminated] } });

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    steps.push({ type: 'compare', description: `Comparing mid a[${mid}]=${arr[mid]}`, indices: [mid], extra: { left, right, mid, eliminated: [...eliminated] } });
    
    if (arr[mid] === target) {
      steps.push({ type: 'markSorted', description: `Found at index ${mid}`, indices: [mid], extra: { found: true, target, eliminated: [...eliminated] } });
      return steps;
    }
    if (arr[mid] < target) {
      for(let k=left; k<=mid; k++) eliminated.push(k);
      left = mid + 1;
    } else {
      for(let k=mid; k<=right; k++) eliminated.push(k);
      right = mid - 1;
    }
  }

  steps.push({ type: 'error', description: `Target not found`, indices: [], extra: { found: false, target, eliminated: [...eliminated] } });
  return steps;
}

export function ternarySearchSteps(arr: number[], target: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  let l = 0, r = arr.length - 1;
  const eliminated: number[] = [];

  steps.push({ type: 'info', description: `Starting Ternary Search for ${target}`, indices: [] });

  while (r >= l) {
    let mid1 = l + Math.floor((r - l) / 3);
    let mid2 = r - Math.floor((r - l) / 3);

    steps.push({
      type: 'info',
      description: `Search range [${l}...${r}], mid1=${mid1}, mid2=${mid2}`,
      indices: [l, r, mid1, mid2],
      extra: { left: l, right: r, eliminated: [...eliminated] }
    });

    steps.push({ type: 'compare', description: `Comparing a[${mid1}]=${arr[mid1]} with target`, indices: [mid1], extra: { left: l, right: r, eliminated: [...eliminated] } });
    if (arr[mid1] === target) {
      steps.push({ type: 'markSorted', description: `Found target at ${mid1}`, indices: [mid1], extra: { found: true, target, eliminated: [...eliminated] } });
      return steps;
    }

    steps.push({ type: 'compare', description: `Comparing a[${mid2}]=${arr[mid2]} with target`, indices: [mid2], extra: { left: l, right: r, eliminated: [...eliminated] } });
    if (arr[mid2] === target) {
      steps.push({ type: 'markSorted', description: `Found target at ${mid2}`, indices: [mid2], extra: { found: true, target, eliminated: [...eliminated] } });
      return steps;
    }

    if (target < arr[mid1]) {
      for(let i=mid1; i<=r; i++) eliminated.push(i);
      r = mid1 - 1;
    } else if (target > arr[mid2]) {
      for(let i=l; i<=mid2; i++) eliminated.push(i);
      l = mid2 + 1;
    } else {
      for(let i=l; i<=mid1; i++) eliminated.push(i);
      for(let i=mid2; i<=r; i++) eliminated.push(i);
      l = mid1 + 1;
      r = mid2 - 1;
    }
  }

  steps.push({ type: 'error', description: `Target not found`, indices: [], extra: { found: false, target, eliminated: [...eliminated] } });
  return steps;
}
