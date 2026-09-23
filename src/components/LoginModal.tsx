import React, { useState } from 'react';
import { DEMO_USERS, UNIVERSITY_NAME, UNIVERSITY_SHORT } from '../mockData';
import { StudentProfile } from '../types';
import { 
  Building2, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  LogIn, 
  Key, 
  Mail, 
  ArrowRight,
  CheckCircle,
  X,
  Users
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: StudentProfile) => void;
  currentUser: StudentProfile;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentUser,
}) => {
  if (!isOpen) return null;

  const [activeRoleCategory, setActiveRoleCategory] = useState<'student' | 'mentor' | 'organizer'>('student');
  const [emailOrPrn, setEmailOrPrn] = useState('grishma.patil@rtmssu.ac.in');
  const [password, setPassword] = useState('student123');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const studentDemoProfiles = [
    { key: 'student-grishma', user: DEMO_USERS['student-grishma'], note: 'Default · 3rd Year Data Science & AI' },
    { key: 'student-bhagyesh', user: DEMO_USERS['student-bhagyesh'], note: 'Final Year B.Tech Computer Engineering' },
    { key: 'student-snehal', user: DEMO_USERS['student-snehal'], note: '2nd Year B.Des Interaction Design' },
    { key: 'student-aniket', user: DEMO_USERS['student-aniket'], note: '3rd Year B.Tech FinTech & Systems' },
  ];

  const mentorDemoProfiles = [
    { key: 'mentor-tanvi', user: DEMO_USERS['mentor-tanvi'], note: 'Senior Peer Mentor · M.Tech AI & Deep Learning' },
    { key: 'mentor-rohan', user: DEMO_USERS['mentor-rohan'], note: 'Senior Coding Mentor · B.Tech CE' },
    { key: 'mentor-aditya', user: DEMO_USERS['mentor-aditya'], note: 'Senior Robotics & Applied Math Mentor' },
  ];

  const organizerDemoProfiles = [
    { key: 'organizer-arvind', user: DEMO_USERS['organizer-arvind'], note: 'Dean of Student Innovation & Skills' },
    { key: 'organizer-sunita', user: DEMO_USERS['organizer-sunita'], note: 'Head of NEP Skill Transfer Credit Cell' },
    { key: 'organizer-shantanu', user: DEMO_USERS['organizer-shantanu'], note: 'Director of Hackathons & Outreach' },
  ];

  const handleSelectUser = (user: StudentProfile) => {
    onLoginSuccess(user);
    onClose();
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPrn.trim()) {
      setErrorMessage('Please enter your RTMSSU Email or PRN');
      return;
    }

    const matchedUser = Object.values(DEMO_USERS).find(
      u => u.email.toLowerCase() === emailOrPrn.toLowerCase() || u.prn.toLowerCase() === emailOrPrn.toLowerCase()
    );

    if (matchedUser) {
      onLoginSuccess(matchedUser);
    } else {
      const customUser: StudentProfile = {
        ...currentUser,
        email: emailOrPrn.includes('@') ? emailOrPrn : `${emailOrPrn.toLowerCase()}@rtmssu.ac.in`,
        prn: emailOrPrn.toUpperCase().includes('RTMSSU') ? emailOrPrn.toUpperCase() : `RTMSSU-${emailOrPrn.toUpperCase()}`,
        name: emailOrPrn.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Student',
        role: activeRoleCategory,
      };
      onLoginSuccess(customUser);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/70 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white font-bold text-sm font-display">
              {UNIVERSITY_SHORT}
            </div>
            <div>
              <h3 className="text-lg font-bold font-display tracking-tight text-white leading-tight">
                Switch Role / Demo Profiles
              </h3>
              <p className="text-[11px] text-amber-300">
                {UNIVERSITY_NAME}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-300 mt-2">
            Select any role or demo account to preview distinct interfaces: <strong>Student Portal</strong>, <strong>Mentor Academic Suite</strong>, or <strong>Organizer Governance Console</strong>.
          </p>
        </div>

        {/* Role Selector Segmented Control */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex gap-1">
          <button
            onClick={() => setActiveRoleCategory('student')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeRoleCategory === 'student'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
            <span>Students (4)</span>
          </button>

          <button
            onClick={() => setActiveRoleCategory('mentor')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeRoleCategory === 'mentor'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Peer Mentors (3)</span>
          </button>

          <button
            onClick={() => setActiveRoleCategory('organizer')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeRoleCategory === 'organizer'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Organizers / Faculty (3)</span>
          </button>
        </div>

        {/* Demo Users List */}
        <div className="p-6 max-h-[380px] overflow-y-auto space-y-2.5">
          {activeRoleCategory === 'student' &&
            studentDemoProfiles.map(({ key, user, note }) => {
              const isCurrent = currentUser.id === user.id;
              return (
                <button
                  key={key}
                  onClick={() => handleSelectUser(user)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500/30'
                      : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-xl bg-slate-100 object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <strong className="text-xs font-bold text-slate-900 truncate">
                          {user.name}
                        </strong>
                        <span className="text-[10px] text-amber-700 font-mono font-semibold">
                          {user.prn}
                        </span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 text-[9px] font-bold rounded">
                            Active Now
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {note}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        Teaches: {user.skillsOffered.map(s => s.name).join(', ')}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              );
            })}

          {activeRoleCategory === 'mentor' &&
            mentorDemoProfiles.map(({ key, user, note }) => {
              const isCurrent = currentUser.id === user.id;
              return (
                <button
                  key={key}
                  onClick={() => handleSelectUser(user)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500/30'
                      : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-xl bg-slate-100 object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <strong className="text-xs font-bold text-slate-900 truncate">
                          {user.name}
                        </strong>
                        <span className="text-[10px] text-blue-700 font-mono font-semibold">
                          {user.prn}
                        </span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.2 bg-blue-100 text-blue-900 text-[9px] font-bold rounded">
                            Active Now
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {note}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        Office: {user.mentorOfficeHours || user.department}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              );
            })}

          {activeRoleCategory === 'organizer' &&
            organizerDemoProfiles.map(({ key, user, note }) => {
              const isCurrent = currentUser.id === user.id;
              return (
                <button
                  key={key}
                  onClick={() => handleSelectUser(user)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600/30'
                      : 'border-slate-200 hover:border-amber-400 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-xl bg-slate-100 object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <strong className="text-xs font-bold text-slate-900 truncate">
                          {user.name}
                        </strong>
                        <span className="text-[10px] text-amber-800 font-mono font-semibold">
                          {user.prn}
                        </span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.2 bg-amber-200 text-amber-900 text-[9px] font-bold rounded">
                            Active Now
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium truncate mt-0.5">
                        {note}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {user.department}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              );
            })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Selected role launches tailored UI console immediately.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
