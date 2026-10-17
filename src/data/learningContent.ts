import { 
  ClassificationItem, 
  AITypeInfo, 
  SimulationStep, 
  PromptTemplatePreset, 
  EthicsScenario, 
  QuizQuestion, 
  GlossaryItem, 
  Badge 
} from '../types';

export const BADGES_DATA: Badge[] = [
  {
    id: 'ai-beginner',
    title: 'AI Beginner',
    description: 'Berhasil memahami konsep dasar dan membedakan Generative AI.',
    iconName: 'Compass',
    unlocked: false,
    criteria: 'Selesaikan Modul 1 atau peroleh 100 XP pertama Anda.'
  },
  {
    id: 'prompt-explorer',
    title: 'Prompt Explorer',
    description: 'Menguasai 4 unsur prompt engineering untuk instruksi yang presisi.',
    iconName: 'Terminal',
    unlocked: false,
    criteria: 'Eksperimen dan susun prompt terstruktur di Modul 4.'
  },
  {
    id: 'ai-safety-guardian',
    title: 'AI Safety Guardian',
    description: 'Menunjukkan komitmen terhadap etika, privasi, dan kejujuran akademik.',
    iconName: 'ShieldCheck',
    unlocked: false,
    criteria: 'Tuntaskan seluruh 5 skenario etika di Modul 5 dengan bijak.'
  },
  {
    id: 'generative-ai-master',
    title: 'Generative AI Master',
    description: 'Mencapai nilai luar biasa pada tantangan kuis pemahaman AI.',
    iconName: 'Award',
    unlocked: false,
    criteria: 'Selesaikan Kuis Tantangan Modul 6 dengan nilai minimal 80%.'
  }
];

export const MODULES_OVERVIEW = [
  {
    id: 1,
    title: 'What Is Generative AI?',
    sub: 'Pengertian, Perbedaan, & Ragam Penerapan',
    timeEst: '8 menit',
    xpReward: 120,
    icon: 'Sparkles',
    desc: 'Pahami apa itu AI, bedakan AI pembuat konten dengan AI pengenal pola, dan coba uji pemahamanmu.'
  },
  {
    id: 2,
    title: 'Types of Generative AI',
    sub: '5 Kategori Konten Hasil Generasi AI',
    timeEst: '10 menit',
    xpReward: 150,
    icon: 'Layers',
    desc: 'Jelajahi keajaiban Text, Image, Audio, Video, dan Code Generation dengan studi kasus di sekolah.'
  },
  {
    id: 3,
    title: 'Inside the AI',
    sub: 'Simulasi Visual Alur Kerja Model Generatif',
    timeEst: '10 menit',
    xpReward: 160,
    icon: 'Cpu',
    desc: 'Intip bagaimana model AI memproses token kata dan memprediksi pola kata demi kata menjadi cerita utuh.'
  },
  {
    id: 4,
    title: 'Prompt Engineering Lab',
    sub: 'Formula 4 Unsur: Role, Task, Context, Format',
    timeEst: '12 menit',
    xpReward: 180,
    icon: 'Code2',
    desc: 'Laboratorium interaktif menyusun instruksi presisi agar AI memberikan jawaban paling cerdas dan relevan.'
  },
  {
    id: 5,
    title: 'AI Ethics & Safety',
    sub: 'Dilema Siswa, Plagiarisme, & Etika Belajar',
    timeEst: '10 menit',
    xpReward: 150,
    icon: 'ShieldAlert',
    desc: 'Pecahkan 5 skenario nyata di lingkungan sekolah. Pelajari cara menggunakan AI secara jujur dan aman.'
  },
  {
    id: 6,
    title: 'Knowledge Challenge',
    sub: '10 Soal Kuis Pemahaman Kurikulum SMA',
    timeEst: '10 menit',
    xpReward: 200,
    icon: 'CheckCircle2',
    desc: 'Uji seluruh wawasan yang sudah kamu pelajari dan raih gelar lencana Generative AI Master!'
  }
];

export const MODULE_1_ITEMS: ClassificationItem[] = [
  {
    id: 'm1-1',
    scenario: 'AI yang menghasilkan cerita pendek baru dan kreatif berdasarkan instruksi pengguna.',
    type: 'generative',
    label: 'Generative AI',
    explanation: 'Benar! Sistem ini menciptakan konten teks baru yang sebelumnya belum pernah ada berdasarkan instruksi (prompt).'
  },
  {
    id: 'm1-2',
    scenario: 'AI kamera smartphone yang mendeteksi dan memberi label apakah sebuah foto berisi kucing atau anjing.',
    type: 'classification',
    label: 'AI Klasifikasi',
    explanation: 'Tepat! Sistem ini tidak membuat foto baru, melainkan menganalisis gambar yang sudah ada dan mengelompokkannya ke dalam kategori (label).'
  },
  {
    id: 'm1-3',
    scenario: 'AI yang melukis pemandangan kota futuristik bernuansa cyberpunk dari deskripsi teks yang diketik siswa.',
    type: 'generative',
    label: 'Generative AI',
    explanation: 'Hebat! Ini adalah Generative AI (Image Generation) yang mengubah deskripsi bahasa manusia menjadi visual gambar baru.'
  },
  {
    id: 'm1-4',
    scenario: 'Sistem BMKG yang memperkirakan kemungkinan turun hujan besok berdasarkan data suhu, kelembaban, dan angin historis.',
    type: 'prediction',
    label: 'AI Prediksi',
    explanation: 'Tepat! Sistem ini melakukan prediksi nilai masa depan (forecasting) berdasarkan pola data masa lalu, bukan menciptakan karya kreatif baru.'
  },
  {
    id: 'm1-5',
    scenario: 'Filter email sekolah yang secara otomatis memindahkan email mencurigakan ke folder Spam.',
    type: 'classification',
    label: 'AI Klasifikasi',
    explanation: 'Benar! Email diklasifikasikan ke dalam 2 kelas: "Spam" atau "Bukan Spam" (Klasifikasi biner).'
  },
  {
    id: 'm1-6',
    scenario: 'AI yang menciptakan aransemen musik instrumen lo-fi baru berdurasi 2 menit untuk menemani siswa belajar.',
    type: 'generative',
    label: 'Generative AI',
    explanation: 'Tepat! Musik tersebut digubah dan disintesis secara baru oleh model generatif audio berdasarkan instruksi gaya dan tempo.'
  }
];

