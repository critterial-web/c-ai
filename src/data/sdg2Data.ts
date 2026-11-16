export interface HeroMetric {
  value: string;
  unit: string;
  label: string;
  context: string;
}

export interface SimulationParams {
  precisionAg: number; // 0 - 100 (%)
  coldChain: number; // 0 - 100 (%)
  wasteReduction: number; // 0 - 100 (%)
  climateStress: number; // 0 - 100 (%)
}

export interface SimulationPreset {
  id: string;
  stageLabel: string;
  title: string;
  description: string;
  params: SimulationParams;
}

export interface PillarItem {
  id: string;
  category: 'akses' | 'gizi' | 'pertanian' | 'inovasi';
  categoryLabel: string;
  code: string;
  title: string;
  summary: string;
  actionMetric: string;
  studentRole: string;
}

export interface QuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PledgeAction {
  id: string;
  title: string;
  detail: string;
  foodSavedKgPerYear: number;
  co2ReducedKgPerYear: number;
}

export const HERO_METRICS: HeroMetric[] = [
  {
    value: '733',
    unit: 'juta jiwa',
    label: 'Penduduk dunia terdampak kelaparan',
    context: 'Laporan SOFI FAO 2024',
  },
  {
    value: '30%',
    unit: 'total pangan',
    label: 'Hilang atau terbuang di rantai pasok',
    context: 'Estimasi UNEP Food Waste Index',
  },
  {
    value: '2.100',
    unit: 'kkal/hari',
    label: 'Standar kecukupan energi per kapita',
    context: 'Acuan Angka Kecukupan Gizi Nasional',
  },
  {
    value: '2030',
    unit: 'target global',
    label: 'Batas pencapaian nol kelaparan',
    context: 'Agenda Pembangunan Berkelanjutan PBB',
  },
];

export const SIMULATION_PRESETS: SimulationPreset[] = [
  {
    id: 'baseline',
    stageLabel: 'Tahap 1',
    title: 'Kondisi Dasar',
    description:
      'Menggambarkan sistem pangan konvensional dengan ketergantungan cuaca sedang dan kehilangan pascapanen rata-rata.',
    params: {
      precisionAg: 40,
      coldChain: 45,
      wasteReduction: 35,
      climateStress: 35,
    },
  },
  {
    id: 'elnino',
    stageLabel: 'Tahap 2',
    title: 'Tekanan Iklim',
    description:
      'Simulasi musim kemarau panjang akibat El Niño yang menekan hasil panen padi dan meningkatkan kerusakan distribusi.',
    params: {
      precisionAg: 30,
      coldChain: 40,
      wasteReduction: 30,
      climateStress: 80,
    },
  },
  {
    id: 'innovation',
    stageLabel: 'Tahap 3',
    title: 'Inovasi Berkelanjutan',
    description:
      'Penerapan irigasi presisi, gudang pendingin desa, dan gerakan nol limbah pangan di sekolah maupun rumah tangga.',
    params: {
      precisionAg: 85,
      coldChain: 85,
      wasteReduction: 85,
      climateStress: 35,
    },
  },
];

