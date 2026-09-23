import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { X, Repeat, Users, HelpCircle, Sparkles, Check } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: StudentProfile;
  userCredits: number;
  onAddSkillOffer: (skillName: string, category: any, level: any, wantedSkill: string) => void;
  onCreateStudyCircle: (circleData: {
    title: string;
    category: string;
    description: string;
    focusTopic: string;
    maxCapacity: number;
    tags: string[];
  }) => void;
  onCreateBounty: (bountyData: {
    title: string;
    description: string;
    codeSnippet?: string;
    category: string;
    tags: string[];
    bountyCredits: number;
  }) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  userCredits,
  onAddSkillOffer,
  onCreateStudyCircle,
  onCreateBounty,
}) => {
  if (!isOpen) return null;

  const [activeType, setActiveType] = useState<'swap' | 'circle' | 'bounty'>('swap');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Skill Barter Offer Form
  const [offerSkillName, setOfferSkillName] = useState('');
  const [offerCategory, setOfferCategory] = useState('tech');
  const [offerLevel, setOfferLevel] = useState('Advanced');
  const [targetWantedSkill, setTargetWantedSkill] = useState('');

  // Study Circle Form
  const [circleTitle, setCircleTitle] = useState('');
  const [circleCategory, setCircleCategory] = useState('Computer Science');
  const [circleTopic, setCircleTopic] = useState('');
  const [circleDesc, setCircleDesc] = useState('');
  const [circleCapacity, setCircleCapacity] = useState(8);
  const [circleTags, setCircleTags] = useState('Algorithms, Exam Prep, Peer Study');

  // Bounty Form
  const [bountyTitle, setBountyTitle] = useState('');
  const [bountyDesc, setBountyDesc] = useState('');
  const [bountyCode, setBountyCode] = useState('');
  const [bountyCategory, setBountyCategory] = useState('tech');
  const [bountyCreditsStake, setBountyCreditsStake] = useState(2);
  const [bountyTags, setBountyTags] = useState('React, TypeScript, Bug');

  const handleSwapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerSkillName.trim()) return;
    onAddSkillOffer(offerSkillName.trim(), offerCategory as any, offerLevel as any, targetWantedSkill.trim());
    showSuccess('Skill barter listing posted! Other university peers can now request swaps.');
  };

  const handleCircleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!circleTitle.trim()) return;
    onCreateStudyCircle({
      title: circleTitle.trim(),
      category: circleCategory,
      description: circleDesc.trim() || 'Collaborative study desk with focused Pomodoro sprints.',
      focusTopic: circleTopic.trim() || 'General Peer Co-Working',
      maxCapacity: Number(circleCapacity),
      tags: circleTags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    showSuccess('Study Circle live! Peers can now join your virtual room.');
  };

  const handleBountySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bountyTitle.trim()) return;
    onCreateBounty({
      title: bountyTitle.trim(),
      description: bountyDesc.trim(),
      codeSnippet: bountyCode.trim() || undefined,
      category: bountyCategory,
      tags: bountyTags.split(',').map((t) => t.trim()).filter(Boolean),
      bountyCredits: Number(bountyCreditsStake),
    });
    showSuccess('Doubt Bounty published! Peer solvers will be notified.');
  };

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 1300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Create a Student Collaboration Post
            </h3>
            <p className="text-xs text-slate-500">
              Share knowledge, host a room, or get help on roadblocks
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success feedback */}
        {successMessage ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Successfully Created!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">{successMessage}</p>
          </div>
        ) : (
          <div>
            {/* Post Type Selector */}
            <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50/70 p-1 gap-1">
              <button
                type="button"
                onClick={() => setActiveType('swap')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeType === 'swap'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>Offer Skill Barter</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveType('circle')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeType === 'circle'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Host Study Circle</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveType('bounty')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeType === 'bounty'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Post Doubt Bounty</span>
              </button>
            </div>

            {/* Form 1: Skill Barter Offer */}
            {activeType === 'swap' && (
              <form onSubmit={handleSwapSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    SKILL OR TOPIC YOU CAN TEACH:
                  </label>
                  <input
                    type="text"
                    required
                    value={offerSkillName}
                    onChange={(e) => setOfferSkillName(e.target.value)}
                    placeholder="e.g. React Native, Machine Learning, Discrete Math..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Category:
                    </label>
                    <select
                      value={offerCategory}
                      onChange={(e) => setOfferCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                    >
                      <option value="tech">Software & AI</option>
                      <option value="math">Mathematics & Science</option>
                      <option value="design">UI/UX & Design</option>
                      <option value="language">Languages</option>
                      <option value="business">Business & Speaking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Proficiency Level:
                    </label>
                    <select
                      value={offerLevel}
                      onChange={(e) => setOfferLevel(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                    >
                      <option value="Advanced">Advanced (Can teach deep concepts)</option>
                      <option value="Intermediate">Intermediate (Can guide fundamentals)</option>
                      <option value="Beginner">Beginner</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    WHAT YOU WANT TO LEARN IN RETURN:
                  </label>
                  <input
                    type="text"
                    required
                    value={targetWantedSkill}
                    onChange={(e) => setTargetWantedSkill(e.target.value)}
                    placeholder="e.g. PyTorch, Multivariable Calculus, Figma Prototyping..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                  >
                    Post Skill Offer
                  </button>
                </div>
              </form>
            )}

            {/* Form 2: Study Circle */}
            {activeType === 'circle' && (
              <form onSubmit={handleCircleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    CIRCLE / LAB TITLE:
                  </label>
                  <input
                    type="text"
                    required
                    value={circleTitle}
                    onChange={(e) => setCircleTitle(e.target.value)}
                    placeholder="e.g. CS 106B Algorithm Sprint & Exam Prep"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Field / Department:
                    </label>
                    <select
                      value={circleCategory}
                      onChange={(e) => setCircleCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Web & Systems">Web & Systems</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Design & Creative">Design & Creative</option>
                      <option value="Exam Preparation">Exam Preparation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Max Student Seats:
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={20}
                      value={circleCapacity}
                      onChange={(e) => setCircleCapacity(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    CURRENT SPRINT TOPIC:
                  </label>
                  <input
                    type="text"
                    value={circleTopic}
                    onChange={(e) => setCircleTopic(e.target.value)}
                    placeholder="e.g. Dynamic programming bottom-up memoization"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tags (comma separated):
                  </label>
                  <input
                    type="text"
                    value={circleTags}
                    onChange={(e) => setCircleTags(e.target.value)}
                    placeholder="e.g. LeetCode, C++, Trees"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                  >
                    Launch Study Circle
                  </button>
                </div>
              </form>
            )}

            {/* Form 3: Doubt Bounty */}
            {activeType === 'bounty' && (
              <form onSubmit={handleBountySubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    PROBLEM OR ROADBLOCK TITLE:
                  </label>
                  <input
                    type="text"
                    required
                    value={bountyTitle}
                    onChange={(e) => setBountyTitle(e.target.value)}
                    placeholder="e.g. How to derive backpropagation gradient for layer norm?"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Detailed Explanation:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={bountyDesc}
                    onChange={(e) => setBountyDesc(e.target.value)}
                    placeholder="Explain what you have tried, what error message is received, or where intuition broke down..."
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Optional Code Snippet:
                  </label>
                  <textarea
                    rows={2}
                    value={bountyCode}
                    onChange={(e) => setBountyCode(e.target.value)}
                    placeholder="// Paste relevant lines of code or mathematical equation..."
                    className="w-full p-2 text-xs font-mono bg-slate-900 text-emerald-300 rounded-lg focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Bounty Reward (Credits):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        max={userCredits}
                        value={bountyCreditsStake}
                        onChange={(e) => setBountyCreditsStake(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-amber-900"
                      />
                      <span className="text-[11px] text-slate-500 shrink-0">
                        (You have {userCredits})
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tags:
                    </label>
                    <input
                      type="text"
                      value={bountyTags}
                      onChange={(e) => setBountyTags(e.target.value)}
                      placeholder="e.g. PyTorch, Math, Algorithms"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                  >
                    Stake & Post Bounty
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
