import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface AlgoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  complexity?: string;
  color?: 'cyan' | 'purple' | 'green' | 'yellow' | 'red' | 'orange';
  tags?: string[];
  badge?: string;
}

const COLOR_MAP = {
  cyan: { border: 'hover:border-cyan-500/40', icon: 'text-cyan-400', bg: 'bg-cyan-500/10', glow: 'hover:shadow-cyan-500/10' },
  purple: { border: 'hover:border-purple-500/40', icon: 'text-purple-400', bg: 'bg-purple-500/10', glow: 'hover:shadow-purple-500/10' },
  green: { border: 'hover:border-emerald-500/40', icon: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'hover:shadow-emerald-500/10' },
  yellow: { border: 'hover:border-yellow-500/40', icon: 'text-yellow-400', bg: 'bg-yellow-500/10', glow: 'hover:shadow-yellow-500/10' },
  red: { border: 'hover:border-red-500/40', icon: 'text-red-400', bg: 'bg-red-500/10', glow: 'hover:shadow-red-500/10' },
  orange: { border: 'hover:border-orange-500/40', icon: 'text-orange-400', bg: 'bg-orange-500/10', glow: 'hover:shadow-orange-500/10' },
};

export function AlgoCard({ title, description, icon, path, complexity, color = 'cyan', tags, badge }: AlgoCardProps) {
  const c = COLOR_MAP[color];
  return (
    <Link
      to={path}
      className={`group relative flex flex-col bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] ${c.border} rounded-2xl p-5 transition-all duration-300 hover:bg-white/[0.05] hover:shadow-xl ${c.glow} cursor-pointer`}
    >
      {badge && (
        <div className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
          {badge}
        </div>
      )}
      <div className={`w-11 h-11 rounded-xl ${c.bg} border border-white/[0.06] flex items-center justify-center mb-4 ${c.icon} transition-transform duration-300 group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="font-semibold text-slate-200 mb-1.5 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed flex-1">{description}</p>
      {tags && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tags.map(t => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400">{t}</span>
          ))}
        </div>
      )}
      {complexity && (
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-500">Avg: <span className="font-mono text-emerald-400">{complexity}</span></span>
          <ArrowRight size={14} className="text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
        </div>
      )}
    </Link>
  );
}
