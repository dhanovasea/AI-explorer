import React, { useState } from 'react';
import { useLearning } from '../../context/LearningContext';
import { PBL_PROBLEM_TEMPLATES } from '../../data/learningContent';
import { PBLProject, PromptComponent } from '../../types';
import { 
  Rocket, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Heart, 
  MessageSquare, 
  Star, 
  Send, 
  Share2, 
  Printer, 
  ShieldCheck, 
  HelpCircle,
  Lightbulb,
  Layers,
  Search,
  BookOpen,
  Filter,
  Users,
  Award
} from 'lucide-react';

export const PBLActivity: React.FC = () => {
  const { 
    profile, 
    pblProjects, 
    addPBLProject, 
    likePBLProject, 
    addPeerReview, 
    setActiveView 
  } = useLearning();

  // Navigation between Studio and Gallery
  const [activeTab, setActiveTab] = useState<'studio' | 'gallery'>('studio');

  // PBL Studio Step (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('pbl-sampah-plastik');

  // Form states for student PBL creation
  const [projectTitle, setProjectTitle] = useState('');
  const [problemTheme, setProblemTheme] = useState('Lingkungan Sekolah');
  const [problemStatement, setProblemStatement] = useState('');
  const [targetCommunity, setTargetCommunity] = useState('');
  const [aiModality, setAiModality] = useState<'text' | 'image' | 'code' | 'infographic' | 'multimodal'>('infographic');
  const [teamMembers, setTeamMembers] = useState('');

  // Prompt Strategy
  const [role, setRole] = useState('');
  const [task, setTask] = useState('');
  const [context, setContext] = useState('');
  const [format, setFormat] = useState('');

  // AI Output & Student Critical Review
  const [aiOutputSnippet, setAiOutputSnippet] = useState('');
  const [studentCriticalReview, setStudentCriticalReview] = useState('');
  const [ethicalDisclosure, setEthicalDisclosure] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Gallery interactive states
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<PBLProject | null>(null);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState<number>(5);

  // Initialize with selected template
  const applyTemplate = (templateId: string) => {
    const tmpl = PBL_PROBLEM_TEMPLATES.find((t) => t.id === templateId);
    if (!tmpl) return;

    setSelectedTemplateId(templateId);
    setProjectTitle(tmpl.title);
    setProblemTheme(tmpl.theme);
    setProblemStatement(tmpl.statement);
    setTargetCommunity(tmpl.defaultAudience);
    setAiModality(tmpl.suggestedModality);
    setRole(tmpl.defaultRole);
    setTask(tmpl.defaultTask);
    setContext(tmpl.defaultContext);
    setFormat(tmpl.defaultFormat);
    setAiOutputSnippet(tmpl.sampleAiSnippet);
    setStudentCriticalReview(tmpl.sampleCriticalReview);
    setEthicalDisclosure(tmpl.sampleEthicalDisclosure);
    setTeamMembers(`${profile.name} (Ketua Tim)`);
  };

  // Run on first load if empty
  React.useEffect(() => {
    if (!projectTitle) {
      applyTemplate('pbl-sampah-plastik');
    }
  }, []);

  const handleGenerateSolusiAI = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      const tmpl = PBL_PROBLEM_TEMPLATES.find((t) => t.id === selectedTemplateId);
      if (tmpl) {
        setAiOutputSnippet(tmpl.sampleAiSnippet);
      } else {
        setAiOutputSnippet(
          `💡 Solusi Berbasis AI Terstruktur:\n` +
          `1. Kampanye Visual: Menjangkau target "${targetCommunity}" dengan pendekatan bahasa santun.\n` +
          `2. Strategi Aksi: Menerapkan 3 langkah praktis pemecahan masalah.\n` +
          `3. Indikator Evaluasi: Mengukur perubahan perilaku komunitas secara berkala.`
        );
      }
      setIsGeneratingAi(false);
    }, 700);
  };

  const handlePublishProject = (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectTitle.trim() || !problemStatement.trim()) {
      alert('Mohon lengkapi judul dan rumusan masalah proyek.');
      return;
    }

    const newId = addPBLProject({
      title: projectTitle.trim(),
      problemTheme: problemTheme.trim(),
      problemStatement: problemStatement.trim(),
      targetCommunity: targetCommunity.trim() || 'Warga Sekolah SMA',
      aiModality,
      promptStrategy: {
        role: role.trim() || 'Edukator Siswa',
        task: task.trim() || 'Rancang solusi masalah',
        context: context.trim() || 'Siswa SMA kelas 10',
        format: format.trim() || 'Poin ringkas terstruktur'
      },
      aiOutputSnippet: aiOutputSnippet.trim() || 'Solusi teruji dengan AI.',
      studentCriticalReview: studentCriticalReview.trim() || 'Telah diverifikasi mandiri oleh tim siswa.',
      ethicalDisclosure: ethicalDisclosure.trim() || 'Draf konsep didiskusikan bersama AI dengan transparansi penuh.',
      author: profile.name,
      teamMembers: teamMembers.trim() || profile.name,
      isStudentSubmission: true
    });

    setActiveTab('gallery');
    setCurrentStep(1);
  };

  const handleSubmitReview = (projectId: string) => {
    if (!reviewComment.trim()) return;

    addPeerReview(projectId, {
      author: reviewAuthor.trim() || profile.name,
      comment: reviewComment.trim(),
      rating: reviewRating
    });

    setReviewComment('');
    setReviewAuthor('');
  };

  const filteredProjects = pblProjects.filter((p) => {
    if (galleryFilter === 'all') return true;
    if (galleryFilter === 'my') return p.author === profile.name;
    return p.aiModality === galleryFilter;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-10">
      {/* Header & Breadcrumb */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <button onClick={() => setActiveView('dashboard')} className="hover:text-cyan-400 transition">
            Dashboard
          </button>
          <span>/</span>
          <span className="text-cyan-400">Aktivitas PBL & Publikasi</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Problem-Based Learning & Publikasi Karya
            </h1>
            <p className="text-sm text-slate-300">
              Pecahkan masalah nyata di sekolah menggunakan Generative AI secara etis dan pamerkan karyamu ke galeri publikasi.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 rounded-xl bg-slate-900 p-1 border border-slate-800">
            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
                activeTab === 'studio'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Rocket className="h-4 w-4" />
              <span>Studio Proyek PBL</span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
                activeTab === 'gallery'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Galeri Publikasi ({pblProjects.length})</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'studio' ? (
        /* ================= STUDIO PROYEK PBL (5 FASE) ================= */
        <div className="space-y-8">
          {/* PBL Phase Indicator Bar */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-white">5 Tahap Inkuiri PBL Kurikulum Merdeka</span>
              <span className="text-cyan-400 font-bold">Fase {currentStep} dari 5</span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[
                { num: 1, title: 'Orientasi Masalah' },
                { num: 2, title: 'Organisasi & AI' },
                { num: 3, title: 'Co-Creation Prompt' },
                { num: 4, title: 'Uji & Kaji Kritis' },
                { num: 5, title: 'Etika & Publikasi' }
              ].map((step) => (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`h-2 rounded-full transition-all ${
                    step.num === currentStep
                      ? 'bg-cyan-400 shadow-sm shadow-cyan-400/50'
                      : step.num < currentStep
                      ? 'bg-cyan-700'
                      : 'bg-slate-800'
                  }`}
                  title={`Fase ${step.num}: ${step.title}`}
                />
              ))}
            </div>

            <div className="hidden sm:grid grid-cols-5 text-[11px] text-slate-400 gap-2 text-center pt-1">
              <span>1. Orientasi Masalah</span>
              <span>2. Peran & Modalitas AI</span>
              <span>3. Desain Prompt</span>
              <span>4. Kajian Kritis Siswa</span>
              <span>5. Publikasi & Atribusi</span>
            </div>
          </div>

          {/* Form / Step Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 space-y-6 shadow-xl">
            {/* STEP 1: ORIENTASI MASALAH */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Fase 1: Orientasi Masalah Nyata
                  </span>
                  <h2 className="text-xl font-bold text-white font-display">
                    Identifikasi Tantangan di Lingkungan Sekitarmu
                  </h2>
                  <p className="text-xs text-slate-400">
                    Pilih salah satu template studi kasus atau tentukan masalah autentik yang dihadapi sekolahmu.
                  </p>
                </div>

                {/* Templates Selection */}
                <div className="grid gap-3 sm:grid-cols-3">
                  {PBL_PROBLEM_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => applyTemplate(tmpl.id)}
                      className={`text-left rounded-xl p-4 transition border ${
                        selectedTemplateId === tmpl.id
                          ? 'border-cyan-500 bg-cyan-950/30 text-white shadow-md'
                          : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-[10px] font-semibold uppercase text-cyan-400">
                        {tmpl.theme}
                      </span>
                      <h4 className="text-xs font-bold text-white mt-1 line-clamp-1">
                        {tmpl.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {tmpl.statement}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-200">
                      Judul Proyek Inovasi PBL:
                    </label>
                    <input
                      type="text"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      placeholder="Contoh: EcoKantin: Gerakan Zero-Plastic SMA..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-200">
                        Tema Permasalahan:
                      </label>
                      <input
                        type="text"
                        value={problemTheme}
                        onChange={(e) => setProblemTheme(e.target.value)}
                        placeholder="Contoh: Lingkungan Sekolah, Literasi Digital, dll."
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-200">
                        Sasaran Komunitas / Audiens:
                      </label>
                      <input
                        type="text"
                        value={targetCommunity}
                        onChange={(e) => setTargetCommunity(e.target.value)}
                        placeholder="Contoh: Siswa kelas 10, penjual kantin..."
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-200">
                      Deskripsi Rumusan Masalah Konkret:
                    </label>
                    <textarea
                      rows={3}
                      value={problemStatement}
                      onChange={(e) => setProblemStatement(e.target.value)}
                      placeholder="Jelaskan fakta lapangan atau data awal yang ditemukan..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition"
                  >
                    <span>Lanjut ke Fase 2: Organisasi & AI</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: ORGANISASI & PERAN AI */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Fase 2: Organisasi Tim & Pemilihan Modalitas AI
                  </span>
                  <h2 className="text-xl font-bold text-white font-display">
                    Tentukan Modalitas Generative AI yang Tepat
                  </h2>
                  <p className="text-xs text-slate-400">
                    Bentuk luaran apa yang paling efektif mengomunikasikan solusi masalah kepada sasaran audiens?
                  </p>
                </div>

                {/* Modality Options */}
                <div className="grid gap-3 sm:grid-cols-4">
                  {[
                    { id: 'infographic', label: 'Infografis / Visual', desc: 'Poster edukasi, diagram alur konsep' },
                    { id: 'text', label: 'Teks & Panduan', desc: 'Modul ringkas, artikel buletin, naskah' },
                    { id: 'code', label: 'Kode Komputasi', desc: 'Kalkulator sampah, kuis interaktif' },
                    { id: 'multimodal', label: 'Multimodal', desc: 'Kombinasi cerita visual, audio, dan aksi' }
                  ].map((mod) => (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => setAiModality(mod.id as any)}
                      className={`text-left rounded-xl p-4 transition border ${
                        aiModality === mod.id
                          ? 'border-cyan-500 bg-cyan-950/30 text-white shadow-md'
                          : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <h4 className="text-xs font-bold text-white">{mod.label}</h4>
                      <p className="text-[11px] text-slate-400 mt-1">{mod.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-semibold text-slate-200">
                    Nama Anggota Kelompok / Kontributor Siswa:
                  </label>
                  <input
                    type="text"
                    value={teamMembers}
                    onChange={(e) => setTeamMembers(e.target.value)}
                    placeholder="Contoh: Rian (Ketua), Siti (Peneliti Data), Budi (Kreatif)"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500">
                    Problem-Based Learning mendorong kolaborasi dan pembagian peran nyata antarsiswa.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Kembali</span>
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition"
                  >
                    <span>Lanjut ke Fase 3: Desain Prompt</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CO-CREATION PROMPT */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Fase 3: Penyelidikan & Desain Prompt Terstruktur
                  </span>
                  <h2 className="text-xl font-bold text-white font-display">
                    Instruksikan AI dengan Formula 4 Unsur
                  </h2>
                  <p className="text-xs text-slate-400">
                    Gunakan keterampilan prompt engineering (Role, Task, Context, Format) untuk memandu AI menghasilkan ide solusi terbaik.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-blue-400">1. Role (Peran):</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-cyan-400">2. Task (Tugas Solusi):</label>
                    <input
                      type="text"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-purple-400">3. Context (Konteks):</label>
                    <input
                      type="text"
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-emerald-400">4. Format (Bentuk):</label>
                    <input
                      type="text"
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400">
                    Uji ide solusi sebelum dianalisis:
                  </span>
                  <button
                    type="button"
                    onClick={handleGenerateSolusiAI}
                    disabled={isGeneratingAi}
                    className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{isGeneratingAi ? 'Menyintesis...' : 'Simulasi Solusi AI'}</span>
                  </button>
                </div>

                {/* AI Output Snippet Box */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-200">
                    Draf Solusi Hasil AI:
                  </label>
                  <textarea
                    rows={4}
                    value={aiOutputSnippet}
                    onChange={(e) => setAiOutputSnippet(e.target.value)}
                    placeholder="Draf solusi yang dihasilkan AI..."
                    className="w-full font-mono rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Kembali</span>
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition"
                  >
                    <span>Lanjut ke Fase 4: Kajian Kritis</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: KAJIAN KRITIS & VERIFIKASI FAKTA */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Fase 4: Kajian Kritis & Verifikasi Fakta Siswa
                  </span>
                  <h2 className="text-xl font-bold text-white font-display">
                    Manusia sebagai Penilai Utama Solusi
                  </h2>
                  <p className="text-xs text-slate-400">
                    AI hanya alat bantu. Jelaskan bagaimana timmu menyempurnakan, menguji, dan memvalidasi keakuratan data solusi di lapangan.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-amber-300">
                    Analisis Kritis Tim Siswa terhadap Draf AI:
                  </label>
                  <textarea
                    rows={4}
                    value={studentCriticalReview}
                    onChange={(e) => setStudentCriticalReview(e.target.value)}
                    placeholder="Contoh: Kami memeriksa kebenaran data di perpustakaan... Ide stamp card kami sesuaikan dengan kapasitas kantin..."
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-white focus:border-cyan-400 focus:outline-none leading-relaxed"
                  />
                  <p className="text-[11px] text-slate-500">
                    Catat apa saja kelebihan ide AI, keterbatasannya, serta penyesuaian yang timmu lakukan.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Kembali</span>
                  </button>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition"
                  >
                    <span>Lanjut ke Fase 5: Publikasi & Atribusi</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: ETIKA & PUBLIKASI */}
            {currentStep === 5 && (
              <form onSubmit={handlePublishProject} className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Fase 5: Deklarasi Etika & Publikasi Galeri Kelas
                  </span>
                  <h2 className="text-xl font-bold text-white font-display">
                    Publikasikan Solusi Inovasimu ke Galeri Siswa
                  </h2>
                  <p className="text-xs text-slate-400">
                    Sertakan pernyataan transparansi AI sesuai prinsip integritas akademik SMA.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Deklarasi Transparansi & Atribusi AI (AI Disclosure):</span>
                  </div>
                  <textarea
                    rows={3}
                    value={ethicalDisclosure}
                    onChange={(e) => setEthicalDisclosure(e.target.value)}
                    placeholder="Contoh: Konsep draf awal digenerasi dengan bantuan AI, seluruh pengujian lapangan dan kesimpulan akhir dilakukan secara orisinal oleh tim siswa..."
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>

                {/* Summary of Project before submit */}
                <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-4 space-y-2 text-xs text-slate-300">
                  <h4 className="font-bold text-white font-display text-sm">
                    Ringkasan Proyek yang Akan Dipamerkan:
                  </h4>
                  <p><strong className="text-cyan-300">Judul:</strong> {projectTitle}</p>
                  <p><strong className="text-cyan-300">Tema & Sasaran:</strong> {problemTheme} · {targetCommunity}</p>
                  <p><strong className="text-cyan-300">Penyusun:</strong> {profile.name} ({teamMembers})</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Kembali</span>
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20"
                  >
                    <Rocket className="h-4 w-4" />
                    <span>Publikasikan Karya ke Galeri (+100 XP)</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
        /* ================= GALERI PUBLIKASI & PAMERAN KELAS ================= */
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white font-display">
                Pameran Karya Inovasi Siswa
              </h2>
              <p className="text-xs text-slate-400">
                Jelajahi karya PBL teman sekelas, berikan apresiasi, dan tulis masukan konstruktif (peer review).
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'Semua Karya' },
                { id: 'infographic', label: 'Infografis' },
                { id: 'text', label: 'Teks & Panduan' },
                { id: 'my', label: 'Karya Saya' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setGalleryFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition border ${
                    galleryFilter === f.id
                      ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300 font-semibold'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-5 transition hover:border-slate-700 shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold uppercase text-cyan-400">
                      {project.problemTheme}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {project.createdAt}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-display leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Oleh: <strong className="text-slate-300">{project.author}</strong> {project.teamMembers && `(${project.teamMembers})`}
                    </p>
                  </div>

                  {/* Problem & Solution Preview */}
                  <div className="space-y-2 text-xs">
                    <div className="rounded-lg bg-slate-950/60 p-3 border border-slate-800/80">
                      <span className="font-semibold text-slate-300">Masalah Lapangan: </span>
                      <span className="text-slate-400">{project.problemStatement}</span>
                    </div>

                    <div className="rounded-lg bg-cyan-950/20 p-3 border border-cyan-500/20">
                      <span className="font-semibold text-cyan-300">Solusi AI yang Divalidasi: </span>
                      <p className="text-slate-300 font-mono text-[11px] mt-1 whitespace-pre-line line-clamp-3">
                        {project.aiOutputSnippet}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-400 bg-slate-950/40 p-2.5 rounded border border-slate-800">
                      <span className="font-semibold text-amber-300">Analisis Siswa: </span>
                      {project.studentCriticalReview}
                    </div>

                    <div className="text-[10px] text-emerald-400 flex items-center gap-1.5 pt-1">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{project.ethicalDisclosure}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Interactions: Likes, Reviews count, and Detail Modal trigger */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => likePBLProject(project.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition"
                      title="Beri apresiasi (Like)"
                    >
                      <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                      <span>{project.likes}</span>
                    </button>

                    <button
                      onClick={() => setSelectedProjectForDetail(project)}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>{project.reviews.length} Ulasan</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedProjectForDetail(project)}
                    className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
                  >
                    <span>Buka Lembar PBL</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DETAIL MODAL & PEER REVIEW FORM */}
      {selectedProjectForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 print:p-0 print:bg-white">
          <div className="flex flex-col h-[90vh] max-h-[780px] w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden print:border-none print:shadow-none">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/80 print:hidden">
              <div className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-cyan-400" />
                <span className="text-sm font-bold text-white font-display">
                  Lembar Portofolio Publikasi PBL
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Cetak / PDF</span>
                </button>
                <button
                  onClick={() => setSelectedProjectForDetail(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable Document */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-300 print:text-slate-900 print:p-8">
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold uppercase text-cyan-400 print:text-cyan-800">
                  {selectedProjectForDetail.problemTheme}
                </span>
                <h2 className="text-xl font-bold text-white print:text-slate-900 font-display">
                  {selectedProjectForDetail.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-slate-400 print:text-slate-600 text-[11px]">
                  <span>Penyusun: <strong>{selectedProjectForDetail.author}</strong></span>
                  <span>·</span>
                  <span>Sasaran: {selectedProjectForDetail.targetCommunity}</span>
                  <span>·</span>
                  <span>Tanggal: {selectedProjectForDetail.createdAt}</span>
                </div>
              </div>

              {/* 1. Problem Statement */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-white print:text-slate-900 text-xs uppercase tracking-wider">
                  1. Rumusan Masalah Autentik:
                </h4>
                <p className="bg-slate-950/70 print:bg-slate-100 p-3.5 rounded-lg border border-slate-800 leading-relaxed">
                  {selectedProjectForDetail.problemStatement}
                </p>
              </div>

              {/* 2. Co-Creation AI Strategy */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-white print:text-slate-900 text-xs uppercase tracking-wider">
                  2. Strategi Prompt Engineering & Solusi AI:
                </h4>
                <div className="bg-slate-950/70 print:bg-slate-100 p-3.5 rounded-lg border border-slate-800 space-y-2 font-mono text-[11px] leading-relaxed whitespace-pre-line text-cyan-200 print:text-cyan-900">
                  {selectedProjectForDetail.aiOutputSnippet}
                </div>
              </div>

              {/* 3. Student Critical Analysis */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-white print:text-slate-900 text-xs uppercase tracking-wider">
                  3. Kajian Kritis & Uji Lapangan Siswa:
                </h4>
                <p className="bg-slate-950/70 print:bg-slate-100 p-3.5 rounded-lg border border-slate-800 leading-relaxed">
                  {selectedProjectForDetail.studentCriticalReview}
                </p>
              </div>

              {/* 4. Ethical Disclosure */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-white print:text-slate-900 text-xs uppercase tracking-wider">
                  4. Atribusi & Deklarasi Transparansi AI:
                </h4>
                <div className="flex items-start gap-2 bg-emerald-950/30 print:bg-emerald-50 p-3 rounded-lg border border-emerald-500/30 text-emerald-300 print:text-emerald-900">
                  <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
                  <p>{selectedProjectForDetail.ethicalDisclosure}</p>
                </div>
              </div>

              {/* 5. Peer Reviews Section */}
              <div className="space-y-4 pt-4 border-t border-slate-800 print:hidden">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>Ulasan Teman Sejawat ({selectedProjectForDetail.reviews.length})</span>
                  <span className="text-cyan-400 font-normal">Apresiasi Kolaboratif</span>
                </h4>

                {/* Review List */}
                <div className="space-y-2.5">
                  {selectedProjectForDetail.reviews.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">Belum ada ulasan. Jadilah yang pertama memberikan masukan!</p>
                  ) : (
                    selectedProjectForDetail.reviews.map((rev) => (
                      <div key={rev.id} className="rounded-lg bg-slate-950/60 p-3 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-white">{rev.author}</span>
                          <span className="text-amber-400">{'★'.repeat(rev.rating)}</span>
                        </div>
                        <p className="text-xs text-slate-300">{rev.comment}</p>
                        <span className="text-[10px] text-slate-500">{rev.createdAt}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Review Box */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
                  <span className="text-xs font-semibold text-white">Tulis Ulasan Konstruktif (+20 XP):</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nama reviewer (misal: Rian - Kelas 10-A)..."
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white focus:outline-none flex-1"
                    />
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-xs text-amber-300"
                    >
                      <option value={5}>★★★★★ (5)</option>
                      <option value={4}>★★★★☆ (4)</option>
                      <option value={3}>★★★☆☆ (3)</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Tulis kritik/saran membangun untuk tim..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white focus:outline-none flex-1"
                    />
                    <button
                      onClick={() => handleSubmitReview(selectedProjectForDetail.id)}
                      className="flex items-center gap-1 rounded-lg bg-cyan-500 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Kirim</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
