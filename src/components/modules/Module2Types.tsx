import React, { useState } from 'react';
import { useLearning } from '../../context/LearningContext';
import { MODULE_2_TYPES } from '../../data/learningContent';
import { AITypeInfo } from '../../types';
import { 
  FileText, 
  Image as ImageIcon, 
  Headphones, 
  Video, 
  Terminal, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  HelpCircle,
  Copy,
  Check,
  Play,
  Volume2
} from 'lucide-react';

const iconComponents: Record<string, React.ReactNode> = {
  FileText: <FileText className="h-5 w-5" />,
  Image: <ImageIcon className="h-5 w-5" />,
  Headphones: <Headphones className="h-5 w-5" />,
  Video: <Video className="h-5 w-5" />,
  Terminal: <Terminal className="h-5 w-5" />
};

export const Module2Types: React.FC = () => {
  const { addXP, completeModule, setActiveView } = useLearning();

  const [activeTab, setActiveTab] = useState<AITypeInfo['id']>('text');
  const [exploredTypes, setExploredTypes] = useState<string[]>(['text']);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  
  // Mini quiz state per category
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizFeedback, setQuizFeedback] = useState<Record<string, boolean>>({});

  const currentType = MODULE_2_TYPES.find((t) => t.id === activeTab) || MODULE_2_TYPES[0];

  const handleTabChange = (typeId: AITypeInfo['id']) => {
    setActiveTab(typeId);
    if (!exploredTypes.includes(typeId)) {
      const updated = [...exploredTypes, typeId];
      setExploredTypes(updated);
      addXP(15, `Mengeksplorasi Tipe AI: ${currentType.title}`);

      if (updated.length === MODULE_2_TYPES.length) {
        completeModule(2);
        addXP(50, 'Hebat! Kamu telah mengeksplorasi seluruh 5 Tipe Generative AI!');
      }
    }
  };

  const handleCopyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleQuizAnswer = (typeId: string, optionIndex: number) => {
    if (quizAnswers[typeId] !== undefined) return;

    setQuizAnswers((prev) => ({ ...prev, [typeId]: optionIndex }));
    setQuizFeedback((prev) => ({ ...prev, [typeId]: true }));

    const isCorrect = optionIndex === currentType.miniQuiz.correctIndex;
    if (isCorrect) {
      addXP(25, `Kuis ${currentType.title} Terjawab Benar!`);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-10">
      {/* Header & Breadcrumb */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <button onClick={() => setActiveView('dashboard')} className="hover:text-cyan-400 transition">
            Dashboard
          </button>
          <span>/</span>
          <span className="text-cyan-400">Modul 2</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Modul 2: Types of Generative AI
            </h1>
            <p className="text-sm text-slate-300">
              Mengenal 5 modalitas konten ciptaan AI dan perannya dalam pembelajaran di sekolah.
            </p>
          </div>
          <div className="text-xs text-slate-400">
            Kemajuan Eksplorasi: <strong className="text-cyan-300">{exploredTypes.length} / 5 Tipe</strong>
          </div>
        </div>
      </div>

      {/* Multimodal Note Banner */}
      <div className="rounded-xl border border-cyan-500/20 bg-slate-900/60 p-4 flex items-start gap-3 text-xs text-slate-300">
        <Sparkles className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-white">Catatan Penting Guru (Konsep Multimodal):</span>
          <p className="text-slate-400 leading-relaxed">
            Kelima kategori ini mengelompokkan AI berdasarkan jenis konten keluarannya. Pada model AI modern seperti Gemini, kemampuannya bersifat <em>multimodal</em>—yaitu dapat memahami dan menghubungkan teks, gambar, audio, dan kode sekaligus dalam satu percakapan!
          </p>
        </div>
      </div>

      {/* 5 Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {MODULE_2_TYPES.map((type) => {
          const isActive = activeTab === type.id;
          const isExplored = exploredTypes.includes(type.id);

          return (
            <button
              key={type.id}
              onClick={() => handleTabChange(type.id)}
              className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                isActive
                  ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300 shadow-md shadow-cyan-950/50'
                  : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className={isActive ? 'text-cyan-400' : 'text-slate-400'}>
                {iconComponents[type.icon]}
              </div>
              <span>{type.title}</span>
              {isExplored && (
                <span className="text-[10px] text-cyan-400">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Type Showcase Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 space-y-8 shadow-xl">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-3 py-1 text-xs text-cyan-300 font-medium">
              <span>{currentType.tagline}</span>
            </div>

            <h2 className="text-2xl font-bold text-white font-display">
              {currentType.title}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              {currentType.description}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-200">
                🏫 Contoh Nyata dalam Pembelajaran SMA:
              </span>
              <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                {currentType.schoolApplication}
              </p>
            </div>
          </div>

          {/* Sample Prompt Box with Copy */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  Contoh Prompt Siswa:
                </span>
                <button
                  onClick={() => handleCopyPrompt(currentType.samplePrompt)}
                  className="flex items-center gap-1 text-[11px] font-medium text-cyan-400 hover:text-cyan-300 transition"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Salin Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <div className="font-mono text-xs text-slate-200 bg-slate-900/90 p-3 rounded-lg border border-slate-800 leading-relaxed">
                "{currentType.samplePrompt}"
              </div>

              <button
                onClick={() => setShowPreviewModal(true)}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Explore Example (Lihat Hasil Simulasi)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mini Quiz Section per Category */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <HelpCircle className="h-4 w-4" />
            <span>Mini Quiz: Uji Pemahaman {currentType.title} (+25 XP)</span>
          </div>

          <p className="text-sm font-medium text-white">
            {currentType.miniQuiz.question}
          </p>

          <div className="space-y-2">
            {currentType.miniQuiz.options.map((option, idx) => {
              const selectedAnswer = quizAnswers[currentType.id];
              const isAnswered = selectedAnswer !== undefined;
              const isSelected = selectedAnswer === idx;
              const isCorrectOption = idx === currentType.miniQuiz.correctIndex;

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleQuizAnswer(currentType.id, idx)}
                  className={`w-full text-left rounded-lg p-3 text-xs font-medium transition flex items-start gap-3 border ${
                    isAnswered
                      ? isCorrectOption
                        ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-200'
                        : isSelected
                        ? 'border-rose-500/50 bg-rose-950/30 text-rose-200'
                        : 'border-slate-800 bg-slate-900/40 text-slate-500'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-cyan-500/50 hover:text-white'
                  }`}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-slate-300">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          {quizFeedback[currentType.id] && (
            <div className="text-xs rounded-lg bg-slate-900 p-3.5 border border-slate-800 text-slate-300 leading-relaxed">
              <span className="font-semibold text-cyan-300">Pembahasan: </span>
              {currentType.miniQuiz.explanation}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Simulation Modal Preview */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-2xl border border-cyan-500/30 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white font-display">
                  {currentType.interactivePreview.title}
                </h3>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Tutup (✕)
              </button>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 space-y-3 whitespace-pre-line leading-relaxed">
              {currentType.interactivePreview.content}
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>{currentType.interactivePreview.details}</span>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={() => setActiveView('module-1')}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Modul 1</span>
        </button>

        <button
          onClick={() => {
            completeModule(2);
            setActiveView('module-3');
          }}
          className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition"
        >
          <span>Lanjut ke Modul 3: Inside the AI</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
