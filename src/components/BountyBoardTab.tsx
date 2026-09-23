import React, { useState } from 'react';
import { BountyQuestion, StudentProfile } from '../types';
import { 
  Sparkles, 
  ThumbsUp, 
  CheckCircle2, 
  MessageSquare, 
  Send, 
  Plus, 
  Code2, 
  Search,
  BookOpen
} from 'lucide-react';

interface BountyBoardTabProps {
  bounties: BountyQuestion[];
  currentUser: StudentProfile;
  userCredits: number;
  onPostBounty: () => void;
  onAnswerBounty: (bountyId: string, answerText: string, codeSnippet?: string) => void;
  onAcceptAnswer: (bountyId: string, answerId: string, bountyCredits: number) => void;
  onUpvoteAnswer: (bountyId: string, answerId: string) => void;
}

export const BountyBoardTab: React.FC<BountyBoardTabProps> = ({
  bounties,
  currentUser,
  userCredits,
  onPostBounty,
  onAnswerBounty,
  onAcceptAnswer,
  onUpvoteAnswer,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'solved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedBountyId, setExpandedBountyId] = useState<string | null>(bounties[0]?.id || null);

  // Answer form for the active question
  const [answerContent, setAnswerContent] = useState('');
  const [answerCode, setAnswerCode] = useState('');
  const [showCodeField, setShowCodeField] = useState(false);

  const filteredBounties = bounties.filter((b) => {
    if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;
    if (filterStatus !== 'all' && b.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleSendAnswer = (bountyId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!answerContent.trim()) return;

    onAnswerBounty(bountyId, answerContent.trim(), answerCode.trim() || undefined);
    setAnswerContent('');
    setAnswerCode('');
    setShowCodeField(false);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Student Doubt & Micro-Bounty Board
            </h2>
            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-md border border-amber-200">
              Time-Banked
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Stuck on a tricky algorithm, mathematical proof, or capstone bug? Post a bounty using your banked credits or help peers solve their roadblocks to earn credits!
          </p>
        </div>

        <button
          onClick={onPostBounty}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] rounded-lg shadow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Doubt Bounty</span>
        </button>
      </div>

      {/* Controls & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems, concepts, tags..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterStatus === 'all' ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('open')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterStatus === 'open' ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Open
            </button>
            <button
              onClick={() => setFilterStatus('solved')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterStatus === 'solved' ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Solved
            </button>
          </div>
        </div>
      </div>

      {/* Bounties List */}
      <div className="space-y-4">
        {filteredBounties.map((bounty) => {
          const isExpanded = expandedBountyId === bounty.id;
          const isSolved = bounty.status === 'solved';

          return (
            <div
              key={bounty.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'border-indigo-200 shadow-md ring-1 ring-indigo-500/10'
                  : 'border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              {/* Question summary row */}
              <div
                onClick={() => setExpandedBountyId(isExpanded ? null : bounty.id)}
                className="p-5 cursor-pointer flex items-start justify-between gap-4 select-none"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    {isSolved ? (
                      <span className="flex items-center gap-1 font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Solved
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 font-semibold text-amber-700">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        Open Bounty
                      </span>
                    )}
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500">{bounty.authorUniversity}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-400">{bounty.createdAt}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {bounty.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {bounty.description}
                  </p>

                  {/* Clean unboxed tags */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                    {bounty.tags.map((t, idx) => (
                      <span key={t}>
                        #{t}
                        {idx < bounty.tags.length - 1 && <span className="ml-2 text-slate-300">·</span>}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side reward pill & answer count */}
                <div className="text-right shrink-0 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-lg text-xs font-bold text-amber-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span className="font-mono">{bounty.bountyCredits}</span>
                    <span className="font-normal text-amber-700 text-[11px]">Credits</span>
                  </div>

                  <div className="flex items-center justify-end gap-1 text-xs text-slate-500">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{bounty.answers.length} answers</span>
                  </div>
                </div>
              </div>

              {/* Expanded Detail & Answers Section */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-6">
                  {/* Detailed question body */}
                  <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-xs">
                      <img
                        src={bounty.authorAvatar}
                        alt={bounty.authorName}
                        className="w-6 h-6 rounded-full bg-slate-200"
                      />
                      <span className="font-semibold text-slate-800">{bounty.authorName}</span>
                      <span className="text-slate-400">asked:</span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      {bounty.description}
                    </p>

                    {bounty.codeSnippet && (
                      <div className="p-3 bg-slate-900 text-emerald-300 font-mono text-xs rounded-lg overflow-x-auto">
                        <pre>{bounty.codeSnippet}</pre>
                      </div>
                    )}
                  </div>

                  {/* Answers Header */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                      Peer Solutions ({bounty.answers.length})
                    </h4>

                    {bounty.answers.length === 0 ? (
                      <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500">
                        No peer solutions posted yet. Be the first to solve this and claim {bounty.bountyCredits} credits!
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {bounty.answers.map((ans) => (
                          <div
                            key={ans.id}
                            className={`p-4 rounded-xl border transition-all ${
                              ans.isAccepted
                                ? 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                                : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <img
                                  src={ans.authorAvatar}
                                  alt={ans.authorName}
                                  className="w-6 h-6 rounded-full bg-slate-100"
                                />
                                <div>
                                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                                    {ans.authorName}
                                  </span>
                                  <span className="text-[10px] text-slate-400">
                                    {ans.authorUniversity} · {ans.createdAt}
                                  </span>
                                </div>
                              </div>

                              {ans.isAccepted ? (
                                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  Accepted Solution (+{bounty.bountyCredits} Credits)
                                </span>
                              ) : (
                                <button
                                  onClick={() => onAcceptAnswer(bounty.id, ans.id, bounty.bountyCredits)}
                                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2.5 py-1 rounded-md transition-colors"
                                >
                                  Accept & Award Credits
                                </button>
                              )}
                            </div>

                            <p className="text-xs text-slate-700 mt-2.5 leading-relaxed">
                              {ans.content}
                            </p>

                            {ans.codeSnippet && (
                              <div className="mt-2.5 p-3 bg-slate-900 text-emerald-300 font-mono text-xs rounded-lg overflow-x-auto">
                                <pre>{ans.codeSnippet}</pre>
                              </div>
                            )}

                            {/* Upvote */}
                            <div className="mt-3 flex items-center gap-3 text-xs">
                              <button
                                onClick={() => onUpvoteAnswer(bounty.id, ans.id)}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
                              >
                                <ThumbsUp className="w-3.5 h-3.5 text-indigo-600" />
                                <span>Helpful</span>
                                <span className="font-mono font-semibold text-slate-800">
                                  ({ans.upvotes})
                                </span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit an Answer */}
                  {!isSolved && (
                    <form
                      onSubmit={(e) => handleSendAnswer(bounty.id, e)}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Write a Peer Explanation:
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowCodeField(!showCodeField)}
                          className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-700"
                        >
                          <Code2 className="w-3.5 h-3.5" />
                          <span>{showCodeField ? 'Remove Code Block' : '+ Add Code Snippet'}</span>
                        </button>
                      </div>

                      <textarea
                        rows={3}
                        value={answerContent}
                        onChange={(e) => setAnswerContent(e.target.value)}
                        placeholder="Explain the intuition, step-by-step proof, or solution..."
                        className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />

                      {showCodeField && (
                        <textarea
                          rows={3}
                          value={answerCode}
                          onChange={(e) => setAnswerCode(e.target.value)}
                          placeholder="// Paste runnable code fix or mathematical notation here..."
                          className="w-full p-2.5 text-xs bg-slate-900 text-emerald-300 font-mono rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      )}

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] rounded-lg shadow-sm transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Solution</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
