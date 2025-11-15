export type Symptom = 'spotting' | 'discoloration' | 'lesions' | 'coating' | 'wilting';

export type Severity = 'low' | 'medium' | 'high';

export type Disease = 
  | 'Downy Mildew' 
  | 'Fire Blight' 
  | 'Leaf Blight' 
  | 'Early Blight' 
  | 'Late Blight' 
  | 'Leaf Rust' 
  | 'Powdery Mildew';

export interface SymptomInputs {
  spotting: number;
  discoloration: number;
  lesions: number;
  coating: number;
  wilting: number;
}

export interface FuzzyRule {
  antecedents: { symptom: Symptom; severity: Severity }[];
  consequent: Disease;
}

export interface MembershipFunction {
  name: string;
  points: [number, number, number];
}

export interface DiseaseInfo {
    description: string;
    causes: string;
    commonSymptoms: string;
    treatment: string;
}

export interface DiagnosisOutput {
  score: number;
  disease: string;
  chartData: { x: number; y: number }[];
  diseaseMembershipData: {
    name: string;
    data: { x: number; y: number }[];
  }[];
  diseaseInfo?: DiseaseInfo;
}