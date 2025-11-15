import React from 'react';
import type { Symptom } from '../types';

interface SymptomSliderProps {
  symptom: Symptom;
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}

export const SymptomSlider: React.FC<SymptomSliderProps> = ({ label, description, value, onChange }) => {
  return (
    <div className="space-y-3 p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl border border-gray-200">
      <div>
        <label className="block text-sm font-semibold text-gray-800">{label}</label>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-accent"
          style={{
            background: `linear-gradient(to right, #d1d5db 0%, #d1d5db ${value * 10}%, #22c55e ${value * 10}%, #22c55e 100%)`
          }}
        />
        <span className="w-12 text-center font-medium text-green-700 bg-green-100 px-2 py-1 rounded-md text-sm">
          {value.toFixed(1)}
        </span>
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>0 (None)</span>
        <span>10 (Severe)</span>
      </div>
    </div>
  );
};
