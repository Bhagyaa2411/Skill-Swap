import React, { useState } from 'react';
import { StudentProfile, PeerReview, StudentSkill, SkillCertificate } from '../types';
import { UNIVERSITY_NAME, UNIVERSITY_SHORT } from '../mockData';
import { 
  Award, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Star, 
  Share2, 
  Plus, 
  Trash2, 
  Edit3,
  BookOpen,
  TrendingUp,
  Download,
  Building2,
  FileCheck,
  ExternalLink,
  ShieldCheck,
  X
} from 'lucide-react';

interface GrowthPassportTabProps {
  currentUser: StudentProfile;
  userCredits: number;
  reviews: PeerReview[];
  certificates: SkillCertificate[];
  onUpdateSkills: (offered: StudentSkill[], wanted: string[]) => void;
  onViewCertificate: (cert: SkillCertificate) => void;
  onGenerateCertificate: (certData: {
    skillName: string;
    skillCategory: string;
    mentorName: string;
    mentorPRN: string;
    hoursCompleted: number;
    learningOutcomes: string[];
  }) => void;
}

export const GrowthPassportTab: React.FC<GrowthPassportTabProps> = ({
  currentUser,
  userCredits,
  reviews,
  certificates,
  onUpdateSkills,
  onViewCertificate,
  onGenerateCertificate,
}) => {
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [offeredList, setOfferedList] = useState(currentUser.skillsOffered);
  const [wantedList, setWantedList] = useState(currentUser.skillsWanted);

  const [newOfferedName, setNewOfferedName] = useState('');
  const [newOfferedCategory, setNewOfferedCategory] = useState<'tech' | 'math' | 'design' | 'language' | 'business'>('tech');
  const [newOfferedLevel, setNewOfferedLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Advanced');

  const [newWantedName, setNewWantedName] = useState('');
  const [certificateCopied, setCertificateCopied] = useState(false);

  // New certificate generator modal state
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [claimSkillName, setClaimSkillName] = useState('Machine Learning & Neural Networks');
  const [claimCategory, setClaimCategory] = useState('Artificial Intelligence & Computing');
  const [claimMentorName, setClaimMentorName] = useState('Tanvi Deshmukh');
  const [claimMentorPRN, setClaimMentorPRN] = useState('RTMSSU-22-AI-008');
  const [claimHours, setClaimHours] = useState(14);

  const handleAddOffered = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOfferedName.trim()) return;
    const updated = [
      ...offeredList,
      {
        name: newOfferedName.trim(),
        category: newOfferedCategory,
        level: newOfferedLevel,
      },
    ];
    setOfferedList(updated);
    onUpdateSkills(updated, wantedList);
    setNewOfferedName('');
  };

  const handleRemoveOffered = (index: number) => {
    const updated = offeredList.filter((_, i) => i !== index);
    setOfferedList(updated);
    onUpdateSkills(updated, wantedList);
  };

  const handleAddWanted = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWantedName.trim()) return;
    const updated = [...wantedList, newWantedName.trim()];
    setWantedList(updated);
    onUpdateSkills(offeredList, updated);
    setNewWantedName('');
  };

  const handleRemoveWanted = (index: number) => {
    const updated = wantedList.filter((_, i) => i !== index);
    setWantedList(updated);
    onUpdateSkills(offeredList, updated);
  };

  const copyPassportTranscript = () => {
    const transcript = `=== RTMSSU Skill Swap Student Growth Credential ===
Student: ${currentUser.name} (${currentUser.prn})
Department: ${currentUser.department}
Institution: ${UNIVERSITY_NAME}
Major: ${currentUser.major} · ${currentUser.year}
Verified Peer Mentorship Hours: ${currentUser.hoursTaught} Hours
Time-Banked Skill Credits: ${userCredits} Credits
Peer Rating: ${currentUser.rating} / 5.0 (${currentUser.reviewCount} reviews)
Skills Mastered & Taught: ${currentUser.skillsOffered.map(s => `${s.name} (${s.level})`).join(', ')}
Verified Skill Certificates: ${certificates.map(c => `${c.skillName} (${c.certificateNumber})`).join(', ')}
Verified via RTMSSU Skill Swap Academic Ledger.`;
    navigator.clipboard.writeText(transcript);
    setCertificateCopied(true);
    setTimeout(() => setCertificateCopied(false), 2500);
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimSkillName.trim()) return;

    onGenerateCertificate({
      skillName: claimSkillName.trim(),
      skillCategory: claimCategory,
      mentorName: claimMentorName.trim() || 'Tanvi Deshmukh',
      mentorPRN: claimMentorPRN.trim() || 'RTMSSU-22-AI-008',
      hoursCompleted: Number(claimHours) || 10,
      learningOutcomes: [
        `Completed rigorous peer-to-peer code review and tutorial sessions in ${claimSkillName}`,
        `Demonstrated working software artifact in RTMSSU campus labs`,
        `Validated practical mastery under mentor supervision with verifiable hours log`
      ],
    });

    setIsClaimModalOpen(false);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Student Passport Hero Card */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/70 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-amber-900/30">
        <div 
          className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl ring-4 ring-white/10 bg-slate-800 object-cover shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-bold font-display text-white">
                  {currentUser.name}
                </h2>
                <span className="px-2 py-0.5 bg-amber-500/30 border border-amber-400/30 text-amber-200 text-xs font-semibold rounded-md flex items-center gap-1 font-mono">
                  {currentUser.prn}
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  RTMSSU Verified
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-200/80 mt-1">
                {currentUser.major} · {currentUser.department}
              </p>
              <p className="text-xs text-slate-300 max-w-xl mt-2 leading-relaxed">
                {currentUser.bio}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <button
              onClick={copyPassportTranscript}
              className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/15 transition-all shadow-xs"
            >
              {certificateCopied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Transcript Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-amber-300" />
                  <span>Export Transcript</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4 Quantitative Proof Metrics */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <span className="text-xs text-amber-200/80 block">Banked Skill Credits</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-amber-300">{userCredits}</span>
              <span className="text-xs text-slate-400">Credits</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">1 credit = 1 free peer lesson</span>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <span className="text-xs text-amber-200/80 block">Teaching Hours Bartered</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-amber-300">{currentUser.hoursTaught}</span>
              <span className="text-xs text-slate-400">Hours</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Counts toward NEP credits</span>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <span className="text-xs text-amber-200/80 block">Peer Satisfaction Rating</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-emerald-300">{currentUser.rating}</span>
              <span className="text-xs text-slate-400">/ 5.0</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Across {currentUser.reviewCount} barter swaps</span>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <span className="text-xs text-amber-200/80 block">Verified Certificates</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-amber-300">{certificates.length}</span>
              <span className="text-xs text-slate-400">Earned</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">With RTMSSU Gold Seal</span>
          </div>
        </div>
      </div>

      {/* FEATURE 5: Official Skill Completion Certificates Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Official RTMSSU Skill Mastery Certificates
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Formally accredited certificates generated upon completing peer-to-peer knowledge exchanges
            </p>
          </div>

          <button
            onClick={() => setIsClaimModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate Certificate from Barter</span>
          </button>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/40 via-white to-slate-50/50 hover:shadow-md transition-all space-y-3 relative group"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    {cert.certificateNumber}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                    {cert.skillName}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {cert.skillCategory}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 text-xs space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Mentored by:</span>
                  <span className="font-semibold text-slate-800">
                    {cert.mentorName} ({cert.mentorPRN})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Verified Mentorship:</span>
                  <span className="font-mono font-semibold text-slate-800">
                    {cert.hoursCompleted} Hours
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date Issued:</span>
                  <span className="text-slate-700">{cert.issueDate}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onViewCertificate(cert)}
                  className="w-full py-2 px-3 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-amber-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>View & Print Official Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout: Skills Matrix & Peer Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Manage Skills */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Skills You Can Teach & Barter
                </h3>
                <p className="text-xs text-slate-500">
                  These topics appear on your public RTMSSU profile
                </p>
              </div>
              <button
                onClick={() => setIsEditingSkills(!isEditingSkills)}
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingSkills ? 'Done Editing' : 'Edit Matrix'}</span>
              </button>
            </div>

            {/* Offered Skills List */}
            <div className="space-y-2.5">
              {offeredList.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/70"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                      {skill.category} · {skill.level}
                    </span>
                  </div>

                  {isEditingSkills && (
                    <button
                      onClick={() => handleRemoveOffered(idx)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add skill offer form */}
            {isEditingSkills && (
              <form onSubmit={handleAddOffered} className="pt-3 border-t border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Add New Skill to Offer:
                </span>
                <input
                  type="text"
                  value={newOfferedName}
                  onChange={(e) => setNewOfferedName(e.target.value)}
                  placeholder="e.g. PyTorch Deep Learning, Docker..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newOfferedCategory}
                    onChange={(e: any) => setNewOfferedCategory(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-700"
                  >
                    <option value="tech">Technology</option>
                    <option value="math">Mathematics</option>
                    <option value="design">Design & UI</option>
                    <option value="business">Management</option>
                  </select>

                  <select
                    value={newOfferedLevel}
                    onChange={(e: any) => setNewOfferedLevel(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-700"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow-xs"
                >
                  Add to My Taught Skills
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Peer Reviews & Feedback */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Campus Peer Feedback & Testimonials
                </h3>
                <p className="text-xs text-slate-500">
                  Verified reviews from students who learned from you
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{currentUser.rating}</span>
                <span className="text-slate-400 font-normal">({currentUser.reviewCount})</span>
              </div>
            </div>

            <div className="space-y-3.5">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/70 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={rev.reviewerAvatar}
                        alt={rev.reviewerName}
                        className="w-7 h-7 rounded-lg bg-slate-200 object-cover"
                      />
                      <div>
                        <strong className="text-xs text-slate-900 block leading-tight">
                          {rev.reviewerName}
                        </strong>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {rev.reviewerUniversity}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                      <span>★ {rev.rating}.0</span>
                      <span className="text-[10px] text-slate-400 font-normal">· {rev.date}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>

                  <div className="text-[10px] text-amber-800 font-medium">
                    Skill exchanged: {rev.skillTaught} ↔ {rev.skillReceived}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Claim Certificate Modal */}
      {isClaimModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Generate Peer Skill Certificate
                </h3>
              </div>
              <button
                onClick={() => setIsClaimModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Log completed peer swap hours to instantly generate an accredited RTMSSU certificate signed by your supervising mentor and the university academic dean.
            </p>

            <form onSubmit={handleClaimSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mastered Skill / Coursework
                </label>
                <input
                  type="text"
                  required
                  value={claimSkillName}
                  onChange={(e) => setClaimSkillName(e.target.value)}
                  placeholder="e.g. PyTorch & Deep Learning Foundations"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Supervising Mentor Name
                  </label>
                  <input
                    type="text"
                    required
                    value={claimMentorName}
                    onChange={(e) => setClaimMentorName(e.target.value)}
                    placeholder="e.g. Tanvi Deshmukh"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mentor PRN
                  </label>
                  <input
                    type="text"
                    required
                    value={claimMentorPRN}
                    onChange={(e) => setClaimMentorPRN(e.target.value)}
                    placeholder="e.g. RTMSSU-22-AI-008"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Verified Hours Completed
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={claimHours}
                    onChange={(e) => setClaimHours(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Domain / Field
                  </label>
                  <input
                    type="text"
                    value={claimCategory}
                    onChange={(e) => setClaimCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsClaimModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow-md shadow-amber-600/20"
                >
                  Issue Accredited Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
