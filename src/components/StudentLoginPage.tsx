import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { DEMO_USERS, UNIVERSITY_NAME, UNIVERSITY_SHORT } from '../mockData';
import { 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  GraduationCap, 
  Users, 
  Lock, 
  Mail, 
  Sparkles,
  CheckCircle2,
  FileCheck,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface StudentLoginPageProps {
  onLoginSuccess?: (user: StudentProfile) => void;
  onSelectUser?: (user: StudentProfile) => void;
  onSwitchToRole?: (role: 'student' | 'mentor' | 'organizer', user?: StudentProfile) => void;
  onBackToDashboard?: () => void;
  onCancel?: () => void;
}

export const StudentLoginPage: React.FC<StudentLoginPageProps> = ({
  onLoginSuccess,
  onSelectUser,
  onSwitchToRole,
  onBackToDashboard,
  onCancel,
}) => {
  const triggerLoginSuccess = (user: StudentProfile) => {
    if (onLoginSuccess) onLoginSuccess(user);
    else if (onSelectUser) onSelectUser(user);
  };

  const triggerCancel = () => {
    if (onBackToDashboard) onBackToDashboard();
    else if (onCancel) onCancel();
  };
  const [selectedDemoKey, setSelectedDemoKey] = useState<string>('student-grishma');
  const [prnInput, setPrnInput] = useState<string>('RTMSSU-23-DS-014');
  const [passwordInput, setPasswordInput] = useState<string>('••••••••••');
  const [selectedDept, setSelectedDept] = useState<string>('School of Emerging Technologies');
  const [rememberDevice, setRememberDevice] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'student' | 'mentor' | 'organizer'>('student');

  const studentDemoUsers = [
    {
      key: 'student-grishma',
      profile: DEMO_USERS['student-grishma'],
      badge: 'Default User · 3rd Year AI & DS',
      highlight: 'Specializes in Python, ML & Pandas',
    },
    {
      key: 'student-bhagyesh',
      profile: DEMO_USERS['student-bhagyesh'],
      badge: 'Final Year B.Tech CE',
      highlight: 'Specializes in React, Fullstack & TypeScript',
    },
    {
      key: 'student-snehal',
      profile: DEMO_USERS['student-snehal'],
      badge: '2nd Year B.Des UI/UX',
      highlight: 'Specializes in Figma Design Systems',
    },
    {
      key: 'student-aniket',
      profile: DEMO_USERS['student-aniket'],
      badge: '3rd Year B.Tech FinTech',
      highlight: 'Specializes in Go & Microservices',
    },
  ];

  const mentorDemoUsers = [
    {
      key: 'mentor-tanvi',
      profile: DEMO_USERS['mentor-tanvi'],
      badge: 'Senior Peer Mentor · M.Tech AI',
      highlight: 'Evaluator for PyTorch & Deep Learning',
    },
    {
      key: 'mentor-rohan',
      profile: DEMO_USERS['mentor-rohan'],
      badge: 'Senior Coding Mentor · B.Tech CE',
      highlight: 'Evaluator for Graph Algorithms & DSA',
    },
    {
      key: 'mentor-aditya',
      profile: DEMO_USERS['mentor-aditya'],
      badge: 'Graduate Mentor · Robotics',
      highlight: 'Evaluator for Engineering Mathematics',
    },
  ];

  const organizerDemoUsers = [
    {
      key: 'organizer-arvind',
      profile: DEMO_USERS['organizer-arvind'],
      badge: 'Dean of Innovation & Skills',
      highlight: 'Executive Academic Governance',
    },
    {
      key: 'organizer-sunita',
      profile: DEMO_USERS['organizer-sunita'],
      badge: 'Head of NEP Skill Transfer Credit Cell',
      highlight: 'Controller of NEP Accreditations',
    },
    {
      key: 'organizer-shantanu',
      profile: DEMO_USERS['organizer-shantanu'],
      badge: 'Director of Hackathons & Outreach',
      highlight: 'Industry Competitions & Grants',
    },
  ];

  const handleSelectDemo = (key: string, profile: StudentProfile) => {
    setSelectedDemoKey(key);
    setPrnInput(profile.prn);
    setSelectedDept(profile.department);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userToLogin = DEMO_USERS[selectedDemoKey] || DEMO_USERS['student-grishma'];
    triggerLoginSuccess(userToLogin);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background architectural glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top University Authentication Banner */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white font-bold text-base shadow-sm ring-2 ring-amber-400/30">
            {UNIVERSITY_SHORT}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight text-sm sm:text-base font-display">
                {UNIVERSITY_NAME}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold rounded">
                Official Portal
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Campus Peer Skill Barter & NEP Academic Credit Exchange System
            </p>
          </div>
        </div>

        {(onCancel || onBackToDashboard) && (
          <button
            onClick={triggerCancel}
            className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors"
          >
            Back to Dashboard
          </button>
        )}
      </header>

      {/* Central Login Canvas */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: Campus Security & NEP Credentials */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Authorized Student & Faculty Access Only</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] font-display text-balance">
            RTMSSU Student Skill Swap Portal
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
            Sign in with your verified <strong>@rtmssu.ac.in</strong> credentials or Permanent Registration Number (PRN). Exchange 1-on-1 skills, bank NEP-compliant academic credits, and access campus study pods.
          </p>

          {/* Quick Portal Switcher Pills */}
          <div className="p-1 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center gap-1 max-w-md">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'student'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </button>
            <button
              onClick={() => setActiveTab('mentor')}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'mentor'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Mentor Portal</span>
            </button>
            <button
              onClick={() => setActiveTab('organizer')}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'organizer'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Organizer / Dean</span>
            </button>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-3 pt-2 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">NEP 2020 Skill Credit Accumulation:</strong> 25 verified peer hours earned translate into 2 transfer credits approved by RTMSSU Academic Council.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Tamper-Proof Certificates:</strong> Peer mastery verified by departmental mentors with Dean-endorsed serial identifiers.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Login Box with 1-Click Demo Profiles */}
        <div className="lg:col-span-6">
          <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {activeTab === 'student' && 'Student Login'}
                  {activeTab === 'mentor' && 'Peer Mentor Authentication'}
                  {activeTab === 'organizer' && 'Organizer / Faculty Console Access'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select a demo account or sign in with your campus PRN
                </p>
              </div>
              <span className="px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px] font-mono font-semibold rounded-md">
                Active Session
              </span>
            </div>

            {/* Quick Demo Personas Selection List */}
            <div className="mt-5 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Quick 1-Click Demo Profiles ({activeTab.toUpperCase()}):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeTab === 'student' &&
                  studentDemoUsers.map((item) => {
                    const isSelected = selectedDemoKey === item.key;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => handleSelectDemo(item.key, item.profile)}
                        className={`p-3 rounded-xl border text-left transition-all relative ${
                          isSelected
                            ? 'bg-amber-600/20 border-amber-500 text-white ring-1 ring-amber-500/50'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.profile.avatar}
                            alt={item.profile.name}
                            className="w-8 h-8 rounded-lg bg-slate-800 object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-white block truncate">
                              {item.profile.name}
                            </span>
                            <span className="text-[10px] text-amber-400 font-mono block">
                              {item.profile.prn}
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1.5 truncate">
                          {item.highlight}
                        </p>
                      </button>
                    );
                  })}

                {activeTab === 'mentor' &&
                  mentorDemoUsers.map((item) => {
                    const isSelected = selectedDemoKey === item.key;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => handleSelectDemo(item.key, item.profile)}
                        className={`p-3 rounded-xl border text-left transition-all relative ${
                          isSelected
                            ? 'bg-amber-600/20 border-amber-500 text-white ring-1 ring-amber-500/50'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.profile.avatar}
                            alt={item.profile.name}
                            className="w-8 h-8 rounded-lg bg-slate-800 object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-white block truncate">
                              {item.profile.name}
                            </span>
                            <span className="text-[10px] text-amber-400 font-mono block">
                              {item.profile.prn}
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1.5 truncate">
                          {item.highlight}
                        </p>
                      </button>
                    );
                  })}

                {activeTab === 'organizer' &&
                  organizerDemoUsers.map((item) => {
                    const isSelected = selectedDemoKey === item.key;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => handleSelectDemo(item.key, item.profile)}
                        className={`p-3 rounded-xl border text-left transition-all relative ${
                          isSelected
                            ? 'bg-amber-600/20 border-amber-500 text-white ring-1 ring-amber-500/50'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.profile.avatar}
                            alt={item.profile.name}
                            className="w-8 h-8 rounded-lg bg-slate-800 object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-white block truncate">
                              {item.profile.name}
                            </span>
                            <span className="text-[10px] text-amber-400 font-mono block">
                              {item.profile.prn}
                            </span>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1.5 truncate">
                          {item.badge}
                        </p>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Credential Inputs Form */}
            <form onSubmit={handleFormSubmit} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  RTMSSU PERMANENT REGISTRATION NUMBER (PRN):
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={prnInput}
                    onChange={(e) => setPrnInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    placeholder="e.g. RTMSSU-23-DS-014"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  STUDENT PORTAL PASSWORD / PIN:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    placeholder="••••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-amber-600 focus:ring-amber-500"
                  />
                  <span>Remember this terminal</span>
                </label>
                <a href="#help" className="hover:text-amber-400 transition-colors">
                  Forgot PRN / PIN?
                </a>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2"
              >
                <span>
                  Enter {activeTab === 'student' ? 'Student Skill Swap' : activeTab === 'mentor' ? 'Peer Mentor Portal' : 'Organizer Governance'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Institutional Legal & Security Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 px-4 py-4 text-center text-xs text-slate-500 z-10">
        <p>
          © 2026 {UNIVERSITY_NAME}. All rights reserved. Peer mentorship hours logged on this portal comply with UGC & NEP 2020 skill transfer guidelines.
        </p>
      </footer>
    </div>
  );
};
