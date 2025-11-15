import type { Symptom, Disease, Severity, FuzzyRule, DiseaseInfo } from './types';

export const SYMPTOMS: { id: Symptom; label: string; description: string }[] = [
  { id: 'spotting', label: 'Spotting', description: 'Severity of spots on leaves.' },
  { id: 'discoloration', label: 'Discoloration', description: 'Severity of yellowing or browning.' },
  { id: 'lesions', label: 'Lesions', description: 'Severity of angular or circular patches.' },
  { id: 'coating', label: 'Coating', description: 'Severity of powdery or downy substance.' },
  { id: 'wilting', label: 'Wilting', description: 'Severity of drooping or wilting leaves.' },
];

// Input Membership Functions (automf equivalent for a 0-10 universe)
// trimf [start, peak, end]
export const INPUT_MFS: Record<Severity, [number, number, number]> = {
  low: [0, 0, 5],
  medium: [0, 5, 10],
  high: [5, 10, 10],
};

// Output Membership Functions for each disease on a 0-100 universe
export const DISEASE_MFS: Record<Disease, [number, number, number]> = {
  'Downy Mildew': [0, 10, 20],
  'Fire Blight': [15, 25, 35],
  'Leaf Blight': [30, 40, 50],
  'Early Blight': [45, 55, 65],
  'Late Blight': [60, 70, 80],
  'Leaf Rust': [75, 85, 95],
  'Powdery Mildew': [90, 95, 100],
};

// The 25 Fuzzy Rules
export const FUZZY_RULES: FuzzyRule[] = [
  { antecedents: [{ symptom: 'discoloration', severity: 'high' }, { symptom: 'coating', severity: 'low' }], consequent: 'Downy Mildew' },
  { antecedents: [{ symptom: 'discoloration', severity: 'high' }, { symptom: 'wilting', severity: 'high' }], consequent: 'Fire Blight' },
  { antecedents: [{ symptom: 'spotting', severity: 'high' }, { symptom: 'lesions', severity: 'medium' }], consequent: 'Leaf Blight' },
  { antecedents: [{ symptom: 'spotting', severity: 'medium' }, { symptom: 'lesions', severity: 'high' }], consequent: 'Early Blight' },
  { antecedents: [{ symptom: 'lesions', severity: 'high' }, { symptom: 'discoloration', severity: 'low' }], consequent: 'Leaf Blight' },
  { antecedents: [{ symptom: 'discoloration', severity: 'medium' }, { symptom: 'lesions', severity: 'low' }], consequent: 'Late Blight' },
  { antecedents: [{ symptom: 'wilting', severity: 'high' }, { symptom: 'lesions', severity: 'low' }], consequent: 'Fire Blight' },
  { antecedents: [{ symptom: 'coating', severity: 'high' }, { symptom: 'discoloration', severity: 'medium' }], consequent: 'Downy Mildew' },
  { antecedents: [{ symptom: 'lesions', severity: 'medium' }, { symptom: 'discoloration', severity: 'medium' }], consequent: 'Downy Mildew' },
  { antecedents: [{ symptom: 'lesions', severity: 'high' }, { symptom: 'wilting', severity: 'low' }], consequent: 'Leaf Rust' },
  { antecedents: [{ symptom: 'spotting', severity: 'high' }, { symptom: 'lesions', severity: 'medium' }], consequent: 'Leaf Blight' },
  { antecedents: [{ symptom: 'wilting', severity: 'high' }], consequent: 'Fire Blight' },
  { antecedents: [{ symptom: 'spotting', severity: 'high' }, { symptom: 'lesions', severity: 'low' }], consequent: 'Leaf Rust' },
  { antecedents: [{ symptom: 'wilting', severity: 'medium' }, { symptom: 'discoloration', severity: 'high' }], consequent: 'Fire Blight' },
  { antecedents: [{ symptom: 'lesions', severity: 'high' }, { symptom: 'spotting', severity: 'high' }], consequent: 'Early Blight' },
  { antecedents: [{ symptom: 'lesions', severity: 'medium' }, { symptom: 'discoloration', severity: 'high' }], consequent: 'Downy Mildew' },
  { antecedents: [{ symptom: 'coating', severity: 'medium' }, { symptom: 'spotting', severity: 'high' }], consequent: 'Leaf Rust' },
  { antecedents: [{ symptom: 'spotting', severity: 'medium' }, { symptom: 'coating', severity: 'high' }], consequent: 'Powdery Mildew' },
  { antecedents: [{ symptom: 'spotting', severity: 'medium' }, { symptom: 'discoloration', severity: 'medium' }], consequent: 'Leaf Blight' },
  { antecedents: [{ symptom: 'lesions', severity: 'high' }, { symptom: 'spotting', severity: 'medium' }], consequent: 'Leaf Blight' },
  { antecedents: [{ symptom: 'spotting', severity: 'high' }, { symptom: 'lesions', severity: 'low' }], consequent: 'Early Blight' },
  { antecedents: [{ symptom: 'wilting', severity: 'high' }, { symptom: 'discoloration', severity: 'medium' }], consequent: 'Fire Blight' },
  { antecedents: [{ symptom: 'coating', severity: 'high' }, { symptom: 'spotting', severity: 'high' }], consequent: 'Leaf Rust' },
  { antecedents: [{ symptom: 'spotting', severity: 'high' }, { symptom: 'discoloration', severity: 'high' }], consequent: 'Leaf Rust' },
  { antecedents: [{ symptom: 'coating', severity: 'high' }], consequent: 'Powdery Mildew' },
];

