import{j as e}from"./motion-BRbdC9P4.js";import{c as a,P as m}from"./index-BptzmNN9.js";/**
 * @license lucide-react v0.368.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=a("Gauge",[["path",{d:"m12 14 4-4",key:"9kzdfg"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0",key:"19p75a"}]]);/**
 * @license lucide-react v0.368.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=a("Pause",[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]]);/**
 * @license lucide-react v0.368.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=a("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.368.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=a("SkipBack",[["polygon",{points:"19 20 9 12 19 4 19 20",key:"o2sva"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5",key:"1ocqjk"}]]);/**
 * @license lucide-react v0.368.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=a("SkipForward",[["polygon",{points:"5 4 15 12 5 20 5 4",key:"16p6eg"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19",key:"futhcm"}]]),v=[.25,.5,1,1.5,2,3];function N({isPlaying:l,onPlay:n,onPause:d,onStepForward:c,onStepBack:x,onRestart:h,speed:p,onSpeedChange:u,currentStep:o,totalSteps:t,disabled:i}){const r=t>0?(o+1)/t*100:0;return e.jsxs("div",{className:"bg-[#0a0f1e]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4",children:[e.jsxs("div",{className:"mb-4",children:[e.jsxs("div",{className:"flex justify-between text-xs text-slate-500 mb-1.5",children:[e.jsxs("span",{children:["Step ",Math.max(0,o+1)," of ",t]}),e.jsxs("span",{children:[Math.round(r),"%"]})]}),e.jsx("div",{className:"h-1.5 bg-white/[0.08] rounded-full overflow-hidden",children:e.jsx("div",{className:"h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-300",style:{width:`${r}%`}})})]}),e.jsxs("div",{className:"flex items-center justify-center gap-2",children:[e.jsx("button",{onClick:h,disabled:i,className:"p-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] transition-all disabled:opacity-40",title:"Restart",children:e.jsx(j,{size:16})}),e.jsx("button",{onClick:x,disabled:i||o<=-1,className:"p-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] transition-all disabled:opacity-40",title:"Step Back",children:e.jsx(g,{size:16})}),e.jsx("button",{onClick:l?d:n,disabled:i||t===0,className:"p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-400 hover:to-cyan-500 transition-all disabled:opacity-40 shadow-lg shadow-cyan-500/30",title:l?"Pause":"Play",children:l?e.jsx(b,{size:18}):e.jsx(m,{size:18})}),e.jsx("button",{onClick:c,disabled:i||o>=t-1,className:"p-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] transition-all disabled:opacity-40",title:"Step Forward",children:e.jsx(k,{size:16})}),e.jsxs("div",{className:"ml-2 flex items-center gap-1.5",children:[e.jsx(y,{size:14,className:"text-slate-500"}),e.jsx("select",{value:p,onChange:s=>u(Number(s.target.value)),className:"bg-white/[0.06] border border-white/[0.08] rounded-lg px-2 py-1.5 text-xs text-slate-300 outline-none cursor-pointer",children:v.map(s=>e.jsxs("option",{value:s,className:"bg-[#0a0f1e]",children:[s,"x"]},s))})]})]})]})}export{N as A};
