import { AlgoStep } from '../../engine/types';

export function bubbleSortSteps(arr: number[]): AlgoStep[] {
  const a = [...arr];
  const steps: AlgoStep[] = [];
  const n = a.length;
  
  steps.push({ type: 'info', description: `Starting Bubble Sort on [${a.join(', ')}]`, indices: [] });
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        type: 'compare',
        description: `Comparing a[${j}]=${a[j]} and a[${j+1}]=${a[j+1]}`,
        indices: [j, j + 1],
        extra: { sorted: Array.from({length: i}, (_, k) => n - 1 - k) }
      });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({
          type: 'swap',
          description: `Swapping: a[${j}]=${a[j+1]} > a[${j+1}]=${a[j]} → swap!`,  
          indices: [j, j + 1],
          extra: { sorted: Array.from({length: i}, (_, k) => n - 1 - k) }
        });
      }
    }
    steps.push({
      type: 'markSorted',
      description: `Element at index ${n - 1 - i} is in its final position`,
      indices: [n - 1 - i],
      extra: { sorted: Array.from({length: i + 1}, (_, k) => n - 1 - k) }
    });
  }
  steps.push({ type: 'markSorted', description: 'Array is fully sorted!', indices: Array.from({length: n}, (_, i) => i), extra: { sorted: Array.from({length: n}, (_, i) => i) } });
  return steps;
}

export function selectionSortSteps(arr: number[]): AlgoStep[] {
  const a = [...arr];
  const steps: AlgoStep[] = [];
  const n = a.length;

  steps.push({ type: 'info', description: `Starting Selection Sort on [${a.join(', ')}]`, indices: [] });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({ type: 'markMin', description: `Current minimum is at index ${i}`, indices: [i], extra: { sorted: Array.from({length: i}, (_, k) => k) } });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        type: 'compare',
        description: `Comparing a[${j}]=${a[j]} with current min a[${minIdx}]=${a[minIdx]}`,
        indices: [j, minIdx],
        extra: { sorted: Array.from({length: i}, (_, k) => k), min: minIdx }
      });
      if (a[j] < a[minIdx]) {
        minIdx = j;
        steps.push({
          type: 'markMin',
          description: `New minimum found at index ${j}`,
          indices: [j],
          extra: { sorted: Array.from({length: i}, (_, k) => k), min: minIdx }
        });
      }
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      steps.push({
        type: 'swap',
        description: `Swapping minimum a[${minIdx}]=${a[minIdx]} with a[${i}]=${a[i]}`,
        indices: [i, minIdx],
        extra: { sorted: Array.from({length: i}, (_, k) => k) }
      });
    }
    steps.push({
      type: 'markSorted',
      description: `Element at index ${i} is in its final position`,
      indices: [i],
      extra: { sorted: Array.from({length: i + 1}, (_, k) => k) }
    });
  }
  steps.push({ type: 'markSorted', description: 'Array is fully sorted!', indices: Array.from({length: n}, (_, i) => i), extra: { sorted: Array.from({length: n}, (_, i) => i) } });
  return steps;
}

export function insertionSortSteps(arr: number[]): AlgoStep[] {
  const a = [...arr];
  const steps: AlgoStep[] = [];
  const n = a.length;

  steps.push({ type: 'info', description: `Starting Insertion Sort`, indices: [] });
  steps.push({ type: 'markSorted', description: `First element is trivially sorted`, indices: [0], extra: { sorted: [0] } });

  for (let i = 1; i < n; i++) {
    let key = a[i];
    let j = i - 1;
    steps.push({ type: 'markActive', description: `Inserting ${key} into sorted portion`, indices: [i], extra: { sorted: Array.from({length: i}, (_, k) => k) } });

    while (j >= 0) {
      steps.push({
        type: 'compare',
        description: `Comparing key ${key} with a[${j}]=${a[j]}`,
        indices: [j, j + 1],
        extra: { sorted: Array.from({length: i}, (_, k) => k) }
      });
      
      if (a[j] > key) {
        a[j + 1] = a[j];
        steps.push({
          type: 'swap',
          description: `Moving ${a[j]} to the right`,
          indices: [j, j + 1],
          extra: { sorted: Array.from({length: i}, (_, k) => k) }
        });
        j--;
      } else {
        break;
      }
    }
    a[j + 1] = key;
    steps.push({
      type: 'markSorted',
      description: `Inserted ${key} at index ${j + 1}`,
      indices: [j + 1],
      extra: { sorted: Array.from({length: i + 1}, (_, k) => k) }
    });
  }
  steps.push({ type: 'markSorted', description: 'Array is fully sorted!', indices: Array.from({length: n}, (_, i) => i), extra: { sorted: Array.from({length: n}, (_, i) => i) } });
  return steps;
}