export const PILLAR_ITEMS: PillarItem[] = [
  {
    id: 't21',
    category: 'akses',
    categoryLabel: 'Akses Pangan',
    code: 'Target 2.1',
    title: 'Menjamin Akses Pangan Aman & Bergizi Sepanjang Tahun',
    summary:
      'Menghilangkan kelaparan serta memastikan masyarakat rentan, termasuk anak-anak dan keluarga berpenghasilan rendah, memperoleh pangan cukup setiap hari.',
    actionMetric: 'Fokus: Stabilitas pasokan & keterjangkauan harga',
    studentRole: 'Menginisiasi program berbagi makanan layak konsumsi berlebih dari kegiatan sekolah.',
  },
  {
    id: 't22',
    category: 'gizi',
    categoryLabel: 'Gizi & Stunting',
    code: 'Target 2.2',
    title: 'Mengakhiri Segala Bentuk Malnutrisi & Stunting',
    summary:
      'Menangani kekurangan gizi kronis (stunting), kekurangan berat badan (wasting), serta defisiensi zat besi dan mikronutrien pada remaja putri dan balita.',
    actionMetric: 'Fokus: Diversifikasi protein nabati, hewani, & sayuran',
    studentRole: 'Mengkampanyekan isi piring seimbang di kantin sekolah tanpa dominasi makanan ultra-proses.',
  },
  {
    id: 't23',
    category: 'pertanian',
    categoryLabel: 'Pertanian Berkelanjutan',
    code: 'Target 2.3 & 2.4',
    title: 'Produktivitas Petani Kecil & Pertanian Adaptif Iklim',
    summary:
      'Meningkatkan pendapatan petani skala kecil dan menerapkan praktik tanam tangguh terhadap kekeringan, banjir, serta menjaga kesuburan tanah.',
    actionMetric: 'Fokus: Efisiensi air irigasi & pupuk hayati',
    studentRole: 'Mengembangkan sensor kelembapan tanah sederhana berbasis mikrokontroler untuk kebun sekolah.',
  },
  {
    id: 'inv1',
    category: 'inovasi',
    categoryLabel: 'Inovasi Pelajar',
    code: 'Inovasi 01',
    title: 'Hidroponik Vertikal & Akuaponik Lahan Sempit Sekolah',
    summary:
      'Memanfaatkan sudut pekarangan sekolah untuk menanam sawi, pakcoy, dan selada tanpa tanah dengan sirkulasi air hemat hingga 80% dibanding lahan terbuka.',
    actionMetric: 'Hasil panen: ±12 kg sayuran segar per siklus 30 hari',
    studentRole: 'Dikelola bergilir oleh tim piket ekstrakurikuler KIR atau OSIS.',
  },
  {
    id: 'inv2',
    category: 'inovasi',
    categoryLabel: 'Inovasi Pelajar',
    code: 'Inovasi 02',
    title: 'Bank Pangan Kantin & Audit Limbah Makanan Siswa',
    summary:
      'Menimbang sisa makanan di tempat pembuangan kantin setiap minggu untuk memetakan menu terbuang dan menyalurkan roti atau makanan utuh yang belum terjual.',
    actionMetric: 'Potensi pengurangan limbah: 35% dalam 1 semester',
    studentRole: 'Menggunakan pencatatan harian digital dan papan refleksi di area makan siswa.',
  },
  {
    id: 'inv3',
    category: 'inovasi',
    categoryLabel: 'Inovasi Pelajar',
    code: 'Inovasi 03',
    title: 'Komposter Bio-Enzim dari Sisa Sayur & Buah Kantin',
    summary:
      'Mengolah kulit buah dan sisa potongan sayur dapur sekolah menjadi pupuk cair organik yang langsung digunakan kembali untuk kebun tanaman pangan sekolah.',
    actionMetric: 'Siklus tertutup: 0 limbah organik ke TPA',
    studentRole: 'Mengintegrasikan praktik biologi dan kimia kelas XI dalam pengelolaan sampah organik.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'Konsep Dasar SDG 2',
    question:
      'Apa fokus utama dari Tujuan Pembangunan Berkelanjutan (SDG) nomor 2 yang dicanangkan PBB hingga tahun 2030?',
    options: [
      'Menyediakan energi listrik bersih untuk seluruh wilayah pedesaan',
      'Mengakhiri kelaparan, mencapai ketahanan pangan, memperbaiki nutrisi, dan mempromosikan pertanian berkelanjutan',
      'Membangun infrastruktur transportasi antarkota untuk perdagangan ekspor',
      'Mengurangi emisi karbon sektor industri berat sebesar 50%',
    ],
    correctIndex: 1,
    explanation:
      'SDG 2 (Zero Hunger) memiliki empat pilar utama: mengakhiri kelaparan, menjamin ketahanan pangan, meningkatkan gizi (menurunkan stunting), dan mendorong pertanian berkelanjutan.',
  },
  {
    id: 2,
    topic: 'Food Loss vs Food Waste',
    question:
      'Manakah contoh yang paling tepat menggambarkan "Food Waste" (sampah makanan di tingkat konsumen) dibanding "Food Loss"?',
    options: [
      'Padi membusuk di gudang petani karena atap bocor sebelum didistribusikan',
      'Sayuran layu di truk pengangkut karena tidak ada sistem pendingin',
      'Nasi dan lauk yang diambil berlebih di piring kantin lalu dibuang karena tidak habis',
      'Tanaman jagung gagal panen akibat serangan hama wereng',
    ],
    correctIndex: 2,
    explanation:
      'Food loss terjadi pada tahap produksi, pascapanen, dan distribusi sebelum sampai ke ritel/konsumen, sedangkan food waste terjadi di tingkat ritel dan konsumsi akhir.',
  },
  {
    id: 3,
    topic: 'Nutrisi & Stunting',
    question:
      'Mengapa pemenuhan gizi beragam (termasuk protein, zat besi, dan sayuran) pada masa remaja dan 1.000 hari pertama kehidupan sangat penting dalam Target 2.2?',
    options: [
      'Agar konsumsi kalori harian hanya bergantung pada karbohidrat sederhana',
      'Untuk mencegah stunting, anemia, serta mendukung pertumbuhan fisik dan kognitif optimal',
      'Supaya harga beras di pasar internasional terus mengalami kenaikan',
      'Untuk menggantikan kebutuhan air bersih dalam rumah tangga',
    ],
    correctIndex: 1,
    explanation:
      'Target 2.2 tidak hanya mengukur rasa kenyang dari kalori, tetapi kualitas mikronutrien dan protein guna mencegah stunting pada balita dan anemia pada remaja.',
  },
  {
    id: 4,
    topic: 'Pertanian Adaptif Iklim',
    question:
      'Bagaimana inovasi teknologi pertanian presisi membantu petani menghadapi ancaman kekeringan ekstrem akibat perubahan iklim?',
    options: [
      'Menambah dosis pestisida kimia sintetis setiap minggu tanpa pengukuran',
      'Menggunakan sensor kelembapan tanah dan irigasi tetes agar air tersalurkan tepat sesuai kebutuhan tanaman',
      'Membakar lahan gambut untuk memperluas area tanam secara instan',
      'Mengganti seluruh tanaman lokal dengan satu jenis komoditas monokultur',
    ],
    correctIndex: 1,
    explanation:
      'Irigasi presisi dan sensor kelembapan memangkas pemborosan air secara drastis sekaligus menjaga produktivitas panen saat curah hujan tidak menentu.',
  },
  {
    id: 5,
    topic: 'Peran Pelajar SMA',
    question:
      'Langkah konkret apa yang paling efektif dilakukan siswa kelas XI di lingkungan sekolah untuk mendukung SDG 2 secara langsung?',
    options: [
      'Memesan makanan secara berlebihan saat jam istirahat agar terlihat meriah',
      'Mengambil porsi makan secukupnya, mengomposkan sisa organik kantin, dan merintis kebun hidroponik sekolah',
      'Mengabaikan informasi kedaluwarsa pada bahan pangan kemasan',
      'Menunggu kebijakan pemerintah pusat tanpa melakukan aksi lokal apa pun',
    ],
    correctIndex: 1,
    explanation:
      'Aksi pelajar dimulai dari kebiasaan makan tanpa sisa, daur ulang organik kantin menjadi kompos, serta inovasi budidaya pangan lokal skala sekolah.',
  },
];

