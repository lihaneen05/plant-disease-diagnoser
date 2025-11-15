import React, { useState, useCallback } from 'react';
import { SymptomSlider } from './components/SymptomSlider';
import { DiagnosisResult } from './components/DiagnosisResult';
import { runDiagnosis } from './services/fuzzyLogicService';
import type { SymptomInputs, DiagnosisOutput } from './types';
import { SYMPTOMS } from './constants';
import { Leaf } from 'lucide-react';

const App: React.FC = () => {
  const [symptoms, setSymptoms] = useState<SymptomInputs>({
    spotting: 0,
    discoloration: 0,
    lesions: 0,
    coating: 0,
    wilting: 0,
  });
  const [result, setResult] = useState<DiagnosisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: keyof SymptomInputs, value: number) => {
    setSymptoms(prev => ({ ...prev, [key]: value }));
  };

  const handleDiagnose = () => {
    setIsLoading(true);
    setTimeout(() => {
      setResult(runDiagnosis(symptoms));
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-green-800">Plant Disease Diagnoser</h1>
          </div>
          <p className="text-green-700 max-w-2xl mx-auto">
            A fuzzy logic-based expert system for identifying leaf diseases.
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Adjust the sliders below to match your plant's symptoms, then click 'Run Diagnosis' to let our fuzzy logic expert analyze the data.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Sliders */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-green-800 mb-4">Symptom Severity</h2>
            <p className="text-sm text-gray-600 mb-6">
              Rate each symptom on a scale from 0 (none) to 10 (severe).
            </p>
            <div className="space-y-5">
              {SYMPTOMS.map(s => (
                <SymptomSlider
                  key={s.id}
                  label={s.label}
                  desc={s.description}
                  value={symptoms[s.id]}
                  onChange={(v) => handleChange(s.id, v)}
                />
              ))}
            </div>
            <button
              onClick={handleDiagnose}
              disabled={isLoading}
              className="mt-6 w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>Diagnosing...</>
              ) : (
                <>Run Diagnosis</>
              )}
            </button>
          </div>

          {/* Right: Result */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-green-800 mb-4">Diagnosis Result</h2>
            {isLoading ? (
              <div className="text-center py-12 text-gray-500">
                <div className="animate-spin w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                <p>Analyzing symptoms...</p>
              </div>
            ) : result ? (
              <DiagnosisResult result={result} />
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Leaf className="h-16 w-16 mx-auto mb-3 opacity-30" />
                <p>Your plant's diagnosis will appear here.</p>
                <p className="text-sm">Adjust sliders and click "Run Diagnosis"</p>
              </div>
            )}
          </div>
        </div>

        <footer className="text-center mt-10 text-xs text-gray-500">
          <p>Built with React, TypeScript, and a dash of Fuzzy Logic.</p>
          <p>Based on the work of Ahmad Shabbir, Haneen Tahir, and Hamza Amer Sheikh.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
