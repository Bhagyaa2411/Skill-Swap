import React, { useState } from 'react';
import { StudentProfile, OrganizerNotice, SkillCertificate } from '../types';
import { UNIVERSITY_NAME, UNIVERSITY_SHORT, DEMO_USERS } from '../mockData';
import { 
  Building2, 
  ShieldCheck, 
  Plus, 
  Award, 
  FileText, 
  Users, 
  BarChart3, 
  CheckCircle, 
  Clock, 
  Search, 
  ExternalLink, 
  AlertTriangle,
  Calendar,
  Layers,
  Sparkles,
  Download,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  LogOut,
  UserCheck
} from 'lucide-react';

interface OrganizerPortalProps {
  currentUser: StudentProfile;
  notices: OrganizerNotice[];
  certificates: SkillCertificate[];
  students: StudentProfile[];
  onAddNotice: (notice: OrganizerNotice) => void;
  onViewCertificate: (cert: SkillCertificate) => void;
  onSwitchUser: (user: StudentProfile) => void;
  onOpenLoginPage: () => void;
}

export const OrganizerPortal: React.FC<OrganizerPortalProps> = ({
  currentUser,
  notices,
  certificates,
  students,
  onAddNotice,
  onViewCertificate,
  onSwitchUser,
  onOpenLoginPage,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'notices' | 'nep-credits' | 'certificates' | 'registry'>('overview');
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState<boolean>(false);
  const [noticeSearch, setNoticeSearch] = useState<string>('');
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [selectedNoticeType, setSelectedNoticeType] = useState<string>('all');

  // Form state for broadcasting new notice
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeType, setNewNoticeType] = useState<OrganizerNotice['type']>('hackathon');
  const [newNoticeDept, setNewNoticeDept] = useState('School of Emerging Technologies');
  const [newNoticeDesc, setNewNoticeDesc] = useState('');
  const [newNoticeEventDate, setNewNoticeEventDate] = useState('');
  const [newNoticeDeadline, setNewNoticeDeadline] = useState('');
  const [newNoticeVenue, setNewNoticeVenue] = useState('RTMSSU Campus Innovation Hub');
  const [newNoticePrizes, setNewNoticePrizes] = useState('');
  const [newNoticeTags, setNewNoticeTags] = useState('Hackathon, RTMSSU, State Level');
  const [newNoticeUrgent, setNewNoticeUrgent] = useState(false);

  // NEP Pending approval states
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 'nep-1',
      studentName: 'Grishma Patil',
      studentPRN: 'RTMSSU-23-DS-014',
      department: 'School of Emerging Technologies',
      mentorName: 'Tanvi Deshmukh',
      skillArea: 'PyTorch & Deep Learning Foundations',
      hoursLogged: 28,
      creditsEligible: 2,
      submissionDate: 'Sep 22, 2026',
      status: 'pending',
    },
    {
      id: 'nep-2',
      studentName: 'Bhagyesh Nerkar',
      studentPRN: 'RTMSSU-23-CE-042',
      department: 'School of Engineering & Smart Technologies',
      mentorName: 'Rohan Kulkarni',
      skillArea: 'Graph Theory & Dynamic Programming',
      hoursLogged: 32,
      creditsEligible: 2,
      submissionDate: 'Sep 21, 2026',
      status: 'pending',
    },
    {
      id: 'nep-3',
      studentName: 'Snehal Gaikwad',
      studentPRN: 'RTMSSU-24-DE-009',
      department: 'School of Design & Media Technologies',
      mentorName: 'Aditya Joshi',
      skillArea: 'Scientific Computing for Designers',
      hoursLogged: 26,
      creditsEligible: 2,
      submissionDate: 'Sep 20, 2026',
      status: 'pending',
    },
  ]);

  const handleApproveNEP = (id: string) => {
    setPendingApprovals(prev =>
      prev.map(item => item.id === id ? { ...item, status: 'approved' } : item)
    );
  };

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim() || !newNoticeDesc.trim()) return;

    const notice: OrganizerNotice = {
      id: `notice-${Date.now()}`,
      title: newNoticeTitle,
      type: newNoticeType,
      organizerName: currentUser.name,
      organizerRole: currentUser.major || 'Dean of Student Innovation',
      department: newNoticeDept,
      description: newNoticeDesc,
      eventDate: newNoticeEventDate || undefined,
      deadline: newNoticeDeadline || undefined,
      venueOrLink: newNoticeVenue || undefined,
      tags: newNoticeTags.split(',').map(t => t.trim()).filter(Boolean),
      postedDate: 'Just now',
      prizesOrIncentive: newNoticePrizes || undefined,
      eligibleBatches: 'All Undergraduate & Postgraduate Students',
      registeredCount: 0,
      isUrgent: newNoticeUrgent,
    };

    onAddNotice(notice);
    setIsBroadcastModalOpen(false);
    setNewNoticeTitle('');
    setNewNoticeDesc('');
  };

  const filteredNotices = notices.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(noticeSearch.toLowerCase()) ||
                          n.description.toLowerCase().includes(noticeSearch.toLowerCase());
    const matchesType = selectedNoticeType === 'all' || n.type === selectedNoticeType;
    return matchesSearch && matchesType;
  });

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.prn.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.department.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 1. Distinct Institutional Top Bar */}
      <header className="border-b border-amber-900/40 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 px-4 sm:px-8 py-3 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 border border-amber-400/40 flex items-center justify-center text-white font-bold text-base shadow-sm">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base font-display tracking-tight">
                  {UNIVERSITY_NAME}
                </span>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold rounded">
                  Organizer Governance Console
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Academic Skill Accreditation & Campus Event Command Center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Organizer Persona Switcher */}
            <div className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
              <span className="text-[10px] text-slate-400 px-2 font-medium">Switch Admin:</span>
              <button
                onClick={() => onSwitchUser(DEMO_USERS['organizer-arvind'])}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  currentUser.id === DEMO_USERS['organizer-arvind'].id ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Dr. Arvind (Dean)
              </button>
              <button
                onClick={() => onSwitchUser(DEMO_USERS['organizer-sunita'])}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  currentUser.id === DEMO_USERS['organizer-sunita'].id ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Prof. Sunita (NEP Cell)
              </button>
              <button
                onClick={() => onSwitchUser(DEMO_USERS['organizer-shantanu'])}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  currentUser.id === DEMO_USERS['organizer-shantanu'].id ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Shantanu (Hackathons)
              </button>
            </div>

            {/* Switch to Student Portal Button */}
            <button
              onClick={() => onSwitchUser(DEMO_USERS['student-grishma'])}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-300 rounded-lg transition-colors flex items-center gap-1.5"
              title="Switch to Student Interface"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Student Interface</span>
            </button>

            {/* Full Login Page */}
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

      {/* 2. Admin Command Bar with Profile & Broadcast action */}
      <section className="bg-slate-900/80 border-b border-slate-800 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-11 h-11 rounded-xl bg-slate-800 border border-amber-500/30 object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base">
                  {currentUser.name}
                </span>
                <span className="text-xs text-amber-400 font-mono">
                  {currentUser.prn}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {currentUser.major || currentUser.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBroadcastModalOpen(true)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-600/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Broadcast Notice / Circular</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Dedicated Admin Navigation Tabs */}
      <nav className="bg-slate-950 border-b border-slate-800/80 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2">
          <button
            onClick={() => setActiveAdminTab('overview')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 shrink-0 ${
              activeAdminTab === 'overview'
                ? 'bg-amber-600/20 text-amber-400 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Campus Skill Analytics</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('notices')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 shrink-0 ${
              activeAdminTab === 'notices'
                ? 'bg-amber-600/20 text-amber-400 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>University Circulars & Hackathons ({notices.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('nep-credits')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 shrink-0 ${
              activeAdminTab === 'nep-credits'
                ? 'bg-amber-600/20 text-amber-400 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>NEP 2020 Credit Endorsement Queue ({pendingApprovals.filter(p => p.status === 'pending').length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('certificates')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 shrink-0 ${
              activeAdminTab === 'certificates'
                ? 'bg-amber-600/20 text-amber-400 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Certificates Repository ({certificates.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('registry')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 shrink-0 ${
              activeAdminTab === 'registry'
                ? 'bg-amber-600/20 text-amber-400 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Student & Mentor Registry</span>
          </button>
        </div>
      </nav>

      {/* 4. Tab Body Content */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 flex-1">
        {/* OVERVIEW TAB */}
        {activeAdminTab === 'overview' && (
          <div className="space-y-6">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs text-slate-400 block">Total Enrolled Students</span>
                <div className="text-2xl font-bold text-white mt-1 font-mono">1,480</div>
                <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                  <span>● 84 Active today</span>
                  <span className="text-slate-500">· 5 Schools</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs text-slate-400 block">Audited Peer Barter Hours</span>
                <div className="text-2xl font-bold text-amber-400 mt-1 font-mono">3,940 hrs</div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Compliant with UGC non-academic skill transfer
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs text-slate-400 block">NEP Academic Credits Issued</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono">294 Credits</div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Integrated into semester marksheets
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs text-slate-400 block">Active Verified Mentors</span>
                <div className="text-2xl font-bold text-blue-400 mt-1 font-mono">48 Mentors</div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Conducting weekly lab office hours
                </div>
              </div>
            </div>

            {/* Department Skill Surplus vs Demand Matrix */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Campus Skill Equilibrium Matrix by RTMSSU Schools
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real-time analysis of skills offered versus student demand across departments
                  </p>
                </div>
                <span className="text-xs text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  NEP Equilibrium: Balanced
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
                  <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
                    <span>School of Emerging Technologies</span>
                    <span className="text-emerald-400">High Barter Velocity</span>
                  </div>
                  <div className="text-xs text-slate-400 space-y-1.5">
                    <p><strong className="text-slate-300">Surplus Skills Offered:</strong> Python, PyTorch, Deep Learning, Statistics</p>
                    <p><strong className="text-slate-300">High Demand Wanted:</strong> React UI Architecture, Docker Deployment, Figma</p>
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
                  <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
                    <span>School of Engineering & Smart Technologies</span>
                    <span className="text-emerald-400">Active Lab Swaps</span>
                  </div>
                  <div className="text-xs text-slate-400 space-y-1.5">
                    <p><strong className="text-slate-300">Surplus Skills Offered:</strong> C++, Graph Algorithms, Linux, Mechatronics</p>
                    <p><strong className="text-slate-300">High Demand Wanted:</strong> Cloud Microservices, Data Science, Flutter</p>
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
                  <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
                    <span>School of Design & Media Technologies</span>
                    <span className="text-amber-400">Inter-Department Growth</span>
                  </div>
                  <div className="text-xs text-slate-400 space-y-1.5">
                    <p><strong className="text-slate-300">Surplus Skills Offered:</strong> Figma Design Systems, UI Critiques, User Journeys</p>
                    <p><strong className="text-slate-300">High Demand Wanted:</strong> Python Automation, Frontend Web Code, Blender 3D</p>
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
                  <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
                    <span>School of Management & Entrepreneurship</span>
                    <span className="text-blue-400">FinTech Growth</span>
                  </div>
                  <div className="text-xs text-slate-400 space-y-1.5">
                    <p><strong className="text-slate-300">Surplus Skills Offered:</strong> Financial Modeling, Venture Pitching, Go APIs</p>
                    <p><strong className="text-slate-300">High Demand Wanted:</strong> SQL Database Queries, Product Analytics, React</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NOTICES TAB */}
        {activeAdminTab === 'notices' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={noticeSearch}
                  onChange={(e) => setNoticeSearch(e.target.value)}
                  placeholder="Search campus notices, circulars, hackathons..."
                  className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedNoticeType}
                  onChange={(e) => setSelectedNoticeType(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-xs text-slate-300 rounded-lg px-3 py-1.5 focus:outline-none"
                >
                  <option value="all">All Notice Types</option>
                  <option value="hackathon">Hackathons</option>
                  <option value="exam">Exam Schedules</option>
                  <option value="campaign">Skill Campaigns</option>
                  <option value="announcement">Official Circulars</option>
                </select>

                <button
                  onClick={() => setIsBroadcastModalOpen(true)}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish Notice</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                          notice.type === 'hackathon' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          notice.type === 'exam' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                          notice.type === 'campaign' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                          'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}>
                          {notice.type}
                        </span>
                        {notice.isUrgent && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-red-600/30 text-red-300 border border-red-500/40 rounded">
                            Action Required
                          </span>
                        )}
                        <span className="text-xs text-slate-400">
                          Posted by {notice.organizerName} ({notice.organizerRole})
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white mt-1.5">
                        {notice.title}
                      </h4>

                      <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-3xl">
                        {notice.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-400">
                        {notice.eventDate && (
                          <div className="flex items-center gap-1.5 text-amber-400">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Event Date: {notice.eventDate}</span>
                          </div>
                        )}
                        {notice.venueOrLink && (
                          <div className="text-slate-300">
                            Venue: {notice.venueOrLink}
                          </div>
                        )}
                        {notice.prizesOrIncentive && (
                          <div className="text-emerald-400 font-semibold">
                            🏆 {notice.prizesOrIncentive}
                          </div>
                        )}
                        <div className="text-slate-400">
                          👥 {notice.registeredCount} Students Registered / RSVP
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEP CREDITS TAB */}
        {activeAdminTab === 'nep-credits' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-base font-bold text-white font-display">
                National Education Policy (NEP 2020) Skill Credit Verification Queue
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Official RTMSSU Academic Council review board for peer tutoring logs. Each 25 verified peer teaching hours qualify for 2 transferable non-academic skill credits.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Student & PRN</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Mentor Supervisor</th>
                    <th className="p-4">Skill Domain</th>
                    <th className="p-4">Audited Hours</th>
                    <th className="p-4">NEP Credits</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {pendingApprovals.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4">
                        <strong className="text-white block">{item.studentName}</strong>
                        <span className="text-[11px] text-amber-400 font-mono">{item.studentPRN}</span>
                      </td>
                      <td className="p-4 text-slate-400">{item.department}</td>
                      <td className="p-4 text-slate-200">{item.mentorName}</td>
                      <td className="p-4 text-slate-300 font-medium">{item.skillArea}</td>
                      <td className="p-4 font-mono text-amber-400 font-bold">{item.hoursLogged} hrs</td>
                      <td className="p-4 font-mono text-emerald-400 font-bold">+{item.creditsEligible} Credits</td>
                      <td className="p-4">
                        {item.status === 'approved' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                            <CheckCircle2 className="w-4 h-4" />
                            Approved
                          </span>
                        ) : (
                          <button
                            onClick={() => handleApproveNEP(item.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
                          >
                            Endorse & Issue Credit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CERTIFICATES TAB */}
        {activeAdminTab === 'certificates' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Official RTMSSU Skill Mastery Certificates Repository
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Accredited certificates with cryptographic verification hash and Dean's digital seal
                </p>
              </div>
              <span className="text-xs text-amber-400 font-mono bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                {certificates.length} Total Issued
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/50 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-amber-400 font-semibold">
                        {cert.certificateNumber}
                      </span>
                      <span className="text-slate-400">{cert.issueDate}</span>
                    </div>

                    <h4 className="text-base font-bold text-white mt-2">
                      {cert.skillName}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {cert.skillCategory}
                    </p>

                    <div className="mt-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs space-y-1">
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
                    <span className="text-[11px] text-slate-500">
                      Signed: {cert.signatureAuthority}
                    </span>
                    <button
                      onClick={() => onViewCertificate(cert)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Official Certificate</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REGISTRY TAB */}
        {activeAdminTab === 'registry' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Search registered students by name, PRN, or school..."
                className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
              />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Student Profile</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">RTMSSU School</th>
                    <th className="p-4">Teaching Hours</th>
                    <th className="p-4">Peer Rating</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={s.avatar}
                            alt={s.name}
                            className="w-8 h-8 rounded-lg bg-slate-800 object-cover"
                          />
                          <div>
                            <strong className="text-white block">{s.name}</strong>
                            <span className="text-[11px] text-amber-400 font-mono">{s.prn}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          s.role === 'mentor' ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {s.role}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400">{s.department}</td>
                      <td className="p-4 font-mono font-bold text-amber-400">{s.hoursTaught} hrs</td>
                      <td className="p-4">⭐ {s.rating} ({s.reviewCount})</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Broadcast Notice Modal */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white font-display">
                Broadcast University Notice / Hackathon
              </h3>
              <button
                onClick={() => setIsBroadcastModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBroadcastSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Notice / Circular Title
                </label>
                <input
                  type="text"
                  required
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  placeholder="e.g. Maharashtra State Skills Hackathon 2026"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Type</label>
                  <select
                    value={newNoticeType}
                    onChange={(e) => setNewNoticeType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  >
                    <option value="hackathon">Hackathon & Competitions</option>
                    <option value="exam">Exam & Capstone Schedule</option>
                    <option value="campaign">Skill Training Campaign</option>
                    <option value="announcement">Official Circular</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target School</label>
                  <select
                    value={newNoticeDept}
                    onChange={(e) => setNewNoticeDept(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  >
                    <option>All RTMSSU Schools</option>
                    <option>School of Emerging Technologies</option>
                    <option>School of Engineering & Smart Technologies</option>
                    <option>School of Design & Media Technologies</option>
                    <option>School of Management & Entrepreneurship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description & Eligibility</label>
                <textarea
                  rows={3}
                  required
                  value={newNoticeDesc}
                  onChange={(e) => setNewNoticeDesc(e.target.value)}
                  placeholder="Provide comprehensive details about the hackathon dates, prize pool, submission deadlines, and NEP credit eligibility..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Event Date</label>
                  <input
                    type="text"
                    value={newNoticeEventDate}
                    onChange={(e) => setNewNoticeEventDate(e.target.value)}
                    placeholder="e.g. Nov 14 - 16, 2026"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Prize / Incentives</label>
                  <input
                    type="text"
                    value={newNoticePrizes}
                    onChange={(e) => setNewNoticePrizes(e.target.value)}
                    placeholder="e.g. ₹2,50,000 Cash + Pre-Incubation"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={newNoticeUrgent}
                  onChange={(e) => setNewNoticeUrgent(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="urgent" className="text-slate-300 select-none">
                  Mark as High Priority / Urgent Campus Circular
                </label>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow-md shadow-amber-600/20"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
