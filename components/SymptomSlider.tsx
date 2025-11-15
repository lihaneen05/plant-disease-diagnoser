import React from 'react';

interface Props {
  label: string;
  desc: string;
  value: number;
  onChange: (v: number) => void;
}

export const SymptomSlider: React.FC<Props> = ({ label, desc, value, onChange }) => {
  return (
    <div className="space-y-2">
      <div>
        <label className="font-medium text-gray-800">{label}</label>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="flex-1 h-2 bg-gray-300 rounded-full appearance-none cursor-pointer slider-blue"
          style={{
            background: `linear-gradient(to right, #86efac 0%, #86efac ${value * 10}%, #e5e7eb ${value * 10}%, #e5e7eb 100%)`
          }}
        />
        <span className="w-10 text-center text-sm font-medium text-green-700">{value.toFixed(1)}</span>
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>0 (None)</span>
        <span>10 (Severe)</span>
      </div>
    </div>
  );
};