export const PLEDGE_ACTIONS: PledgeAction[] = [
  {
    id: 'habiskan',
    title: 'Habiskan porsi makan harian tanpa menyisakan nasi dan lauk',
    detail: 'Mengambil porsi sesuai kebutuhan energi agar tidak menjadi limbah rumah tangga.',
    foodSavedKgPerYear: 18,
    co2ReducedKgPerYear: 45,
  },
  {
    id: 'wadah',
    title: 'Bawa wadah makan ulang untuk membungkus sisa makanan layak',
    detail: 'Mencegah makanan berlebih di acara sekolah atau kantin berakhir di tempat sampah.',
    foodSavedKgPerYear: 12,
    co2ReducedKgPerYear: 30,
  },
  {
    id: 'lokal',
    title: 'Prioritaskan pangan lokal beragam (jagung, singkong, ubi, tempe)',
    detail: 'Mengurangi ketergantungan pada satu jenis komoditas dan rantai distribusi panjang.',
    foodSavedKgPerYear: 10,
    co2ReducedKgPerYear: 36,
  },
  {
    id: 'kompos',
    title: 'Pilah sampah organik kantin untuk kompos kebun sekolah',
    detail: 'Mengembalikan unsur hara ke tanah dan menekan gas metana di TPA.',
    foodSavedKgPerYear: 15,
    co2ReducedKgPerYear: 38,
  },
  {
    id: 'edukasi',
    title: 'Ajak minimal 3 teman sebaya menerapkan tantangan piring bersih',
    detail: 'Melipatgandakan dampak perubahan perilaku di komunitas kelas XI.',
    foodSavedKgPerYear: 22,
    co2ReducedKgPerYear: 55,
  },
];

