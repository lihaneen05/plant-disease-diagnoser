import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import type { DiagnosisOutput } from '../types';
import { LeafIcon, InfoIcon, SymptomsIcon, TreatmentIcon, WindIcon } from './Icons';

interface DiagnosisResultProps {
  result: DiagnosisOutput;
}

const InfoSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div>
        <h4 className="font-semibold text-brand-green-800 flex items-center gap-2 mb-1 text-base">
            {icon}
            {title}
        </h4>
        <p className="text-sm text-gray-700 leading-relaxed pl-7">{children}</p>
    </div>
);


export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ result }) => {
  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600">Most Likely Diagnosis</p>
        <h3 className="text-3xl font-bold text-brand-green-700 flex items-center justify-center gap-2">
          <LeafIcon className="h-7 w-7"/>
          {result.disease}
        </h3>
        <p className="text-sm text-gray-500 mt-1">Diagnostic Score: <span className="font-semibold">{result.score.toFixed(2)}</span></p>
      </div>

      <div className="w-full h-64 mt-6">
        <ResponsiveContainer>
          <AreaChart data={result.chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorResult" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="x" label={{ value: 'Disease Scale', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Activation', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            
            <Area 
                type="monotone" 
                dataKey="y" 
                name="Aggregated Activation" 
                stroke="#16a34a" 
                fillOpacity={1} 
                fill="url(#colorResult)" 
            />
            
            <ReferenceLine x={result.score} stroke="red" strokeWidth={2} label={{ value: 'Score', fill: 'red', position: 'insideTop' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-center text-gray-500 mt-2 mb-6">Visualization of the aggregated fuzzy output and the final diagnostic score.</p>
      
      {result.diseaseInfo && (
        <div className="mt-4 text-left p-4 rounded-lg border border-brand-green-200 bg-brand-green-50/50 space-y-4">
            <InfoSection title="Description" icon={<InfoIcon className="h-5 w-5" />}>
                {result.diseaseInfo.description}
            </InfoSection>
             <InfoSection title="Common Causes" icon={<WindIcon className="h-5 w-5" />}>
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