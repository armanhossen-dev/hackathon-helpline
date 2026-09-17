export type CategoryId =
  | 'ai-coding'
  | 'ai-models'
  | 'image-gen'
  | 'video-audio'
  | 'design'
  | 'backend-db'
  | 'deployment'
  | 'automation'
  | 'research'
  | 'analytics'
  | 'communication'
  | 'pitch'
  | 'project-mgmt'
  | 'devtools';

export type PricingTier = 'Free' | 'Free Tier' | 'Freemium' | 'Open Source' | 'Paid';

export interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  category: CategoryId;
  pricing: PricingTier;
  tags: string[];
  bestFor: string;
  hackathonSuperpower: string;
  docsUrl?: string;
  githubUrl?: string;
  apiAvailable: boolean;
  popular?: boolean;
  isNew?: boolean;
  isEssential?: boolean;
  keyboardShortcut?: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  description: string;
  color: string;
}

export interface WorkflowStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  recommendedToolIds: string[];
  keyTips: string[];
}

export interface StackRecommendation {
  projectType: string;
  experience: 'Beginner' | 'Intermediate' | 'Advanced';
  frontend: string;
  aiModel: string;
  database: string;
  auth: string;
  backend: string;
  deployment: string;
  analytics: string;
  rationale: string;
  suggestedToolIds: string[];
}

export interface SurvivalTask {
  id: string;
  label: string;
  phase: 'Kickoff' | 'Core Build' | 'Ship' | 'Final Submission';
  completed: boolean;
}
