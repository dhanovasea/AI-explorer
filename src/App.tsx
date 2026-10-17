import React from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Module1Intro } from './components/modules/Module1Intro';
import { Module2Types } from './components/modules/Module2Types';
import { Module3InsideAI } from './components/modules/Module3InsideAI';
import { Module4PromptLab } from './components/modules/Module4PromptLab';
import { Module5Ethics } from './components/modules/Module5Ethics';
import { Module6Quiz } from './components/modules/Module6Quiz';
import { GlossaryModal } from './components/GlossaryModal';
import { AboutModal } from './components/AboutModal';
import { CertificateModal } from './components/CertificateModal';
import { ToastContainer } from './components/ToastContainer';
import { Sparkles, BookOpen, HelpCircle } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, setOpenGlossary, setOpenAbout } = useLearning();

  const renderCurrentView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'module-1':
        return <Module1Intro />;
      case 'module-2':
        return <Module2Types />;
      case 'module-3':
        return <Module3InsideAI />;
      case 'module-4':
        return <Module4PromptLab />;
      case 'module-5':
        return <Module5Ethics />;
      case 'module-6':
        return <Module6Quiz />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1 pb-16">
        {renderCurrentView()}
      </main>

      {/* Global Modals & Notifications */}
      <GlossaryModal />
      <AboutModal />
      <CertificateModal />
      <ToastContainer />

      {/* Clean Footer adhering to Section 1B Anti-Slop Guidelines */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Generative AI Explorer</span>
            <span aria-hidden="true">·</span>
            <span>Pembelajaran Informatika SMA Kelas 10</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setOpenGlossary(true)}
              className="hover:text-cyan-400 transition"
            >
              Glosarium Istilah
            </button>
            <button
              onClick={() => setOpenAbout(true)}
              className="hover:text-cyan-400 transition"
            >
              Tentang Aplikasi
            </button>
          </div>

          <p className="text-slate-600">
            Didesain untuk eksplorasi teknologi AI yang aman dan bertanggung jawab.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <LearningProvider>
      <MainContent />
    </LearningProvider>
  );
}
