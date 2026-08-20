import { AlgoStep } from '../../engine/types';

export interface DPStep extends AlgoStep {
  extra: {
    table?: (number | string | number[])[][];
    activeCell?: [number, number];
    dependencyCells?: [number, number][];
    formula?: string;
    value?: number;
    result?: any;
    text1?: string;
    text2?: string;
  };
}

export function fibonacciDPSteps(n: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const dp = new Array(n + 1).fill(-1);
  
  steps.push({ type: 'info', description: `Building Fibonacci DP table for n=${n}`, indices: [], extra: { table: [dp.slice()] } });
  
  dp[0] = 0;
  if(n >= 1) dp[1] = 1;
  steps.push({ type: 'fillCell', description: 'Base case: dp[0] = 0, dp[1] = 1', indices: [0, 1], extra: { table: [dp.slice()], activeCell: [0, 1] } });
  
  for (let i = 2; i <= n; i++) {
    steps.push({ 
      type: 'compare', 
      description: `Computing dp[${i}]: Looking at dp[${i-1}]=${dp[i-1]} and dp[${i-2}]=${dp[i-2]}`,
      indices: [i-2, i-1],
      extra: { table: [dp.slice()], activeCell: [0, i], dependencyCells: [[0, i-1], [0, i-2]], formula: `dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]}` }
    });
    dp[i] = dp[i-1] + dp[i-2];
    steps.push({
      type: 'fillCell',
      description: `dp[${i}] = ${dp[i]}`,
      indices: [i],
      extra: { table: [dp.slice()], activeCell: [0, i], value: dp[i] }
    });
  }
  
  steps.push({ type: 'found', description: `Fibonacci(${n}) = ${dp[n]}`, indices: [n], extra: { table: [dp.slice()], result: dp[n] } });
  return steps;
}

export function knapsackSteps(weights: number[], values: number[], capacity: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const n = weights.length;
  const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(-1));
  
  for (let i = 0; i <= n; i++) dp[i][0] = 0;
  for (let w = 0; w <= capacity; w++) dp[0][w] = 0;
  
  steps.push({ type: 'info', description: `Initializing Knapsack DP table. Base cases filled.`, indices: [], extra: { table: dp.map(r => r.slice()) } });
  
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        steps.push({
          type: 'compare',
          description: `Item ${i} fits. Max of including or excluding.`,
          indices: [],
          extra: { table: dp.map(r => r.slice()), activeCell: [i, w], dependencyCells: [[i - 1, w], [i - 1, w - weights[i - 1]]], formula: `max(dp[${i-1}][${w}], dp[${i-1}][${w - weights[i-1]}] + ${values[i-1]})` }
        });
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
      } else {
        steps.push({
          type: 'compare',
          description: `Item ${i} too heavy. Excluding.`,
          indices: [],
          extra: { table: dp.map(r => r.slice()), activeCell: [i, w], dependencyCells: [[i - 1, w]], formula: `dp[${i-1}][${w}]` }
        });
        dp[i][w] = dp[i - 1][w];
      }
      steps.push({ type: 'fillCell', description: `dp[${i}][${w}] = ${dp[i][w]}`, indices: [], extra: { table: dp.map(r => r.slice()), activeCell: [i, w] } });
    }
  }
  return steps;
}

export function coinChangeSteps(coins: number[], amount: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  steps.push({ type: 'info', description: `Coin Change for amount ${amount}`, indices: [], extra: { table: [dp.slice().map(v => v === Infinity ? '∞' : v)] } });
  
  for (let i = 1; i <= amount; i++) {
    for (let c of coins) {
      if (i - c >= 0) {
        steps.push({
          type: 'compare',
          description: `Amount ${i}: trying coin ${c}`,
          indices: [i - c],
          extra: { table: [dp.slice().map(v => v === Infinity ? '∞' : v)], activeCell: [0, i], dependencyCells: [[0, i - c]], formula: `min(dp[${i}], dp[${i-c}] + 1)` }
        });
        dp[i] = Math.min(dp[i], dp[i - c] + 1);
      }
    }
    steps.push({ type: 'fillCell', description: `dp[${i}] = ${dp[i] === Infinity ? '∞' : dp[i]}`, indices: [i], extra: { table: [dp.slice().map(v => v === Infinity ? '∞' : v)], activeCell: [0, i] } });
  }
  return steps;
}

export function lcsSteps(s1: string, s2: string): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const m = s1.length;
  const n = s2.length;
  const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(-1));
  
  for(let i=0; i<=m; i++) dp[i][0] = 0;
  for(let j=0; j<=n; j++) dp[0][j] = 0;
  
  steps.push({ type: 'info', description: `LCS for "${s1}" and "${s2}"`, indices: [], extra: { table: dp.map(r => r.slice()), text1: s1, text2: s2 } });
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        steps.push({
          type: 'compare',
          description: `Match: '${s1[i-1]}' == '${s2[j-1]}'`,
          indices: [],
          extra: { table: dp.map(r => r.slice()), activeCell: [i, j], dependencyCells: [[i-1, j-1]], formula: `dp[${i-1}][${j-1}] + 1`, text1: s1, text2: s2 }
        });
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        steps.push({
          type: 'compare',
          description: `Mismatch: '${s1[i-1]}' != '${s2[j-1]}'`,
          indices: [],
          extra: { table: dp.map(r => r.slice()), activeCell: [i, j], dependencyCells: [[i-1, j], [i, j-1]], formula: `max(dp[${i-1}][${j}], dp[${i}][${j-1}])`, text1: s1, text2: s2 }
        });
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
      steps.push({
        type: 'fillCell',
        description: `dp[${i}][${j}] = ${dp[i][j]}`,
        indices: [],
        extra: { table: dp.map(r => r.slice()), activeCell: [i, j], text1: s1, text2: s2 }
      });
    }
  }
  return steps;
}

export function lisSteps(arr: number[]): AlgoStep[] {
  return []; // Placeholder
}

export function climbingStairsSteps(n: number): AlgoStep[] {
  return fibonacciDPSteps(n); // Similar structure
}
