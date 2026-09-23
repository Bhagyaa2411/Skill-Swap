import React, { useState } from 'react';
import { StudentProfile, SkillSwapRequest, MentorshipSession, SkillCertificate } from '../types';
import { UNIVERSITY_NAME, UNIVERSITY_SHORT, DEMO_USERS, INITIAL_MENTOR_REQUESTS, INITIAL_MENTOR_SESSIONS } from '../mockData';
import { 
  Users, 
  Clock, 
  Calendar, 
  Award, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Star, 
  MessageSquare, 
  MapPin, 
  ShieldCheck, 
  Check, 
  ChevronRight,
  LogOut,
  Building2,
  Sparkles,
  ExternalLink,
  Plus
} from 'lucide-react';

interface MentorPortalProps {
  currentUser: StudentProfile;
  certificates: SkillCertificate[];
  onSwitchUser: (user: StudentProfile) => void;
  onOpenLoginPage: () => void;
  onViewCertificate: (cert: SkillCertificate) => void;
}

export const MentorPortal: React.FC<MentorPortalProps> = ({
  currentUser,
  certificates,
  onSwitchUser,
  onOpenLoginPage,
  onViewCertificate,
}) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'sessions' | 'endorsements' | 'office-hours' | 'mentees'>('requests');
  const [isAcceptingMentees, setIsAcceptingMentees] = useState<boolean>(true);
  const [requests, setRequests] = useState<SkillSwapRequest[]>(INITIAL_MENTOR_REQUESTS);
  const [sessions, setSessions] = useState<MentorshipSession[]>(INITIAL_MENTOR_SESSIONS);

  // Office hours slots
  const [officeSlots, setOfficeSlots] = useState([
    { day: 'Monday', time: '4:00 PM - 6:30 PM', room: 'RTMSSU AI Research Lab 3, Desk 4', capacity: '2 students' },
    { day: 'Wednesday', time: '4:00 PM - 6:30 PM', room: 'RTMSSU AI Research Lab 3, Desk 4', capacity: '2 students' },
    { day: 'Friday', time: '3:30 PM - 5:30 PM', room: 'Campus Innovation Center, Pod B', capacity: '3 students' },
  ]);

  const handleAcceptRequest = (requestId: string) => {
    setRequests(prev =>
      prev.map(r => r.id === requestId ? { ...r, status: 'accepted' } : r)
    );
  };

  const handleDeclineRequest = (requestId: string) => {
    setRequests(prev =>
      prev.map(r => r.id === requestId ? { ...r, status: 'declined' } : r)
    );
  };

  const handleCompleteSession = (sessionId: string) => {
    setSessions(prev =>
      prev.map(s => s.id === sessionId ? { ...s, status: 'completed' } : s)
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 1. Dedicated Mentor Top Bar */}
      <header className="border-b border-blue-900/40 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950/40 px-4 sm:px-8 py-3 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 border border-blue-400/40 flex items-center justify-center text-white font-bold text-base shadow-sm">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base font-display tracking-tight">
                  {UNIVERSITY_NAME}
                </span>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold rounded">
                  Peer Mentor Suite
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Departmental 1-on-1 Office Hours & NEP Skill Accreditation Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Mentor Persona Switcher */}
            <div className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
              <span className="text-[10px] text-slate-400 px-2 font-medium">Switch Mentor:</span>
              <button
                onClick={() => onSwitchUser(DEMO_USERS['mentor-tanvi'])}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  currentUser.id === DEMO_USERS['mentor-tanvi'].id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Tanvi (AI/PyTorch)
              </button>
              <button
                onClick={() => onSwitchUser(DEMO_USERS['mentor-rohan'])}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  currentUser.id === DEMO_USERS['mentor-rohan'].id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Rohan (Algorithms)
              </button>
              <button
                onClick={() => onSwitchUser(DEMO_USERS['mentor-aditya'])}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  currentUser.id === DEMO_USERS['mentor-aditya'].id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Aditya (Robotics/Math)
              </button>
            </div>

            {/* Switch to Student Interface */}
            <button
              onClick={() => onSwitchUser(DEMO_USERS['student-grishma'])}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-300 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Student Interface</span>
            </button>

            {/* Switch to Organizer Portal */}
            <button
              onClick={() => onSwitchUser(DEMO_USERS['organizer-arvind'])}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Organizer Console</span>
            </button>

            <button
              onClick={onOpenLoginPage}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Open Official Login Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Mentor Profile & Status Deck */}
      <section className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-blue-500/40 object-cover shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white font-display">
                  {currentUser.name}
                </h2>
                <span className="text-xs font-mono text-amber-400 font-semibold">
                  {currentUser.prn}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified RTMSSU Senior Mentor
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {currentUser.major} · {currentUser.department}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                <span>⭐ {currentUser.rating} ({currentUser.reviewCount} peer evaluations)</span>
                <span>⏱️ {currentUser.hoursTaught} hours taught</span>
                <span>📍 {currentUser.mentorOfficeHours || 'RTMSSU AI Research Lab 3'}</span>
              </div>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
            <div className="text-right">
              <span className="text-xs font-semibold text-white block">
                Mentee Capacity Status
              </span>
              <span className="text-[11px] text-slate-400">
                {isAcceptingMentees ? 'Accepting 1-on-1 Swaps' : 'Capacity Full / Away'}
              </span>
            </div>
            <button
              onClick={() => setIsAcceptingMentees(!isAcceptingMentees)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                isAcceptingMentees ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'
              }`}
            >
              <span className="w-4 h-4 bg-white rounded-full shadow-md" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Mentor Navigation Tabs */}
      <nav className="bg-slate-950 border-b border-slate-800/80 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'requests'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Incoming Barter Requests ({requests.filter(r => r.status === 'pending').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sessions')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'sessions'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Scheduled 1-on-1 Sessions ({sessions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('endorsements')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'endorsements'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Endorse Student Certificates ({certificates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('office-hours')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'office-hours'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Office Hours & Lab Desks</span>
          </button>
        </div>
      </nav>

      {/* 4. Tab Body Content */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 flex-1">
        {/* REQUESTS TAB */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <h3 className="text-base font-bold text-white font-display">
                Incoming Peer Barter & Mentorship Applications
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Students wishing to exchange their skills for your expertise in {currentUser.skillsOffered.map(s => s.name).join(', ')}.
              </p>
            </div>

            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={req.fromStudentAvatar}
                        alt={req.fromStudentName}
                        className="w-11 h-11 rounded-xl bg-slate-800 object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-white text-sm">{req.fromStudentName}</strong>
                          <span className="text-xs text-amber-400 font-mono">{req.fromStudentPRN}</span>
                        </div>
                        <p className="text-xs text-slate-400">{req.fromStudentMajor}</p>

                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800">
                            <span className="text-slate-400 block text-[11px]">They Offer to Teach:</span>
                            <strong className="text-emerald-400 font-semibold">{req.skillOffered}</strong>
                          </div>
                          <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800">
                            <span className="text-slate-400 block text-[11px]">Requested from You:</span>
                            <strong className="text-amber-400 font-semibold">{req.skillRequested}</strong>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 mt-3 italic bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
                          "{req.notes}"
                        </p>

                        <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                          <span>⏱️ Format: {req.sessionFormat}</span>
                          <span>📅 Proposed: {req.scheduledTime}</span>
                          <span>• {req.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2 shrink-0">
                      {req.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleAcceptRequest(req.id)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Accept Swap</span>
                          </button>
                          <button
                            onClick={() => handleDeclineRequest(req.id)}
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
                          >
                            Decline
                          </button>
                        </>
                      ) : (
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold text-center ${
                          req.status === 'accepted' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {req.status === 'accepted' ? 'Accepted & Scheduled' : 'Declined'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SESSIONS TAB */}
        {activeTab === 'sessions' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Scheduled 1-on-1 Mentorship Sessions
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Completed sessions are automatically logged toward student NEP skill credit marksheets.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {sessions.map((sess) => (
                <div
                  key={sess.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={sess.menteeAvatar}
                        alt={sess.menteeName}
                        className="w-12 h-12 rounded-xl bg-slate-800 object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-white text-sm">{sess.menteeName}</strong>
                          <span className="text-xs text-amber-400 font-mono">{sess.menteePRN}</span>
                        </div>
                        <h4 className="text-xs font-semibold text-slate-200 mt-0.5">
                          {sess.topic}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                          <span className="text-amber-400 font-medium">🕒 {sess.scheduledTime} ({sess.durationMinutes}m)</span>
                          <span>📍 {sess.location}</span>
                          <span className="text-emerald-400 font-medium">✓ NEP Credit Eligible</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {sess.status === 'scheduled' ? (
                        <button
                          onClick={() => handleCompleteSession(sess.id)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark Completed & Log NEP Hours</span>
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-xl">
                          <Check className="w-3.5 h-3.5" />
                          <span>Hours Logged & Verified</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ENDORSEMENTS TAB */}
        {activeTab === 'endorsements' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <h3 className="text-base font-bold text-white font-display">
                Official RTMSSU Skill Mastery Certificates (Issued by You)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Certificates formally verifying student mastery of skills acquired under your peer supervision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-amber-400 font-mono font-semibold">{cert.certificateNumber}</span>
                      <span className="text-slate-400">{cert.issueDate}</span>
                    </div>

                    <h4 className="text-base font-bold text-white mt-2">
                      {cert.skillName}
                    </h4>

                    <div className="mt-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Awarded To:</span>
                        <strong className="text-white">{cert.studentName} ({cert.studentPRN})</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Supervising Mentor:</span>
                        <span className="text-slate-300">{cert.mentorName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Verified Peer Hours:</span>
                        <span className="text-emerald-400 font-bold">{cert.hoursCompleted} Hours</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Endorsed by Dean
                    </span>
                    <button
                      onClick={() => onViewCertificate(cert)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <span>View Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OFFICE HOURS TAB */}
        {activeTab === 'office-hours' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <h3 className="text-base font-bold text-white font-display">
                Weekly Campus Office Hours & Lab Desks
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Set times when other students can drop by your designated RTMSSU lab desk for drop-in barter questions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {officeSlots.map((slot, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{slot.day}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Active Slot</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-2 font-mono">{slot.time}</div>
                  <div className="text-xs text-slate-400 mt-2 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <span>{slot.room}</span>
                  </div>
                  <div className="mt-3 text-[11px] text-slate-500">
                    Max capacity: {slot.capacity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