export const MODULE_2_TYPES: AITypeInfo[] = [
  {
    id: 'text',
    title: 'Text Generation',
    tagline: 'Kata, Cerita, & Dialog Cerdas',
    icon: 'FileText',
    color: 'from-blue-500/20 to-cyan-500/10 text-cyan-400 border-cyan-500/30',
    description: 'Model generatif teks (seperti Large Language Model) dilatih pada miliaran kalimat untuk memahami bahasa manusia dan menghasilkan tulisan baru: artikel, puisi, terjemahan, dialog, dan ringkasan materi pelajaran.',
    schoolApplication: 'Membantu membuat draf esai, merangkum bab buku yang panjang, menyusun kuis latihan mandiri, atau menjelaskan rumus matematika rumit dengan bahasa yang lebih sederhana.',
    samplePrompt: 'Ringkaslah 3 hukum Newton ke dalam format tabel sederhana dengan contoh benda yang biasa ditemui di kelas SMA.',
    interactivePreview: {
      type: 'text',
      title: 'Hasil Text Generation',
      content: 'Hukum Newton I: Benda diam tetap diam (contoh: buku di atas meja tidak bergerak sampai didorong).\nHukum Newton II: F = m × a (contoh: mendorong meja yang kosong jauh lebih ringan daripada meja penuh buku).\nHukum Newton III: Aksi = Reaksi (contoh: saat kamu melompat dari lantai, kakimu menekan lantai ke bawah dan lantai mendorongmu ke atas).',
      details: 'Disintesis dalam waktu 1.2 detik oleh Language Model.'
    },
    miniQuiz: {
      question: 'Manakah tugas sekolah yang PALING TEPAT dibantu dengan AI Text Generation secara bertanggung jawab?',
      options: [
        'Meminta AI menulis seluruh makalah lalu mengumpulkannya atas namamu tanpa dibaca',
        'Meminta penjelasan konsep fotosintesis dengan analogi pabrik agar kamu lebih paham materi',
        'Meminta AI mengisi otomatis seluruh lembar ujian online'
      ],
      correctIndex: 1,
      explanation: 'Generative AI adalah rekan belajar (tutor pribadi). Menggunakannya untuk membedah konsep sulit dengan analogi melatih pemahamanmu, bukan menggantikan kejujuran akademikmu.'
    }
  },
  {
    id: 'image',
    title: 'Image Generation',
    tagline: 'Visual Kreatif dari Deskripsi Teks',
    icon: 'Image',
    color: 'from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30',
    description: 'Model seperti Diffusion Model belajar bagaimana gambar terbentuk dari bintik-bintik acak (noise) dan belajar membersihkan noise tersebut hingga menjadi gambar utuh yang sesuai dengan deskripsi teks (prompt) pengguna.',
    schoolApplication: 'Mendesain poster pameran OSIS, membuat ilustrasi visual untuk presentasi Biologi (misal struktur sel mitokondria), atau membuat storyboard untuk tugas Seni Budaya.',
    samplePrompt: 'Ilustrasi 3D struktur molekul DNA yang memancarkan cahaya biru neon di laboratorium biologi sekolah, gaya infografis edukasi modern.',
    interactivePreview: {
      type: 'image',
      title: 'Pratinjau Gambar AI',
      content: 'Ilustrasi DNA Helix Hologram bercahaya dengan struktur adenin, timin, sitosin, dan guanin berwarna kontras untuk presentasi Biologi SMA.',
      details: 'Dihasilkan menggunakan Diffusion Model dari teks prompt.'
    },
    miniQuiz: {
      question: 'Bagaimana model Image Generation (seperti model Difusi) menghasilkan gambar?',
      options: [
        'Mengambil potongan gambar foto orang di internet lalu menempelnya seperti kliping',
        'Menghapus noise bintik acak secara bertahap sambil menyesuaikannya dengan makna teks prompt',
        'Menyalin satu gambar persis dari Google Images'
      ],
      correctIndex: 1,
      explanation: 'Model difusi bekerja dengan mempelajari proses denoisasi: memoles titik-titik noise acak secara matematis hingga membentuk pola visual baru yang sesuai teks instruksi.'
    }
  },
  {
    id: 'audio',
    title: 'Audio Generation',
    tagline: 'Suara Sintetis & Komposisi Musik',
    icon: 'Headphones',
    color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
    description: 'Generative AI audio dapat mengubah teks menjadi suara manusia alami (Text-to-Speech), menciptakan suara instrumen orkestra, hingga menggubah lagu orisinal sesuai ketukan per menit (BPM) dan emosi yang diminta.',
    schoolApplication: 'Membuat narasi suara (voiceover) otomatis untuk video tugas presentasi Sejarah, menciptakan musik latar video drama sekolah tanpa melanggar hak cipta.',
    samplePrompt: 'Ciptakan musik latar instrumental piano akustik yang tenang dengan tempo 65 BPM untuk mengiringi pembacaan puisi kemerdekaan.',
    interactivePreview: {
      type: 'audio',
      title: 'Pratinjau Audio Waveform',
      content: 'Synthesized Voiceover: "Selamat pagi rekan-rekan SMA. Hari ini kita akan menjelajahi evolusi tata surya..." [Frekuensi 44.1 kHz, Nada Natural]',
      details: 'Audio disintesis dari teks narasi tugas presentasi.'
    },
    miniQuiz: {
      question: 'Apa keuntungan menggunakan audio generasi AI untuk proyek video sekolah?',
      options: [
        'Dapat membajak lagu artis terkenal tanpa izin siapapun',
        'Bisa mendapatkan musik orisinal bebas royalti atau narasi sulih suara yang sesuai kebutuhan',
        'Bisa memalsukan suara guru untuk izin tidak masuk sekolah'
      ],
      correctIndex: 1,
      explanation: 'AI Audio memungkinkan siswa membuat musik latar dan sulih suara orisinal bebas copyright secara etis untuk kebutuhan edukasi.'
    }
  },
  {
    id: 'video',
    title: 'Video Generation',
    tagline: 'Animasi & Gerak Dinamis',
    icon: 'Video',
    color: 'from-rose-500/20 to-red-500/10 text-rose-400 border-rose-500/30',
    description: 'Teknologi generasi video mutakhir mampu menciptakan klip gerak pendek dari satu gambar diam atau deskripsi teks, memprediksi bagaimana cahaya, bayangan, dan objek bergerak dari frame ke frame secara fisik.',
    schoolApplication: 'Memvisualisasikan proses sains yang tidak dapat dilihat kasat mata, seperti pergerakan lempeng tektonik gempa bumi atau simulasi letusan gunung berapi untuk tugas Geografi.',
    samplePrompt: 'Klip animasi 5 detik gerakan lempeng bumi saling bertubrukan membentuk lipatan pegunungan, tampilan penampang melintang bumi.',
    interactivePreview: {
      type: 'video',
      title: 'Simulasi Video Sequence',
      content: 'Klip 60 FPS: Lempeng litosfer perlahan bergeser, lapisan batuan melengkung ke atas membentuk barisan pegunungan lipatan Himalaya.',
      details: 'Frame-by-frame temporal prediction dari model video generatif.'
    },
    miniQuiz: {
      question: 'Tantangan terbesar yang sedang diatasi para peneliti pada AI Video Generation saat ini adalah...',
      options: [
        'Konsistensi objek dan hukum fisika antar-frame agar gerakannya tidak patah atau berubah wujud',
        'Membuat video dengan warna hitam putih saja',
        'Membuat video yang hanya bisa diputar di bioskop'
      ],
      correctIndex: 0,
      explanation: 'Menjaga konsistensi objek (misal wajah atau jumlah jari agar tidak tiba-tiba berubah saat bergerak) serta mematuhi hukum fisika adalah tantangan utama video generatif.'
    }
  },
  {
    id: 'code',
    title: 'Code Generation',
    tagline: 'Pemrograman & Logika Komputasi',
    icon: 'Terminal',
    color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    description: 'Model kode dilatih membaca jutaan baris kode sumber terbuka. AI ini mampu menerjemahkan instruksi bahasa Indonesia menjadi bahasa pemrograman seperti Python, JavaScript, atau C++, serta mendeteksi bug sintaksis.',
    schoolApplication: 'Membantu pelajaran Informatika kelas 10 dalam mempelajari sintaks Python, memahami letak kesalahan pesan error (debugging), atau membuat rumus di spreadsheet.',
    samplePrompt: 'Buatkan program Python sederhana untuk menghitung rata-rata nilai rapor 5 mata pelajaran dan tentukan apakah siswa lulus KKM 75.',
    interactivePreview: {
      type: 'code',
      title: 'Skrip Python Hasil Generasi',
      content: `nilai = [80, 85, 78, 90, 72]
rata_rata = sum(nilai) / len(nilai)
print(f"Rata-rata: {rata_rata:.2f}")

if rata_rata >= 75:
    print("Status: Lulus KKM!")
else:
    print("Status: Perlu Remedial")`,
      details: 'Kode valid dan teruji dengan komentar penjelasan alur logika.'
    },
    miniQuiz: {
      question: 'Sikap yang benar bagi siswa Informatika kelas 10 saat menggunakan AI Code Generator adalah...',
      options: [
        'Langsung copy-paste tanpa membaca atau memahami fungsi baris kodenya',
        'Membaca, meneliti alur logikanya, menguji kode di komputer, dan belajar dari penjelasannya',
        'Menyuruh AI mengerjakan seluruh proyek ujian akhir tanpa belajar konsep logika sama sekali'
      ],
      correctIndex: 1,
      explanation: 'AI adalah teman belajar logika pemrograman (pair programmer). Membaca dan memahami bagaimana kode bekerja membuat kita menjadi problem solver yang mandiri.'
    }
  }
];

