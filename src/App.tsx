import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { HERO_METRICS } from './data/sdg2Data';
import { FoodSystemSimulator } from './components/FoodSystemSimulator';
import { PillarExplorer } from './components/PillarExplorer';
import { QuizAndPledge } from './components/QuizAndPledge';
import { ResilientImage } from './components/ResilientImage';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 flex flex-col">
      {/* Top Navigation Bar: Strict 3-zone contract */}
      <header className="sticky top-0 z-30 bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (single text element) */}
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('beranda');
            }}
            className="font-display text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
          >
            LumbungNusa
          </a>

          {/* Zone 2: 4 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600" aria-label="Navigasi utama">
            <a
              href="#beranda"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('beranda');
              }}
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Beranda
            </a>
            <a
              href="#simulasi"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('simulasi');
              }}
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Simulasi Pangan
            </a>
            <a
              href="#pilar"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('pilar');
              }}
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Pilar SDG 2
            </a>
            <a
              href="#kuis-aksi"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('kuis-aksi');
              }}
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Kuis & Aksi
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('simulasi')}
              className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-white bg-amber-700 rounded-lg hover:bg-amber-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
            >
              Mulai Simulasi
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg border border-stone-300 text-stone-800 hover:bg-stone-100 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <nav
            className="md:hidden border-t border-stone-200 bg-[#FAF9F6] px-6 py-4 flex flex-col gap-3 text-sm font-medium text-stone-700"
            aria-label="Navigasi seluler"
          >
            <a
              href="#beranda"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('beranda');
              }}
              className="py-1.5 hover:text-stone-900"
            >
              Beranda
            </a>
            <a
              href="#simulasi"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('simulasi');
              }}
              className="py-1.5 hover:text-stone-900"
            >
              Simulasi Pangan
            </a>
            <a
              href="#pilar"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('pilar');
              }}
              className="py-1.5 hover:text-stone-900"
            >
              Pilar SDG 2
            </a>
            <a
              href="#kuis-aksi"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('kuis-aksi');
              }}
              className="py-1.5 hover:text-stone-900"
            >
              Kuis & Aksi
            </a>
          </nav>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="beranda" className="py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left Column: Editorial Lead */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-4">
                  <span className="font-medium text-amber-800">SDG 2: Tanpa Kelaparan</span>
                  <span aria-hidden="true">·</span>
                  <span>Inovasi Pelajar SMA Kelas XI</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-[1.12] text-balance mb-5">
                  Mewujudkan Ketahanan Pangan dari Sekolah hingga Lumbung Desa
                </h1>

                <p className="text-base text-stone-600 leading-relaxed max-w-xl mb-8">
                  Kelaparan bukan hanya soal kurangnya panen, tetapi juga hilangnya bahan pangan di rantai distribusi dan terbuangnya makanan di meja makan. Jelajahi simulasi sistem pangan, pelajari target gizi nasional, dan rancang aksi nyata sebagai pelajar.
                </p>

                <div className="flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={() => scrollToSection('simulasi')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg bg-amber-700 text-white hover:bg-amber-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
                  >
                    <span>Jelajahi Simulator</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <a
                    href="#pilar"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('pilar');
                    }}
                    className="text-sm font-medium text-stone-800 hover:text-amber-800 underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
                  >
                    Pelajari Pilar & Inovasi
                  </a>
                </div>
              </div>

              {/* Right Column: Documentary Hero Photography */}
              <div className="lg:col-span-6">
                <div className="relative h-full min-h-[280px] sm:min-h-[360px] rounded-xl overflow-hidden border border-stone-200 bg-stone-200">
                  <ResilientImage
                    src="/src/assets/images/hero_sustainable_rice_terrace_1794819955189.jpg"
                    alt="Lanskap sawah terasering Indonesia saat matahari terbit dengan saluran irigasi berkelanjutan"
                    fallbackTitle="Pertanian Berkelanjutan Nusantara"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-14">
                    <p className="text-xs text-amber-200 font-medium mb-1">
                      Fokus Pertanian Adaptif Iklim
                    </p>
                    <p className="text-sm text-white leading-snug max-w-md">
                      Menjaga keberlanjutan produksi pangan lokal melalui pengelolaan air irigasi dan pengurangan kehilangan pascapanen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Quantitative Strip */}
            <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HERO_METRICS.map((metric) => (
                <div key={metric.label} className="bg-white border border-stone-200 rounded-xl p-5">
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="font-mono text-2xl font-semibold text-stone-900 tabular-nums">
                      {metric.value}
                    </span>
                    <span className="text-xs font-medium text-amber-800">{metric.unit}</span>
                  </div>
                  <p className="text-sm font-medium text-stone-800 leading-snug mb-1">
                    {metric.label}
                  </p>
                  <p className="text-xs text-stone-500">{metric.context}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1: Interactive Food System Simulator */}
        <FoodSystemSimulator />

        {/* Section 2: SDG 2 Targets & Student Innovations */}
        <PillarExplorer />

        {/* Section 3: Interactive Quiz & Student Pledge Calculator */}
        <QuizAndPledge />
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-stone-200 bg-[#FAF9F6] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-display text-sm font-semibold text-stone-900">LumbungNusa</p>
            <p className="text-xs text-stone-500 mt-1">
              Media edukasi interaktif SDG 2: Tanpa Kelaparan untuk karya inovasi pelajar SMA kelas XI.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-stone-600">
            <a
              href="#beranda"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('beranda');
              }}
              className="hover:text-stone-900"
            >
              Beranda
            </a>
            <a
              href="#simulasi"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('simulasi');
              }}
              className="hover:text-stone-900"
            >
              Simulasi
            </a>
            <a
              href="#pilar"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('pilar');
              }}
              className="hover:text-stone-900"
            >
              Pilar SDG 2
            </a>
            <a
              href="#kuis-aksi"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('kuis-aksi');
              }}
              className="hover:text-stone-900"
            >
              Kuis & Komitmen
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
