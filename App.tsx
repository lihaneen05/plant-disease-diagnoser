/* src/App.tsx */
import React, { useState, useCallback, useEffect } from 'react';
import { SymptomSlider } from './components/SymptomSlider';
import { DiagnosisResult } from './components/DiagnosisResult';
import { runDiagnosis } from './services/fuzzyLogicService';
import type { SymptomInputs, DiagnosisOutput, Symptom } from './types';
import { SYMPTOMS } from './constants';
import { LeafIcon, BotIcon } from './components/Icons';

const App: React.FC = () => {
  /* ---- Default values that match the screenshot ---- */
  const [symptoms, setSymptoms] = useState<SymptomInputs>({
    spotting: 7.5,
    discoloration: 6.8,
    lesions: 5.0,
    coating: 5.0,
    wilting: 5.0,
  });

  const [result, setResult] = useState<DiagnosisOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* ---- Slider change handler ---- */
  const handleSliderChange = useCallback((symptom: Symptom, value: number) => {
    setSymptoms((prev) => ({ ...prev, [symptom]: value }));
  }, []);

  /* ---- Run diagnosis ---- */
  const handleDiagnose = useCallback(() => {
    setIsLoading(true);
    setResult(null);

    // Small delay for a smoother UX (feel free to remove)
    setTimeout(() => {
      const diagnosis = runDiagnosis(symptoms);
      setResult(diagnosis);
      setIsLoading(false);
    }, 600);
  }, [symptoms]);

  /* ---- Auto-run on first mount (optional – matches screenshot) ---- */
  useEffect(() => {
    handleDiagnose();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-green-50 text-gray-900 font-sans">
      {/* ------------------------------------------------- HEADER ------------------------------------------------- */}
      <header className="bg-green-800 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
          <LeafIcon className="h-10 w-10" />
          <h1 className="text-3xl md:text-4xl font-bold">
            Plant Disease Diagnoser
          </h1>
        </div>
        <p className="text-center mt-2 max-w-3xl mx-auto text-sm md:text-base">
          A fuzzy logic-based expert system for identifying leaf diseases.
        </p>
        <p className="text-center mt-1 text-xs md:text-sm text-green-100">
          Adjust the sliders below to match your plant’s symptoms, then click{' '}
          <strong>Run Diagnosis</strong> to let our fuzzy logic expert analyze the data.
        </p>
      </header>

      {/* ------------------------------------------------- MAIN GRID ------------------------------------------------- */}
      <main className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ---------- LEFT PANEL – Symptom Sliders ---------- */}
        <section className="bg-white rounded-xl shadow-md p-6 border border-green-200">
          <h2 className="text-xl font-semibold text-green-800 mb-4 border-b pb-2">
            Symptom Severity
          </h2>
          <p className="text-sm text-gray-600 mb-5">
            Rate each symptom on a scale from <strong>0 (none)</strong> to{' '}
            <strong>10 (severe)</strong>.
          </p>

          <div className="space-y-6">
            {SYMPTOMS.map(({ id, label, description }) => (
              <SymptomSlider
                key={id}
                label={label}
                description={description}
                value={symptoms[id]}
                onChange={(v) => handleSliderChange(id, v)}
              />
            ))}
          </div>

          <button
            onClick={handleDiagnose}
            disabled={isLoading}
            className="mt-8 w-full bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Diagnosing…
              </>
            ) : (
              <>
                <BotIcon className="h-5 w-5" />
                Run Diagnosis
              </>
            )}
          </button>
        </section>

        {/* ---------- RIGHT PANEL – Diagnosis Result ---------- */}
        <section className="bg-white rounded-xl shadow-md p-6 border border-green-200 sticky top-6 h-fit">
          <h2 className="text-xl font-semibold text-green-800 mb-4 border-b pb-2">
            Diagnosis Result
          </h2>

          <div className="min-h-[520px] flex flex-col items-center justify-center">
            {isLoading ? (
              <div className="text-center text-gray-500">
                <svg
                  className="animate-spin h-12 w-12 text-green-600 mx-auto mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                <p>Our fuzzy expert is analyzing the symptoms…</p>
              </div>
            ) : result ? (
              <DiagnosisResult result={result} />
            ) : (
              <div className="text-center text-gray-400 p-8">
                <LeafIcon className="h-16 w-16 mx-auto mb-3 text-gray-300" />
                <p>Your plant’s diagnosis will appear here.</p>
                <p className="text-sm mt-1">
                  Adjust the sliders and click <strong>Run Diagnosis</strong>.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ------------------------------------------------- FOOTER ------------------------------------------------- */}
      <footer className="mt-12 py-4 text-center text-xs text-gray-500">
        <p>Built with React, TypeScript, and a dash of Fuzzy Logic.</p>
        <p>
          Based on the work of Ahmad Shabbir, Haneen Tahir, and Hamza Amer
          Sheikh.
        </p>
      </footer>
    </div>
  );
};

export default App;
