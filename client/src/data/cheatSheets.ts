export interface CheatSheetEntry {
  id: string;
  title: string;
  category: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stable?: boolean;
  inPlace?: boolean;
  keyIdea: string;
  useCase: string;
  codeTemplate: string;
  tags: string[];
}

export const CHEAT_SHEET_DATA: CheatSheetEntry[] = [
  {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    category: 'Sorting',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n^2)',
      worst: 'O(n^2)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    keyIdea: 'Repeatedly swap adjacent elements that are out of order.',
    useCase: 'Educational purposes, or when the list is almost sorted.',
    codeTemplate: 'function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}',
    tags: ['sorting', 'easy', 'comparison']
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    category: 'Searching',
    description: 'A search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)'
    },
    spaceComplexity: 'O(1)',
    keyIdea: 'Divide and conquer on a sorted array.',
    useCase: 'Finding an element in a sorted collection.',
    codeTemplate: 'function binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}',
    tags: ['searching', 'divide-and-conquer']
  }
];