export const MODULE_3_SIMULATION_STEPS: SimulationStep[] = [
  {
    stepNumber: 1,
    title: '1. Input & Tokenisasi',
    shortDesc: 'Memecah kalimat prompt pengguna menjadi potongan kecil (token).',
    details: 'Komputer tidak membaca kata seperti manusia. Kalimat prompt dipecah menjadi "token" (bisa berupa kata, imbuhan, atau suku kata) lalu diubah menjadi angka-angka vektor numerik.',
    generatedTextSoFar: 'Prompt Masuk: "Buatkan cerita pendek tentang robot yang membantu siswa di sekolah."',
    highlightComponent: 'input',
    nextTokenPredictions: [
      { token: 'Tokenisasi', probability: 0.98 },
      { token: 'Vector Embed', probability: 0.95 }
    ]
  },
  {
    stepNumber: 2,
    title: '2. Pemrosesan Konteks (Attention Mechanism)',
    shortDesc: 'Model menganalisis hubungan kata kunci: "robot", "membantu", "siswa", "sekolah".',
    details: 'Melalui mekanisme perhatian (Self-Attention pada arsitektur Transformer), model memahami bahwa cerita ini berlatar belakang di lingkungan pendidikan dan berfokus pada kerja sama positif robot dan manusia.',
    generatedTextSoFar: 'Konteks Teridentifikasi: Tokoh = Robot ramah; Latar = Sekolah SMA; Misi = Membantu belajar.',
    highlightComponent: 'attention',
    nextTokenPredictions: [
      { token: 'Di', probability: 0.65 },
      { token: 'Pagi', probability: 0.22 },
      { token: 'Bel', probability: 0.13 }
    ]
  },
  {
    stepNumber: 3,
    title: '3. Prediksi Kata demi Kata (Token Probabilities)',
    shortDesc: 'Model menghitung probabilitas kata berikutnya yang paling masuk akal.',
    details: 'Model AI tidak "mengetahui" cerita dari awal hingga akhir secara magis. Model menghitung distribusi kemungkinan kata demi kata berdasarkan triliunan pola data teks yang pernah dipelajarinya saat latihan.',
    generatedTextSoFar: 'Di sebuah SMA Nusantara, hadir sebuah robot asisten cerdas bernama',
    highlightComponent: 'prediction',
    nextTokenPredictions: [
      { token: 'Kiki', probability: 0.54 },
      { token: 'Orion', probability: 0.28 },
      { token: 'Budi', probability: 0.11 },
      { token: 'Nexa', probability: 0.07 }
    ]
  },
  {
    stepNumber: 4,
    title: '4. Sintesis Cerita Lengkap',
    shortDesc: 'Rangkaian token yang diprediksi tersusun menjadi paragraf yang utuh dan mengalir.',
    details: 'Setelah proses prediksi berulang ratusan kali dalam hitungan detik, cerita selesai dirajut dengan alur pembuka, konflik ringan, dan resolusi yang harmonis sesuai instruksi awal.',
    generatedTextSoFar: 'Di sebuah SMA Nusantara, hadir sebuah robot asisten cerdas bernama Kiki. Dengan layar wajah ramah dan tangan mekanik yang presisi, Kiki tidak menggantikan guru, melainkan mendampingi siswa di lab sains. Ketika Doni kesulitan menyeimbangkan neraca kimia, sensor Kiki membimbing tangannya dengan sabar. Suasana kelas menjadi lebih hidup karena setiap siswa berani bereksplorasi tanpa takut berbuat salah.',
    highlightComponent: 'output'
  },
  {
    stepNumber: 5,
    title: '5. Evaluasi & Pengawasan Manusia',
    shortDesc: 'Siswa memeriksa fakta, kesesuaian pesan, dan keindahan bahasa.',
    details: 'Tahap paling krusial! AI tidak memiliki kesadaran emosional. Manusia harus menjadi editor: memeriksa apakah ceritanya masuk akal, tidak mengandung halusinasi, dan sesuai dengan tujuan belajar yang diinginkan.',
    generatedTextSoFar: 'Hasil Cerita Terverifikasi: Bahasa santun, relevan dengan dunia sekolah, dan menyampaikan pesan kolaborasi positif antara sains dan kemanusiaan.',
    highlightComponent: 'evaluation'
  }
];

