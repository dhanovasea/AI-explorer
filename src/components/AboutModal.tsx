import React from 'react';
import { useLearning } from '../context/LearningContext';
import { HelpCircle, X, ShieldCheck, GraduationCap, CheckCircle2, AlertTriangle } from 'lucide-react';

export const AboutModal: React.FC = () => {
  const { openAbout, setOpenAbout } = useLearning();

  if (!openAbout) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="flex flex-col h-[90vh] max-h-[720px] w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">Tentang Generative AI Explorer</h2>
              <p className="text-xs text-slate-400">Aplikasi Pembelajaran Literasi AI untuk SMA Kelas 10</p>
            </div>
          </div>
          <button
            onClick={() => setOpenAbout(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-300 leading-relaxed">
          {/* Target & Tujuan */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white font-display">
              🎯 Tujuan Pembelajaran
            </h3>
            <p>
              Generative AI Explorer dirancang khusus untuk memenuhi capaian pembelajaran mata pelajaran Informatika dan Literasi Digital bagi siswa SMA Kelas 10 (Fase E Kurikulum Merdeka). Aplikasi ini menjembatani konsep teoretis AI yang rumit menjadi visual interaktif yang menyenangkan.
            </p>
            <div className="grid gap-2 sm:grid-cols-2 pt-1">
              <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Membedakan Generative AI dengan klasifikasi dan prediksi.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Mengenal 5 modalitas keluaran konten AI.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-cyan-500/30">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Memahami simulasi alur token kata AI.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Menyusun prompt berstruktur (Role, Task, Context, Format).</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-cyan-500/30">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Memecahkan masalah nyata sekolah dengan 5 fase inkuiri PBL.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Mempublikasikan karya terverifikasi & memberikan peer review etis.</span>
              </div>
            </div>
          </div>

          {/* Penggunaan di Kelas */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h3 className="text-sm font-bold text-white font-display">
              👩‍🏫 Panduan untuk Guru & Siswa di Kelas
            </h3>
            <p>
              Guru dapat menggunakan aplikasi ini sebagai media presentasi atau penugasan mandiri siswa selama 1–2 jam pelajaran. Setiap aktivitas dilengkapi kalkulasi XP dan lencana nyata yang tersimpan di browser tanpa perlu registrasi rumit.
            </p>
          </div>

          {/* Peringatan Etika & Halusinasi */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
              <span>Peringatan Penting Penggunaan AI:</span>
            </div>
            <p className="text-amber-100/90 text-xs">
              Keluaran AI dapat mengandung kesalahan, informasi palsu (halusinasi), atau bias data. Siswa wajib selalu melakukan verifikasi silang (cross-check) terhadap sumber referensi tepercaya dan tidak boleh mengumpulkan jawaban AI mentah-mentah sebagai karya pribadi.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 px-6 py-3 bg-slate-950 flex justify-end">
          <button
            onClick={() => setOpenAbout(false)}
            className="rounded-lg bg-cyan-500 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
