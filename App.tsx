import React, { useState, useCallback } from 'react';
import { SymptomSlider } from './components/SymptomSlider';
import { DiagnosisResult } from './components/DiagnosisResult';
import { runDiagnosis } from './services/fuzzyLogicService';
import type { SymptomInputs, DiagnosisOutput, Symptom } from './types';
import { SYMPTOMS } from './constants';
import { LeafIcon, BotIcon } from './components/Icons';

const App: React.FC = () => {
  const [symptoms, setSymptoms] = useState<SymptomInputs>({
    spotting: 0,
    discoloration: 0,
    lesions: 0,
    coating: 0,
    wilting: 0,
  });
  const [result, setResult] = useState<DiagnosisOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSliderChange = useCallback((symptom: Symptom, value: number) => {
    setSymptoms(prev => ({ ...prev, [symptom]: value }));
  }, []);

  const handleDiagnose = useCallback(() => {
    setIsLoading(true);
    setResult(null);
    setTimeout(() => {
      const diagnosisResult = runDiagnosis(symptoms);
      setResult(diagnosisResult);
      setIsLoading(false);
    }, 600);
  }, [symptoms]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 text-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex justify-center items-center gap-3 mb-3">
            <LeafIcon className="h-10 w-10 text-green-600" />
            <h1 className="text-4xl sm:text-5xl font-bold text-green-800">
              Plant Disease Diagnoser
            </h1>
          </div>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            A fuzzy logic-based expert system for identifying leaf diseases.
          </p>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl mx-auto">
            Adjust the sliders below to match your plant's symptoms, then click 'Run Diagnosis' to let our fuzzy logic expert analyze the data.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Sliders */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-green-100">
            <h2 className="text-2xl font-bold mb-6 text-green-800 border-b pb-3">Symptom Severity</h2>
            <p className="text-sm text-gray-600 mb-6">
              Rate each symptom on a scale from 0 (none) to 10 (severe).
            </p>
            <div className="space-y-6">
              {SYMPTOMS.map(({ id, label, description }) => (
                <SymptomSlider
                  key={id}
                  symptom={id}
                  label={label}
                  description={description}
                  value={symptoms[id]}
                  onChange={(value) => handleSliderChange(id, value)}
                />
              ))}
            </div>
            <button
              onClick={handleDiagnose}
              disabled={isLoading}
              className="mt-8 w-full bg-green-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 disabled:bg-green-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Diagnosing...
                </>
              ) : (
                <>
                  <BotIcon className="h-5 w-5" />
                  Run Diagnosis
                </>
              )}
            </button>
          </div>

          {/* Right: Result */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-green-100 lg:sticky lg:top-8 h-fit">
            <h2 className="text-2xl font-bold mb-4 text-green-800 border-b pb-3">Diagnosis Result</h2>
            <div className="min-h-[500px] flex items-center justify-center">
              {isLoading ? (
                <div className="text-center text-gray-500">
                  <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Our fuzzy expert is analyzing the symptoms...</p>
                </div>
              ) : result ? (
                <DiagnosisResult result={result} />
              ) : (
                <div className="text-center text-gray-500 p-8">
                  <LeafIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p>Your plant's diagnosis will appear here.</p>
                  <p className="text-sm">Adjust the sliders and click "Run Diagnosis".</p>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="text-center mt-16 text-sm text-gray-500">
          <p>Built with React, TypeScript, and a dash of Fuzzy Logic.</p>
          <p>Based on the work of Ahmad Shabbir, Haneen Tahir, and Hamza Amer Sheikh.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