export const PROMPT_PRESETS: PromptTemplatePreset[] = [
  {
    id: 'biologi',
    subject: 'Biologi',
    title: 'Konsep Fotosintesis Tumbuhan',
    components: {
      role: 'Bertindaklah sebagai Guru Biologi SMA yang ramah dan inspiratif.',
      task: 'Jelaskan mekanisme reaksi terang dan reaksi gelap pada fotosintesis.',
      context: 'Untuk siswa kelas 10 yang baru pertama kali mempelajari bab metabolisme sel.',
      format: 'Gunakan 4 poin ringkas, 1 analogi dapur memasak makanan, dan 1 pertanyaan refleksi di akhir.'
    },
    simulatedResponse: `Halo teman-teman kelas 10! Mari kita pahami fotosintesis dengan mudah! 🌱☀️

### 4 Poin Kunci Mekanisme Fotosintesis:
1. **Reaksi Terang (Pagi/Siang Hari):** Terjadi di membran tilakoid kloroplas. Klorofil menyerap foton cahaya matahari untuk memecah molekul air (H₂O) menjadi oksigen (O₂) dan menghasilkan energi siap pakai (ATP & NADPH).
2. **Oksigen Dilepaskan:** Gas oksigen segar yang kamu hirup di pagi hari adalah "produk sampingan" berharga dari tahap reaksi terang ini!
3. **Reaksi Gelap / Siklus Calvin:** Terjadi di stroma kloroplas. Tidak membutuhkan cahaya langsung, tetapi memanfaatkan energi (ATP & NADPH) dari tahap terang untuk merangkai gas CO₂ menjadi glukosa (makanan tumbuhan).
4. **Hasil Akhir:** Tumbuhan mendapatkan energi cadangan berupa amilum/glukosa, dan biosfer bumi mendapatkan oksigen!

🍳 **Analogi Dapur Sederhana:**
Bayangkan daun adalah sebuah dapur restoran:
- Reaksi terang itu seperti **menyalakan kompor listrik** menggunakan energi panel surya untuk memanaskan panci.
- Reaksi gelap itu seperti **meracik bahan masakan (CO₂)** di atas kompor panas tadi sampai menjadi sepiring nasi goreng lezat (Glukosa).

❓ **Pertanyaan Refleksi Siswa:**
"Jika sebuah tanaman disimpan di ruangan gelap total selama seminggu namun disiram air secukupnya, mengapa tanaman tersebut tetap akan layu dan mati?"`,
    weakPrompt: 'Jelaskan fotosintesis.',
    weakResponse: 'Fotosintesis adalah proses biokimia pembentukan karbohidrat dari bahan anorganik yang dilakukan oleh tumbuhan, terutama tumbuhan yang mengandung zat hijau daun yaitu klorofil. Reaksi kimia: 6CO2 + 6H2O -> C6H12O6 + 6O2. Terdiri dari fotolisis air dan siklus Calvin-Benson.'
  },
  {
    id: 'sejarah',
    subject: 'Sejarah Indonesia',
    title: 'Peristiwa Rengasdengklok 1945',
    components: {
      role: 'Bertindaklah sebagai sejarawan muda yang suka mendongeng kisah dramatis.',
      task: 'Ceritakan latar belakang peristiwa Rengasdengklok pada Agustus 1945.',
      context: 'Untuk bahan diskusi kelompok mata pelajaran Sejarah kelas 10 SMA.',
      format: 'Buat dalam 3 babak singkat (Pemicu, Penculikan, Kesepakatan) dengan gaya narasi seru.'
    },
    simulatedResponse: `🇮🇩 **Dibalik Detik-Detik Kemerdekaan: Misteri Rengasdengklok**

### Babak 1: Pemicu (Berita Radio yang Mengguncang)
14 Agustus 1945, Jepang menyerah tanpa syarat pada Sekutu setelah Hiroshima dan Nagasaki hancur. Berita ini bocor! Pemuda Indonesia seperti Sutan Sjahrir dan Chaerul Saleh mendengar siaran radio gelap. Muncul perdebatan sengit: Golongan Muda ingin kemerdekaan diproklamasikan saat itu juga, sementara Bung Karno dan Bung Hatta (Golongan Tua) ingin berkonsultasi dulu dengan PPKI agar tidak terjadi pertumpahan darah dengan tentara Jepang yang masih bersenjata lengkap.

### Babak 2: Penculikan Dini Hari
Pukul 04.00 subuh tanggal 16 Agustus 1945, para pemuda memutuskan langkah nekat. Mereka "menculik" Soekarno dan Hatta ke Rengasdengklok, Karawang. Tujuannya bukan untuk mencelakai, melainkan menjauhkan kedua bapak bangsa dari pengaruh dan bujuk rayu militer Jepang! Di gubuk sederhana milik seorang petani, diskusi hangat berlanjut demi masa depan bangsa.

### Babak 3: Kesepakatan Bersejarah
Mr. Ahmad Soebardjo dari Jakarta datang menjemput dengan jaminan nyawa: Proklamasi akan dilaksanakan paling lambat esok hari, 17 Agustus 1945 pukul 10.00 pagi di Pegangsaan Timur No. 56. Rombongan pun kembali ke Jakarta untuk merumuskan naskah proklamasi.`,
    weakPrompt: 'Kapan peristiwa rengasdengklok?',
    weakResponse: 'Peristiwa Rengasdengklok terjadi pada tanggal 16 Agustus 1945 di mana Soekarno dan Hatta dibawa ke Rengasdengklok oleh golongan muda seperti Sukarni dan Chaerul Saleh.'
  },
  {
    id: 'matematika',
    subject: 'Matematika',
    title: 'Logaritma dalam Kehidupan Nyata',
    components: {
      role: 'Bertindaklah sebagai tutor matematika yang gemar menghubungkan rumus dengan dunia nyata.',
      task: 'Jelaskan konsep dasar logaritma dan mengapa logaritma diciptakan manusia.',
      context: 'Siswa kelas 10 sering bertanya: "Untuk apa saya belajar logaritma di sekolah?"',
      format: 'Berikan 1 definisi tanpa rumus rumit, 2 aplikasi nyata (skala gempa Richter & desibel suara), dan 1 tips cara menghitung.'
    },
    simulatedResponse: `📐 **Mengapa Kamu Belajar Logaritma? (Bukan Cuma Rumus di Kertas!)**

### 💡 Definisi Simpel:
Jika pangkat adalah perkalian berulang ($2^3 = 8$), maka **logaritma adalah pertanyaan sebaliknya**: *"Dua harus dikalikan berapa kali dengan dirinya sendiri agar menghasilkan 8?"* Jawabannya: 3! Jadi, $^2\log 8 = 3$. Logaritma adalah alat matematika untuk "mengecilkan angka-angka raksasa" agar mudah dibaca manusia.

### 🌍 2 Penerapan Hebat di Dunia Nyata:
1. **Skala Richter Gempa Bumi (BMKG):**
   Gempa berkekuatan 6 SR bukan berarti cuma sedikit lebih kuat dari gempa 5 SR. Karena menggunakan skala logaritmik basis 10, gempa 6 SR memiliki energi getaran **10 kali lipat** lebih dahsyat dari 5 SR, dan gempa 7 SR adalah **100 kali lipat** lebih dahsyat!
2. **Tingkat Kebisingan Suara (Desibel - dB):**
   Telinga manusia dapat mendengar desis daun gugur (10 dB) hingga suara mesin jet pesawat (140 dB). Tanpa skala logaritma, grafik suara akan sangat panjang hingga bermeter-meter!

✨ **Tips Mengingat:** Setiap kali melihat tanda $\log$, tanyakan dalam hati: *"Berapa pangkatnya?"*`,
    weakPrompt: 'Apa rumus logaritma?',
    weakResponse: 'Logaritma adalah kebalikan eksponensial. a^c = b ekuivalen dengan ^a log b = c dengan syarat a>0, a!=1, b>0.'
  },
  {
    id: 'informatika',
    subject: 'Informatika',
    title: 'Algoritma Searching & Sorting',
    components: {
      role: 'Bertindaklah sebagai mentor Software Engineer ramah untuk siswa SMA.',
      task: 'Bandingkan Linear Search vs Binary Search dalam mencari data.',
      context: 'Materi Berpikir Komputasional SMA Kelas 10 Kurikulum Merdeka.',
      format: 'Gunakan analogi mencari nomor halaman di buku tebal dan tampilkan perbedaan kompleksitas secara intuitif.'
    },
    simulatedResponse: `💻 **Berpikir Komputasional: Linear Search vs Binary Search**

Bayangkan kamu sedang memegang buku kamus tebal setebal 1.000 halaman dan mencari kata *"Generatif"*:

### 1. Linear Search (Pencarian Berurutan)
- **Caranya:** Kamu membuka dari halaman 1, lalu halaman 2, 3, 4, sampai 1.000 satu per satu.
- **Kapan Digunakan:** Jika buku kamusmu halamannya berantakan dan tidak urut abjad.
- **Kelemahan:** Jika kata yang dicari ada di halaman 999, kamu harus membalik halaman 999 kali! Sangat lambat.

### 2. Binary Search (Pencarian Bagi Dua)
- **Syarat Mutlak:** Data HARUS sudah terurut (misal A sampai Z).
- **Caranya:** Langsung buka halaman tengah (halaman 500). Apakah huruf G ada di kiri atau kanan? Di kiri! Maka buang 500 halaman di sebelah kanan. Dari 500 halaman tersisa, bagi dua lagi (halaman 250), dan ulangi.
- **Keajaiban:** Di kamus 1.000 halaman, kamu paling banyak hanya perlu membalik buku **10 kali saja!** ($2^{10} \approx 1024$).

🎯 **Pesan Mentor:** Inilah mengapa programmer selalu menyortir data terlebih dahulu agar pencarian menjadi secepat kilat!`,
    weakPrompt: 'Apa beda linear dan binary search?',
    weakResponse: 'Linear search O(N) mencari satu persatu data tidak terurut. Binary search O(log N) membagi dua rentang pencarian pada array terurut.'
  }
];

