import { useState } from 'react';
import { PILLAR_ITEMS, PillarItem } from '../data/sdg2Data';
import { ResilientImage } from './ResilientImage';

type FilterType = 'all' | PillarItem['category'];

const FILTER_TABS: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'Semua Topik' },
  { id: 'akses', label: 'Akses Pangan' },
  { id: 'gizi', label: 'Gizi & Stunting' },
  { id: 'pertanian', label: 'Pertanian Berkelanjutan' },
  { id: 'inovasi', label: 'Inovasi Pelajar' },
];

export function PillarExplorer() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredItems =
    filter === 'all' ? PILLAR_ITEMS : PILLAR_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="pilar" className="py-16 md:py-24 border-t border-stone-200 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading & Interactive Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-amber-800 tracking-wide mb-2">
              02. Peta Target SDG 2 & Praktik Baik Sekolah
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-stone-900 tracking-tight text-balance">
              Dari Target Global PBB ke Inovasi Siswa Kelas XI
            </h2>
            <p className="mt-2 text-sm md:text-base text-stone-600 leading-relaxed">
              SDG 2 tidak hanya berbicara soal produksi beras nasional, tetapi juga kualitas gizi, ketangguhan iklim, dan aksi nyata di lingkungan sekolah.
            </p>
          </div>

          <div
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-stone-200/70 rounded-lg self-start lg:self-auto"
            role="tablist"
            aria-label="Filter pilar dan inovasi SDG 2"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(tab.id)}
                  className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 ${
                    isActive
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Evidence Strip: Two Documentary Photo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <article className="bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col">
            <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
              <ResilientImage
                src="/src/assets/images/card_school_hydroponics_1794819957449.jpg"
                alt="Kebun hidroponik vertikal siswa SMA dengan tanaman sayuran hijau segar"
                fallbackTitle="Kebun Hidroponik Vertikal Sekolah"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span>Budidaya Lahan Sempit</span>
                <span aria-hidden="true">·</span>
                <span>Proyek Ekstrakurikuler SMA</span>
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">
                Hidroponik Sekolah sebagai Laboratorium Pangan Hidup
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Siswa dapat mempraktikkan pengukuran pH nutrisi, sirkulasi air tertutup, dan panen sayuran bebas pestisida untuk kebutuhan kantin atau masyarakat sekitar sekolah.
              </p>
            </div>
          </article>

          <article className="bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col">
            <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
              <ResilientImage
                src="/src/assets/images/card_local_food_harvest_1794819955648.jpg"
                alt="Beragam bahan pangan lokal bergizi seperti beras merah, bayam segar, kedelai, dan jagung dalam wadah anyaman bambu"
                fallbackTitle="Diversifikasi Pangan Lokal Bergizi"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span>Target 2.2 · Diversifikasi Gizi</span>
                <span aria-hidden="true">·</span>
                <span>Pangan Lokal Nusantara</span>
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">
                Kembali ke Keragaman Pangan Lokal Kaya Mikronutrien
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Mengombinasikan beras merah, jagung, kacang kedelai, dan sayuran hijau lokal membantu memenuhi zat besi, serat, serta protein nabati untuk mencegah malnutrisi remaja.
              </p>
            </div>
          </article>
        </div>

        {/* Filterable Pillar & Innovation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                  <span className="font-medium text-amber-800">{item.code}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.categoryLabel}</span>
                </div>
                <h3 className="text-base font-semibold text-stone-900 leading-snug mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-4">{item.summary}</p>
              </div>

              <div className="pt-4 border-t border-stone-200 space-y-1.5">
                <p className="text-xs font-medium text-stone-800">{item.actionMetric}</p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Peran Siswa: {item.studentRole}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
