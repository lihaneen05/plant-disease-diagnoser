
import React from 'react';

interface SymptomSliderProps {
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}

export const SymptomSlider: React.FC<SymptomSliderProps> = ({ label, description, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-baseline mb-1">
        <label className="font-semibold text-brand-green-800">{label}</label>
        <span className="font-bold text-lg text-brand-green-600 w-8 text-center">{value}</span>
      </div>
      <p className="text-xs text-gray-500 mb-2">{description}</p>
      <input
        type="range"
        min="0"
        max="10"
        step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-brand-green-600"
      />
    </div>
  );
};
