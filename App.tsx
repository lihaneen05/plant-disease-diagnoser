
import React, { useState, useCallback } from 'react';
import { SymptomSlider } from './components/SymptomSlider';
import { DiagnosisResult } from './components/DiagnosisResult';
import { runDiagnosis } from './services/fuzzyLogicService';
import type { SymptomInputs, DiagnosisOutput, Symptom } from './types';
import { SYMPTOMS } from './constants';
import { LeafIcon, BotIcon } from './components/Icons';

const App: React.FC = () => {
  const [symptoms, setSymptoms] = useState<SymptomInputs>({
    spotting: 5,
    discoloration: 5,
    lesions: 5,
    coating: 5,
    wilting: 5,
  });
  const [result, setResult] = useState<DiagnosisOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSliderChange = useCallback((symptom: Symptom, value: number) => {
    setSymptoms(prev => ({ ...prev, [symptom]: value }));
  }, []);

  const handleDiagnose = useCallback(() => {
    setIsLoading(true);
    setResult(null);
    // Simulate processing time for better UX
    setTimeout(() => {
      const diagnosisResult = runDiagnosis(symptoms);
      setResult(diagnosisResult);
      setIsLoading(false);
    }, 500);
  }, [symptoms]);

  return (
    <div className="min-h-screen bg-brand-green-50 text-brand-green-950 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-4">
             <LeafIcon className="h-12 w-12 text-brand-green-600" />
            <h1 className="text-4xl sm:text-5xl font-bold text-brand-green-900">
              Plant Disease Diagnoser
            </h1>
          </div>
          <p className="mt-2 text-lg text-brand-green-800">
            A fuzzy logic-based expert system for identifying leaf diseases.
          </p>
          <p className="mt-2 text-md max-w-2xl mx-auto text-gray-600">
            Adjust the sliders below to match your plant's symptoms, then click 'Run Diagnosis' to let our fuzzy logic expert analyze the data.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-brand-green-200">
            <h2 className="text-2xl font-semibold mb-4 text-brand-green-900 border-b pb-2">Symptom Severity</h2>
            <p className="text-sm text-gray-600 mb-6">Rate each symptom on a scale from 0 (none) to 10 (severe).</p>
            <div className="space-y-6">
              {SYMPTOMS.map(symptom => (
                <SymptomSlider
                  key={symptom.id}
                  label={symptom.label}
                  description={symptom.description}
                  value={symptoms[symptom.id]}
                  onChange={(value) => handleSliderChange(symptom.id, value)}
                />
              ))}
            </div>
             <button
              onClick={handleDiagnose}
              disabled={isLoading}
              className="mt-8 w-full bg-brand-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-green-700 focus:outline-none focus:ring-4 focus:ring-brand-green-300 transition-all duration-300 ease-in-out disabled:bg-brand-green-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-brand-green-200 lg:sticky lg:top-8 h-fit">
            <h2 className="text-2xl font-semibold mb-4 text-brand-green-900 border-b pb-2">Diagnosis Result</h2>
            <div className="min-h-[400px] flex items-center justify-center">
               {isLoading ? (
                <div className="text-center text-gray-500">
                  <div className="w-12 h-12 border-4 border-brand-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
        
        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>Built with React, TypeScript, and a dash of Fuzzy Logic.</p>
          <p>Based on the work of Ahmad Shabbir, Haneen Tahir, and Hamza Amer Sheikh.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
