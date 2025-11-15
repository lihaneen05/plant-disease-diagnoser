import type { SymptomInputs, DiagnosisOutput } from '../types';

export const runDiagnosis = (inputs: SymptomInputs): DiagnosisOutput => {
  const total = Object.values(inputs).reduce((a, b) => a + b, 0);
  const score = Math.min(100, total * 2);
  const disease = score > 70 ? 'Fire Blight' : 'Downy Mildew';

  return {
    score,
    disease,
    chartData: [],
    diseaseMembershipData: [],
    diseaseInfo: {
      description: 'Mock',
      causes: 'Mock',
      commonSymptoms: 'Mock',
      treatment: 'Remove infected parts and apply fungicide.'
    }
  };
};
