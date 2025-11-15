
import { INPUT_MFS, DISEASE_MFS, FUZZY_RULES, INPUT_UNIVERSE, OUTPUT_UNIVERSE, DISEASE_INFO } from '../constants';
import type { SymptomInputs, Severity, Symptom, Disease, DiagnosisOutput, DiseaseInfo } from '../types';

// Helper function for Triangular Membership Function
const trimf = (x: number, points: [number, number, number]): number => {
  const [a, b, c] = points;
  if (x <= a || x >= c) return 0;
  if (x > a && x <= b) return (x - a) / (b - a);
  if (x > b && x < c) return (c - x) / (c - b);
  return 0;
};

// 1. Fuzzification: Convert crisp inputs to fuzzy values
const fuzzify = (inputs: SymptomInputs): Record<Symptom, Record<Severity, number>> => {
  const fuzzyInputs = {} as Record<Symptom, Record<Severity, number>>;
  for (const symptom in inputs) {
    fuzzyInputs[symptom as Symptom] = { low: 0, medium: 0, high: 0 };
    for (const severity in INPUT_MFS) {
      const crispValue = inputs[symptom as Symptom];
      const mfPoints = INPUT_MFS[severity as Severity];
      fuzzyInputs[symptom as Symptom][severity as Severity] = trimf(crispValue, mfPoints);
    }
  }
  return fuzzyInputs;
};

// 2. Inference: Apply rules to get firing strengths and clipped output sets
const applyInference = (fuzzifiedInputs: Record<Symptom, Record<Severity, number>>): number[][] => {
  return FUZZY_RULES.map(rule => {
    // Calculate firing strength (using AND logic -> Math.min)
    const strengths = rule.antecedents.map(
      antecedent => fuzzifiedInputs[antecedent.symptom][antecedent.severity]
    );
    const firingStrength = Math.min(...strengths);

    // Get the output membership function for the consequent disease
    const outputMFPoints = DISEASE_MFS[rule.consequent];
    
    // Generate the clipped output fuzzy set
    const clippedSet = [];
    for (let x = OUTPUT_UNIVERSE.start; x <= OUTPUT_UNIVERSE.end; x += OUTPUT_UNIVERSE.step) {
      const originalMembership = trimf(x, outputMFPoints);
      clippedSet.push(Math.min(originalMembership, firingStrength));
    }
    return clippedSet;
  });
};

// 3. Aggregation: Combine all clipped output sets into one
const aggregate = (clippedSets: number[][]): number[] => {
  const aggregatedSet = new Array(OUTPUT_UNIVERSE.end + 1).fill(0);
  for (let i = 0; i < aggregatedSet.length; i++) {
    for (let j = 0; j < clippedSets.length; j++) {
      aggregatedSet[i] = Math.max(aggregatedSet[i], clippedSets[j][i]);
    }
  }
  return aggregatedSet;
};

// 4. Defuzzification: Convert the aggregated fuzzy set to a crisp score (Centroid method)
const defuzzify = (aggregatedSet: number[]): number => {
  let weightedSum = 0;
  let sumOfWeights = 0;
  
  for (let i = 0; i < aggregatedSet.length; i++) {
    const x = i * OUTPUT_UNIVERSE.step;
    const weight = aggregatedSet[i];
    weightedSum += x * weight;
    sumOfWeights += weight;
  }
  
  return sumOfWeights === 0 ? 0 : weightedSum / sumOfWeights;
};

// 5. Final Result Determination
const getFinalDisease = (score: number): Disease | "Undetermined" => {
  let maxMembership = -1;
  let likelyDisease: Disease | "Undetermined" = "Undetermined";
  
  for (const disease in DISEASE_MFS) {
    const mfPoints = DISEASE_MFS[disease as Disease];
    const membership = trimf(score, mfPoints);
    if (membership > maxMembership) {
      maxMembership = membership;
      likelyDisease = disease as Disease;
    }
  }
  
  return likelyDisease;
};


// Main function to run the entire process
export const runDiagnosis = (inputs: SymptomInputs): DiagnosisOutput => {
  // Step 1: Fuzzify inputs
  const fuzzifiedInputs = fuzzify(inputs);
  
  // Step 2: Apply inference engine
  const clippedOutputs = applyInference(fuzzifiedInputs);
  
  // Step 3: Aggregate results
  const aggregatedSet = aggregate(clippedOutputs);
  
  // Step 4: Defuzzify to get a crisp score
  const score = defuzzify(aggregatedSet);
  
  // Step 5: Determine the most likely disease
  const disease = getFinalDisease(score);
  
  const chartData = aggregatedSet.map((y, i) => ({ x: i, y: y }));
  
  // Generate data for individual disease membership functions for potential future visualization
  const diseaseMembershipData = Object.entries(DISEASE_MFS).map(([name, points]) => ({
      name,
      data: Array.from({length: 101}, (_, i) => ({ x: i, y: trimf(i, points)}))
  }));

  const diseaseInfo = disease !== "Undetermined" ? DISEASE_INFO[disease] : undefined;

  return {
    score,
    disease,
    chartData,
    diseaseMembershipData,
    diseaseInfo
  };
};
