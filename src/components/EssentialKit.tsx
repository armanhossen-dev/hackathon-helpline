import React from 'react';
import { 
  Cpu, Gift, Database, KeyRound, Globe, Palette, 
  BarChart, Mail, ArrowUpRight 
} from 'lucide-react';

interface EssentialCard {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  recommendedToolNames: string[];
  filterKeyword: string;
}

interface EssentialKitProps {
  onSearchByKeyword: (keyword: string) => void;
}

export const EssentialKit: React.FC<EssentialKitProps> = ({ onSearchByKeyword }) => {
  const essentials: EssentialCard[] = [
    {
      title: 'AI Models & APIs',
      subtitle: 'Zero to LLM in 5 minutes',
      description: 'The foundation for reasoning, tool calling, and text-to-anything generation.',
      icon: Cpu,
      color: 'from-emerald-500/10 to-teal-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      recommendedToolNames: ['OpenAI API', 'Claude API', 'Google AI Studio', 'Groq'],
      filterKeyword: 'AI Models',
    },
    {
      title: 'Free Cloud Credits',
      subtitle: 'Build without credit card fear',
      description: 'Generous trial tiers offering up to $200 in free compute and transcription.',
      icon: Gift,
      color: 'from-amber-500/10 to-orange-500/5 text-amber-600 dark:text-amber-400 border-amber-500/30',
      recommendedToolNames: ['Deepgram ($200)', 'Modal ($30)', 'Google AI Studio'],
      filterKeyword: 'Free',
    },
    {
      title: 'Databases & Vectors',
      subtitle: 'Persistence + pgvector in 1 click',
      description: 'High-performance PostgreSQL and vector databases for RAG and semantic indexing.',
      icon: Database,
      color: 'from-cyan-500/10 to-blue-500/5 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
      recommendedToolNames: ['Supabase', 'Neon', 'Pinecone', 'Convex'],
      filterKeyword: 'database',
    },
    {
      title: 'Authentication & SSO',
      subtitle: 'Google/GitHub login in 5 mins',
      description: 'Drop-in authentication components without spending 6 hours debugging JWT tokens.',
      icon: KeyRound,
      color: 'from-purple-500/10 to-pink-500/5 text-purple-600 dark:text-purple-400 border-purple-500/30',
      recommendedToolNames: ['Clerk', 'Supabase Auth'],
      filterKeyword: 'auth',
    },
    {
      title: 'Instant Edge Hosting',
      subtitle: 'Public HTTPS URLs with auto CI/CD',
      description: 'Push to git, deploy globally in 30 seconds with automatic preview URLs for your judges.',
      icon: Globe,
      color: 'from-blue-500/10 to-indigo-500/5 text-blue-600 dark:text-blue-400 border-blue-500/30',
      recommendedToolNames: ['Vercel', 'Railway', 'Cloudflare Pages'],
      filterKeyword: 'deployment',
    },
    {
      title: 'Component Design Kits',
      subtitle: 'Pixel-perfect UI without CSS pain',
      description: 'Copy-paste accessible components and landing page blocks designed by world-class teams.',
      icon: Palette,
      color: 'from-rose-500/10 to-red-500/5 text-rose-600 dark:text-rose-400 border-rose-500/30',
      recommendedToolNames: ['Shadcn UI', 'v0 by Vercel', 'Aceternity UI', 'Figma'],
      filterKeyword: 'design',
    },
    {
      title: 'Observability & Replay',
      subtitle: 'Watch judges click your demo',
      description: 'Session replay to see judge actions live, plus LLM token cost and latency flame graphs.',
      icon: BarChart,
      color: 'from-teal-500/10 to-emerald-500/5 text-teal-600 dark:text-teal-400 border-teal-500/30',
      recommendedToolNames: ['PostHog', 'Helicone', 'Langfuse'],
      filterKeyword: 'analytics',
    },
    {
      title: 'Transactional Email',
      subtitle: 'React-powered email delivery',
      description: 'Send verification codes, magic links, and AI report summaries to beta users.',
      icon: Mail,
      color: 'from-violet-500/10 to-purple-500/5 text-violet-600 dark:text-violet-400 border-violet-500/30',
      recommendedToolNames: ['Resend', 'Loops'],
      filterKeyword: 'communication',
    },
  ];

  return (
    <section className="py-14 sm:py-18 border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300 text-xs font-mono mb-2 font-semibold">
              <span>CORE_FOUNDATION // ESSENTIALS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight">
              Essential Hackathon Kit
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 font-sans mt-1">
              The 8 critical pillars every winning hackathon project must assemble. Click any pillar to filter recommended tools.
            </p>
          </div>
        </div>

        {/* Big Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {essentials.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onClick={() => onSearchByKeyword(item.filterKeyword)}
                className={`group p-5 rounded-3xl border bg-gradient-to-br bg-white dark:bg-[#0e1422] 
                  hover:scale-[1.02] shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-[0_0_25px_rgba(0,255,102,0.12)] transition-all duration-300 cursor-pointer flex flex-col justify-between ${item.color}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <h3 className="font-mono text-base font-bold text-slate-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mb-2 font-semibold">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-white/10">
                  <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1.5 font-semibold">
                    Top Picks:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.recommendedToolNames.map((toolName) => (
                      <span
                        key={toolName}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-gray-100 dark:bg-white/10 text-slate-700 dark:text-gray-200"
                      >
                        {toolName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
