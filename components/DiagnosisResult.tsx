import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { DiagnosisOutput } from '../types';

const InfoIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const WarningIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const AlertIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const TreatmentIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

export const DiagnosisResult: React.FC<{ result: DiagnosisOutput }> = ({ result }) => {
  const { disease, score, chartData, diseaseInfo } = result;

  return (
    <div className="space-y-5">
      <div className="text-center">
        <p className="text-sm text-green-700 font-medium">Most Likely Diagnosis</p>
        <h3 className="text-2xl font-bold text-green-800 mt-1">{disease}</h3>
        <p className="text-3xl font-bold text-green-600 mt-1">{score.toFixed(1)}%</p>
        <p className="text-xs text-gray-600">Diagnosis Score</p>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="text-xs text-center text-gray-600 mb-2">
          Visualization of the aggregated fuzzy output and the final diagnosis score
        </p>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="x" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 1]} tick={{ fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '6px' }}
              />
              <Line 
                type="monotone" 
                dataKey="y" 
                stroke="#22c55e" 
                strokeWidth={3} 
                dot={{ fill: '#22c55e', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {diseaseInfo && (
        <div className="space-y-3 text-sm">
          <div className="flex gap-2">
            <InfoIcon className="h-4 w-4 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-800">Description</p>
              <p className="text-gray-700">{diseaseInfo.description}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <WarningIcon className="h-4 w-4 text-orange-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-800">Common Causes</p>
              <p className="text-gray-700">{diseaseInfo.causes}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <AlertIcon className="h-4 w-4 text-red-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-800">Common Symptoms</p>
              <p className="text-gray-700">{diseaseInfo.commonSymptoms}</p>
            </div>
          </div>

          <div className="bg-green-50 p-3 rounded-lg border border-green-200 flex gap-2">
            <TreatmentIcon className="h-4 w-4 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-800">Treatment</p>
              <p className="text-green-700">{diseaseInfo.treatment}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
