import { AlgoStep } from '../../engine/types';

export function kmpSteps(text: string, pattern: string): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const n = text.length, m = pattern.length;
  
  const lps = buildLPS(pattern, steps);
  
  let i = 0, j = 0;
  steps.push({ type: 'info', description: `Searching for pattern "${pattern}" in text "${text}"`, indices: [], extra: { textPointer: 0, patternPointer: 0, lps, text, pattern } });
  
  while (i < n) {
    steps.push({ 
      type: 'compare', 
      description: `Comparing text[${i}]='${text[i]}' with pattern[${j}]='${pattern[j]}'`,
      indices: [i],
      extra: { textPointer: i, patternPointer: j, lps, text, pattern }
    });
    if (text[i] === pattern[j]) {
      steps.push({ type: 'highlight', description: `Match! '${text[i]}' == '${pattern[j]}'. Move both pointers.`, indices: [i], extra: { textPointer: i, patternPointer: j, matched: true, text, pattern } });
      i++; j++;
    }
    if (j === m) {
      steps.push({ type: 'found', description: `Pattern found at index ${i - j}!`, indices: Array.from({length: m}, (_, k) => i - j + k), extra: { foundAt: i - j, textPointer: i, patternPointer: j, text, pattern } });
      j = lps[j - 1];
    } else if (i < n && text[i] !== pattern[j]) {
      if (j > 0) {
        steps.push({ type: 'highlight', description: `Mismatch! Using LPS: j jumps from ${j} to ${lps[j-1]}`, indices: [i], extra: { textPointer: i, patternPointer: j, lpsJump: lps[j-1], text, pattern } });
        j = lps[j - 1];
      } else {
        steps.push({ type: 'compare', description: `Mismatch at text[${i}]. j=0, move text pointer`, indices: [i], extra: { textPointer: i, patternPointer: 0, text, pattern } });
        i++;
      }
    }
  }
  steps.push({ type: 'info', description: 'KMP search complete', indices: [], extra: { lps, text, pattern } });
  return steps;
}

function buildLPS(pattern: string, steps: AlgoStep[]): number[] {
  const m = pattern.length;
  const lps = new Array(m).fill(0);
  let len = 0, i = 1;
  
  steps.push({ type: 'info', description: `Building LPS array for pattern "${pattern}"`, indices: [], extra: { lps: [...lps], isBuildingLps: true, pattern } });
  
  while (i < m) {
    if (pattern[i] === pattern[len]) {
      lps[i] = len + 1; len++; i++;
      steps.push({ type: 'fillCell', description: `lps[${i-1}] = ${lps[i-1]}`, indices: [i-1], extra: { lps: [...lps], isBuildingLps: true, pattern, len, i } });
    } else if (len > 0) {
      steps.push({ type: 'highlight', description: `Mismatch, len=${len}→${lps[len-1]}`, indices: [i], extra: { lps: [...lps], isBuildingLps: true, pattern, len, i } });
      len = lps[len - 1];
    } else {
      lps[i] = 0; i++;
      steps.push({ type: 'fillCell', description: `lps[${i-1}] = 0`, indices: [i-1], extra: { lps: [...lps], isBuildingLps: true, pattern, len, i } });
    }
  }
  return lps;
}

export function rabinKarpSteps(text: string, pattern: string): AlgoStep[] { return []; }
export function zAlgorithmSteps(str: string): AlgoStep[] { return []; }