export function mergeSortSteps(arr: number[]): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const a = [...arr];

  function merge(left: number, mid: number, right: number) {
    let n1 = mid - left + 1;
    let n2 = right - mid;
    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = a[left + i];
    for (let j = 0; j < n2; j++) R[j] = a[mid + 1 + j];

    let i = 0;
    let j = 0;
    let k = left;

    steps.push({ type: 'info', description: `Merging subarrays [${left}...${mid}] and [${mid+1}...${right}]`, indices: Array.from({length: right - left + 1}, (_, idx) => left + idx) });

    while (i < n1 && j < n2) {
      steps.push({
        type: 'compare',
        description: `Comparing L[${i}]=${L[i]} and R[${j}]=${R[j]}`,
        indices: [left + i, mid + 1 + j]
      });

      if (L[i] <= R[j]) {
        a[k] = L[i];
        steps.push({ type: 'swap', description: `Placing ${L[i]} at index ${k}`, indices: [k] });
        i++;
      } else {
        a[k] = R[j];
        steps.push({ type: 'swap', description: `Placing ${R[j]} at index ${k}`, indices: [k] });
        j++;
      }
      k++;
    }

    while (i < n1) {
      a[k] = L[i];
      steps.push({ type: 'swap', description: `Placing remaining ${L[i]} at index ${k}`, indices: [k] });
      i++;
      k++;
    }

    while (j < n2) {
      a[k] = R[j];
      steps.push({ type: 'swap', description: `Placing remaining ${R[j]} at index ${k}`, indices: [k] });
      j++;
      k++;
    }
    
    steps.push({
      type: 'markSorted',
      description: `Merged [${left}...${right}]`,
      indices: Array.from({length: right - left + 1}, (_, idx) => left + idx)
    });
  }

  function mergeSort(left: number, right: number) {
    if (left >= right) return;
    let mid = left + Math.floor((right - left) / 2);
    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
  }

  steps.push({ type: 'info', description: `Starting Merge Sort`, indices: [] });
  mergeSort(0, a.length - 1);
  steps.push({ type: 'markSorted', description: 'Array is fully sorted!', indices: Array.from({length: arr.length}, (_, i) => i) });
  
  return steps;
}

export function quickSortSteps(arr: number[]): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const a = [...arr];

  function partition(low: number, high: number): number {
    let pivot = a[high];
    steps.push({ type: 'setPivot', description: `Setting pivot to ${pivot} at index ${high}`, indices: [high], extra: { pivot: high } });
    
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
      steps.push({
        type: 'compare',
        description: `Comparing a[${j}]=${a[j]} with pivot ${pivot}`,
        indices: [j, high],
        extra: { pivot: high }
      });
      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({
          type: 'swap',
          description: `Swapping a[${i}] and a[${j}]`,
          indices: [i, j],
          extra: { pivot: high }
        });
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    steps.push({
      type: 'swap',
      description: `Placing pivot ${pivot} at correct position ${i + 1}`,
      indices: [i + 1, high],
      extra: { pivot: i + 1 }
    });
    return (i + 1);
  }

  function quickSort(low: number, high: number) {
    if (low < high) {
      let pi = partition(low, high);
      steps.push({ type: 'markSorted', description: `Pivot ${a[pi]} is in final position`, indices: [pi] });
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    } else if (low === high) {
      steps.push({ type: 'markSorted', description: `Element ${a[low]} is in final position`, indices: [low] });
    }
  }

  steps.push({ type: 'info', description: `Starting Quick Sort`, indices: [] });
  quickSort(0, a.length - 1);
  steps.push({ type: 'markSorted', description: 'Array is fully sorted!', indices: Array.from({length: arr.length}, (_, i) => i) });
  
  return steps;
}

