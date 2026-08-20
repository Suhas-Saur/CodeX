import { useEffect } from 'react';

export function useKeyboardShortcut(
  keys: string[],
  callback: (e: KeyboardEvent) => void,
  deps: any[] = []
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const matchesCtrl = keys.includes('ctrl') ? e.ctrlKey || e.metaKey : true;
      const matchesShift = keys.includes('shift') ? e.shiftKey : true;
      const matchesKey = keys.filter(k => !['ctrl', 'shift', 'meta', 'alt'].includes(k))
        .every(k => e.key.toLowerCase() === k.toLowerCase());
      if (matchesCtrl && matchesShift && matchesKey) {
        e.preventDefault();
        callback(e);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback, ...deps]);
}
