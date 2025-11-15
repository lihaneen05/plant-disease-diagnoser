import React from 'react';

interface Props {
  label: string;
  description: string;
  value: number;
  onChange: (v: number) => void;
}

export const SymptomSlider: React.FC<Props> = ({ label, description, value, onChange }) => {
  return (
    <div className="space-y-2 mb-6">
      <label className="text-sm font-medium block">{label}</label>
      <p className="text-xs text-gray-500">{description}</p>
      <input
        type="range"
        min="0"
        max="10"
        step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none slider cursor-pointer"
        style={{
          background: `linear-gradient(to right, #ccc ${value * 10}%, #ccc 0%)`, // Progress fill
        }}
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>0</span>
        <span className="font-medium text-blue-600">{value.toFixed(1)}</span>
        <span>10</span>
      </div>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6; /* Blue thumb */
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};
