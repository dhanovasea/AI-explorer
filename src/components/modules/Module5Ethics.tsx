import React, { useState } from 'react';
import { useLearning } from '../../context/LearningContext';
import { MODULE_5_ETHICS_SCENARIOS } from '../../data/learningContent';
import { 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  AlertTriangle, 
  Lock, 
  FileCheck, 
  Search, 
  Award,
  RotateCcw
} from 'lucide-react';

export const Module5Ethics: React.FC = () => {
  const { addXP, completeModule, unlockBadge, setActiveView } = useLearning();

  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);

  const scenario = MODULE_5_ETHICS_SCENARIOS[activeScenarioIdx];
  const totalScenarios = MODULE_5_ETHICS_SCENARIOS.length;
  const answeredCount = Object.keys(selectedChoices).length;

  const handleSelectChoice = (choiceId: string) => {
    if (selectedChoices[scenario.id]) return; // lock once answered

    const targetChoice = scenario.choices.find((c) => c.id === choiceId);
    if (!targetChoice) return;

    setSelectedChoices((prev) => ({ ...prev, [scenario.id]: choiceId }));

    if (targetChoice.isResponsible) {
      addXP(25, `Tindakan Bertanggung Jawab: ${scenario.title}`);
    }

    // Check if all 5 completed
    const newAnsweredCount = answeredCount + 1;
    if (newAnsweredCount === totalScenarios) {
      unlockBadge('ai-safety-guardian');
      completeModule(5);
      addXP(50, 'Lencana AI Safety Guardian Terbuka! Kamu memahami etika AI sekolah.');
    }
  };

  const handleReset = () => {
    setSelectedChoices({});
    setActiveScenarioIdx(0);
  };

  const currentChoiceId = selectedChoices[scenario.id];
  const chosenOption = scenario.choices.find((c) => c.id === currentChoiceId);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-10">
      {/* Header & Breadcrumb */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <button onClick={() => setActiveView('dashboard')} className="hover:text-cyan-400 transition">
            Dashboard
          </button>
          <span>/</span>
          <span className="text-cyan-400">Modul 5</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Modul 5: AI Ethics & Safety
            </h1>
            <p className="text-sm text-slate-300">
              Etika, integritas akademik, perlindungan data pribadi, dan pencegahan plagiarisme di sekolah.
            </p>
          </div>
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-300">
            Etika & Karakter Pelajar Pancasila
          </div>
        </div>
      </div>

      {/* 5 Golden Principles Grid */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-cyan-400" />
          <h2 className="text-base font-bold text-white font-display">
            5 Prinsip Emas Penggunaan AI di Lingkungan Sekolah
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 text-xs">
          <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Search className="h-3.5 w-3.5" />
              <span>1. Verifikasi Sumber</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Selalu uji kebenaran fakta AI dengan buku teks dan sumber kredibel. Waspadai halusinasi.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
            <div className="flex items-center gap-1.5 text-purple-400 font-semibold">
              <Lock className="h-3.5 w-3.5" />
              <span>2. Jaga Privasi</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Jangan pernah memasukkan NIK, password, data pribadi, atau foto teman tanpa izin ke AI.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
            <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>3. Anti-Plagiarisme</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Dilarang menyalin mentah jawaban AI sebagai tugas sendiri. Jadikan sebagai pemantik ide.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <FileCheck className="h-3.5 w-3.5" />
              <span>4. Transparansi</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Beri atribusi jujur jika kamu menggunakan bantuan AI dalam proyek atau ilustrasi mading.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3.5 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Award className="h-3.5 w-3.5" />
              <span>5. AI Mitra Belajar</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              AI adalah kawan diskusi untuk melatih daya pikir, bukan pengganti otak manusiamu.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Scenario Card Deck */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Dilema Sekolah {activeScenarioIdx + 1} dari {totalScenarios}
            </span>
          </div>

          {/* Quick Scenario Navigation Tabs */}
          <div className="flex items-center gap-1.5">
            {MODULE_5_ETHICS_SCENARIOS.map((s, idx) => {
              const isDone = !!selectedChoices[s.id];
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveScenarioIdx(idx)}
                  className={`h-7 w-7 rounded-lg text-xs font-bold transition border ${
                    idx === activeScenarioIdx
                      ? 'border-cyan-500 bg-cyan-500 text-slate-950'
                      : isDone
                      ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Scenario Content */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white font-display">
            {scenario.title}
          </h2>

          <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 space-y-2">
            <span className="text-xs font-semibold text-slate-400">Situasi di Sekolah:</span>
            <p className="text-sm text-slate-200 leading-relaxed">
              {scenario.situation}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold text-cyan-300">
              Dilema Pertanyaan: {scenario.studentDilemma}
            </span>

            {/* Choices */}
            <div className="space-y-3">
              {scenario.choices.map((choice) => {
                const isSelected = currentChoiceId === choice.id;
                const isAnswered = !!currentChoiceId;

                return (
                  <button
                    key={choice.id}
                    disabled={isAnswered}
                    onClick={() => handleSelectChoice(choice.id)}
                    className={`w-full text-left rounded-xl p-4 text-xs font-medium transition flex items-start gap-3 border ${
                      isAnswered
                        ? choice.isResponsible
                          ? 'border-emerald-500/60 bg-emerald-950/30 text-emerald-200'
                          : isSelected
                          ? 'border-rose-500/60 bg-rose-950/30 text-rose-200'
                          : 'border-slate-800 bg-slate-900/30 text-slate-500 opacity-60'
                        : 'border-slate-800 bg-slate-950/80 text-slate-200 hover:border-cyan-500/50 hover:bg-slate-900'
                    }`}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                      isAnswered && choice.isResponsible
                        ? 'bg-emerald-500 text-slate-950'
                        : isAnswered && isSelected
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {choice.label}
                    </span>
                    <span className="pt-0.5 leading-relaxed flex-1">
                      {choice.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Consequence Box */}
          {chosenOption && (
            <div className={`mt-4 rounded-xl p-4.5 border space-y-2 text-xs ${
              chosenOption.isResponsible
                ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-100'
                : 'border-rose-500/40 bg-rose-950/20 text-rose-100'
            }`}>
              <div className="flex items-center gap-2 font-bold">
                {chosenOption.isResponsible ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-300">Keputusan Bertanggung Jawab!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-rose-400" />
                    <span className="text-rose-300">Pilihan Berisiko / Tidak Etis</span>
                  </>
                )}
                <span className="text-slate-400">·</span>
                <span className="text-slate-300">{chosenOption.ethicalPrinciple}</span>
              </div>
              <p className="leading-relaxed">
                {chosenOption.consequence}
              </p>
            </div>
          )}
        </div>

        {/* Step Forward inside scenarios */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveScenarioIdx(Math.max(0, activeScenarioIdx - 1))}
            disabled={activeScenarioIdx === 0}
            className="text-xs text-slate-400 hover:text-white disabled:opacity-40 transition"
          >
            ← Skenario Sebelumnya
          </button>

          <button
            onClick={() => setActiveScenarioIdx(Math.min(totalScenarios - 1, activeScenarioIdx + 1))}
            disabled={activeScenarioIdx === totalScenarios - 1}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 disabled:opacity-40 transition"
          >
            <span>Skenario Berikutnya</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Completion Trophy Card */}
      {answeredCount === totalScenarios && (
        <div className="rounded-xl border border-purple-500/40 bg-purple-950/20 p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Lencana AI Safety Guardian Terbuka!</h3>
              <p className="text-xs text-slate-300">Kamu telah menuntaskan seluruh 5 dilema etika dengan pemahaman yang matang.</p>
            </div>
          </div>
          <button
            onClick={() => setActiveView('module-6')}
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition"
          >
            <span>Ikuti Tantangan Kuis Modul 6</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={() => setActiveView('module-4')}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Modul 4</span>
        </button>

        <button
          onClick={() => {
            completeModule(5);
            setActiveView('module-6');
          }}
          className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition"
        >
          <span>Lanjut ke Modul 6: Knowledge Challenge</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
