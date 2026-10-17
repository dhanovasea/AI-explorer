import React from 'react';
import { useLearning } from '../context/LearningContext';
import { Sparkles, BookOpen, Award, HelpCircle, Rocket } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { profile, activeView, setActiveView, setOpenGlossary, setOpenAbout } = useLearning();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveView('dashboard')}
          className="group flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-white transition hover:text-cyan-400 whitespace-nowrap shrink-0"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-display">Generative AI Explorer</span>
        </button>

        {/* Zone 2: concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400 ${
              activeView === 'dashboard' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('module-1')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400 ${
              activeView.startsWith('module') ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Modul Belajar
          </button>
          <button
            onClick={() => setActiveView('pbl')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400 ${
              activeView === 'pbl' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            <Rocket className="h-3.5 w-3.5 text-cyan-400" />
            <span>Aktivitas PBL</span>
          </button>
          <button
            onClick={() => setOpenGlossary(true)}
            className="flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Glosarium</span>
          </button>
          <button
            onClick={() => setOpenAbout(true)}
            className="flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-cyan-400"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Tentang</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action / student status */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200">
            <Award className="h-4 w-4 text-cyan-400" />
            <span className="font-semibold text-cyan-300 tabular-nums">{profile.xp} XP</span>
            <span className="text-slate-600">·</span>
            <span className="hidden sm:inline text-slate-400 max-w-[120px] truncate">{profile.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
