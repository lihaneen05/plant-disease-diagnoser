import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { DiagnosisOutput } from '../types';

export const DiagnosisResult: React.FC<{ result: DiagnosisOutput }> = ({ result }) => {
  const { disease, score, diseaseInfo, chartData } = result;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-3">
          <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
          Most Likely Diagnosis
        </div>
        <h3 className="text-3xl font-bold text-green-800">{disease}</h3>
        <p className="text-5xl font-bold text-green-600 mt-2">{score.toFixed(1)}%</p>
        <p className="text-sm text-gray-600">Diagnosis Score</p>
      </div>

      {/* Chart */}
      <div className="bg-gray-50 p-4 rounded-xl">
        <p className="text-xs text-gray-600 mb-2 text-center">
          Visualization of the aggregated fuzzy output and the final diagnosis score
        </p>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="x" domain={[0, 100]} tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 1]} tick={{ fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                labelStyle={{ color: '#333' }}
              />
              <Line type="monotone" dataKey="y" stroke="#16a34a" strokeWidth={3} dot={{ fill: '#16a34a' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Disease Info */}
      {diseaseInfo && (
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold text-green-800 flex items-center gap-2">
              <span className="text-green-600">Info</span> Description
            </h4>
            <p className="text-gray-700 mt-1">{diseaseInfo.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-green-800 flex items-center gap-2">
              <span className="text-orange-600">Warning</span> Common Causes
            </h4>
            <p className="text-gray-700 mt-1">{diseaseInfo.causes}</p>
          </div>

          <div>
            <h4 className="font-semibold text-green-800 flex items-center gap-2">
              <span className="text-red-600">Alert</span> Common Symptoms
            </h4>
            <p className="text-gray-700 mt-1">{diseaseInfo.commonSymptoms}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl border border-green-200">
            <h4 className="font-semibold text-green-800 flex items-center gap-2">
              <span className="text-green-600">Treatment</span> Treatment
            </h4>
            <p className="text-green-700 mt-1">{diseaseInfo.treatment}</p>
          </div>
        </div>
      )}
    </div>
  );
};
