import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Info, AlertTriangle, AlertCircle, Leaf } from 'lucide-react';
import type { DiagnosisOutput } from '../types';

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
            <Info className="h-4 w-4 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-800">Description</p>
              <p className="text-gray-700">{diseaseInfo.description}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-800">Common Causes</p>
              <p className="text-gray-700">{diseaseInfo.causes}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-800">Common Symptoms</p>
              <p className="text-gray-700">{diseaseInfo.commonSymptoms}</p>
            </div>
          </div>

          <div className="bg-green-50 p-3 rounded-lg border border-green-200 flex gap-2">
            <Leaf className="h-4 w-4 text-green-600 mt-0.5" />
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