export const MODULE_5_ETHICS_SCENARIOS: EthicsScenario[] = [
  {
    id: 'eth-1',
    title: 'Skenario 1: Memahami Materi yang Sulit',
    situation: 'Bayu kesulitan memahami konsep Hukum Termodinamika dari buku paket sekolahnya. Besok ada sesi diskusi kelas.',
    studentDilemma: 'Bagaimana cara Bayu menggunakan Generative AI secara tepat?',
    choices: [
      {
        id: 'c1-a',
        label: 'A',
        text: 'Meminta AI menjelaskan konsep tersebut dengan analogi mesin motor dan membuatkan 3 pertanyaan latihan untuk menguji pemahamannya sendiri.',
        isResponsible: true,
        consequence: 'Luar Biasa! Bayu menggunakan AI sebagai tutor privat interaktif untuk memperdalam pemahaman konsep.',
        ethicalPrinciple: 'AI sebagai Alat Bantu Belajar Mandiri'
      },
      {
        id: 'c1-b',
        label: 'B',
        text: 'Menyerah membaca buku dan membiarkan AI yang memikirkan semuanya saat ujian besok.',
        isResponsible: false,
        consequence: 'Kurang tepat. Saat ujian tanpa gawai, Bayu tidak akan memiliki bekal konsep di otaknya.',
        ethicalPrinciple: 'Ketergantungan Pasif'
      }
    ]
  },
  {
    id: 'eth-2',
    title: 'Skenario 2: Mengumpulkan Tugas Sekolah',
    situation: 'Dina mendapat tugas menulis esai 500 kata tentang dampak perubahan iklim di Indonesia. Waktu pengumpulan tinggal 1 jam lagi.',
    studentDilemma: 'Dina meminta AI membuat esai lengkap 500 kata. Apa yang harus Dina lakukan selanjutnya?',
    choices: [
      {
        id: 'c2-a',
        label: 'A',
        text: 'Langsung menyalin seluruh teks AI, memberi namanya di sampul, dan mengumpulkan tanpa memeriksa isinya.',
        isResponsible: false,
        consequence: 'Pelanggaran Akademik! Ini adalah plagiarisme dan penipuan intelektual. Dina tidak belajar apa-apa dan berisiko mendapat nilai 0.',
        ethicalPrinciple: 'Integritas Akademik & Anti-Plagiarisme'
      },
      {
        id: 'c2-b',
        label: 'B',
        text: 'Menggunakan draf AI sebagai inspirasi kerangka ide, menulis kembali dengan kalimat dan pemikirannya sendiri, serta memverifikasi data faktanya.',
        isResponsible: true,
        consequence: 'Tindakan Tepat! Dina mengasah kemampuan sintesis dan tetap menjadi pemilik sejati karya tulis tersebut.',
        ethicalPrinciple: 'Orisinalitas & Penulisan Bertanggung Jawab'
      }
    ]
  },
  {
    id: 'eth-3',
    title: 'Skenario 3: Perlindungan Data Pribadi & Privasi',
    situation: 'Fikri ingin meminta saran AI untuk menyelesaikan perselisihan antara dua teman sekelasnya.',
    studentDilemma: 'Informasi apa yang boleh dimasukkan Fikri ke dalam prompt AI?',
    choices: [
      {
        id: 'c3-a',
        label: 'A',
        text: 'Memasukkan nama lengkap teman, nomor HP, foto wajah mereka, dan tangkapan layar chat pribadi tanpa izin mereka.',
        isResponsible: false,
        consequence: 'Sangat Berbahaya! Data yang diunggah ke AI publik dapat disimpan atau digunakan untuk melatih model, melanggar privasi teman dan UU Perlindungan Data Pribadi.',
        ethicalPrinciple: 'Privasi & Keamanan Data (Data Privacy)'
      },
      {
        id: 'c3-b',
        label: 'B',
        text: 'Menyamarkan nama (misal "Siswa A dan Siswa B"), menghapus semua data pribadi, dan hanya mendiskusikan dinamika komunikasinya secara umum.',
        isResponsible: true,
        consequence: 'Sangat Bijak! Fikri melindungi identitas temannya sambil tetap mendapatkan perspektif mediasi yang bermanfaat.',
        ethicalPrinciple: 'Anonimisasi Data & Tanggung Jawab Moral'
      }
    ]
  },
  {
    id: 'eth-4',
    title: 'Skenario 4: Transparansi Karya Visual AI',
    situation: 'Sarah menggunakan AI Image Generator untuk membuat ilustrasi cover mading sekolah bertema pahlawan nasional.',
    studentDilemma: 'Bagaimana etika Sarah dalam mencantumkan karya tersebut di majalah dinding?',
    choices: [
      {
        id: 'c4-a',
        label: 'A',
        text: 'Mengklaim kepada guru dan teman bahwa ia melukis sendiri secara manual menggunakan kuas cat air digital berjam-jam.',
        isResponsible: false,
        consequence: 'Tidak Jujur! Berbohong mengenai proses penciptaan merusak kepercayaan teman dan guru.',
        ethicalPrinciple: 'Kejujuran & Transparansi'
      },
      {
        id: 'c4-b',
        label: 'B',
        text: 'Menuliskan keterangan: "Ilustrasi dikonsep oleh Sarah, digenerasi menggunakan bantuan Generative AI dengan prompt kurasi khusus."',
        isResponsible: true,
        consequence: 'Sikap Teladan! Transparansi adalah nilai utama kreator era modern. Menghargai teknologi sekaligus menghargai kejujuran.',
        ethicalPrinciple: 'Keterbukaan Atribusi (AI Disclosure)'
      }
    ]
  },
  {
    id: 'eth-5',
    title: 'Skenario 5: Menghadapi Halusinasi Fakta AI',
    situation: 'AI memberikan jawaban bahwa "Proklamasi Indonesia dibacakan di Istana Merdeka pada 17 Agustus 1945 oleh Soekarno dan Jenderal Sudirman".',
    studentDilemma: 'Teks AI terlihat sangat meyakinkan dan bahasanya rapi. Apa yang harus dilakukan siswa?',
    choices: [
      {
        id: 'c5-a',
        label: 'A',
        text: 'Langsung mempercayainya karena AI komputer pasti tidak pernah salah ketik atau keliru fakta.',
        isResponsible: false,
        consequence: 'Keliru Fatal! AI generatif sering mengalami "Halusinasi" (mengarang informasi yang terdengar meyakinkan padahal salah secara sejarah). Proklamasi dibacakan di Jl. Pegangsaan Timur 56 bersama Moh. Hatta.',
        ethicalPrinciple: 'Bahaya Halusinasi AI (AI Hallucination)'
      },
      {
        id: 'c5-b',
        label: 'B',
        text: 'Melakukan verifikasi silang (cross-check) dengan buku Sejarah resmi Kemendikbud dan sumber arsip tepercaya sebelum mencatatnya.',
        isResponsible: true,
        consequence: 'Berpikir Kritis Juara! Siswa yang cerdas selalu memposisikan akal budi manusianya sebagai verifikator akhir atas keluaran AI.',
        ethicalPrinciple: 'Verifikasi Sumber & Skeptisisme Sehat'
      }
    ]
  }
];

