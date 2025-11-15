import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { DiagnosisOutput } from '../types';
import { LeafIcon, InfoIcon, WindIcon, SymptomsIcon, TreatmentIcon } from './Icons'; // Adjust path

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DiagnosisResultProps {
  result: DiagnosisOutput;
}

const InfoSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; number?: string }> = ({ title, icon, children, number }) => (
  <div className="mb-4 pl-4 border-l-4 border-green-500 bg-green-50 p-3 rounded">
    <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-1">
      {number && <span className="text-lg">{number}</span>} {icon} {title}
    </h4>
    <p className="text-sm text-gray-700 leading-relaxed">{children}</p>
  </div>
);

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ result }) => {
  // Bar chart data (mimic screenshot: green bars, 0-1 scale, peak at score)
  const chartData = {
    labels: Array.from({ length: 10 }, (_, i) => `${i * 10}`),
    datasets: [{
      label: 'Fuzzy Output',
      data: Array.from({ length: 10 }, (_, i) => {
        const x = i * 10;
        const score = result.score;
        return Math.exp(-Math.pow((x - score) / 20, 2)); // Gaussian peak
      }),
      backgroundColor: 'rgba(34, 197, 94, 0.6)', // Green
    }],
  };
  const options = { responsive: true, scales: { y: { beginAtZero: true, max: 1 } } };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600 mb-2">Most Likely Diagnosis</p>
        <div className="flex items-center justify-center gap-2 mb-2">
          <input type="radio" id="disease" name="diagnosis" checked className="mr-2" />
          <label htmlFor="disease" className="text-3xl font-bold text-green-700">
            <LeafIcon className="h-7 w-7 inline mr-1" />
            {result.disease}
          </label>
        </div>
        <p className="text-sm text-gray-500">Diagnostic Score: <span className="font-semibold text-green-700">{result.score.toFixed(2)}</span></p>
      </div>

      <div className="w-full h-64 mt-4 mb-4">
        <Bar data={chartData} options={options} />
      </div>
      <p className="text-xs text-center text-gray-500 mb-6">Visualization of the aggregated fuzzy output and the final diagnostic score.</p>

      {result.diseaseInfo && (
        <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <InfoSection number="①" title="Description" icon={<InfoIcon className="h-5 w-5" />}>
            {result.diseaseInfo.description}
          </InfoSection>
          <InfoSection number="②" title="Common Causes" icon={<WindIcon className="h-5 w-5" />}>
            {result.diseaseInfo.causes}
          </InfoSection>
          <InfoSection title="Common Symptoms" icon={<SymptomsIcon className="h-5 w-5" />}>
            {result.diseaseInfo.commonSymptoms}
          </InfoSection>
          <InfoSection title="Treatment" icon={<TreatmentIcon className="h-5 w-5" />}>
            {result.diseaseInfo.treatment}
          </InfoSection>
        </div>
      )}
    </div>
  );
};
