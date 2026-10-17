import React, { useState } from 'react';
import { useLearning } from '../../context/LearningContext';
import { MODULE_6_QUIZ } from '../../data/learningContent';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Award, 
  Trophy, 
  Sparkles, 
  HelpCircle,
  Clock,
  BookOpen
} from 'lucide-react';

export const Module6Quiz: React.FC = () => {
  const { addXP, completeModule, recordQuizScore, unlockBadge, setActiveView, setOpenCertificate, profile } = useLearning();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  // Stored results
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const totalQuestions = MODULE_6_QUIZ.length;
  const currentQuestion = MODULE_6_QUIZ[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isConfirmed) return; // locked
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isConfirmed) return;

    setIsConfirmed(true);
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: selectedOption }));

    const isCorrect = selectedOption === currentQuestion.correctIndex;
    if (isCorrect) {
      addXP(15, `Soal ${currentIndex + 1} Benar!`);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsConfirmed(false);
    } else {
      // Calculate final score
      let correctCount = 0;
      MODULE_6_QUIZ.forEach((q) => {
        if (userAnswers[q.id] === q.correctIndex) {
          correctCount++;
        }
      });
      const finalScore = Math.round((correctCount / totalQuestions) * 100);
      recordQuizScore(finalScore);
      completeModule(6);

      if (finalScore >= 80) {
        addXP(100, `Luar Biasa! Skor Kuis ${finalScore}%, Gelar Generative AI Master Terbuka!`);
        unlockBadge('generative-ai-master');
      } else {
        addXP(50, `Kuis Selesai dengan Skor ${finalScore}%!`);
      }
      setIsQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsConfirmed(false);
    setUserAnswers({});
    setIsQuizFinished(false);
  };

  // If Quiz Finished, show Result View
  if (isQuizFinished) {
    let correctCount = 0;
    MODULE_6_QUIZ.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    const isMaster = finalScore >= 80;

    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-8">
        {/* Score Showcase Card */}
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-6 md:p-10 text-center space-y-6 shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Trophy className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400">
              Hasil Tantangan Evaluasi Pembelajaran
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">
              {isMaster ? 'Selamat, Generative AI Master!' : 'Kerja Bagus dalam Menyelesaikan Kuis!'}
            </h1>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              {profile.name}, kamu telah menuntaskan seluruh 10 soal uji pemahaman Generative AI kelas 10.
            </p>
          </div>

          {/* Big Score Box */}
          <div className="inline-block rounded-xl border border-slate-800 bg-slate-950/80 px-8 py-5">
            <div className="text-5xl font-black text-cyan-400 font-display tabular-nums">
              {finalScore}%
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Menjawab benar <strong className="text-white">{correctCount}</strong> dari {totalQuestions} soal
            </div>
          </div>

          {/* Master Badge announcement */}
          {isMaster && (
            <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-4 max-w-md mx-auto flex items-center gap-3 text-left">
              <Award className="h-6 w-6 text-amber-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white">Lencana Generative AI Master Terbuka!</h4>
                <p className="text-[11px] text-slate-300">Nilaimu memenuhi standar kelulusan keunggulan $\ge 80\%$.</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setOpenCertificate(true)}
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20"
            >
              <Award className="h-4 w-4" />
              <span>Lihat & Cetak Sertifikat Siswa</span>
            </button>

            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Ulangi Kuis</span>
            </button>

            <button
              onClick={() => setActiveView('dashboard')}
              className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              Kembali ke Hub
            </button>
          </div>
        </div>

        {/* Detailed Question Review & Discussion List */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white font-display">
              Pembahasan Lengkap 10 Soal
            </h3>
            <span className="text-xs text-slate-400">Kurikulum Informatif & Jelas</span>
          </div>

          <div className="space-y-4">
            {MODULE_6_QUIZ.map((q, idx) => {
              const studentAnswer = userAnswers[q.id];
              const isCorrect = studentAnswer === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`rounded-xl border p-4.5 space-y-3 ${
                    isCorrect
                      ? 'border-emerald-500/30 bg-emerald-950/10'
                      : 'border-rose-500/30 bg-rose-950/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-bold text-cyan-400">Soal {idx + 1} ({q.topic})</span>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                      isCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Jawaban Benar
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3.5 w-3.5" />
                          Jawaban Keliru
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-200">
                    {q.question}
                  </p>

                  <div className="text-[11px] space-y-1 bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
                    <div>
                      <span className="text-slate-400">Jawabanmu: </span>
                      <span className={isCorrect ? 'text-emerald-300 font-semibold' : 'text-rose-300'}>
                        {studentAnswer !== undefined ? q.options[studentAnswer] : 'Tidak dijawab'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div>
                        <span className="text-slate-400">Kunci Jawaban: </span>
                        <span className="text-emerald-300 font-semibold">
                          {q.options[q.correctIndex]}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-cyan-300">Penjelasan Guru: </strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active Quiz View (1 Question at a time)
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header & Breadcrumb */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <button onClick={() => setActiveView('dashboard')} className="hover:text-cyan-400 transition">
            Dashboard
          </button>
          <span>/</span>
          <span className="text-cyan-400">Modul 6</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Modul 6: Knowledge Challenge
            </h1>
            <p className="text-sm text-slate-300">
              Uji pemahaman komprehensifmu tentang konsep, cara kerja, prompt, dan etika AI.
            </p>
          </div>
          <div className="text-xs text-slate-400">
            Soal <strong className="text-cyan-300">{currentIndex + 1}</strong> dari {totalQuestions}
          </div>
        </div>

        {/* Question Progress bar */}
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-cyan-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Single Question Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 space-y-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded bg-slate-800 px-2.5 py-0.5 text-[11px] font-medium text-cyan-400">
            <span>Topik: {currentQuestion.topic}</span>
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>

        {/* 4 Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectOption = idx === currentQuestion.correctIndex;

            return (
              <button
                key={idx}
                disabled={isConfirmed}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left rounded-xl p-4 text-xs font-medium transition flex items-start gap-3 border ${
                  isConfirmed
                    ? isCorrectOption
                      ? 'border-emerald-500/60 bg-emerald-950/30 text-emerald-200'
                      : isSelected
                      ? 'border-rose-500/60 bg-rose-950/30 text-rose-200'
                      : 'border-slate-800 bg-slate-950/40 text-slate-500'
                    : isSelected
                    ? 'border-cyan-500 bg-cyan-950/30 text-cyan-200 shadow-md'
                    : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                  isConfirmed && isCorrectOption
                    ? 'bg-emerald-500 text-slate-950'
                    : isConfirmed && isSelected
                    ? 'bg-rose-500 text-white'
                    : isSelected
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="pt-0.5 leading-relaxed flex-1">
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback after confirmation */}
        {isConfirmed && (
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1.5 text-xs text-slate-300 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold">
              {selectedOption === currentQuestion.correctIndex ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-300">Jawabanmu Benar!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-rose-400" />
                  <span className="text-rose-300">Jawaban Kurang Tepat</span>
                </>
              )}
            </div>
            <p>
              <span className="font-semibold text-cyan-300">Pembahasan: </span>
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Action Button: Confirm or Next */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveView('module-5')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Modul 5</span>
          </button>

          {!isConfirmed ? (
            <button
              onClick={handleConfirmAnswer}
              disabled={selectedOption === null}
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition disabled:opacity-40"
            >
              <span>Kunci Jawaban</span>
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition"
            >
              <span>{currentIndex === totalQuestions - 1 ? 'Lihat Skor Akhir' : 'Soal Selanjutnya'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
