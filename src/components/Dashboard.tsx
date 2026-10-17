import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { MODULES_OVERVIEW } from '../data/learningContent';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Award, 
  Edit3, 
  Check, 
  Flame, 
  Layers, 
  Cpu, 
  Code2, 
  ShieldAlert, 
  Trophy,
  RotateCcw,
  Rocket
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="h-5 w-5" />,
  Layers: <Layers className="h-5 w-5" />,
  Cpu: <Cpu className="h-5 w-5" />,
  Code2: <Code2 className="h-5 w-5" />,
  ShieldAlert: <ShieldAlert className="h-5 w-5" />,
  CheckCircle2: <CheckCircle2 className="h-5 w-5" />
};

export const Dashboard: React.FC = () => {
  const { 
    profile, 
    badges, 
    setActiveView, 
    updateStudentName, 
    resetProgress, 
    setOpenCertificate 
  } = useLearning();

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.name);

  const completedCount = profile.completedModules.length;
  const progressPercent = Math.round((completedCount / 6) * 100);

  // Determine next module to continue
  const nextModuleId = [1, 2, 3, 4, 5, 6].find(id => !profile.completedModules.includes(id as any)) || 1;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      updateStudentName(tempName);
    }
    setIsEditingName(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-10">
      {/* Hero Section with High-Fidelity Asset */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-6 md:p-10 shadow-2xl">
        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-cyan-400">
              <span>Kurikulum Informatika SMA Kelas 10</span>
              <span aria-hidden="true">·</span>
              <span>Media Pembelajaran Interaktif</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display">
                Generative AI Explorer
              </h1>
              <p className="text-lg md:text-xl font-medium text-cyan-300">
                Explore How AI Creates
              </p>
            </div>

            <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
              Pelajari konsep revolusioner kecerdasan buatan generatif: mulai dari bagaimana mesin merajut kata dan gambar, cara merancang prompt cerdas, hingga etika dan keselamatan digital di sekolah.
            </p>

            {/* Editable Student Greeting */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Ketik namamu..."
                    className="rounded-lg border border-cyan-500/50 bg-slate-800 px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1 rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Simpan
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/90 px-3.5 py-2">
                  <span className="text-xs text-slate-400">Nama Siswa:</span>
                  <span className="text-sm font-semibold text-white">{profile.name}</span>
                  <button
                    onClick={() => {
                      setTempName(profile.name);
                      setIsEditingName(true);
                    }}
                    title="Ubah nama siswa"
                    className="ml-1 text-slate-400 hover:text-cyan-400 transition"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              <button
                onClick={() => setActiveView(`module-${nextModuleId}`)}
                className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 whitespace-nowrap"
              >
                <span>{completedCount === 0 ? 'Mulai Eksplorasi' : `Lanjutkan Modul ${nextModuleId}`}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setActiveView('pbl')}
                className="flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-950/40 px-4 py-2.5 text-sm font-semibold text-cyan-300 hover:bg-cyan-900/40 transition whitespace-nowrap"
              >
                <Rocket className="h-4 w-4" />
                <span>Aktivitas PBL & Publikasi</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-cyan-500/20 bg-slate-900 shadow-xl group">
              <img
                src="/src/assets/images/hero_ai_explorer_1792220268064.jpg"
                alt="Siswa SMA mengeksplorasi Generative AI"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback container if image fails
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-300 bg-slate-950/70 backdrop-blur-sm p-2 rounded-lg border border-white/5 flex items-center justify-between">
                <span>Eksplorasi Visual & Interaktif</span>
                <span className="text-cyan-400 font-medium">SMA Kelas 10</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gamification & Learning Progress Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Progress */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Progres Belajar</span>
            <span className="font-semibold text-white">{completedCount} dari 6 Modul</span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-white font-display tabular-nums">
            {progressPercent}%
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Total XP */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Pengalaman (XP)</span>
            <Flame className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold tracking-tight text-amber-400 font-display tabular-nums">
            {profile.xp} <span className="text-base font-normal text-slate-400">XP</span>
          </div>
          <p className="text-xs text-slate-400">
            Kumpulkan XP dengan menyelesaikan modul dan tantangan kuis.
          </p>
        </div>

        {/* Metric 3: Badges */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Lencana Diperoleh</span>
            <Award className="h-4 w-4 text-purple-400" />
          </div>
          <div className="text-3xl font-bold tracking-tight text-purple-400 font-display tabular-nums">
            {profile.badges.length} <span className="text-base font-normal text-slate-400">/ {badges.length}</span>
          </div>
          <p className="text-xs text-slate-400">
            Buka gelar AI Beginner hingga PBL Innovator.
          </p>
        </div>

        {/* Metric 4: Quiz Score */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Skor Kuis Akhir</span>
            <Trophy className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold tracking-tight text-emerald-400 font-display tabular-nums">
            {profile.quizScore !== null ? `${profile.quizScore}%` : 'Belum Kuis'}
          </div>
          <p className="text-xs text-slate-400">
            {profile.quizCompleted ? 'Selesai diuji di Modul 6' : 'Ikuti kuis 10 soal di Modul 6'}
          </p>
        </div>
      </div>

      {/* Featured PBL Banner */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/30 p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-lg">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Rocket className="h-4 w-4" />
            <span>Problem-Based Learning (PBL) & Publikasi Karya Siswa</span>
          </div>
          <h3 className="text-lg font-bold text-white font-display">
            Selesaikan Masalah Nyata Sekolah & Pamerkan Karyamu!
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Gunakan alur 5 fase inkuiri Kurikulum Merdeka (Orientasi Masalah, Pemilihan AI, Co-Creation Prompt, Kajian Kritis, dan Etika). Publikasikan karyamu ke Galeri Kelas dan dapatkan penilaian dari rekan sebaya (+100 XP & Lencana PBL Innovator).
          </p>
        </div>
        <button
          onClick={() => setActiveView('pbl')}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition whitespace-nowrap shadow-md shadow-cyan-500/20"
        >
          <span>Buka Studio PBL</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Badges Shelf */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white font-display">Koleksi Lencana Penghargaan</h2>
            <p className="text-xs text-slate-400">Lencana didapatkan dari pencapaian belajar nyata, bukan sekadar hiasan.</p>
          </div>
          {completedCount >= 4 && (
            <button
              onClick={() => setOpenCertificate(true)}
              className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
            >
              <Award className="h-3.5 w-3.5" />
              <span>Lihat Sertifikat Siswa</span>
            </button>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`rounded-lg border p-4 transition ${
                badge.unlocked
                  ? 'border-cyan-500/30 bg-slate-900/90 shadow-sm'
                  : 'border-slate-800/60 bg-slate-950/40 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    badge.unlocked
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{badge.title}</h3>
                  <span className="text-[11px] font-medium text-cyan-400">
                    {badge.unlocked ? '✓ Terbuka' : 'Terkunci'}
                  </span>
                </div>
              </div>
              <p className="mt-2.5 text-xs text-slate-400 leading-relaxed">
                {badge.description}
              </p>
              <div className="mt-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <span className="font-semibold text-slate-300">Syarat:</span> {badge.criteria}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modules Exploration Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white font-display">Peta Modul Pembelajaran</h2>
            <p className="text-xs text-slate-400">Pilih modul di bawah ini untuk memulai atau mengulang materi.</p>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Apakah kamu yakin ingin mengulang semua progres belajar dari awal?')) {
                resetProgress();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Progres</span>
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {MODULES_OVERVIEW.map((mod) => {
            const isCompleted = profile.completedModules.includes(mod.id as any);
            const isCurrent = nextModuleId === mod.id && !isCompleted;

            return (
              <div
                key={mod.id}
                className={`group relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-200 ${
                  isCompleted
                    ? 'border-emerald-500/30 bg-slate-900/60 hover:border-emerald-500/60'
                    : isCurrent
                    ? 'border-cyan-500/50 bg-slate-900/90 shadow-lg shadow-cyan-950/40 hover:border-cyan-400'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Modul {mod.id}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{mod.timeEst}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
                      isCompleted 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                        : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                    }`}>
                      {iconMap[mod.icon] || <Sparkles className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-400">{mod.sub}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {mod.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-amber-400">+{mod.xpReward} XP</span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Selesai
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveView(`module-${mod.id}`)}
                    className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                      isCompleted
                        ? 'border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                        : isCurrent
                        ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <span>{isCompleted ? 'Ulas Lagi' : 'Mulai Belajar'}</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
