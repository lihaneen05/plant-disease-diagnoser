import React from 'react';

interface Props {
  label: string;
  description: string;
  value: number;
  onChange: (v: number) => void;
}

export const SymptomSlider: React.FC<Props> = ({ label, description, value, onChange }) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <p className="text-xs text-gray-500">{description}</p>
      <input
        type="range"
        min="0"
        max="10"
        step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-xs">
        <span>0</span>
        <span>{value.toFixed(1)}</span>
        <span>10</span>
      </div>
    </div>
  );
};