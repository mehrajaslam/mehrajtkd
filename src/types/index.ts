export type Language = 'English' | 'Urdu' | 'Arabic';

export type BeltRank =
  | '10th Gup (White Belt)'
  | '9th Gup (White/Yellow Stripe)'
  | '8th Gup (Yellow Belt)'
  | '7th Gup (Yellow/Green Stripe)'
  | '6th Gup (Green Belt)'
  | '5th Gup (Green/Blue Stripe)'
  | '4th Gup (Blue Belt)'
  | '3rd Gup (Blue/Red Stripe)'
  | '2nd Gup (Red Belt)'
  | '1st Gup (Red/Black Stripe / Cho Dan Bo)'
  | '1st Dan (Black Belt)'
  | '2nd Dan'
  | '3rd Dan'
  | '4th Dan (Sabomnim / Master)'
  | '5th Dan'
  | '6th Dan'
  | '7th Dan'
  | '8th Dan'
  | '9th Dan (Grandmaster)';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  language?: Language;
  audioAvailable?: boolean;
}

export interface TerminologyItem {
  koreanHangul: string;
  romanized: string;
  englishMeaning: string;
  category: 'Stance' | 'Block' | 'Strike' | 'Kick' | 'Command' | 'Poomsae' | 'Referee';
  technicalCues: string;
  urdu: string;
  arabic: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DetailedTechnique {
  name: string;
  koreanHangul: string;
  romanized: string;
  category: 'Stance' | 'Block' | 'Strike' | 'Kick' | 'Poomsae' | 'Command';
  cues: string;
  steps: string[];
}

export interface GupLesson {
  gupNumber: number;
  beltName: string;
  beltColorHex: string;
  stripeColorHex?: string;
  title: string;
  objectives: string[];
  explanation: string;
  stepByStepTechniques: DetailedTechnique[];
  practicalTraining: {
    title: string;
    description: string;
    repetitions: string;
  }[];
  commonMistakes: {
    mistake: string;
    correction: string;
  }[];
  stances: string[];
  blocks: string[];
  strikes: string[];
  kicks: string[];
  poomsaeRequired: string;
  terminology: TerminologyItem[];
  keyPoints: string[];
  quiz: QuizQuestion[];
}

export interface DanLevelInfo {
  danNumber: number;
  title: string;
  koreanTitle: string;
  philosophicalTheme: string;
  requiredPoomsae: string;
  curriculumTopics: string[];
  teachingRequirements: string;
  thesisTheme: string;
  koreanHangul: string;
}

export interface PoomsaeStep {
  stepNumber: number;
  stance: string;
  technique: string;
  koreanName: string;
  description: string;
  targetArea: 'Arae (Low)' | 'Momtong (Middle)' | 'Olgool (High)';
  direction: 'Forward' | 'Back' | 'Left' | 'Right' | 'Turn';
}

export interface PoomsaeDetail {
  id: string;
  name: string;
  koreanHangul: string;
  trigramSymbol: string;
  trigramMeaning: string;
  natureElement: string;
  totalMovements: number;
  recommendedGrade: string;
  overview: string;
  keyStances: string[];
  keyTechniques: string[];
  steps: PoomsaeStep[];
  quizQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface KyorugiScenario {
  id: string;
  title: string;
  situation: string;
  opponentAction: string;
  tacticalOptions: {
    action: string;
    scoreOutcome: string;
    isOptimal: boolean;
    tacticalRationale: string;
  }[];
}

export interface RefereeSignal {
  koreanCommand: string;
  koreanHangul: string;
  englishMeaning: string;
  urdu: string;
  arabic: string;
  handGestureDescription: string;
  contextUsage: string;
}

export interface RefereeRulePoint {
  category: string;
  ruleTitle: string;
  pointsOrPenalty: string;
  details: string;
  officialRef: string;
}

export interface ExamQuestion {
  id: string;
  category: 'Gup Theory' | 'Dan Mastery' | 'WT Referee Rules' | 'Korean Terminology' | 'Kyorugi Tactics';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UserProfile {
  studentName: string;
  clubAffiliation: string;
  currentBelt: BeltRank;
  targetBelt: BeltRank;
  completedLessons: string[];
  completedQuizzes: { quizId: string; score: number; maxScore: number; date: string }[];
  streakDays: number;
  voiceAutoPlay: boolean;
  preferredLanguage: Language;
}
