export type ModuleId = 1 | 2 | 3 | 4 | 5 | 6;

export type BadgeId = 
  | 'ai-beginner' 
  | 'prompt-explorer' 
  | 'ai-safety-guardian' 
  | 'generative-ai-master';

export interface Badge {
  id: BadgeId;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  criteria: string;
}

export interface StudentProfile {
  name: string;
  xp: number;
  completedModules: ModuleId[];
  badges: BadgeId[];
  quizScore: number | null;
  quizCompleted: boolean;
}

export interface ClassificationItem {
  id: string;
  scenario: string;
  type: 'generative' | 'classification' | 'prediction';
  label: string;
  explanation: string;
}

export interface AITypeInfo {
  id: 'text' | 'image' | 'audio' | 'video' | 'code';
  title: string;
  tagline: string;
  icon: string;
  color: string;
  description: string;
  schoolApplication: string;
  samplePrompt: string;
  interactivePreview: {
    type: 'text' | 'image' | 'audio' | 'video' | 'code';
    title: string;
    content: string;
    details?: string;
  };
  miniQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface SimulationStep {
  stepNumber: number;
  title: string;
  shortDesc: string;
  details: string;
  generatedTextSoFar: string;
  nextTokenPredictions?: { token: string; probability: number }[];
  highlightComponent: 'input' | 'embedding' | 'attention' | 'prediction' | 'output' | 'evaluation';
}

export interface PromptComponent {
  role: string;
  task: string;
  context: string;
  format: string;
}

export interface PromptTemplatePreset {
  id: string;
  subject: string;
  title: string;
  components: PromptComponent;
  simulatedResponse: string;
  weakPrompt: string;
  weakResponse: string;
}

export interface EthicsScenario {
  id: string;
  title: string;
  situation: string;
  studentDilemma: string;
  choices: {
    id: string;
    label: string;
    text: string;
    isResponsible: boolean;
    consequence: string;
    ethicalPrinciple: string;
  }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  topic: string;
  explanation: string;
}

export interface GlossaryItem {
  term: string;
  category: 'Dasar' | 'Teknis' | 'Etika' | 'Penerapan';
  definition: string;
  analogy: string;
  example: string;
}
