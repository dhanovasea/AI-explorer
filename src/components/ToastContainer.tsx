import React from 'react';
import { useLearning } from '../context/LearningContext';
import { Sparkles, X, Flame } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useLearning();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 rounded-xl border border-cyan-500/40 bg-slate-900/95 p-3.5 shadow-2xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
              {toast.xp ? <Flame className="h-4 w-4 text-amber-400" /> : <Sparkles className="h-4 w-4" />}
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-white leading-tight">
                {toast.text}
              </p>
              {toast.xp && (
                <span className="text-[11px] font-bold text-amber-400">
                  +{toast.xp} XP Didapatkan!
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
