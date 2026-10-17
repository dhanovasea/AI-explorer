import React, { useState } from 'react';
import { useLearning } from '../../context/LearningContext';
import { MODULE_1_ITEMS } from '../../data/learningContent';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Cpu, 
  Brain, 
  ScanSearch, 
  TrendingUp, 
  Palette,
  RotateCcw
} from 'lucide-react';

export const Module1Intro: React.FC = () => {
  const { addXP, completeModule, setActiveView, profile } = useLearning();

  // Interactive activity state
  const [answers, setAnswers] = useState<Record<string, 'generative' | 'classification' | 'prediction'>>({});
  const [feedbackShown, setFeedbackShown] = useState<Record<string, boolean>>({});
  const [activityCompleted, setActivityCompleted] = useState(false);

  const handleSelectOption = (itemId: string, selectedType: 'generative' | 'classification' | 'prediction') => {
    if (answers[itemId]) return; // lock once answered

    const target = MODULE_1_ITEMS.find((item) => item.id === itemId);
    if (!target) return;

    setAnswers((prev) => ({ ...prev, [itemId]: selectedType }));
    setFeedbackShown((prev) => ({ ...prev, [itemId]: true }));

    const isCorrect = selectedType === target.type;
    if (isCorrect) {
      addXP(20, `Jawaban Tepat: ${target.label}!`);
    }

    // Check if all answered
    const totalAnswered = Object.keys(answers).length + 1;
    if (totalAnswered === MODULE_1_ITEMS.length) {
      setActivityCompleted(true);
      completeModule(1);
      addXP(60, 'Selamat! Kamu menyelesaikan Modul 1: What is Generative AI?');
    }
  };

  const handleResetActivity = () => {
    setAnswers({});
    setFeedbackShown({});
    setActivityCompleted(false);
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
          <span className="text-cyan-400">Modul 1</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Modul 1: What Is Generative AI?
            </h1>
            <p className="text-sm text-slate-300">
              Memahami revolusi AI dari sekadar menganalisis hingga mampu mencipta karya baru.
            </p>
          </div>
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
            Target: SMA Kelas 10
          </div>
        </div>
      </div>

      {/* Concept Breakdown Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1: AI Secara Umum */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">Artificial Intelligence (AI)</h2>
              <span className="text-xs text-slate-400">Kecerdasan Buatan Umum</span>
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Kecerdasan Buatan adalah bidang ilmu komputer yang merancang sistem agar mampu meniru kemampuan kognitif manusia: memahami bahasa, mengenali objek, mengambil keputusan, dan memecahkan persoalan matematis.
          </p>
          <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span className="font-semibold text-slate-300">Contoh Klasik:</span> Peta Google Maps menghitung rute tercepat, filter email spam, atau mesin catur komputer.
          </div>
        </div>

        {/* Card 2: Generative AI */}
        <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">Generative AI (Gen AI)</h2>
              <span className="text-xs text-cyan-400">Kecerdasan Buatan Generatif</span>
            </div>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            Generative AI adalah generasi baru kecerdasan buatan yang tidak hanya membaca atau menyaring data, melainkan <span className="text-cyan-300 font-semibold">menciptakan konten baru</span> yang orisinal berdasarkan instruksi (prompt) manusia.
          </p>
          <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span className="font-semibold text-slate-300">Contoh Nyata:</span> Menulis dongeng fabel, mendesain logo poster mading, mengarang musik instrumen, hingga membantu memprogram kode.
          </div>
        </div>
      </div>

      {/* Comparison Matrix: Generatif vs Klasifikasi vs Prediksi */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
        <h2 className="text-lg font-bold text-white font-display">
          Membedakan 3 Jenis Tugas Kecerdasan Buatan
        </h2>
        <p className="text-xs text-slate-400">
          Seringkali orang menyamakan semua sistem pintar sebagai AI. Di era modern, kita membedakan tugas utamanya:
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {/* Column 1: AI Klasifikasi */}
          <div className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
              <ScanSearch className="h-4 w-4" />
              <span>1. AI Klasifikasi</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tugasnya mengelompokkan data yang sudah ada ke dalam kategori atau label yang telah ditentukan.
            </p>
            <div className="text-[11px] text-slate-400 bg-slate-900/80 p-2 rounded border border-slate-800">
              <span className="font-medium text-slate-300">Pertanyaan AI:</span> "Foto ini isinya kucing atau anjing?"
            </div>
          </div>

          {/* Column 2: AI Prediksi */}
          <div className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>2. AI Prediksi</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tugasnya memperkirakan angka atau kecenderungan tren masa depan berdasarkan pola data historis.
            </p>
            <div className="text-[11px] text-slate-400 bg-slate-900/80 p-2 rounded border border-slate-800">
              <span className="font-medium text-slate-300">Pertanyaan AI:</span> "Berapa persen kemungkinan hujan besok sore?"
            </div>
          </div>

          {/* Column 3: Generative AI */}
          <div className="rounded-lg border border-cyan-500/40 bg-cyan-950/20 p-4 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
              <Palette className="h-4 w-4" />
              <span>3. Generative AI</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Tugasnya merajut dan mensintesis konten kreatif baru yang belum pernah ada sebelumnya.
            </p>
            <div className="text-[11px] text-slate-300 bg-slate-900/90 p-2 rounded border border-cyan-500/30">
              <span className="font-medium text-cyan-300">Pertanyaan AI:</span> "Buatkan puisi tentang petualangan astronot di bulan!"
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Activity: Tantangan Identifikasi */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white font-display">
                Aktivitas Interaktif: Tebak Kategori AI
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Pilih tombol kategori yang tepat untuk setiap sistem AI di bawah ini. Jawaban benar memberikan +20 XP!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Terjawab: <strong className="text-white">{Object.keys(answers).length} / {MODULE_1_ITEMS.length}</strong>
            </span>
            <button
              onClick={handleResetActivity}
              className="text-xs text-slate-400 hover:text-cyan-400 transition flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Ulangi
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {MODULE_1_ITEMS.map((item, idx) => {
            const currentAnswer = answers[item.id];
            const isAnswered = !!currentAnswer;
            const isCorrect = currentAnswer === item.type;

            return (
              <div
                key={item.id}
                className={`rounded-lg border p-4.5 transition-all ${
                  isAnswered
                    ? isCorrect
                      ? 'border-emerald-500/40 bg-emerald-950/15'
                      : 'border-rose-500/40 bg-rose-950/15'
                    : 'border-slate-800 bg-slate-950/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-cyan-400">Kasus {idx + 1}</span>
                      {isAnswered && (
                        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                          isCorrect ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Tepat!
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3.5 w-3.5" />
                              Belum tepat
                            </>
                          )}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-slate-200">
                      {item.scenario}
                    </p>
                  </div>
                </div>

                {/* Choices buttons */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(item.id, 'generative')}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                      currentAnswer === 'generative'
                        ? 'bg-cyan-500 text-slate-950 font-semibold'
                        : isAnswered
                        ? 'border border-slate-800 text-slate-500 cursor-not-allowed'
                        : 'border border-slate-700 bg-slate-800 text-slate-200 hover:border-cyan-500 hover:text-cyan-400'
                    }`}
                  >
                    Generative AI
                  </button>

                  <button
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(item.id, 'classification')}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                      currentAnswer === 'classification'
                        ? 'bg-blue-500 text-slate-950 font-semibold'
                        : isAnswered
                        ? 'border border-slate-800 text-slate-500 cursor-not-allowed'
                        : 'border border-slate-700 bg-slate-800 text-slate-200 hover:border-blue-500 hover:text-blue-400'
                    }`}
                  >
                    AI Klasifikasi
                  </button>

                  <button
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(item.id, 'prediction')}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
                      currentAnswer === 'prediction'
                        ? 'bg-amber-500 text-slate-950 font-semibold'
                        : isAnswered
                        ? 'border border-slate-800 text-slate-500 cursor-not-allowed'
                        : 'border border-slate-700 bg-slate-800 text-slate-200 hover:border-amber-500 hover:text-amber-400'
                    }`}
                  >
                    AI Prediksi
                  </button>
                </div>

                {/* Explanatory feedback */}
                {feedbackShown[item.id] && (
                  <div className="mt-3 text-xs rounded-md bg-slate-900/90 p-3 border border-slate-800 text-slate-300">
                    <span className="font-semibold text-cyan-300">Penjelasan Guru: </span>
                    {item.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion celebration banner */}
        {activityCompleted && (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Luar Biasa! Modul 1 Selesai</h3>
                <p className="text-xs text-slate-300">Kamu telah memahami fondasi utama apa yang membedakan Generative AI dengan sistem AI lainnya.</p>
              </div>
            </div>
            <button
              onClick={() => setActiveView('module-2')}
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition"
            >
              <span>Lanjut ke Modul 2: Types of Generative AI</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Dashboard</span>
        </button>

        <button
          onClick={() => {
            completeModule(1);
            setActiveView('module-2');
          }}
          className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition"
        >
          <span>Menuju Modul 2: Ragam Tipe AI</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
