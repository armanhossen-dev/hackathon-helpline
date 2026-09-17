import { SurvivalTask } from '../types';

export const DEFAULT_SURVIVAL_TASKS: SurvivalTask[] = [
  {
    id: 'choose-idea',
    label: 'Choose high-conviction idea & align with sponsor prize tracks',
    phase: 'Kickoff',
    completed: true,
  },
  {
    id: 'setup-repo',
    label: 'Scaffold Git repository, configure environment variables & invite team',
    phase: 'Kickoff',
    completed: true,
  },
  {
    id: 'first-api-call',
    label: 'Make successful test call to primary AI model API (OpenAI/Anthropic/Gemini)',
    phase: 'Core Build',
    completed: true,
  },
  {
    id: 'core-mvp-flow',
    label: 'Implement the single primary user flow (Input -> AI Processing -> Output)',
    phase: 'Core Build',
    completed: false,
  },
  {
    id: 'database-persistence',
    label: 'Wire up database persistence / vector embeddings (Supabase/Neon/Pinecone)',
    phase: 'Core Build',
    completed: false,
  },
  {
    id: 'deploy-live-url',
    label: 'Deploy public live HTTPS URL on Vercel/Railway (Do NOT delay this!)',
    phase: 'Ship',
    completed: false,
  },
  {
    id: 'mobile-smoke-test',
    label: 'Test deployed web app on smartphone browser for judge presentation',
    phase: 'Ship',
    completed: false,
  },
  {
    id: 'record-demo-video',
    label: 'Record polished 2-minute Loom/Screen Studio demo video showcasing the wow factor',
    phase: 'Ship',
    completed: false,
  },
  {
    id: 'pitch-deck-slides',
    label: 'Generate 5-10 slide presentation deck with architecture diagram (Gamma/Pitch)',
    phase: 'Final Submission',
    completed: false,
  },
  {
    id: 'submit-portal',
    label: 'Submit project on Devpost/hackathon portal with public GitHub link & demo URL',
    phase: 'Final Submission',
    completed: false,
  },
];
