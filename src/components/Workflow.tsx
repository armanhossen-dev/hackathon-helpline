import React, { useState } from 'react';
import { WORKFLOW_STEPS } from '../data/workflow';
import { TOOLS } from '../data/tools';
import { Tool } from '../types';
import { ArrowRight, Lightbulb, ChevronRight, Zap } from 'lucide-react';

interface WorkflowProps {
  onSelectTool: (tool: Tool) => void;
}

export const Workflow: React.FC<WorkflowProps> = ({ onSelectTool }) => {
  const [activeStepId, setActiveStepId] = useState<string>(WORKFLOW_STEPS[0].id);

  const activeStep = WORKFLOW_STEPS.find((s) => s.id === activeStepId) || WORKFLOW_STEPS[0];

  // Lookup full tool objects from recommended IDs
  const recommendedTools = activeStep.recommendedToolIds
    .map((id) => TOOLS.find((t) => t.id === id))
    .filter(Boolean) as Tool[];

  return (
    <section id="workflow" className="py-16 sm:py-20 border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>EXECUTION_PIPELINE // 01 TO 10</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight mb-4">
            Hackathon Sprint Workflow
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 max-w-2xl font-sans">
            How champion builders go from raw idea to prize-winning submission in 48 hours. Click any phase to inspect recommended tools and battle-tested tips.
          </p>
        </div>

        {/* 10-Step Connected Pipeline Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 mb-8">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isActive = step.id === activeStepId;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={`relative flex flex-col items-center p-3 rounded-xl border text-center transition-all duration-200 group ${
                  isActive
                    ? 'border-emerald-500/80 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 font-bold shadow-[0_0_15px_rgba(0,255,102,0.2)]'
                    : 'border-gray-200 dark:border-white/10 bg-white dark:bg-[#101622]/60 text-slate-700 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20 hover:text-slate-950 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 shadow-sm dark:shadow-none'
                }`}
              >
                {/* Step Number */}
                <span className={`font-mono text-xs font-bold mb-1 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}`}>
                  {step.stepNumber}
                </span>
                {/* Step Title */}
                <span className="font-mono text-xs font-semibold uppercase tracking-wider truncate w-full">
                  {step.title}
                </span>

                {/* Arrow connector indicator */}
                {idx < WORKFLOW_STEPS.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-300 dark:text-white/20 z-10 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Showcase Bento */}
        <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-white/15 bg-white dark:bg-[#0d121d] shadow-lg dark:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            {/* Left: Step Details & Pro Tips */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-base">
                  {activeStep.stepNumber}
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                    Phase {activeStep.stepNumber}: {activeStep.title}
                  </h3>
                  <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold">
                    {activeStep.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 dark:text-gray-300 leading-relaxed font-sans">
                {activeStep.description}
              </p>

              {/* Hackathon Pro Tips */}
              <div className="p-4 sm:p-5 rounded-2xl border border-emerald-500/20 bg-emerald-50/70 dark:bg-emerald-950/20">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold mb-3 uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Battle-Tested Hackathon Tips</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-gray-300">
                  {activeStep.keyTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">›</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Recommended Tools for this Step */}
            <div className="w-full lg:w-[420px] flex-shrink-0">
              <div className="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Top Recommended Tools ({recommendedTools.length})</span>
                <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">Click to inspect</span>
              </div>

              <div className="space-y-3">
                {recommendedTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => onSelectTool(tool)}
                    className="p-3.5 rounded-xl border border-gray-200 dark:border-white/10 
                      bg-gray-50 dark:bg-[#131926] 
                      hover:border-emerald-500/50 hover:bg-gray-100 dark:hover:bg-[#182133] transition-all cursor-pointer flex items-center justify-between gap-3 group shadow-sm dark:shadow-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 flex items-center justify-center flex-shrink-0 p-1 shadow-sm dark:shadow-none">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${new URL(tool.url).hostname}&sz=64`}
                          alt={tool.name}
                          className="w-5 h-5 object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {tool.name}
                          </h4>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-gray-200 dark:bg-white/5 text-slate-700 dark:text-gray-400">
                            {tool.pricing}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">
                          {tool.description}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
