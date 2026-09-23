import React, { useState, useEffect } from 'react';
import { StudyCircle, StudentProfile } from '../types';
import { 
  Users, 
  Play, 
  Pause, 
  RotateCcw, 
  Mic, 
  MicOff, 
  Send, 
  Plus, 
  ArrowLeft,
  Share2,
  CheckCircle2
} from 'lucide-react';

interface StudyCirclesTabProps {
  circles: StudyCircle[];
  currentUser: StudentProfile;
  onCreateCircle: () => void;
}

export const StudyCirclesTab: React.FC<StudyCirclesTabProps> = ({
  circles,
  currentUser,
  onCreateCircle,
}) => {
  const [activeCircleId, setActiveCircleId] = useState<string | null>(null);

  // Live room state
  const activeCircle = circles.find((c) => c.id === activeCircleId);

  // Pomodoro state
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');

  // Shared scratchpad state
  const [scratchpadCode, setScratchpadCode] = useState<string>(`// Shared Algorithm & Proof Scratchpad
// Topic: Dijkstra vs A* Shortest Path
function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  // Priority queue implementation here...
  return distances;
}
`);
  const [editorLanguage, setEditorLanguage] = useState<'javascript' | 'python' | 'markdown'>('javascript');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Live room chat
  const [roomMessages, setRoomMessages] = useState<
    { id: string; sender: string; avatar: string; text: string; time: string }[]
  >([
    {
      id: 'msg-1',
      sender: 'Marcus Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
      text: 'Welcome everyone! Today we are deriving shortest path heuristics on the shared scratchpad. Feel free to type in code.',
      time: '12m ago',
    },
    {
      id: 'msg-2',
      sender: 'Elena Rostova',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      text: 'Does anyone have the proof for why admissible heuristics never overestimate the cost?',
      time: '5m ago',
    },
  ]);
  const [newChatText, setNewChatText] = useState('');

  // User mic & status in the room
  const [myMicOn, setMyMicOn] = useState(false);
  const [myStatus, setMyStatus] = useState<'Focusing' | 'Screen Sharing' | 'Helping'>('Focusing');

  // Pomodoro timer effect
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
      if (timerMode === 'focus') {
        setTimerMode('break');
        setTimerSeconds(5 * 60);
      } else {
        setTimerMode('focus');
        setTimerSeconds(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds, timerMode]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    setRoomMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: currentUser.name,
        avatar: currentUser.avatar,
        text: newChatText.trim(),
        time: 'Just now',
      },
    ]);
    setNewChatText('');
  };

  const copyScratchpad = () => {
    navigator.clipboard.writeText(scratchpadCode);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  // If inside an active circle room
  if (activeCircle) {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Room Header bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveCircleId(null)}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Leave room"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {activeCircle.title}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Host: {activeCircle.hostName} ({activeCircle.hostUniversity}) · Focus: {activeCircle.currentFocusTopic}
              </p>
            </div>
          </div>

          {/* Pomodoro Focus widget */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2 self-stretch sm:self-auto justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                {timerMode === 'focus' ? '🎯 Focus' : '☕ Break'}:
              </span>
              <span className="font-mono text-base font-bold text-slate-900 tabular-nums">
                {formatTime(timerSeconds)}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                title={timerRunning ? 'Pause timer' : 'Start focus timer'}
              >
                {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(25 * 60);
                  setTimerMode('focus');
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Room Main Layout: Scratchpad + Side Chat & Participants */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Left: Shared Live Scratchpad & Code Board */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Scratchpad toolbar */}
              <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">
                    Collaborative Scratchpad
                  </span>
                  <div className="flex items-center bg-slate-200/80 p-0.5 rounded-md text-[11px]">
                    <button
                      onClick={() => setEditorLanguage('javascript')}
                      className={`px-2 py-0.5 rounded ${
                        editorLanguage === 'javascript' ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      JS / TS
                    </button>
                    <button
                      onClick={() => setEditorLanguage('python')}
                      className={`px-2 py-0.5 rounded ${
                        editorLanguage === 'python' ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Python
                    </button>
                    <button
                      onClick={() => setEditorLanguage('markdown')}
                      className={`px-2 py-0.5 rounded ${
                        editorLanguage === 'markdown' ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Notes / Math
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyScratchpad}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md transition-colors"
                  >
                    {copiedNotification ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Area */}
              <div className="p-4 bg-slate-950 text-slate-100 font-mono text-xs min-h-[360px] max-h-[500px] flex flex-col">
                <textarea
                  value={scratchpadCode}
                  onChange={(e) => setScratchpadCode(e.target.value)}
                  className="w-full flex-1 bg-transparent text-emerald-300 font-mono resize-none focus:outline-none leading-relaxed"
                  spellCheck={false}
                  placeholder="// Type notes, derivations, or code to share with peer members in real time..."
                />
                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Synced real-time with {activeCircle.activeParticipants.length} active peers</span>
                  <span>Press Tab for indent</span>
                </div>
              </div>
            </div>

            {/* Active Participant Seats in the Circle */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Active Desks ({activeCircle.activeParticipants.length} / {activeCircle.maxCapacity})
                </h3>
                {/* My controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMyMicOn(!myMicOn)}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors ${
                      myMicOn
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {myMicOn ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                    <span>{myMicOn ? 'Mic Live' : 'Muted'}</span>
                  </button>

                  <select
                    value={myStatus}
                    onChange={(e: any) => setMyStatus(e.target.value)}
                    className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium focus:outline-none"
                  >
                    <option value="Focusing">Focusing</option>
                    <option value="Helping">Helping</option>
                    <option value="Screen Sharing">Screen Sharing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeCircle.activeParticipants.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-2.5"
                  >
                    <div className="relative">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-8 h-8 rounded-full bg-slate-200 object-cover"
                      />
                      {p.micOn && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-900 truncate">
                        {p.name}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {p.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Room Chat */}
          <div className="lg:col-span-4 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm h-[580px] overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Circle Discussion
              </h3>
              <p className="text-[11px] text-slate-400">
                Ask quick doubts or share code links
              </p>
            </div>

            {/* Chat message stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
              {roomMessages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-2.5">
                  <img
                    src={msg.avatar}
                    alt={msg.sender}
                    className="w-7 h-7 rounded-full bg-slate-100 shrink-0 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-1">
                      <span className="text-xs font-semibold text-slate-900 truncate">
                        {msg.sender}
                      </span>
                      <span className="text-[10px] text-slate-400">{msg.time}</span>
                    </div>
                    <p className="text-xs text-slate-700 mt-0.5 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-slate-50 flex items-center gap-2">
              <input
                type="text"
                value={newChatText}
                onChange={(e) => setNewChatText(e.target.value)}
                placeholder="Message study circle..."
                className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Circles Directory View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            Live Study Circles & Virtual Labs
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Drop into real-time collaborative pods hosted by students across campuses. Study with synchronized Pomodoro timers, shared code scratchpads, and peer doubt resolution.
          </p>
        </div>

        <button
          onClick={onCreateCircle}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Host a Study Circle</span>
        </button>
      </div>

      {/* Circles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {circles.map((circle) => {
          const isFull = circle.activeParticipants.length >= circle.maxCapacity;

          return (
            <div
              key={circle.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div>
                {/* Status bar */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs">
                    {circle.isLive ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-semibold text-emerald-700">Live Co-Working</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                        <span className="text-slate-500 font-medium">Scheduled Pod</span>
                      </>
                    )}
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500 font-medium">{circle.category}</span>
                  </div>

                  <span className="text-xs font-mono text-slate-500">
                    {circle.activeParticipants.length}/{circle.maxCapacity} seats
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {circle.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {circle.description}
                </p>

                {/* Focus Topic Box */}
                <div className="mt-3.5 p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                  <span className="font-semibold text-indigo-700">CURRENT SPRINT: </span>
                  <span className="text-slate-700">{circle.currentFocusTopic}</span>
                </div>

                {/* Clean unboxed tags per Zero-Pill rule */}
                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500 flex-wrap">
                  {circle.tags.map((tag, idx) => (
                    <span key={tag}>
                      {tag}
                      {idx < circle.tags.length - 1 && <span className="ml-2 text-slate-300">·</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={circle.hostAvatar}
                    alt={circle.hostName}
                    className="w-7 h-7 rounded-full bg-slate-100 object-cover"
                  />
                  <div className="text-[11px]">
                    <span className="font-semibold text-slate-800 block leading-tight">
                      {circle.hostName}
                    </span>
                    <span className="text-slate-400 block leading-tight">
                      {circle.hostUniversity}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveCircleId(circle.id)}
                  disabled={isFull}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                    isFull
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm active:scale-[0.98]'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{isFull ? 'Circle Full' : 'Enter Study Desk'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
