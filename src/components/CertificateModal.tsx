import React from 'react';
import { useLearning } from '../context/LearningContext';
import { Award, CheckCircle2, Download, Printer, X, Sparkles } from 'lucide-react';

export const CertificateModal: React.FC = () => {
  const { openCertificate, setOpenCertificate, profile, badges } = useLearning();

  if (!openCertificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
  }).format(new Date());

  const unlockedBadges = badges.filter((b) => b.unlocked);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 print:p-0 print:bg-white">
      <div className="flex flex-col max-h-[92vh] w-full max-w-3xl rounded-2xl border border-cyan-500/40 bg-slate-900 shadow-2xl overflow-hidden print:border-none print:shadow-none print:max-h-full">
        {/* Modal Controls (Hidden in print) */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-3 bg-slate-950/80 print:hidden">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold">
            <Award className="h-4 w-4" />
            <span>Sertifikat Eksplorasi Generative AI Siswa</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-1 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={() => setOpenCertificate(false)}
              className="rounded-lg p-1 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Certificate Card Printable Canvas */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-center space-y-6 relative border-8 border-double border-cyan-500/30 m-4 rounded-xl print:m-0 print:border-cyan-700 print:text-slate-900 print:bg-white">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-cyan-400 print:text-cyan-800 font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Sertifikat Pencapaian Literasi Digital</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white print:text-slate-900 font-display">
              GENERATIVE AI EXPLORER
            </h1>
            <p className="text-xs text-slate-400 print:text-slate-600">
              Kurikulum Informatika SMA Kelas 10
            </p>
          </div>

          <div className="space-y-2 py-2">
            <p className="text-xs text-slate-300 print:text-slate-700">Diberikan secara resmi kepada:</p>
            <div className="text-2xl sm:text-3xl font-bold text-cyan-300 print:text-cyan-900 font-display underline decoration-cyan-500/40 underline-offset-8">
              {profile.name}
            </div>
          </div>

          <p className="text-xs text-slate-300 print:text-slate-800 max-w-lg mx-auto leading-relaxed">
            Telah berhasil menyelesaikan eksplorasi konsep dasar Generative AI, pemahaman modalitas konten, simulasi token arsitektur AI, laboratorium prompt engineering, serta penerapan etika dan keamanan kecerdasan buatan.
          </p>

          {/* Achievement Summary Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs pt-2">
            <div className="rounded-lg border border-slate-800 bg-slate-950/70 print:bg-slate-100 print:border-slate-300 px-4 py-2">
              <span className="text-slate-400 print:text-slate-600">Total Pengalaman: </span>
              <strong className="text-cyan-400 print:text-cyan-800">{profile.xp} XP</strong>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/70 print:bg-slate-100 print:border-slate-300 px-4 py-2">
              <span className="text-slate-400 print:text-slate-600">Nilai Kuis Akhir: </span>
              <strong className="text-emerald-400 print:text-emerald-800">{profile.quizScore !== null ? `${profile.quizScore}%` : 'Selesai'}</strong>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/70 print:bg-slate-100 print:border-slate-300 px-4 py-2">
              <span className="text-slate-400 print:text-slate-600">Lencana: </span>
              <strong className="text-purple-400 print:text-purple-800">{unlockedBadges.length} / {badges.length} Terbuka</strong>
            </div>
          </div>

          {/* Footer Signature & Date */}
          <div className="pt-8 flex items-center justify-between text-xs text-slate-400 print:text-slate-600 border-t border-slate-800/80 print:border-slate-300">
            <div className="text-left">
              <p>Tanggal Penyelesaian:</p>
              <p className="font-semibold text-slate-200 print:text-slate-900">{todayStr}</p>
            </div>

            <div className="text-right">
              <p>Status Verifikasi:</p>
              <p className="font-semibold text-emerald-400 print:text-emerald-700 flex items-center gap-1 justify-end">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Terverifikasi Kurikulum SMA</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