export function heapSortSteps(arr: number[]): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const a = [...arr];
  const n = a.length;

  function heapify(n: number, i: number) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n) {
      steps.push({ type: 'compare', description: `Comparing left child a[${l}]=${a[l]} with largest a[${largest}]=${a[largest]}`, indices: [l, largest] });
      if (a[l] > a[largest]) largest = l;
    }

    if (r < n) {
      steps.push({ type: 'compare', description: `Comparing right child a[${r}]=${a[r]} with largest a[${largest}]=${a[largest]}`, indices: [r, largest] });
      if (a[r] > a[largest]) largest = r;
    }

    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      steps.push({ type: 'swap', description: `Swapping a[${i}] and a[${largest}]`, indices: [i, largest] });
      heapify(n, largest);
    }
  }

  steps.push({ type: 'info', description: `Building max heap`, indices: [] });
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    steps.push({ type: 'swap', description: `Moving current max ${a[i]} to the end`, indices: [0, i] });
    steps.push({ type: 'markSorted', description: `Element ${a[i]} is in final position`, indices: [i] });
    heapify(i, 0);
  }
  
  steps.push({ type: 'markSorted', description: 'Array is fully sorted!', indices: Array.from({length: n}, (_, i) => i) });
  return steps;
}

export function countingSortSteps(arr: number[]): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const a = [...arr];
  const n = a.length;
  
  steps.push({ type: 'info', description: `Starting Counting Sort`, indices: [] });
  if (n === 0) return steps;
  
  let max = a[0];
  for (let i = 1; i < n; i++) {
    if (a[i] > max) max = a[i];
  }
  
  let count = new Array(max + 1).fill(0);
  for (let i = 0; i < n; i++) {
    count[a[i]]++;
    steps.push({ type: 'info', description: `Counting occurrence of ${a[i]}`, indices: [i] });
  }
  
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }
  
  let output = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    output[count[a[i]] - 1] = a[i];
    steps.push({ type: 'info', description: `Placing ${a[i]} at index ${count[a[i]] - 1}`, indices: [i] });
    count[a[i]]--;
  }
  
  for (let i = 0; i < n; i++) {
    a[i] = output[i];
    steps.push({ type: 'swap', description: `Updating original array at index ${i}`, indices: [i] });
  }

  steps.push({ type: 'markSorted', description: 'Array is fully sorted!', indices: Array.from({length: n}, (_, i) => i) });
  return steps;
}

export function shellSortSteps(arr: number[]): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const a = [...arr];
  const n = a.length;

  steps.push({ type: 'info', description: `Starting Shell Sort`, indices: [] });
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    steps.push({ type: 'info', description: `Gap is now ${gap}`, indices: [] });
    for (let i = gap; i < n; i += 1) {
      let temp = a[i];
      let j;
      for (j = i; j >= gap && a[j - gap] > temp; j -= gap) {
        steps.push({ type: 'compare', description: `Comparing a[${j - gap}]=${a[j - gap]} and temp=${temp}`, indices: [j - gap, i] });
        a[j] = a[j - gap];
        steps.push({ type: 'swap', description: `Moving ${a[j - gap]} by gap ${gap}`, indices: [j, j - gap] });
      }
      a[j] = temp;
      steps.push({ type: 'swap', description: `Placing temp ${temp} at index ${j}`, indices: [j] });
    }
  }
  
  steps.push({ type: 'markSorted', description: 'Array is fully sorted!', indices: Array.from({length: n}, (_, i) => i) });
  return steps;
}