// Universe of discourse for inputs (symptoms) and outputs (diseases)
export const INPUT_UNIVERSE = { start: 0, end: 10, step: 1 };
export const OUTPUT_UNIVERSE = { start: 0, end: 100, step: 1 };

export const DISEASE_INFO: Record<Disease, DiseaseInfo> = {
    'Powdery Mildew': {
        description: 'A fungal disease that affects a wide variety of plants. It is easily recognized by its white, powdery spots on leaves and stems.',
        causes: 'Often caused by high humidity at night and low humidity during the day. Poor air circulation, shade, and overcrowding of plants create a favorable environment for the fungus to grow.',
        commonSymptoms: 'White, powdery spots on leaves, which may spread to cover the entire leaf surface. Young foliage is most susceptible. Leaves may yellow and dry out.',
        treatment: 'Improve air circulation around plants. Remove and destroy infected plant parts. Use fungicides specifically labeled for powdery mildew. Neem oil is a good organic option.'
    },
    'Downy Mildew': {
        description: 'Caused by oomycetes, or water molds, Downy Mildew thrives in cool, moist conditions. It typically appears on the undersides of leaves.',
        causes: 'This disease is favored by cool temperatures (15-20°C / 60-70°F) and high humidity with prolonged periods of leaf wetness. Spores are spread by wind and splashing water.',
        commonSymptoms: 'Yellow to light green spots on the upper surfaces of leaves. A fuzzy, downy gray or purple mold on the undersides. Leaves may curl, wither, and die.',
        treatment: 'Avoid overhead watering. Water early in the day so foliage dries quickly. Ensure good spacing between plants for air circulation. Apply appropriate fungicides.'
    },
    'Fire Blight': {
        description: 'A destructive bacterial disease, common in fruit trees like apples and pears. It spreads quickly in warm, humid weather.',
        causes: 'Caused by the bacterium Erwinia amylovora, which overwinters in cankers on infected branches. It is spread in the spring by splashing rain, wind, and pollinating insects.',
        commonSymptoms: 'Blossoms and leaves appear water-soaked, then quickly wilt and turn black, as if scorched by fire. Cankers on branches may ooze a bacterial slime.',
        treatment: 'Prune out infected branches, cutting at least 8-12 inches below visible symptoms. Disinfect pruning tools between cuts. Avoid excessive nitrogen fertilizer.'
    },
    'Leaf Blight': {
        description: 'A general term for several fungal or bacterial diseases that cause rapid browning, death, and withering of leaves, flowers, and stems.',
        causes: 'Caused by various fungi or bacteria that thrive in wet, humid conditions. Spores often overwinter in plant debris and are spread by wind and rain.',
        commonSymptoms: 'Starts as small spots on leaves that enlarge rapidly. Large, irregular dead areas on leaves. Can lead to defoliation.',
        treatment: 'Remove infected debris. Improve air circulation. Water at the base of the plant. Fungicides may be needed for severe infections.'
    },
    'Early Blight': {
        description: 'A common fungal disease, particularly affecting tomatoes and potatoes. It often appears after plants have set fruit.',
        causes: 'The fungus Alternaria solani, which survives in infected soil and plant debris. It is most active during periods of frequent rainfall and high humidity.',
        commonSymptoms: 'Dark, concentric-ringed spots ("target spots") on lower leaves. Leaves may yellow around the spots and eventually fall off. Can also affect stems and fruit.',
        treatment: 'Use crop rotation. Mulch around plants to reduce soil splash. Water consistently. Apply fungicides early as a preventative measure.'
    },
    'Late Blight': {
        description: 'A devastating oomycete disease of potatoes and tomatoes, thriving in cool, wet weather. It can destroy crops very quickly.',
        causes: 'Caused by the water mold Phytophthora infestans. It spreads rapidly in cool, wet weather with high nighttime humidity. Spores can travel long distances on the wind.',
        commonSymptoms: 'Large, dark, water-soaked spots on leaves, often with a white moldy edge. Stems and fruit can also develop large, black lesions.',
        treatment: 'Plant resistant varieties. Ensure good air circulation. Water at the base. Fungicides are almost always necessary for control once present.'
    },
    'Leaf Rust': {
        description: 'A fungal disease characterized by reddish-orange pustules on leaves. It is common on many types of plants, including grains, beans, and ornamentals.',
        causes: 'Caused by various species of fungi. The spores are easily spread by wind and require a period of moisture on the leaf surface to germinate and infect the plant.',
        commonSymptoms: 'Small, circular, reddish-orange pustules on the undersides of leaves. Leaves may turn yellow and die. Severe infections can reduce plant vigor.',
        treatment: 'Remove and destroy infected leaves. Provide good air circulation. Plant rust-resistant varieties. Use fungicides if the infection is severe.'
    }
};