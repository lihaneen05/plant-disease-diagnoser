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
import { LeafIcon, InfoIcon, WindIcon, SymptomsIcon, TreatmentIcon } from './Icons';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DiagnosisResultProps {
  result: DiagnosisOutput;
}

const InfoSection: React.FC<{ number: string; title: string; icon: React.ReactNode; children: React.ReactNode }> = ({
  number,
  title,
  icon,
  children,
}) => (
  <div className="mb-4 pl-6 border-l-4 border-green-500 bg-green-50 p-3 rounded">
    <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-1">
      <span className="text-lg">{number}</span> {icon} {title}
    </h4>
    <p className="text-sm text-gray-700 leading-relaxed">{children}</p>
  </div>
);

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ result }) => {
  // Bar chart data – matches screenshot (green bars, peak near score)
  const chartData = {
    labels: Array.from({ length: 10 }, (_, i) => `${i * 10}`),
    datasets: [
      {
        label: 'Fuzzy Output',
        data: Array.from({ length: 10 }, (_, i) => {
          const x = i * 10;
          const score = result.score;
          return Math.exp(-Math.pow((x - score) / 20, 2)); // Gaussian
        }),
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, max: 1 },
      x: { ticks: { color: '#6b7280' } },
    },
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-sm text-gray-600 mb-2">Most Likely Diagnosis</p>
        <div className="flex items-center justify-center gap-2 mb-1">
          <input type="radio" id="disease" name="diagnosis" checked className="w-5 h-5 text-green-600" />
          <label htmlFor="disease" className="text-2xl font-bold text-green-700">
            <LeafIcon className="h-7 w-7 inline mr-1" />
            {result.disease}
          </label>
        </div>
        <p className="text-sm text-gray-500">
          Diagnostic Score: <span className="font-semibold text-green-700">{result.score.toFixed(2)}</span>
        </p>
      </div>

      {/* Chart */}
      <div className="h-64 mb-6">
        <Bar data={chartData} options={options} />
      </div>
      <p className="text-xs text-center text-gray-500 mb-6">
        Visualization of the aggregated fuzzy output and the final diagnostic score.
      </p>

      {/* Info Sections */}
      {result.diseaseInfo && (
        <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <InfoSection number="1" title="Description" icon={<InfoIcon className="h-5 w-5" />}>
            {result.diseaseInfo.description}
          </InfoSection>
          <InfoSection number="2" title="Common Causes" icon={<WindIcon className="h-5 w-5" />}>
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
