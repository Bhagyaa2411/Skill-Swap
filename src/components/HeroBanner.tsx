import React, { useState } from 'react';
import { ArrowRight, Search, CheckCircle2, ShieldCheck, Zap, Building2 } from 'lucide-react';
import { UNIVERSITY_NAME, UNIVERSITY_SHORT } from '../mockData';

interface HeroBannerProps {
  onSearchSkills: (teach: string, learn: string) => void;
  onExploreCircles: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSearchSkills,
  onExploreCircles,
}) => {
  const [teachInput, setTeachInput] = useState('');
  const [learnInput, setLearnInput] = useState('');

  const handleQuickMatch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSkills(teachInput, learnInput);
  };

  const quickSkills = [
    { teach: 'Python & Pandas', learn: 'React & Vite' },
    { teach: 'PyTorch Basics', learn: 'Cloud DevOps' },
    { teach: 'Figma Systems', learn: 'Python Automation' },
    { teach: 'Algorithms & DSA', learn: 'System Design' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50/50 via-white to-slate-50/40 border-b border-slate-200/80 pt-8 pb-12">
      {/* Subtle academic grid background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#d97706 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Campus Value Proposition */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/80 border border-amber-200 rounded-full text-xs font-semibold text-amber-900">
              <Building2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Campus Exclusive</span>
              <span className="text-amber-400">·</span>
              <span className="font-bold text-amber-900">{UNIVERSITY_SHORT} Students & Faculty Only</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] text-balance font-display">
              Trade skills you know for skills you need across RTMSSU.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Connect with fellow <strong>Ratan Tata Maharashtra State Skills University</strong> students. Exchange 1-on-1 peer mentorship, earn official university skill certificates, join campus study pods, and solve capstone roadblocks without money.
            </p>

            {/* Campus proof markers */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-600 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified @rtmssu.ac.in PRNs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Official NEP Skill Credit Certificates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Campus Lab & Pod Collab</span>
              </div>
            </div>
          </div>

          {/* Right Column: Reciprocal Matchmaker Widget */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Skill Swap Synergy Matcher
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Match with RTMSSU peers by teaching & learning needs
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-800 text-[11px] font-semibold rounded-md border border-amber-200/60">
                  RTMSSU Pool
                </span>
              </div>

              <form onSubmit={handleQuickMatch} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                    I CAN TEACH OR HELP WITH:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={teachInput}
                      onChange={(e) => setTeachInput(e.target.value)}
                      placeholder="e.g. Python, Pandas, PyTorch, React..."
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                    I WANT TO LEARN IN RETURN:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={learnInput}
                      onChange={(e) => setLearnInput(e.target.value)}
                      placeholder="e.g. React & Vite, Docker, Cloud, Figma..."
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                  >
                    <Search className="w-4 h-4" />
                    <span>Find RTMSSU Reciprocal Matches</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </form>

              {/* Quick swap suggestions */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-[11px] font-medium text-slate-500 block mb-2">
                  Popular RTMSSU campus swaps:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickSkills.map((pair, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setTeachInput(pair.teach);
                        setLearnInput(pair.learn);
                        onSearchSkills(pair.teach, pair.learn);
                      }}
                      className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-700 rounded-md transition-colors border border-slate-200/70"
                    >
                      {pair.teach} ↔ {pair.learn}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
