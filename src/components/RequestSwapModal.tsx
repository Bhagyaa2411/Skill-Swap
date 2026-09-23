import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { X, Calendar, Clock, ArrowRightLeft, Sparkles, Check } from 'lucide-react';

interface RequestSwapModalProps {
  partner: StudentProfile | null;
  currentUser: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSwap: (swapData: {
    partnerId: string;
    skillOffered: string;
    skillRequested: string;
    sessionFormat: '30min' | '60min' | 'recurring';
    scheduledTime: string;
    notes: string;
  }) => void;
}

export const RequestSwapModal: React.FC<RequestSwapModalProps> = ({
  partner,
  currentUser,
  isOpen,
  onClose,
  onSubmitSwap,
}) => {
  if (!isOpen || !partner) return null;

  // Default offer from current user's skills
  const [skillOffered, setSkillOffered] = useState(
    currentUser.skillsOffered[0]?.name || 'React & Vite'
  );

  // Default request from partner's skills
  const [skillRequested, setSkillRequested] = useState(
    partner.skillsOffered[0]?.name || ''
  );

  const [sessionFormat, setSessionFormat] = useState<'30min' | '60min' | 'recurring'>('60min');
  const [scheduledTime, setScheduledTime] = useState('Tomorrow at 5:00 PM PST');
  const [notes, setNotes] = useState(
    `Hi ${partner.name.split(' ')[0]}! I would love to do an even barter session. I can help you with ${skillOffered}, and in return would love to learn some ${skillRequested}.`
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSwap({
      partnerId: partner.id,
      skillOffered,
      skillRequested,
      sessionFormat,
      scheduledTime,
      notes,
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Propose 1-on-1 Skill Barter
              </h3>
              <p className="text-xs text-slate-500">
                Exchange knowledge with {partner.name} · {partner.university}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Barter Proposal Sent!
            </h4>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              We notified {partner.name}. You can track this in your My Swaps tab and chat directly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Visual Barter Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
              <div>
                <span className="font-semibold text-indigo-700 block mb-1">
                  YOU WILL TEACH ({currentUser.name.split(' ')[0]}):
                </span>
                <select
                  value={skillOffered}
                  onChange={(e) => setSkillOffered(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-md p-2 text-slate-800 font-medium focus:ring-1 focus:ring-indigo-500"
                >
                  {currentUser.skillsOffered.map((sk) => (
                    <option key={sk.name} value={sk.name}>
                      {sk.name} ({sk.level})
                    </option>
                  ))}
                  <option value="General Coding Mentorship">General Coding Mentorship</option>
                </select>
              </div>

              <div>
                <span className="font-semibold text-emerald-700 block mb-1">
                  YOU WILL RECEIVE ({partner.name.split(' ')[0]}):
                </span>
                <select
                  value={skillRequested}
                  onChange={(e) => setSkillRequested(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-md p-2 text-slate-800 font-medium focus:ring-1 focus:ring-indigo-500"
                >
                  {partner.skillsOffered.map((sk) => (
                    <option key={sk.name} value={sk.name}>
                      {sk.name} ({sk.level})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Session format tabs */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                EXCHANGE DURATION & STRUCTURE:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSessionFormat('30min')}
                  className={`py-2 px-3 text-xs rounded-lg border font-medium transition-all text-center ${
                    sessionFormat === '30min'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 mx-auto mb-1 text-slate-400" />
                  30m Rapid (15m/15m)
                </button>
                <button
                  type="button"
                  onClick={() => setSessionFormat('60min')}
                  className={`py-2 px-3 text-xs rounded-lg border font-medium transition-all text-center ${
                    sessionFormat === '60min'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 mx-auto mb-1 text-indigo-600" />
                  60m Deep Dive (30m/30m)
                </button>
                <button
                  type="button"
                  onClick={() => setSessionFormat('recurring')}
                  className={`py-2 px-3 text-xs rounded-lg border font-medium transition-all text-center ${
                    sessionFormat === 'recurring'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 mx-auto mb-1 text-amber-500" />
                  Weekly Peer Pair
                </button>
              </div>
            </div>

            {/* Proposed Timing */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>PROPOSED TIME / DATE:</span>
                <span className="font-normal text-slate-400 text-[11px]">
                  Partner is available: {partner.availability}
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="e.g. Wednesday at 4:00 PM EST"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Personal message & agenda */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                AGENDA & SPECIFIC TOPICS TO TACKLE:
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="What specific project or concept would you like to cover?"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm active:scale-[0.98] transition-all"
              >
                Send Barter Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
