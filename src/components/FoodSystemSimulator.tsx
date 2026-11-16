import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  OctagonAlert,
  Pause,
  Play,
  RotateCcw,
  StepForward,
} from 'lucide-react';
import {
  SIMULATION_PRESETS,
  SimulationParams,
  computeFoodSimulation,
} from '../data/sdg2Data';

export function FoodSystemSimulator() {
  const [activePresetId, setActivePresetId] = useState<string>('baseline');
  const [params, setParams] = useState<SimulationParams>(SIMULATION_PRESETS[0].params);
  const [monthIndex, setMonthIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const sim = useMemo(() => computeFoodSimulation(params, monthIndex), [params, monthIndex]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setMonthIndex((prev) => (prev + 1) % 12);
    }, 950);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const handleSelectPreset = (presetId: string) => {
    const found = SIMULATION_PRESETS.find((p) => p.id === presetId);
    if (!found) return;
    setActivePresetId(found.id);
    setParams({ ...found.params });
    setMonthIndex(0);
    setIsPlaying(false);
  };

  const handleSliderChange = (key: keyof SimulationParams, value: number) => {
    setActivePresetId('custom');
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    handleSelectPreset('baseline');
  };

  const statusConfig = {
    optimal: {
      icon: CheckCircle2,
      textClass: 'text-emerald-800',
      bgClass: 'bg-emerald-50 border-emerald-200',
    },
    warning: {
      icon: AlertTriangle,
      textClass: 'text-amber-800',
      bgClass: 'bg-amber-50 border-amber-200',
    },
    critical: {
      icon: OctagonAlert,
      textClass: 'text-rose-800',
      bgClass: 'bg-rose-50 border-rose-200',
    },
  }[sim.status];

  const StatusIcon = statusConfig.icon;

  // Chart SVG dimensions
  const chartW = 560;
  const chartH = 180;
  const padL = 46;
  const padR = 16;
  const padT = 18;
  const padB = 28;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;
  const minKkal = 900;
  const maxKkal = 3400;

  const toX = (idx: number) => padL + (idx / 11) * plotW;
  const toY = (val: number) =>
    padT + plotH - ((Math.max(minKkal, Math.min(maxKkal, val)) - minKkal) / (maxKkal - minKkal)) * plotH;

  const pathD = sim.monthlySeries
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${toX(idx).toFixed(1)} ${toY(pt.kkal).toFixed(1)}`)
    .join(' ');

  const thresholdY = toY(2100);
  const activePoint = sim.monthlySeries[monthIndex];

  const activePresetDesc =
    SIMULATION_PRESETS.find((p) => p.id === activePresetId)?.description ??
    'Mode penyesuaian mandiri aktif. Amati bagaimana perubahan parameter memengaruhi kehilangan pangan dan kecukupan kalori tahunan.';

  const strokeSpeedClass =
    sim.status === 'optimal' ? 'stroke-emerald-600' : sim.status === 'warning' ? 'stroke-amber-600' : 'stroke-rose-600';

  return (
    <section id="simulasi" className="py-16 md:py-24 border-t border-stone-200 bg-[#F4F2EC]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header + Stage Progression Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-amber-800 tracking-wide mb-2">
              01. Laboratorium Interaktif · Simulasi Sistem Pangan Daerah
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-stone-900 tracking-tight text-balance">
              Uji Bagaimana Inovasi Mengubah Ketahanan Pangan
            </h2>
            <p className="mt-2 text-sm md:text-base text-stone-600 leading-relaxed">
              Pilih skenario pembelajaran atau geser parameter di sebelah kanan untuk melihat aliran kalori dari lahan petani hingga meja makan.
            </p>
          </div>

          <div
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-stone-200/80 rounded-lg self-start lg:self-auto"
            role="tablist"
            aria-label="Tahapan skenario simulasi"
          >
            {SIMULATION_PRESETS.map((preset) => {
              const active = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 ${
                    active
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/60'
                  }`}
                >
                  {preset.stageLabel}: {preset.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Zone Sandbox Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Zone: Interactive Stage (~60-65%) */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between gap-6">
            {/* Top Status & Live Output */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-stone-200">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${statusConfig.bgClass} ${statusConfig.textClass}`}
              >
                <StatusIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{sim.statusLabel}</span>
              </div>

              <div className="flex items-baseline gap-6">
                <div>
                  <span className="block text-xs text-stone-500">
                    Ketersediaan ({activePoint.label})
                  </span>
                  <span className="font-mono text-xl font-semibold text-stone-900 tabular-nums">
                    {sim.activeKkal.toLocaleString('id-ID')} kkal/hari
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-stone-500">Rasio Kecukupan</span>
                  <span className="font-mono text-xl font-semibold text-stone-900 tabular-nums">
                    {sim.sufficiencyRatio}%
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic Food Chain Flow SVG Diagram */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-stone-900">
                  Diagram Aliran Rantai Pasok Pangan
                </h3>
                <span className="text-xs text-stone-500 font-mono tabular-nums">
                  Standar AKG: 2.100 kkal/kapita
                </span>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 overflow-x-auto">
                <svg
                  viewBox="0 0 600 155"
                  className="w-full min-w-[480px] h-auto"
                  role="img"
                  aria-label="Diagram aliran kalori pangan dari produksi hingga konsumsi"
                >
                  {/* Connecting Animated Streams */}
                  <line
                    x1="130"
                    y1="58"
                    x2="178"
                    y2="58"
                    strokeWidth="3"
                    className={`${strokeSpeedClass} animate-flow`}
                  />
                  <line
                    x1="308"
                    y1="58"
                    x2="356"
                    y2="58"
                    strokeWidth="3"
                    className={`${strokeSpeedClass} animate-flow`}
                  />
                  <line
                    x1="486"
                    y1="58"
                    x2="518"
                    y2="58"
                    strokeWidth="3"
                    className={`${strokeSpeedClass} animate-flow`}
                  />

                  {/* Loss Leakage Indicators */}
                  <line x1="243" y1="92" x2="243" y2="122" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="243" y="138" textAnchor="middle" className="fill-amber-800 text-[10px] font-mono">
                    Hilang -{sim.postHarvestLossPct}%
                  </text>

                  <line x1="421" y1="92" x2="421" y2="122" stroke="#BE123C" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="421" y="138" textAnchor="middle" className="fill-rose-800 text-[10px] font-mono">
                    Limbah -{sim.consumerWastePct}%
                  </text>

                  {/* Node 1: Produksi */}
                  <rect x="8" y="20" width="122" height="72" rx="8" fill="#FFFFFF" stroke="#D6D3CD" />
                  <text x="69" y="42" textAnchor="middle" className="fill-stone-600 text-[10px] font-medium">
                    1. Produksi Lahan
                  </text>
                  <text x="69" y="64" textAnchor="middle" className="fill-stone-900 text-[14px] font-mono font-semibold">
                    {sim.rawProductionKkal}
                  </text>
                  <text x="69" y="80" textAnchor="middle" className="fill-stone-500 text-[10px]">
                    kkal/kapita
                  </text>

                  {/* Node 2: Distribusi & Gudang */}
                  <rect x="178" y="20" width="130" height="72" rx="8" fill="#FFFFFF" stroke="#D6D3CD" />
                  <text x="243" y="42" textAnchor="middle" className="fill-stone-600 text-[10px] font-medium">
                    2. Rantai Distribusi
                  </text>
                  <text x="243" y="64" textAnchor="middle" className="fill-stone-900 text-[14px] font-mono font-semibold">
                    {sim.afterDistributionKkal}
                  </text>
                  <text x="243" y="80" textAnchor="middle" className="fill-stone-500 text-[10px]">
                    kkal pascapanen
                  </text>

                  {/* Node 3: Konsumsi */}
                  <rect x="356" y="20" width="130" height="72" rx="8" fill="#FFFFFF" stroke="#D6D3CD" />
                  <text x="421" y="42" textAnchor="middle" className="fill-stone-600 text-[10px] font-medium">
                    3. Konsumsi Bersih
                  </text>
                  <text x="421" y="64" textAnchor="middle" className="fill-stone-900 text-[14px] font-mono font-semibold">
                    {sim.netAvailableKkal}
                  </text>
                  <text x="421" y="80" textAnchor="middle" className="fill-stone-500 text-[10px]">
                    kkal terserap
                  </text>

                  {/* Node 4: Status Target */}
                  <rect
                    x="518"
                    y="20"
                    width="74"
                    height="72"
                    rx="8"
                    fill={sim.status === 'optimal' ? '#ECFDF5' : sim.status === 'warning' ? '#FFFBEB' : '#FFF1F2'}
                    stroke={sim.status === 'optimal' ? '#A7F3D0' : sim.status === 'warning' ? '#FDE68A' : '#FECDD3'}
                  />
                  <text x="555" y="44" textAnchor="middle" className="fill-stone-700 text-[10px] font-medium">
                    Target
                  </text>
                  <text x="555" y="64" textAnchor="middle" className="fill-stone-900 text-[13px] font-mono font-semibold">
                    {sim.sufficiencyRatio}%
                  </text>
                  <text x="555" y="80" textAnchor="middle" className="fill-stone-600 text-[9px]">
                    dari 2.100
                  </text>
                </svg>
              </div>
            </div>

            {/* 12-Month Projection Curve */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-sm font-semibold text-stone-900">
                  Proyeksi Ketersediaan Kalori 12 Bulan
                </h3>
                <span className="text-xs text-stone-500">
                  Klik titik bulan di grafik atau tombol langkah untuk inspeksi
                </span>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto">
                  {/* Grid lines */}
                  {[1200, 2100, 3000].map((val) => {
                    const y = toY(val);
                    const isThreshold = val === 2100;
                    return (
                      <g key={val}>
                        <line
                          x1={padL}
                          y1={y}
                          x2={chartW - padR}
                          y2={y}
                          stroke={isThreshold ? '#B7791F' : '#E4E2DC'}
                          strokeWidth={isThreshold ? 1.5 : 1}
                          strokeDasharray={isThreshold ? '4 4' : undefined}
                        />
                        <text
                          x={padL - 6}
                          y={y + 3}
                          textAnchor="end"
                          className={`text-[10px] font-mono ${isThreshold ? 'fill-amber-800 font-semibold' : 'fill-stone-500'}`}
                        >
                          {val}
                        </text>
                      </g>
                    );
                  })}

                  {/* Threshold label */}
                  <text
                    x={chartW - padR}
                    y={thresholdY - 5}
                    textAnchor="end"
                    className="fill-amber-800 text-[9px] font-medium"
                  >
                    Ambang Kecukupan (2.100 kkal)
                  </text>

                  {/* Trajectory Curve */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={sim.status === 'optimal' ? '#047857' : sim.status === 'warning' ? '#B7791F' : '#BE123C'}
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />

                  {/* Month Data Points */}
                  {sim.monthlySeries.map((pt, idx) => {
                    const cx = toX(idx);
                    const cy = toY(pt.kkal);
                    const isActive = idx === monthIndex;
                    return (
                      <g
                        key={pt.month}
                        className="cursor-pointer"
                        onClick={() => {
                          setIsPlaying(false);
                          setMonthIndex(idx);
                        }}
                      >
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isActive ? 5.5 : 3.5}
                          fill={isActive ? '#18181B' : '#FFFFFF'}
                          stroke={sim.status === 'optimal' ? '#047857' : sim.status === 'warning' ? '#B7791F' : '#BE123C'}
                          strokeWidth="2"
                        />
                        <text
                          x={cx}
                          y={chartH - 8}
                          textAnchor="middle"
                          className={`text-[10px] font-mono ${isActive ? 'fill-stone-900 font-semibold' : 'fill-stone-500'}`}
                        >
                          {pt.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Right Zone: Control & Concept Deck (~35-40%) */}
          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-stone-200 mb-5">
                <h3 className="text-base font-semibold text-stone-900">Panel Kendali Parameter</h3>
                <span className="text-xs font-mono text-stone-500 tabular-nums">
                  Bulan {monthIndex + 1}/12
                </span>
              </div>

              {/* Playback Controls */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-700 text-white hover:bg-amber-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Jeda</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Putar Proyeksi</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setMonthIndex((prev) => (prev + 1) % 12);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-stone-300 text-stone-800 bg-white hover:bg-stone-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
                >
                  <StepForward className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Langkah +1 Bulan</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-stone-300 text-stone-700 bg-white hover:bg-stone-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reset</span>
                </button>
              </div>

              {/* 4 Labeled Sliders */}
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="slider-precision" className="text-sm font-medium text-stone-800">
                      Teknologi Pertanian Presisi
                    </label>
                    <span className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                      {params.precisionAg}%
                    </span>
                  </div>
                  <input
                    id="slider-precision"
                    type="range"
                    min={0}
                    max={100}
                    value={params.precisionAg}
                    onChange={(e) => handleSliderChange('precisionAg', Number(e.target.value))}
                    className="sdg-slider"
                  />
                  <p className="mt-1 text-xs text-stone-500">
                    Irigasi tetes, sensor kelembapan tanah, dan benih tahan kering.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="slider-coldchain" className="text-sm font-medium text-stone-800">
                      Efisiensi Rantai Dingin & Gudang
                    </label>
                    <span className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                      {params.coldChain}%
                    </span>
                  </div>
                  <input
                    id="slider-coldchain"
                    type="range"
                    min={0}
                    max={100}
                    value={params.coldChain}
                    onChange={(e) => handleSliderChange('coldChain', Number(e.target.value))}
                    className="sdg-slider"
                  />
                  <p className="mt-1 text-xs text-stone-500">
                    Menekan kerusakan panen (food loss) saat penyimpanan dan distribusi.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="slider-waste" className="text-sm font-medium text-stone-800">
                      Pengurangan Limbah Konsumsi
                    </label>
                    <span className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                      {params.wasteReduction}%
                    </span>
                  </div>
                  <input
                    id="slider-waste"
                    type="range"
                    min={0}
                    max={100}
                    value={params.wasteReduction}
                    onChange={(e) => handleSliderChange('wasteReduction', Number(e.target.value))}
                    className="sdg-slider"
                  />
                  <p className="mt-1 text-xs text-stone-500">
                    Gerakan habiskan makanan & redistribusi pangan berlebih (food waste).
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="slider-climate" className="text-sm font-medium text-stone-800">
                      Intensitas Kekeringan Iklim
                    </label>
                    <span className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                      {params.climateStress}%
                    </span>
                  </div>
                  <input
                    id="slider-climate"
                    type="range"
                    min={0}
                    max={100}
                    value={params.climateStress}
                    onChange={(e) => handleSliderChange('climateStress', Number(e.target.value))}
                    className="sdg-slider"
                  />
                  <p className="mt-1 text-xs text-stone-500">
                    Tekanan anomali cuaca El Niño terhadap produktivitas lahan.
                  </p>
                </div>
              </div>
            </div>

            {/* Dynamic Concept Callout */}
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <p className="text-xs font-semibold text-stone-900 mb-1">
                Analisis Sistem Saat Ini
              </p>
              <p className="text-xs text-stone-700 leading-relaxed mb-2">{sim.bottleneckText}</p>
              <p className="text-xs text-stone-500 leading-relaxed border-t border-stone-200 pt-2">
                {activePresetDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