export function computeFoodSimulation(params: SimulationParams, monthIndex: number) {
  // Base agricultural capacity (kkal/kapita/hari) before losses
  const climatePenalty = params.climateStress * 0.42; // up to -42% yield pressure
  const precisionBoost = params.precisionAg * 0.34; // up to +34% resilience & yield boost
  const rawProductionKkal = Math.max(1150, 2750 * (1 - climatePenalty / 100 + precisionBoost / 100));

  // Post-harvest & distribution loss: baseline 28%, reduced by coldChain
  const postHarvestLossPct = Math.max(4, Math.round(28 - params.coldChain * 0.23));
  const afterDistributionKkal = rawProductionKkal * (1 - postHarvestLossPct / 100);

  // Consumer food waste: baseline 20%, reduced by wasteReduction
  const consumerWastePct = Math.max(3, Math.round(20 - params.wasteReduction * 0.17));
  const netAvailableKkal = Math.round(afterDistributionKkal * (1 - consumerWastePct / 100));

  // Generate 12-month trajectory with seasonal fluctuation around harvest cycles
  const monthlySeries = Array.from({ length: 12 }, (_, i) => {
    const seasonalWave = Math.sin((i / 12) * Math.PI * 2) * (110 + params.climateStress * 1.4 - params.precisionAg * 0.6);
    const reserveDrift = ((netAvailableKkal - 2100) * 0.08) * (i / 11);
    const val = Math.round(Math.max(950, Math.min(3400, netAvailableKkal + seasonalWave + reserveDrift)));
    return {
      month: i + 1,
      label: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'][i],
      kkal: val,
    };
  });

  const activeKkal = monthlySeries[monthIndex]?.kkal ?? netAvailableKkal;
  const sufficiencyRatio = Math.round((activeKkal / 2100) * 100);

  let status: 'optimal' | 'warning' | 'critical' = 'optimal';
  let statusLabel = 'SWASEMBADA OPTIMAL';
  if (activeKkal < 1850) {
    status = 'critical';
    statusLabel = 'DEFISIT PANGAN KRITIS';
  } else if (activeKkal < 2100) {
    status = 'warning';
    statusLabel = 'RAWAN PANGAN SEDANG';
  }

  // Determine main insight / bottleneck
  let bottleneckText =
    'Sistem pangan berada dalam keseimbangan baik. Cadangan kalori per kapita melampaui standar kecukupan 2.100 kkal/hari.';
  if (params.climateStress >= 65 && params.precisionAg < 60) {
    bottleneckText =
      'Tekanan kekeringan tinggi memangkas produksi hulu. Meningkatkan teknologi pertanian presisi (irigasi hemat air & varietas tahan kering) menjadi prioritas utama.';
  } else if (postHarvestLossPct >= 18) {
    bottleneckText =
      'Kehilangan pascapanen dan distribusi masih tinggi (' +
      postHarvestLossPct +
      '%). Penguatan rantai dingin dan lumbung penyimpanan desa dapat menyelamatkan ratusan kalori per kapita.';
  } else if (consumerWastePct >= 13) {
    bottleneckText =
      'Pemborosan pangan di tingkat konsumsi (' +
      consumerWastePct +
      '%) menggerus cadangan gizi. Edukasi porsi makan dan distribusi pangan berlebih sangat efektif menutup celah ini.';
  } else if (activeKkal < 2100) {
    bottleneckText =
      'Ketersediaan energi harian masih di bawah ambang 2.100 kkal. Kombinasikan efisiensi rantai dingin dan pengurangan limbah konsumsi untuk memulihkan surplus.';
  }

  return {
    rawProductionKkal: Math.round(rawProductionKkal),
    postHarvestLossPct,
    afterDistributionKkal: Math.round(afterDistributionKkal),
    consumerWastePct,
    netAvailableKkal,
    activeKkal,
    sufficiencyRatio,
    status,
    statusLabel,
    bottleneckText,
    monthlySeries,
  };
}