export const MODULE_6_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Apa definisi yang paling tepat mengenai Generative AI?',
    options: [
      'Sistem komputer yang hanya berfungsi menghitung rumus matematika dengan cepat',
      'Teknologi AI yang mampu menciptakan konten baru seperti teks, gambar, audio, atau kode berdasarkan data yang dipelajarinya',
      'Robot fisik berbahan besi yang menggantikan seluruh pekerjaan guru di sekolah',
      'Aplikasi antivirus yang menghapus virus dan malware dari laptop'
    ],
    correctIndex: 1,
    topic: 'Definisi AI',
    explanation: 'Generative AI adalah cabang kecerdasan buatan yang berfokus pada pembuatan (sintesis) konten orisinal baru dari instruksi pengguna, bukan sekadar memproses data pasif.'
  },
  {
    id: 2,
    question: 'Manakah di bawah ini yang merupakan contoh sistem AI Klasifikasi (BUKAN Generative AI)?',
    options: [
      'Aplikasi yang menulis dongeng fabel baru untuk anak-anak',
      'Model yang melukis pemandangan matahari terbenam di planet Mars',
      'Sistem presensi wajah sekolah yang mengenali apakah wajah di depan kamera adalah siswa yang terdaftar',
      'Sistem yang mengarang lagu pop orisinal dari lirik yang kamu ketik'
    ],
    correctIndex: 2,
    topic: 'Klasifikasi vs Generasi',
    explanation: 'Sistem presensi wajah melakukan klasifikasi/pengenalan pola wajah yang cocok dengan database, bukan menciptakan wajah baru dari ketiadaan.'
  },
  {
    id: 3,
    question: 'Model AI generatif teks (seperti Large Language Model) pada dasarnya bekerja dengan prinsip...',
    options: [
      'Menyimpan seluruh buku perpustakaan dunia di dalam flashdisk dan mencari tombol copy-paste',
      'Memiliki perasaan sadar seperti manusia yang sedang melamun di kamar',
      'Mempelajari pola bahasa dari data latih dan memprediksi probabilitas kata/token berikutnya yang paling sesuai konteks',
      'Menebak secara acak tanpa aturan tata bahasa sama sekali'
    ],
    correctIndex: 2,
    topic: 'Cara Kerja Model',
    explanation: 'LLM adalah model statistik canggih yang memprediksi kelanjutan token kata paling mungkin berdasarkan bobot probabilitas matematika dari data pelatihan masif.'
  },
  {
    id: 4,
    question: 'Dalam Prompt Engineering, apa fungsi dari unsur "Role"?',
    options: [
      'Menentukan batas maksimal jumlah kata dalam jawaban AI',
      'Memerintahkan AI untuk mengambil kepribadian, keahlian, atau sudut pandang profesional tertentu',
      'Memberikan kata sandi rahasia untuk membuka kunci database',
      'Mematikan koneksi internet pada server AI'
    ],
    correctIndex: 1,
    topic: 'Prompt Engineering',
    explanation: 'Unsur Role (misal: "Bertindaklah sebagai guru biologi ramah") mengarahkan gaya bahasa, kedalaman materi, dan perspektif AI agar jawabannya tepat sasaran.'
  },
  {
    id: 5,
    question: 'Manakah susunan prompt yang paling lengkap dan terstruktur sesuai standar prompt engineering?',
    options: [
      'Tolong jelaskan sejarah perang diponegoro.',
      'Bertindaklah sebagai pemandu museum sejarah. Jelaskan penyebab Perang Diponegoro untuk siswa kelas 10 dalam 3 poin kronologis dan sertakan 1 hikmah perjuangan.',
      'Perang diponegoro rangkum cepat!',
      'Buatkan esai panjang tentang pahlawan tanpa salah.'
    ],
    correctIndex: 1,
    topic: 'Prompt Engineering',
    explanation: 'Opsi kedua memiliki Role (pemandu museum), Task (jelaskan penyebab), Context (siswa kelas 10), dan Format (3 poin kronologis + 1 hikmah).'
  },
  {
    id: 6,
    question: 'Fenomena ketika Generative AI memberikan jawaban yang tampak sangat meyakinkan dan rapi padahal isinya salah fakta disebut...',
    options: [
      'Overclocking',
      'AI Hallucination (Halusinasi AI)',
      'System Reboot',
      'Bug Blue Screen'
    ],
    correctIndex: 1,
    topic: 'Keterbatasan AI',
    explanation: 'Halusinasi AI adalah kondisi ketika model mengarang fakta fiktif atau tanggal yang salah karena sifatnya yang memprediksi kemiripan teks, bukan mencari kebenaran mutlak.'
  },
  {
    id: 7,
    question: 'Mengapa kita DILARANG memasukkan data pribadi seperti nomor NIK, foto KTP, atau rahasia keluarga ke dalam layanan AI daring publik?',
    options: [
      'Karena server AI akan langsung meledak jika membaca angka KTP',
      'Karena data yang dimasukkan dapat tersimpan di server pihak ketiga atau berpotensi digunakan kembali dalam data pelatihan model',
      'Karena AI hanya memahami bahasa Inggris dan akan error',
      'Karena ukuran file teks data pribadi terlalu berat untuk internet'
    ],
    correctIndex: 1,
    topic: 'Etika & Privasi',
    explanation: 'Layanan AI publik memproses data di cloud yang dapat terekam di log server atau digunakan untuk pelatihan lanjutan, sehingga data sensitif wajib dilindungi.'
  },
  {
    id: 8,
    question: 'Bagaimana peran ideal Generative AI dalam proses pembelajaran siswa SMA?',
    options: [
      'Sebagai pengganti belajar agar siswa tidak perlu lagi membaca buku atau berpikir',
      'Sebagai alat pembuat tugas instan untuk dikumpulkan tanpa dibaca',
      'Sebagai mitra belajar (learning copilot) untuk memancing ide, mengklarifikasi konsep rumit, dan memperluas wawasan',
      'Sebagai hiburan semata yang tidak memiliki nilai edukasi apapun'
    ],
    correctIndex: 2,
    topic: 'Pemanfaatan Edukasi',
    explanation: 'AI adalah pendorong kecerdasan manusia (intelligence amplifier), bukan pengganti proses berpikir dan daya analisis siswa.'
  },
  {
    id: 9,
    question: 'Kategori Generative AI yang dapat membantu siswa menguji dan memperbaiki kesalahan (bug) pada script Python adalah...',
    options: [
      'Audio Generation',
      'Code Generation',
      'Video Generation',
      'Image Generation'
    ],
    correctIndex: 1,
    topic: 'Tipe AI',
    explanation: 'Code Generation memiliki kapabilitas membaca, menginterpretasikan, menyusun, dan mendebug bahasa pemrograman komputer.'
  },
  {
    id: 10,
    question: 'Tindakan apa yang mencerminkan kejujuran akademik saat kamu memanfaatkan ilustrasi atau draf dari AI dalam tugas proyek sekolah?',
    options: [
      'Menghapus jejak watermark dan bersumpah bahwa itu murni buatan tangan sendiri',
      'Menyertakan catatan atribusi transparan bahwa ide dikembangkan bersama AI atau gambar digenerasikan dengan bantuan model AI',
      'Menyalahkan AI jika nanti nilai tugas sekolahnya jelek',
      'Menolak mengumpulkan tugas sama sekali'
    ],
    correctIndex: 1,
    topic: 'Integritas Akademik',
    explanation: 'Keterbukaan atribusi (AI disclosure) menghormati etika ilmiah dan membangun integritas moral siswa sebagai pelajar berkarakter.'
  }
];

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: 'Artificial Intelligence (AI)',
    category: 'Dasar',
    definition: 'Bidang ilmu komputer yang berfokus pada pembuatan sistem komputer yang mampu melakukan tugas-tugas yang biasanya membutuhkan kecerdasan manusia, seperti mengenali pola, memecahkan masalah, dan belajar.',
    analogy: 'Jika kalkulator biasa hanya bisa menghitung angka pasti, AI seperti asisten yang bisa belajar mengenali tulisan tangan angka tersebut.',
    example: 'Filter spam email, rekomendasi video YouTube, navigasi peta Google Maps.'
  },
  {
    term: 'Generative AI (Gen AI)',
    category: 'Dasar',
    definition: 'Cabang kecerdasan buatan yang berfokus menciptakan (menghasilkan) konten baru yang orisinal, seperti tulisan, gambar, musik, suara, hingga kode komputer berdasarkan instruksi pengguna.',
    analogy: 'Jika AI biasa seperti penonton yang menebak lukisan siapa, Generative AI seperti seniman yang memegang kuas dan melukis karya baru.',
    example: 'ChatGPT, Gemini, Midjourney, Claude, Suno AI.'
  },
  {
    term: 'Prompt & Prompt Engineering',
    category: 'Dasar',
    definition: 'Prompt adalah instruksi teks yang diberikan pengguna kepada model AI. Prompt Engineering adalah keterampilan merancang dan menyusun instruksi yang jelas, terstruktur, dan kaya konteks agar AI memberikan hasil paling akurat.',
    analogy: 'Seperti memesan makanan di restoran: jika hanya bilang "makanan enak", koki bingung. Jika bilang "nasi goreng pedas level 2 tanpa daun bawang", hasilnya pas di lidah.',
    example: '"Bertindaklah sebagai guru fisika, jelaskan hukum Ohm dalam 3 poin singkat untuk siswa kelas 10."'
  },
  {
    term: 'Token',
    category: 'Teknis',
    definition: 'Unit data dasar yang diproses oleh model bahasa. Token dapat berupa kata utuh, suku kata, tanda baca, atau pecahan karakter alfabet.',
    analogy: 'Seperti balok-balok lego kecil yang dirangkai untuk membangun sebuah miniatur rumah yang kokoh.',
    example: 'Kalimat "Saya belajar AI" biasanya dipecah menjadi 4 token kata oleh model bahasa.'
  },
  {
    term: 'Training Data (Data Latih)',
    category: 'Teknis',
    definition: 'Kumpulan data teks, gambar, atau audio dalam jumlah raksasa yang dimasukkan ke dalam algoritma agar model AI dapat mempelajari pola, hubungan tata bahasa, dan konsep dunia.',
    analogy: 'Seperti ribuan buku pelajaran dan ensiklopedia yang dibaca seorang siswa selama bertahun-tahun sebelum mengikuti ujian.',
    example: 'Ensiklopedia daring, buku ilmiah digital, artikel berita, dan repositori kode terbuka.'
  },
  {
    term: 'Transformer & Attention Mechanism',
    category: 'Teknis',
    definition: 'Arsitektur jaringan saraf tiruan modern yang memungkinkan AI memproses seluruh kata dalam satu kalimat sekaligus serta menimbang kata mana yang paling berhubungan dengan kata lainnya.',
    analogy: 'Seperti menyorotkan lampu senter ke kata-kata kunci di sebuah lembar ujian untuk memahami maksud soal.',
    example: 'Huruf "T" dalam kata GPT (Generative Pre-trained Transformer).'
  },
  {
    term: 'AI Hallucination (Halusinasi AI)',
    category: 'Etika',
    definition: 'Kondisi saat model Generative AI menghasilkan informasi yang keliru, tanggal fiktif, atau kutipan palsu namun disajikan dengan gaya bahasa yang sangat percaya diri dan meyakinkan.',
    analogy: 'Seperti teman yang pura-pura tahu jalan ke suatu tempat, padahal sedang mengarang arah jalan yang salah.',
    example: 'AI menyebutkan pahlawan nasional lahir di kota yang salah atau rumus kimia yang tidak ada di tabel periodik.'
  },
  {
    term: 'AI Bias (Bias Kecerdasan Buatan)',
    category: 'Etika',
    definition: 'Kecenderungan sistem AI untuk menghasilkan keputusan yang tidak adil atau stereotip tertentu akibat ketidakseimbangan atau prasangka yang ada dalam data latih masa lalu.',
    analogy: 'Jika sebuah buku cerita hanya menampilkan dokter selalu pria dan perawat selalu wanita, pembaca anak akan mengira aturan itu mutlak.',
    example: 'Algoritma perekrutan kerja yang mendiskriminasi kandidat karena latar belakang tertentu.'
  },
  {
    term: 'Large Language Model (LLM)',
    category: 'Teknis',
    definition: 'Model AI dengan miliaran parameter matematis yang dilatih khusus pada miliaran teks untuk memahami dan menghasilkan bahasa alami manusia.',
    analogy: 'Kamus bahasa raksasa yang dilengkapi otak buatan yang paham nuansa humor, formalitas, dan logika kalimat.',
    example: 'Gemini, GPT-4, Llama 3.'
  },
  {
    term: 'Diffusion Model',
    category: 'Teknis',
    definition: 'Arsitektur model AI yang digunakan untuk membuat gambar dengan cara menambahkan bintik-bintik acak (noise) ke data gambar, lalu melatih AI untuk membalikkan proses tersebut dan menghasilkan gambar jernih dari teks prompt.',
    analogy: 'Seperti mengukir patung indah dari sebongkah batu kasar dengan memahat serpihannya sedikit demi sedikit.',
    example: 'Stable Diffusion, Imagen, DALL-E.'
  },
  {
    term: 'Deepfake',
    category: 'Etika',
    definition: 'Teknologi manipulasi media berbasis AI yang dapat meniru wajah, gestur tubuh, dan suara seseorang secara realistis sehingga tampak melakukan atau mengatakan sesuatu yang sebenarnya tidak pernah terjadi.',
    analogy: 'Topeng digital canggih yang meniru orang asli dengan sangat persis.',
    example: 'Video palsu tokoh publik yang menyebarkan berita bohong atau hoaks.'
  },
  {
    term: 'AI Attribution (Atribusi Penggunaan AI)',
    category: 'Etika',
    definition: 'Pemberitahuan atau pengakuan secara jujur dan transparan kepada publik/guru bahwa sebagian dari tulisan, kode, atau visual dibuat dengan bantuan sistem Generative AI.',
    analogy: 'Seperti mencantumkan daftar pustaka di halaman belakang karya tulis ilmiah sekolah.',
    example: 'Menulis keterangan: "Infografis dikonsep penulis dan divisualisasikan dengan bantuan AI Generatif."'
  }
];
