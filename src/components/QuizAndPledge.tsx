import { useMemo, useState } from 'react';
import { Check, CheckCircle2, Copy, RotateCcw, XCircle } from 'lucide-react';
import { PLEDGE_ACTIONS, QUIZ_QUESTIONS } from '../data/sdg2Data';

export function QuizAndPledge() {
  // Quiz State
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Pledge Calculator State
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('XI');
  const [selectedActions, setSelectedActions] = useState<string[]>(['habiskan', 'lokal']);
  const [copied, setCopied] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[questionIdx];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (idx === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (questionIdx + 1 < QUIZ_QUESTIONS.length) {
      setQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuestionIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsQuizFinished(false);
  };

  const toggleAction = (id: string) => {
    setSelectedActions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const impact = useMemo(() => {
    const activeItems = PLEDGE_ACTIONS.filter((a) => selectedActions.includes(a.id));
    const foodSaved = activeItems.reduce((sum, item) => sum + item.foodSavedKgPerYear, 0);
    const co2Reduced = activeItems.reduce((sum, item) => sum + item.co2ReducedKgPerYear, 0);
    const equivalentMeals = Math.round(foodSaved / 0.35);
    return { foodSaved, co2Reduced, equivalentMeals, count: activeItems.length };
  }, [selectedActions]);

  const handleCopyPledge = async () => {
    const displayName = studentName.trim() || 'Siswa Inovator';
    const displayClass = studentClass.trim() || 'XI';
    const chosenTitles = PLEDGE_ACTIONS.filter((a) => selectedActions.includes(a.id))
      .map((a, idx) => `${idx + 1}. ${a.title}`)
      .join('\n');

    const text = `Komitmen Aksi SDG 2: Tanpa Kelaparan\nNama: ${displayName} (Kelas ${displayClass})\n\nAksi Pilihan:\n${
      chosenTitles || '- Belum memilih aksi -'
    }\n\nEstimasi Dampak Tahunan:\n- Pangan diselamatkan: ${impact.foodSaved} kg/tahun (~${impact.equivalentMeals} porsi)\n- Emisi ditekan: ${impact.co2Reduced} kg CO2e/tahun`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="kuis-aksi" className="py-16 md:py-24 border-t border-stone-200 bg-[#F4F2EC]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-medium text-amber-800 tracking-wide mb-2">
            03. Evaluasi Pemahaman & Komitmen Nyata
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-stone-900 tracking-tight text-balance">
            Uji Wawasanmu dan Hitung Dampak Aksi Sekolah
          </h2>
          <p className="mt-2 text-sm md:text-base text-stone-600 leading-relaxed">
            Periksa pemahamanmu tentang ketahanan pangan melalui 5 soal singkat, lalu rancang target aksi pribadi yang bisa langsung diterapkan di kelas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Interactive Quiz */}
          <div className="lg:col-span-6 bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between">
            {!isQuizFinished ? (
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-200 mb-5">
                  <div>
                    <p className="text-xs text-stone-500">{currentQuestion.topic}</p>
                    <h3 className="text-base font-semibold text-stone-900">
                      Kuis Pemahaman SDG 2
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-semibold text-stone-700 tabular-nums">
                    Soal {questionIdx + 1} / {QUIZ_QUESTIONS.length}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden mb-5">
                  <div
                    className="h-full bg-amber-700 transition-all duration-200"
                    style={{
                      width: `${((questionIdx + (selectedOption !== null ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%`,
                    }}
                  />
                </div>

                <p className="text-base font-medium text-stone-900 leading-snug mb-5">
                  {currentQuestion.question}
                </p>

                <div className="space-y-2.5 mb-5">
                  {currentQuestion.options.map((opt, idx) => {
                    const isAnswered = selectedOption !== null;
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQuestion.correctIndex;

                    let stateClasses =
                      'border-stone-200 bg-white text-stone-800 hover:bg-stone-50 hover:border-stone-300';
                    if (isAnswered) {
                      if (isCorrect) {
                        stateClasses = 'border-emerald-300 bg-emerald-50 text-emerald-950';
                      } else if (isSelected) {
                        stateClasses = 'border-rose-300 bg-rose-50 text-rose-950';
                      } else {
                        stateClasses = 'border-stone-200 bg-stone-50 text-stone-500';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full text-left px-4 py-3 rounded-lg border text-sm leading-snug transition-colors flex items-start justify-between gap-3 cursor-pointer disabled:cursor-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 ${stateClasses}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 mb-5">
                    <p className="text-xs font-semibold text-stone-900 mb-1">
                      {selectedOption === currentQuestion.correctIndex
                        ? 'Jawaban Benar'
                        : 'Kurang Tepat — Penjelasan'}
                    </p>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 flex flex-col justify-center">
                <p className="text-xs text-stone-500 mb-1">Hasil Evaluasi Kuis</p>
                <h3 className="text-2xl font-semibold text-stone-900 mb-3">
                  Skor Kamu: <span className="font-mono tabular-nums">{score} / {QUIZ_QUESTIONS.length}</span>
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-6">
                  {score >= 4
                    ? 'Pemahamanmu tentang konsep SDG 2 sangat kuat! Kamu siap merancang kampanye atau proyek karya ilmiah remaja bertema ketahanan pangan.'
                    : 'Bagus! Coba ulas kembali simulasi sistem pangan dan peta target di atas untuk memperdalam hubungan antara produksi, nutrisi, dan pengurangan limbah.'}
                </p>
                <div>
                  <button
                    type="button"
                    onClick={handleRestartQuiz}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-amber-700 text-white hover:bg-amber-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Ulangi Kuis</span>
                  </button>
                </div>
              </div>
            )}

            {!isQuizFinished && (
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-mono tabular-nums">
                  Skor sementara: {score}
                </span>
                <button
                  type="button"
                  disabled={selectedOption === null}
                  onClick={handleNextQuestion}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 text-white hover:bg-stone-800 disabled:bg-stone-300 disabled:text-stone-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
                >
                  {questionIdx + 1 === QUIZ_QUESTIONS.length ? 'Lihat Hasil Akhir' : 'Soal Berikutnya'}
                </button>
              </div>
            )}
          </div>

          {/* Right: Student Pledge & Impact Calculator */}
          <div className="lg:col-span-6 bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-200 mb-5">
                <div>
                  <p className="text-xs text-stone-500">Kalkulator Aksi Harian</p>
                  <h3 className="text-base font-semibold text-stone-900">
                    Rencana Komitmen Siswa Kelas XI
                  </h3>
                </div>
                <span className="font-mono text-xs text-stone-600 tabular-nums">
                  {impact.count} aksi dipilih
                </span>
              </div>

              {/* Optional Name & Class */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <div className="sm:col-span-2">
                  <label htmlFor="student-name" className="block text-xs font-medium text-stone-700 mb-1">
                    Nama Siswa (Opsional)
                  </label>
                  <input
                    id="student-name"
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Contoh: Nadira Putri"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-700"
                  />
                </div>
                <div>
                  <label htmlFor="student-class" className="block text-xs font-medium text-stone-700 mb-1">
                    Kelas
                  </label>
                  <input
                    id="student-class"
                    type="text"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    placeholder="XI IPA 2"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-700"
                  />
                </div>
              </div>

              {/* Interactive Action Checklist */}
              <div className="space-y-2.5 mb-6">
                {PLEDGE_ACTIONS.map((action) => {
                  const checked = selectedActions.includes(action.id);
                  return (
                    <label
                      key={action.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        checked
                          ? 'border-amber-300 bg-amber-50/60'
                          : 'border-stone-200 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAction(action.id)}
                        className="mt-1 h-4 w-4 accent-amber-700 rounded cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-900 leading-snug">
                          {action.title}
                        </p>
                        <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                          {action.detail}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-stone-700 whitespace-nowrap shrink-0 tabular-nums">
                        +{action.foodSavedKgPerYear} kg/thn
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Live Impact Summary & Copy Action */}
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-stone-200 mb-4">
                <div>
                  <span className="block text-xs text-stone-500">Pangan Terselamatkan</span>
                  <span className="font-mono text-lg font-semibold text-stone-900 tabular-nums">
                    {impact.foodSaved} kg/thn
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-stone-500">Setara Porsi Makan</span>
                  <span className="font-mono text-lg font-semibold text-stone-900 tabular-nums">
                    {impact.equivalentMeals} porsi
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-stone-500">Emisi Ditekan</span>
                  <span className="font-mono text-lg font-semibold text-emerald-800 tabular-nums">
                    {impact.co2Reduced} kg CO2e
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-stone-600">
                  Salin ringkasan ini untuk laporan proyek P5 atau tugas sekolah.
                </p>
                <button
                  type="button"
                  onClick={handleCopyPledge}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-700 text-white hover:bg-amber-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Salin Komitmen</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
