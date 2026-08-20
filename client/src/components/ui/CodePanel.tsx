import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodePanelProps {
  tabs: {
    label: string;
    content: string;
    language?: string;
  }[];
}

export function CodePanel({ tabs }: CodePanelProps) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tabs[active].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#080d1a] border border-white/[0.08] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-2">
        <div className="flex">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActive(i)}
              className={`px-4 py-3 text-xs font-medium transition-all relative
                ${active === i ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {tab.label}
              {active === i && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-all"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="p-4 overflow-x-auto max-h-80">
        <pre className="text-sm text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
          {tabs[active].content}
        </pre>
      </div>
    </div>
  );
}
