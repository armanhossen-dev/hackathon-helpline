import React, { useState, useEffect } from 'react';
import { DEFAULT_SURVIVAL_TASKS } from '../data/survivalTasks';
import { SurvivalTask } from '../types';
import { Terminal, CheckSquare, Square, Plus, Trash2, RotateCcw, Clock } from 'lucide-react';

export const SurvivalMode: React.FC = () => {
  // Load tasks from localStorage or fallback
  const [tasks, setTasks] = useState<SurvivalTask[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hackathon_survival_tasks');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return DEFAULT_SURVIVAL_TASKS;
  });

  // Countdown timer state in seconds (default 24h = 86400s)
  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hackathon_countdown_seconds');
      if (saved) return parseInt(saved, 10);
    }
    return 24 * 3600;
  });

  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [newTaskInput, setNewTaskInput] = useState<string>('');

  // Persist tasks in localStorage
  useEffect(() => {
    localStorage.setItem('hackathon_survival_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Persist countdown
  useEffect(() => {
    localStorage.setItem('hackathon_countdown_seconds', secondsLeft.toString());
  }, [secondsLeft]);

  // Tick countdown timer
  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  // Format seconds to HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle task completion
  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Add custom task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    const newTask: SurvivalTask = {
      id: `custom-${Date.now()}`,
      label: newTaskInput.trim(),
      phase: 'Core Build',
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setNewTaskInput('');
  };

  // Remove task
  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Reset tasks to default
  const handleResetTasks = () => {
    setTasks(DEFAULT_SURVIVAL_TASKS);
  };

  // Calculate completion percentage
  const completedCount = tasks.filter((t) => t.completed).length;
  const percentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Build terminal ASCII progress bar
  const totalBlocks = 20;
  const filledBlocks = Math.round((percentage / 100) * totalBlocks);
  const progressBarAscii = '█'.repeat(filledBlocks) + '░'.repeat(totalBlocks - filledBlocks);

  // Determine status label
  const getStatusLabel = () => {
    if (percentage === 100) return 'STATUS: MISSION ACCOMPLISHED. READY TO WIN.';
    if (percentage >= 70) return 'STATUS: SHIP IT. CODE FREEZE IMMINENT.';
    if (percentage >= 40) return 'STATUS: IN THE TRENCHES. KEEP CODING.';
    return 'STATUS: COMMENCING SPRINT.';
  };

  return (
    <section id="survival-mode" className="py-16 sm:py-20 border-b border-gray-200 dark:border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>TERMINAL_HUD // SURVIVAL_MODE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight mb-3">
            Hackathon Survival HUD
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl font-sans">
            Real-time deadline countdown, submission milestone tracker, and checklist with instant localStorage memory.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-3xl border border-gray-800 dark:border-white/15 bg-[#070b12] text-white shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,255,102,0.1)] overflow-hidden font-mono">
          {/* Mac Terminal Top Bar */}
          <div className="px-4 py-3 bg-[#0e1422] border-b border-white/10 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-gray-300 font-mono text-[11px] hidden sm:inline">
                hacker@hackathon-rig: ~ (zsh)
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-emerald-400 font-semibold">● LIVE</span>
              <span>|</span>
              <button
                onClick={handleResetTasks}
                className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
                title="Reset tasks to default template"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Command Header */}
            <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-2 pb-3 border-b border-white/10">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-gray-200">hackathon --status --countdown</span>
            </div>

            {/* Countdown & ASCII Progress Bar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-2xl bg-white/5 border border-white/10">
              {/* Countdown Timer */}
              <div>
                <span className="text-[11px] text-gray-400 uppercase tracking-widest block mb-1">
                  TIME REMAINING UNTIL DEADLINE:
                </span>
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-emerald-400 font-mono text-glow-green mb-3">
                  {formatTime(secondsLeft)}
                </div>

                {/* Preset Controls including 6h */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-gray-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    Set:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSecondsLeft(6 * 3600)}
                    className={`px-2 py-0.5 rounded font-mono transition-all ${
                      secondsLeft === 6 * 3600
                        ? 'bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(0,255,102,0.4)]'
                        : 'bg-white/10 hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    6h
                  </button>
                  <button
                    type="button"
                    onClick={() => setSecondsLeft(12 * 3600)}
                    className={`px-2 py-0.5 rounded font-mono transition-all ${
                      secondsLeft === 12 * 3600
                        ? 'bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(0,255,102,0.4)]'
                        : 'bg-white/10 hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    12h
                  </button>
                  <button
                    type="button"
                    onClick={() => setSecondsLeft(24 * 3600)}
                    className={`px-2 py-0.5 rounded font-mono transition-all ${
                      secondsLeft === 24 * 3600
                        ? 'bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(0,255,102,0.4)]'
                        : 'bg-white/10 hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    24h
                  </button>
                  <button
                    type="button"
                    onClick={() => setSecondsLeft(36 * 3600)}
                    className={`px-2 py-0.5 rounded font-mono transition-all ${
                      secondsLeft === 36 * 3600
                        ? 'bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(0,255,102,0.4)]'
                        : 'bg-white/10 hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    36h
                  </button>
                  <button
                    type="button"
                    onClick={() => setSecondsLeft(48 * 3600)}
                    className={`px-2 py-0.5 rounded font-mono transition-all ${
                      secondsLeft === 48 * 3600
                        ? 'bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(0,255,102,0.4)]'
                        : 'bg-white/10 hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    48h
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsRunning(!isRunning)}
                    className="ml-1 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
                  >
                    {isRunning ? 'Pause' : 'Resume'}
                  </button>
                </div>
              </div>

              {/* Progress Bar & Status */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-gray-400 uppercase tracking-wider mb-1">
                  <span>Sprint Completion:</span>
                  <span className="text-emerald-400 font-bold">{percentage}%</span>
                </div>

                <div className="text-sm sm:text-base font-mono text-emerald-400 break-all mb-2 select-none">
                  {progressBarAscii}
                </div>

                <div className="text-xs text-cyan-400 font-semibold tracking-wide">
                  {getStatusLabel()}
                </div>
              </div>
            </div>

            {/* Checklist Header */}
            <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
              <span className="uppercase tracking-wider font-semibold text-emerald-400">
                CHECKLIST // TODO ({completedCount}/{tasks.length} Completed)
              </span>
              <span className="text-[11px] text-gray-500">
                Click task to toggle [x]
              </span>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                    task.completed
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {task.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-gray-500 group-hover:text-gray-400 flex-shrink-0" />
                    )}
                    <span
                      className={`text-xs sm:text-sm ${
                        task.completed ? 'line-through text-emerald-400/70' : 'text-gray-200'
                      }`}
                    >
                      {task.label}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTask(task.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-400 transition-opacity"
                    title="Delete task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Custom Task Input */}
            <form onSubmit={handleAddTask} className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                placeholder="Add custom hackathon milestone (e.g., configure Stripe test keys)..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,255,102,0.2)]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
