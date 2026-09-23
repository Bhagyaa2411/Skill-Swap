import React, { useState, useMemo } from 'react';
import { StudentProfile } from '../types';
import { 
  Search, 
  ArrowRightLeft, 
  MessageSquare, 
  Star, 
  CheckCircle, 
  Zap, 
  Clock, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

interface SkillBarterTabProps {
  students: StudentProfile[];
  currentUser: StudentProfile;
  onRequestSwap: (student: StudentProfile) => void;
  onOpenChatWith: (student: StudentProfile) => void;
  initialTeachQuery?: string;
  initialLearnQuery?: string;
}

export const SkillBarterTab: React.FC<SkillBarterTabProps> = ({
  students,
  currentUser,
  onRequestSwap,
  onOpenChatWith,
  initialTeachQuery = '',
  initialLearnQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [viewingProfile, setViewingProfile] = useState<StudentProfile | null>(null);

  // Sync with initial queries if provided
  React.useEffect(() => {
    if (initialTeachQuery || initialLearnQuery) {
      setSearchQuery(initialLearnQuery || initialTeachQuery);
    }
  }, [initialTeachQuery, initialLearnQuery]);

  // Compute synergy match score between partner and currentUser
  const computeSynergy = (partner: StudentProfile) => {
    let score = 50; // base compatibility

    // Check if partner offers something currentUser wants
    const givesUserWants = partner.skillsOffered.some((sk) =>
      currentUser.skillsWanted.some((w) =>
        sk.name.toLowerCase().includes(w.toLowerCase()) || w.toLowerCase().includes(sk.name.toLowerCase())
      )
    );

    // Check if partner wants something currentUser offers
    const wantsUserGives = partner.skillsWanted.some((w) =>
      currentUser.skillsOffered.some((sk) =>
        sk.name.toLowerCase().includes(w.toLowerCase()) || w.toLowerCase().includes(sk.name.toLowerCase())
      )
    );

    if (givesUserWants && wantsUserGives) score += 46; // High reciprocal match!
    else if (givesUserWants || wantsUserGives) score += 25;

    // Rating boost
    score += Math.min(Math.round(partner.rating * 0.5), 3);

    return Math.min(score, 99);
  };

  const categories = [
    { id: 'all', label: 'All Fields' },
    { id: 'tech', label: 'Software & AI' },
    { id: 'math', label: 'Math & Sciences' },
    { id: 'design', label: 'UI/UX & Design' },
    { id: 'language', label: 'Languages' },
    { id: 'business', label: 'Business & Pitch' },
  ];

  const departments = [
    'all',
    'School of Emerging Technologies',
    'School of Engineering & Smart Technologies',
    'School of Design & Media Technologies',
    'School of Management & Entrepreneurship',
    'School of Skill Development & Humanities',
  ];

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      // Don't show current user in barter list
      if (s.id === currentUser.id) return false;

      // Category filter
      if (selectedCategory !== 'all') {
        const hasCategory = s.skillsOffered.some(
          (sk) => sk.category === selectedCategory
        );
        if (!hasCategory) return false;
      }

      // Department filter
      if (selectedDepartment !== 'all' && s.department !== selectedDepartment) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = s.name.toLowerCase().includes(q);
        const matchesDept = (s.department || '').toLowerCase().includes(q);
        const matchesPrn = (s.prn || '').toLowerCase().includes(q);
        const matchesMajor = s.major.toLowerCase().includes(q);
        const matchesOffered = s.skillsOffered.some((sk) =>
          sk.name.toLowerCase().includes(q)
        );
        const matchesWanted = s.skillsWanted.some((w) =>
          w.toLowerCase().includes(q)
        );
        return (
          matchesName ||
          matchesDept ||
          matchesPrn ||
          matchesMajor ||
          matchesOffered ||
          matchesWanted
        );
      }

      return true;
    });
  }, [students, currentUser.id, selectedCategory, selectedDepartment, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header & Controls bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill, student PRN, major, or RTMSSU department..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Department:</span>
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-xs font-medium text-slate-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 max-w-[200px] truncate"
            >
              <option value="all">All RTMSSU Departments</option>
              {departments.filter((d) => d !== 'all').map((dept) => (
                <option key={dept} value={dept}>
                  {dept.replace('School of ', '')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Interactive Segmented Category Filter */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reciprocal Synergy Banner Notice */}
      <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center justify-between text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Reciprocal Barter Match Active:</strong> Matches are ranked by mutual skill compatibility with your profile (You offer: {currentUser.skillsOffered.map(s => s.name).join(', ')}).
          </span>
        </div>
        <span className="font-mono font-medium text-amber-800 hidden sm:inline">
          {filteredStudents.length} Peer Partners
        </span>
      </div>

      {/* Student Peer Grid */}
      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <ArrowRightLeft className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No matching peer mentors found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or select "All Fields" to discover more students.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedDepartment('all');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredStudents.map((student) => {
            const synergy = computeSynergy(student);
            const isHighSynergy = synergy >= 85;

            return (
              <div
                key={student.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Top Section */}
                <div className="p-6">
                  {/* Row 1: Student Header info & Synergy score */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-12 h-12 rounded-xl bg-slate-100 object-cover ring-1 ring-slate-200"
                        />
                        {student.online && (
                          <span 
                            className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" 
                            title="Online now"
                          />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setViewingProfile(student)}
                            className="text-base font-bold text-slate-900 hover:text-amber-700 transition-colors text-left"
                          >
                            {student.name}
                          </button>
                          {student.verifiedStudent && (
                            <span title="Verified University Student" className="inline-flex items-center">
                              <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                            </span>
                          )}
                        </div>
                        {/* Clean unboxed metadata with subtle dots */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 flex-wrap">
                          <span className="font-mono text-[11px] font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/60">
                            {student.prn || 'RTMSSU'}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate max-w-[180px]">{student.department || student.university}</span>
                          <span aria-hidden="true">·</span>
                          <span>{student.year}</span>
                        </div>
                      </div>
                    </div>

                    {/* Reciprocal match indicator */}
                    <div className="text-right shrink-0">
                      <div className={`inline-flex items-center gap-1 text-xs font-semibold ${
                        isHighSynergy ? 'text-amber-700' : 'text-slate-600'
                      }`}>
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span className="font-mono tabular-nums">{synergy}%</span>
                        <span className="font-normal text-[11px] text-slate-400">Match</span>
                      </div>
                      <div className="flex items-center justify-end gap-1 text-xs text-amber-600 font-semibold mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-mono tabular-nums">{student.rating}</span>
                        <span className="text-[11px] font-normal text-slate-400">
                          ({student.reviewCount})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Student Bio */}
                  <p className="text-xs text-slate-600 mt-3.5 leading-relaxed line-clamp-2">
                    {student.bio}
                  </p>

                  {/* Skill Exchange Matrix */}
                  <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Can Teach */}
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-1.5">
                        Offers Knowledge:
                      </span>
                      <ul className="space-y-1">
                        {student.skillsOffered.map((sk) => (
                          <li key={sk.name} className="text-xs text-slate-800 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-amber-500" />
                            <span className="font-medium">{sk.name}</span>
                            <span className="text-slate-400 text-[11px]">({sk.level})</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Seeking to Learn */}
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1.5">
                        Seeking in Return:
                      </span>
                      <ul className="space-y-1">
                        {student.skillsWanted.map((w) => {
                          const matchesMySkill = currentUser.skillsOffered.some(
                            (mySk) => mySk.name.toLowerCase().includes(w.toLowerCase()) || w.toLowerCase().includes(mySk.name.toLowerCase())
                          );
                          return (
                            <li key={w} className="text-xs text-slate-800 flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-emerald-500" />
                              <span className="font-medium">{w}</span>
                              {matchesMySkill && (
                                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded">
                                  You teach!
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Metadata & Actions */}
                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{student.hoursTaught}h bartered</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenChatWith(student)}
                      className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
                      title={`Send quick message to ${student.name}`}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onRequestSwap(student)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 active:scale-[0.98] rounded-lg transition-all shadow-sm"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span>Request Barter</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Profile Detail Modal */}
      {viewingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={viewingProfile.avatar}
                  alt={viewingProfile.name}
                  className="w-14 h-14 rounded-2xl bg-slate-100 object-cover ring-1 ring-slate-200"
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {viewingProfile.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {viewingProfile.major} · {viewingProfile.university}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Available: {viewingProfile.availability}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewingProfile(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  About Me
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {viewingProfile.bio}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Knowledge Exchange Portfolio
                </h4>
                <div className="space-y-2">
                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200">
                    <span className="text-xs font-bold text-amber-900 block mb-1">
                      Can Teach:
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs text-amber-950">
                      {viewingProfile.skillsOffered.map((sk) => (
                        <span key={sk.name} className="font-medium">
                          {sk.name} · <span className="text-amber-700">{sk.level}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                    <span className="text-xs font-bold text-emerald-900 block mb-1">
                      Wants to Learn:
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs text-emerald-950">
                      {viewingProfile.skillsWanted.map((w) => (
                        <span key={w} className="font-medium">
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs text-slate-600">
                <span>Verified Peer Rating: <strong>{viewingProfile.rating} / 5.0</strong></span>
                <span>Hours Bartered: <strong>{viewingProfile.hoursTaught} hrs</strong></span>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setViewingProfile(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const p = viewingProfile;
                  setViewingProfile(null);
                  onRequestSwap(p);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm"
              >
                Request 1-on-1 Barter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
