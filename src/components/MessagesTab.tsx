import React, { useState } from 'react';
import { ChatConversation, StudentProfile } from '../types';
import { 
  Send, 
  Calendar, 
  Clock, 
  FileText, 
  Video, 
  Check, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';

interface MessagesTabProps {
  conversations: ChatConversation[];
  currentUser: StudentProfile;
  onSendMessage: (conversationId: string, text: string) => void;
  onUpdateSharedNotes: (conversationId: string, notes: string) => void;
}

export const MessagesTab: React.FC<MessagesTabProps> = ({
  conversations,
  currentUser,
  onSendMessage,
  onUpdateSharedNotes,
}) => {
  const [activeConversationId, setActiveConversationId] = useState<string>(
    conversations[0]?.id || ''
  );
  const [inputText, setInputText] = useState('');
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);
  const [notesDraft, setNotesDraft] = useState('');
  const [launchMeetingSuccess, setLaunchMeetingSuccess] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeConversationId);

  // Sync notes draft when active conversation changes
  React.useEffect(() => {
    if (activeConv?.sharedNotes) {
      setNotesDraft(activeConv.sharedNotes);
    } else {
      setNotesDraft('');
    }
  }, [activeConversationId, activeConv?.sharedNotes]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    onSendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  const handleSaveNotes = () => {
    if (activeConv) {
      onUpdateSharedNotes(activeConv.id, notesDraft);
    }
  };

  const launchMeeting = () => {
    setLaunchMeetingSuccess(true);
    setTimeout(() => setLaunchMeetingSuccess(false), 3000);
  };

  if (conversations.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
        <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-900">No active barter chats yet</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Visit the Skill Barter tab and propose an exchange to start chatting and scheduling peer learning sessions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[720px] flex flex-col md:flex-row">
      {/* Left: Conversations sidebar */}
      <div className="w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h3 className="text-sm font-bold text-slate-900 font-display">
            Direct Barter Conversations
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Coordination & peer study planning
          </p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {conversations.map((conv) => {
            const isActive = conv.id === activeConversationId;
            return (
              <button
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`w-full p-4 flex items-start gap-3 text-left transition-colors ${
                  isActive ? 'bg-white shadow-xs border-l-4 border-indigo-600' : 'hover:bg-slate-100/70'
                }`}
              >
                <div className="relative">
                  <img
                    src={conv.partner.avatar}
                    alt={conv.partner.name}
                    className="w-10 h-10 rounded-full bg-slate-200 object-cover"
                  />
                  {conv.partner.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {conv.partner.name}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {conv.lastTimestamp}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {conv.partner.university}
                  </p>

                  <p className="text-xs text-slate-600 truncate mt-1">
                    {conv.lastMessage}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Active Chat & Session Hub */}
      {activeConv ? (
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {/* Active Partner Top Bar */}
          <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={activeConv.partner.avatar}
                alt={activeConv.partner.name}
                className="w-10 h-10 rounded-xl bg-slate-100 object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">
                    {activeConv.partner.name}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    Mutual Swap Match
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  {activeConv.partner.major} · {activeConv.partner.university}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNotesDrawer(!showNotesDrawer)}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  showNotesDrawer ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Shared Notes</span>
              </button>

              <button
                onClick={launchMeeting}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Launch Session Room</span>
              </button>
            </div>
          </div>

          {/* Meeting launched notification */}
          {launchMeetingSuccess && (
            <div className="bg-indigo-600 text-white px-4 py-2 text-xs flex items-center justify-between">
              <span>🚀 Live encrypted 1-on-1 peer room initialized with screen share & audio stream!</span>
              <button onClick={() => setLaunchMeetingSuccess(false)} className="text-white font-bold">✕</button>
            </div>
          )}

          {/* Upcoming Session Widget */}
          {activeConv.nextSession && (
            <div className="bg-amber-50/70 border-b border-amber-200/70 px-5 py-2.5 flex items-center justify-between text-xs text-amber-950">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Confirmed Barter Session:</strong> {activeConv.nextSession.date} · {activeConv.nextSession.topic}
                </span>
              </div>
              <span className="font-mono text-[11px] font-semibold text-amber-800 shrink-0 hidden sm:inline">
                {activeConv.nextSession.duration}
              </span>
            </div>
          )}

          {/* Chat Messages and Notes area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Messages Scroll area */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {activeConv.messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[11px] font-semibold text-slate-600">
                      {m.isMe ? 'You' : m.senderName}
                    </span>
                    <span className="text-[10px] text-slate-400">{m.timestamp}</span>
                  </div>
                  <div
                    className={`max-w-md p-3 rounded-2xl text-xs leading-relaxed ${
                      m.isMe
                        ? 'bg-indigo-600 text-white rounded-tr-xs shadow-xs'
                        : 'bg-slate-100 text-slate-800 rounded-tl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Collapsible Shared Session Notes Drawer */}
            {showNotesDrawer && (
              <div className="w-80 border-l border-slate-200 bg-slate-50/70 p-4 flex flex-col animate-in slide-in-from-right duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Shared Barter Notes
                  </h4>
                  <button
                    onClick={handleSaveNotes}
                    className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Save Notes
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mb-2">
                  Both you and {activeConv.partner.name.split(' ')[0]} can edit this session agenda and code references.
                </p>
                <textarea
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  className="flex-1 w-full p-2.5 text-xs font-mono bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Type session topics, problem links, or formulas..."
                />
              </div>
            )}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeConv.partner.name.split(' ')[0]} about your barter session...`}
              className="flex-1 bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};
