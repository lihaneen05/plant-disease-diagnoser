import React from 'react';
import type { DiagnosisOutput } from '../types';

export const DiagnosisResult: React.FC<{ result: DiagnosisOutput }> = ({ result }) => {
  return (
    <div className="text-center p-6 bg-white rounded-lg">
      <h3 className="text-2xl font-bold text-green-800">{result.disease}</h3>
      <p className="text-4xl font-bold text-green-600">{result.score.toFixed(1)}%</p>
      <p className="text-sm text-gray-600">Confidence</p>
      {result.diseaseInfo && (
        <div className="mt-4 text-left text-sm">
          <p><strong>Treatment:</strong> {result.diseaseInfo.treatment}</p>
        </div>
      )}
    </div>
  );
};
