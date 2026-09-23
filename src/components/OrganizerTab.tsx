import React, { useState } from 'react';
import { OrganizerNotice, StudentProfile } from '../types';
import { UNIVERSITY_NAME, UNIVERSITY_SHORT } from '../mockData';
import { 
  Building2, 
  Calendar, 
  Trophy, 
  BookOpen, 
  Megaphone, 
  Plus, 
  Clock, 
  Users, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Tag,
  ShieldCheck,
  MapPin,
  Sparkles,
  X
} from 'lucide-react';

interface OrganizerTabProps {
  notices: OrganizerNotice[];
  currentUser: StudentProfile;
  onAddNotice: (notice: Omit<OrganizerNotice, 'id' | 'postedDate' | 'registeredCount'>) => void;
  onRsvpNotice: (noticeId: string) => void;
  rsvpdNotices: string[];
}

export const OrganizerTab: React.FC<OrganizerTabProps> = ({
  notices,
  currentUser,
  onAddNotice,
  onRsvpNotice,
  rsvpdNotices,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // New notice form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'hackathon' | 'exam' | 'campaign' | 'announcement'>('hackathon');
  const [newDepartment, setNewDepartment] = useState('School of Emerging Technologies');
  const [newOrganizerName, setNewOrganizerName] = useState(currentUser.name);
  const [newOrganizerRole, setNewOrganizerRole] = useState(
    currentUser.role === 'organizer' ? 'Faculty Convener & Hackathon Chair' : 'Student Council Lead'
  );
  const [newDescription, setNewDescription] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newVenue, setNewVenue] = useState('RTMSSU Innovation Hub & Seminar Hall');
  const [newPrizes, setNewPrizes] = useState('');
  const [newBatches, setNewBatches] = useState('All RTMSSU Students');
  const [newTags, setNewTags] = useState('Hackathon, RTMSSU, Innovation');
  const [isUrgent, setIsUrgent] = useState(false);

  const filteredNotices = notices.filter((n) => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddNotice({
      title: newTitle.trim(),
      type: newType,
      organizerName: newOrganizerName.trim() || currentUser.name,
      organizerRole: newOrganizerRole.trim() || 'RTMSSU Event Coordinator',
      department: newDepartment,
      description: newDescription.trim(),
      eventDate: newEventDate.trim() || undefined,
      deadline: newDeadline.trim() || undefined,
      venueOrLink: newVenue.trim() || undefined,
      prizesOrIncentive: newPrizes.trim() || undefined,
      eligibleBatches: newBatches.trim() || 'All Batches',
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      isUrgent,
    });

    setIsPublishModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewDescription('');
    setNewEventDate('');
    setNewDeadline('');
    setNewPrizes('');
  };

  const getNoticeBadge = (type: OrganizerNotice['type']) => {
    switch (type) {
      case 'hackathon':
        return { label: '🏆 Hackathon & Competition', color: 'text-amber-800 bg-amber-50 border-amber-200' };
      case 'exam':
        return { label: '📝 Exam & Assessment Schedule', color: 'text-rose-800 bg-rose-50 border-rose-200' };
      case 'campaign':
        return { label: '🚀 Skill Training Campaign', color: 'text-indigo-800 bg-indigo-50 border-indigo-200' };
      case 'announcement':
        return { label: '📢 Academic Circular', color: 'text-emerald-800 bg-emerald-50 border-emerald-200' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Official Management Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 border border-amber-400/30 rounded-full text-xs font-semibold text-amber-300">
              <Building2 className="w-3.5 h-3.5" />
              <span>University Management & Student Affairs Portal</span>
              <span className="text-amber-400/50">·</span>
              <span className="font-normal text-slate-200">{UNIVERSITY_SHORT}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Organizer & University Noticeboard
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Official broadcast channel managed by RTMSSU Faculty, Examination Cell, and Innovation Council. Access verified state hackathons, viva schedules, skill acceleration bootcamps, and academic circulars.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 self-stretch md:self-auto">
            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-xs font-semibold rounded-xl shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Publish University Notice</span>
            </button>
          </div>
        </div>

        {/* Quick stats banner */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Active Hackathons</span>
            <span className="text-lg font-bold font-mono text-amber-400">1 Flagship</span>
            <span className="text-[10px] text-slate-400 block">₹2.5L Prize Pool</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Upcoming Exams</span>
            <span className="text-lg font-bold font-mono text-rose-300">Dec 02</span>
            <span className="text-[10px] text-slate-400 block">Capstone Phase-II Viva</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Skill Campaigns</span>
            <span className="text-lg font-bold font-mono text-indigo-300">NVIDIA DLI</span>
            <span className="text-[10px] text-slate-400 block">100% University Sponsored</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Skill Credit Transfer</span>
            <span className="text-lg font-bold font-mono text-emerald-300">NEP 2020</span>
            <span className="text-[10px] text-slate-400 block">2 Elective Credits</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Notices' },
            { id: 'hackathon', label: 'Hackathons & Competitions' },
            { id: 'exam', label: 'Exam Schedules' },
            { id: 'campaign', label: 'Skill Campaigns' },
            { id: 'announcement', label: 'Academic Circulars' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                filterType === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-medium text-slate-500 hidden sm:inline">
          Showing {filteredNotices.length} notices
        </span>
      </div>

      {/* Notices Grid */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => {
          const badge = getNoticeBadge(notice.type);
          const hasRsvpd = rsvpdNotices.includes(notice.id);

          return (
            <div
              key={notice.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-md transition-all p-6 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className={`px-2.5 py-0.5 rounded-md font-semibold text-[11px] border ${badge.color}`}>
                      {badge.label}
                    </span>
                    {notice.isUrgent && (
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-bold rounded flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Priority Action
                      </span>
                    )}
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500 font-medium">{notice.department}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-400">{notice.postedDate}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {notice.title}
                  </h3>
                </div>

                {/* Organizer lockup */}
                <div className="text-left lg:text-right shrink-0">
                  <span className="text-xs font-bold text-slate-800 block">
                    {notice.organizerName}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    {notice.organizerRole}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="py-4 space-y-3">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {notice.description}
                </p>

                {/* Key metadata grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                  {notice.eventDate && (
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-500 block">Event Dates:</span>
                        <span className="font-semibold text-slate-800">{notice.eventDate}</span>
                      </div>
                    </div>
                  )}

                  {notice.deadline && (
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-500 block">Deadline / Registration:</span>
                        <span className="font-semibold text-slate-800">{notice.deadline}</span>
                      </div>
                    </div>
                  )}

                  {notice.venueOrLink && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-500 block">Venue / Location:</span>
                        <span className="font-semibold text-slate-800">{notice.venueOrLink}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Prizes / Incentives banner if present */}
                {notice.prizesOrIncentive && (
                  <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center gap-2 text-xs text-amber-950 font-medium">
                    <Trophy className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      <strong>Incentives & Awards:</strong> {notice.prizesOrIncentive}
                    </span>
                  </div>
                )}

                {/* Clean unboxed tags */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 flex-wrap pt-1">
                  {notice.tags.map((t, idx) => (
                    <span key={t}>
                      #{t}
                      {idx < notice.tags.length - 1 && <span className="ml-2 text-slate-300">·</span>}
                    </span>
                  ))}
                  {notice.eligibleBatches && (
                    <>
                      <span className="text-slate-300">|</span>
                      <span className="font-medium text-slate-600">Eligible: {notice.eligibleBatches}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>
                    <strong>{notice.registeredCount}</strong> RTMSSU students registered
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRsvpNotice(notice.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all shadow-xs ${
                      hasRsvpd
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {hasRsvpd ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Registered & RSVP'd</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>RSVP / Register</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Publish Notice Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Publish University Notice / Competition
                </h3>
                <p className="text-xs text-slate-500">
                  Broadcast to all RTMSSU students across departments
                </p>
              </div>
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  NOTICE / EVENT TITLE:
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. RTMSSU State Skills Hackathon 2026 or End-Sem Viva Schedule"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Notice Category:
                  </label>
                  <select
                    value={newType}
                    onChange={(e: any) => setNewType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="hackathon">Hackathon & Competition</option>
                    <option value="exam">Exam Schedule / Assessment</option>
                    <option value="campaign">Skill Training Campaign</option>
                    <option value="announcement">Academic Circular</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    University Department:
                  </label>
                  <select
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                  >
                    <option value="School of Emerging Technologies">School of Emerging Technologies</option>
                    <option value="School of Engineering & Smart Technologies">School of Engineering</option>
                    <option value="School of Design & Media Technologies">School of Design</option>
                    <option value="School of Management & Entrepreneurship">School of Management</option>
                    <option value="Directorate of Student Affairs, RTMSSU">Directorate of Student Affairs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Details & Instructions:
                </label>
                <textarea
                  rows={3}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explain event rules, schedule guidelines, team eligibility..."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Event Dates:
                  </label>
                  <input
                    type="text"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    placeholder="e.g. Nov 14 - Nov 16, 2026"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Registration Deadline:
                  </label>
                  <input
                    type="text"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    placeholder="e.g. Oct 30, 2026"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Venue / Portal Link:
                  </label>
                  <input
                    type="text"
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    placeholder="e.g. RTMSSU Main Auditorium / Lab 3"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Prizes / Certification Incentive:
                  </label>
                  <input
                    type="text"
                    value={newPrizes}
                    onChange={(e) => setNewPrizes(e.target.value)}
                    placeholder="e.g. ₹2,50,000 Cash Prize + Certificate"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tags (comma separated):
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="e.g. Hackathon, AI, Cash Prize"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="urgentNotice"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="urgentNotice" className="text-xs text-slate-700 font-medium">
                  Mark as High Priority / Urgent Notice for all students
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
