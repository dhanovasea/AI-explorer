import React, { useState, useEffect } from 'react';
import { useLearning } from '../../context/LearningContext';
import { MODULE_3_SIMULATION_STEPS } from '../../data/learningContent';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ArrowRight, 
  ArrowLeft, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Info,
  Layers,
  Brain,
  Hash
} from 'lucide-react';

export const Module3InsideAI: React.FC = () => {
  const { addXP, completeModule, setActiveView } = useLearning();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [hasFinishedSimulation, setHasFinishedSimulation] = useState(false);

  const currentStep = MODULE_3_SIMULATION_STEPS[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      const duration = 2800 / playbackSpeed;
      timer = setTimeout(() => {
        if (currentStepIndex < MODULE_3_SIMULATION_STEPS.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
          if (!hasFinishedSimulation) {
            setHasFinishedSimulation(true);
            completeModule(3);
            addXP(60, 'Simulasi Selesai: Kamu telah memahami alur prediksi token AI!');
          }
        }
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, playbackSpeed, hasFinishedSimulation]);

  const handleStartOrPause = () => {
    if (currentStepIndex === MODULE_3_SIMULATION_STEPS.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIndex < MODULE_3_SIMULATION_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      if (nextIdx === MODULE_3_SIMULATION_STEPS.length - 1 && !hasFinishedSimulation) {
        setHasFinishedSimulation(true);
        completeModule(3);
        addXP(60, 'Simulasi Selesai: Kamu telah memahami alur prediksi token AI!');
      }
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
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
          <span className="text-cyan-400">Modul 3</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Modul 3: Inside the AI
            </h1>
            <p className="text-sm text-slate-300">
              Simulasi interaktif cara kerja model generatif dari prompt hingga prediksi token kata.
            </p>
          </div>
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
            Simulasi Visual Interaktif
          </div>
        </div>
      </div>

      {/* Educational Notice Banner */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-300 space-y-1">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold">
          <Info className="h-4 w-4" />
          <span>Catatan Pembelajaran untuk Siswa SMA:</span>
        </div>
        <p className="text-slate-400 leading-relaxed">
          Simulasi ini adalah gambaran analogi sederhana dari arsitektur model bahasa modern (seperti Transformer). Tidak semua model AI bekerja dengan cara yang identik (misalnya model gambar bekerja melalui denoisasi difusi). Namun prinsip utamanya serupa: model mempelajari pola dari data latih raksasa, lalu memprediksi kelanjutan data yang paling masuk akal berdasarkan konteks prompt.
        </p>
      </div>

      {/* Interactive Simulation Stage */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 space-y-8 shadow-2xl">
        {/* Step Progress Navigator Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Alur Pemrosesan Generative AI</span>
            <span className="font-semibold text-cyan-300">
              Tahap {currentStepIndex + 1} dari {MODULE_3_SIMULATION_STEPS.length}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {MODULE_3_SIMULATION_STEPS.map((s, idx) => (
              <button
                key={s.stepNumber}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'bg-cyan-400 shadow-sm shadow-cyan-400/50'
                    : idx < currentStepIndex
                    ? 'bg-cyan-700'
                    : 'bg-slate-800'
                }`}
                title={`Tahap ${s.stepNumber}: ${s.title}`}
              />
            ))}
          </div>

          <div className="hidden sm:grid grid-cols-5 text-[11px] text-slate-400 gap-2 text-center pt-1">
            <span>1. Tokenisasi</span>
            <span>2. Atensi Konteks</span>
            <span>3. Prediksi Token</span>
            <span>4. Sintesis Cerita</span>
            <span>5. Evaluasi Siswa</span>
          </div>
        </div>

        {/* Neural Network Visual Diagram Showcase */}
        <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 aspect-[16/9] md:aspect-[21/9]">
          <img
            src="/src/assets/images/neural_flow_simulation_1792220267193.jpg"
            alt="Diagram Alur Neural Network Transformer"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

          {/* Active Step Indicator Tag */}
          <div className="absolute top-4 left-4 rounded-lg border border-cyan-500/40 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 text-xs">
            <span className="text-slate-400">Langkah Aktif: </span>
            <span className="font-bold text-cyan-300 font-display">{currentStep.title}</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-200 leading-relaxed max-w-xl">
              {currentStep.shortDesc}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-cyan-400 font-mono">
                {currentStep.highlightComponent.toUpperCase()}_LAYER
              </span>
            </div>
          </div>
        </div>

        {/* Simulation Control Deck */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <button
              onClick={handleStartOrPause}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span>Pause</span>
                </>
              ) : currentStepIndex === MODULE_3_SIMULATION_STEPS.length - 1 ? (
                <>
                  <RotateCcw className="h-4 w-4" />
                  <span>Mulai Ulang Simulasi</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Mulai Simulasi</span>
                </>
              )}
            </button>

            <button
              onClick={handleStepForward}
              disabled={currentStepIndex >= MODULE_3_SIMULATION_STEPS.length - 1}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition disabled:opacity-50"
            >
              <span>Langkah Selanjutnya</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={handleReset}
              className="rounded-lg border border-slate-800 px-3 py-2 text-xs text-slate-400 hover:text-white transition"
              title="Reset ke tahap awal"
            >
              Reset
            </button>
          </div>

          {/* Speed Toggle */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Kecepatan:</span>
            <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-1 border border-slate-800">
              {[1, 2].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-2 py-0.5 rounded text-xs font-medium transition ${
                    playbackSpeed === speed ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Simulation Workspace / Token Generation Screen */}
        <div className="grid gap-6 md:grid-cols-12">
          {/* Left: Text & Generation Stream */}
          <div className="md:col-span-7 space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400">
                Layar Keluaran Teks Model (Token Stream):
              </span>
              <div className="min-h-[140px] rounded-xl border border-cyan-500/30 bg-slate-950 p-4 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-line shadow-inner">
                {currentStep.generatedTextSoFar}
                {isPlaying && (
                  <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-pulse align-middle" />
                )}
              </div>
            </div>

            <div className="rounded-lg bg-slate-950/40 p-4 border border-slate-800/80 space-y-1.5">
              <span className="text-xs font-semibold text-cyan-300">
                Poin Penjelasan Guru:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentStep.details}
              </p>
            </div>
          </div>

          {/* Right: Next-Token Probability Distribution Deck */}
          <div className="md:col-span-5 space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Hash className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Kalkulasi Probabilitas Token</span>
                </span>
                <span className="text-[10px] text-slate-500">Softmax Logits</span>
              </div>

              {currentStep.nextTokenPredictions ? (
                <div className="space-y-2.5">
                  <p className="text-[11px] text-slate-400">
                    Model mengevaluasi kandidat kata berikutnya berdasarkan frekuensi kemunculan pola:
                  </p>
                  {currentStep.nextTokenPredictions.map((pred, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-cyan-300">"{pred.token}"</span>
                        <span className="font-mono text-slate-400 tabular-nums">
                          {Math.round(pred.probability * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-cyan-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${pred.probability * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-slate-500 space-y-1">
                  <Sparkles className="h-5 w-5 mx-auto text-slate-600" />
                  <p>Tahap ini berfokus pada sintesis dan verifikasi hasil utuh.</p>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 text-xs text-slate-400 space-y-1.5">
              <span className="font-semibold text-slate-300">Ingat Selalu:</span>
              <p>
                AI tidak "berpikir" seperti otak manusia. AI tidak punya kesadaran atau niat; ia bekerja murni berdasarkan perhitungan probabilitas matematis dari kata ke kata.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={() => setActiveView('module-2')}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Modul 2</span>
        </button>

        <button
          onClick={() => {
            completeModule(3);
            setActiveView('module-4');
          }}
          className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition"
        >
          <span>Lanjut ke Modul 4: Prompt Engineering Lab</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
