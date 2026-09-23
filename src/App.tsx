import React, { useState, useEffect } from 'react';
import { 
  NavigationTab, 
  StudentProfile, 
  StudyCircle, 
  BountyQuestion, 
  BountyAnswer, 
  PeerReview, 
  ChatConversation, 
  StudentSkill, 
  OrganizerNotice, 
  SkillCertificate 
} from './types';
import { 
  CURRENT_USER, 
  INITIAL_STUDENTS, 
  INITIAL_STUDY_CIRCLES, 
  INITIAL_BOUNTIES, 
  MOCK_REVIEWS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_ORGANIZER_NOTICES, 
  INITIAL_CERTIFICATES, 
  UNIVERSITY_NAME, 
  UNIVERSITY_SHORT,
  DEMO_USERS 
} from './mockData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { SkillBarterTab } from './components/SkillBarterTab';
import { StudyCirclesTab } from './components/StudyCirclesTab';
import { BountyBoardTab } from './components/BountyBoardTab';
import { GrowthPassportTab } from './components/GrowthPassportTab';
import { MessagesTab } from './components/MessagesTab';
import { RequestSwapModal } from './components/RequestSwapModal';
import { CreatePostModal } from './components/CreatePostModal';
import { LoginModal } from './components/LoginModal';
import { CertificateModal } from './components/CertificateModal';
import { OrganizerPortal } from './components/OrganizerPortal';
import { MentorPortal } from './components/MentorPortal';
import { StudentLoginPage } from './components/StudentLoginPage';
import { 
  CheckCircle2, 
  Info, 
  GraduationCap, 
  Users, 
  Building2, 
  LogIn, 
  ShieldCheck 
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('barter');
  
  // Current user state (Defaults to Grishma Patil)
  const [currentUser, setCurrentUser] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('skillswap_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  const [isStudentLoginPageOpen, setIsStudentLoginPageOpen] = useState<boolean>(false);

  const [userCredits, setUserCredits] = useState<number>(() => {
    const saved = localStorage.getItem('skillswap_credits');
    return saved ? Number(saved) : 18;
  });

  const [students, setStudents] = useState<StudentProfile[]>(() => {
    const saved = localStorage.getItem('skillswap_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [circles, setCircles] = useState<StudyCircle[]>(() => {
    const saved = localStorage.getItem('skillswap_circles');
    return saved ? JSON.parse(saved) : INITIAL_STUDY_CIRCLES;
  });

  const [bounties, setBounties] = useState<BountyQuestion[]>(() => {
    const saved = localStorage.getItem('skillswap_bounties');
    return saved ? JSON.parse(saved) : INITIAL_BOUNTIES;
  });

  const [conversations, setConversations] = useState<ChatConversation[]>(() => {
    const saved = localStorage.getItem('skillswap_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [notices, setNotices] = useState<OrganizerNotice[]>(() => {
    const saved = localStorage.getItem('skillswap_notices');
    return saved ? JSON.parse(saved) : INITIAL_ORGANIZER_NOTICES;
  });

  const [certificates, setCertificates] = useState<SkillCertificate[]>(() => {
    const saved = localStorage.getItem('skillswap_certificates');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [rsvpdNotices, setRsvpdNotices] = useState<string[]>(() => {
    const saved = localStorage.getItem('skillswap_rsvps');
    return saved ? JSON.parse(saved) : ['notice-1'];
  });

  const [reviews] = useState<PeerReview[]>(MOCK_REVIEWS);

  // Modals
  const [swapModalPartner, setSwapModalPartner] = useState<StudentProfile | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<SkillCertificate | null>(null);

  // Quick match search terms passed from hero
  const [initialTeachQuery, setInitialTeachQuery] = useState('');
  const [initialLearnQuery, setInitialLearnQuery] = useState('');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('skillswap_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('skillswap_credits', userCredits.toString());
  }, [userCredits]);

  useEffect(() => {
    localStorage.setItem('skillswap_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('skillswap_circles', JSON.stringify(circles));
  }, [circles]);

  useEffect(() => {
    localStorage.setItem('skillswap_bounties', JSON.stringify(bounties));
  }, [bounties]);

  useEffect(() => {
    localStorage.setItem('skillswap_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('skillswap_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('skillswap_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('skillswap_rsvps', JSON.stringify(rsvpdNotices));
  }, [rsvpdNotices]);

  // Handle Login
  const handleLoginSuccess = (user: StudentProfile) => {
    setCurrentUser(user);
    setIsStudentLoginPageOpen(false);
    showToast(`Switched account to ${user.name} (${user.role.toUpperCase()})`);
  };

  // Handle Hero Search Trigger
  const handleHeroSearch = (teach: string, learn: string) => {
    setInitialTeachQuery(teach);
    setInitialLearnQuery(learn);
    setCurrentTab('barter');
    showToast(`Filtering RTMSSU matches for: Teach "${teach}" ↔ Learn "${learn}"`, 'info');
  };

  // Handle Request Swap Submission
  const handleSubmitSwapProposal = (swapData: {
    partnerId: string;
    skillOffered: string;
    skillRequested: string;
    sessionFormat: '30min' | '60min' | 'recurring';
    scheduledTime: string;
    notes: string;
  }) => {
    const partner = students.find((s) => s.id === swapData.partnerId);
    if (!partner) return;

    const existingConvIndex = conversations.findIndex(
      (c) => c.partner.id === partner.id
    );

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: `🤝 Proposed RTMSSU Skill Barter: I teach [${swapData.skillOffered}] ↔ You teach [${swapData.skillRequested}]. Proposed: ${swapData.scheduledTime}. Agenda: ${swapData.notes}`,
      timestamp: 'Just now',
      isMe: true,
    };

    if (existingConvIndex >= 0) {
      const updated = [...conversations];
      updated[existingConvIndex].messages.push(newMsg);
      updated[existingConvIndex].lastMessage = `Barter proposal: ${swapData.skillOffered} ↔ ${swapData.skillRequested}`;
      updated[existingConvIndex].lastTimestamp = 'Just now';
      updated[existingConvIndex].nextSession = {
        date: swapData.scheduledTime,
        topic: `${swapData.skillOffered} <-> ${swapData.skillRequested}`,
        duration: swapData.sessionFormat === '30min' ? '30 minutes' : '60 minutes',
      };
      setConversations(updated);
    } else {
      const newConv: ChatConversation = {
        id: `conv-${Date.now()}`,
        partner,
        lastMessage: `Barter proposal: ${swapData.skillOffered} ↔ ${swapData.skillRequested}`,
        lastTimestamp: 'Just now',
        unreadCount: 0,
        messages: [newMsg],
        nextSession: {
          date: swapData.scheduledTime,
          topic: `${swapData.skillOffered} <-> ${swapData.skillRequested}`,
          duration: swapData.sessionFormat === '30min' ? '30 minutes' : '60 minutes',
        },
      };
      setConversations([newConv, ...conversations]);
    }

    showToast(`Barter request sent to ${partner.name}! Check your Chats tab.`);
  };

  // Open chat with a student directly
  const handleOpenChatWith = (student: StudentProfile) => {
    let conv = conversations.find((c) => c.partner.id === student.id);
    if (!conv) {
      const newConv: ChatConversation = {
        id: `conv-${Date.now()}`,
        partner: student,
        lastMessage: `Connected via Skill Swap RTMSSU`,
        lastTimestamp: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: currentUser.id,
            senderName: currentUser.name,
            text: `Hi ${student.name.split(' ')[0]}! I noticed your profile on RTMSSU Skill Swap and wanted to connect about a potential knowledge exchange.`,
            timestamp: 'Just now',
            isMe: true,
          },
        ],
      };
      setConversations([newConv, ...conversations]);
    }
    setCurrentTab('messages');
  };

  // Chat send message
  const handleSendMessage = (conversationId: string, text: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            senderId: currentUser.id,
            senderName: currentUser.name,
            text,
            timestamp: 'Just now',
            isMe: true,
          };
          return {
            ...c,
            lastMessage: text,
            lastTimestamp: 'Just now',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
  };

  // Chat update notes
  const handleUpdateSharedNotes = (conversationId: string, notes: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, sharedNotes: notes } : c))
    );
    showToast('Saved to collaborative RTMSSU swap pad!');
  };

  // Answer Bounty
  const handleAnswerBounty = (bountyId: string, answerText: string) => {
    setBounties((prev) =>
      prev.map((b) => {
        if (b.id === bountyId) {
          const newAnswer: BountyAnswer = {
            id: `ans-${Date.now()}`,
            authorName: currentUser.name,
            authorAvatar: currentUser.avatar,
            authorUniversity: currentUser.department || UNIVERSITY_SHORT,
            content: answerText,
            createdAt: 'Just now',
            upvotes: 0,
            isAccepted: false,
          };
          return {
            ...b,
            answers: [...b.answers, newAnswer],
          };
        }
        return b;
      })
    );
    showToast('Answer posted! You earn skill credits if accepted by author.');
  };

  // Accept Answer & Award Credits
  const handleAcceptAnswer = (bountyId: string, answerId: string) => {
    let creditReward = 0;
    let authorName = '';

    setBounties((prev) =>
      prev.map((b) => {
        if (b.id === bountyId) {
          creditReward = b.bountyCredits;
          const updatedAnswers = b.answers.map((a) => {
            if (a.id === answerId) {
              authorName = a.authorName;
              return { ...a, isAccepted: true };
            }
            return a;
          });
          return {
            ...b,
            status: 'solved' as const,
            answers: updatedAnswers,
          };
        }
        return b;
      })
    );

    showToast(`Accepted solution! ${creditReward} credits awarded to ${authorName}.`);
  };

  // Upvote Answer
  const handleUpvoteAnswer = (bountyId: string, answerId: string) => {
    setBounties((prev) =>
      prev.map((b) => {
        if (b.id === bountyId) {
          return {
            ...b,
            answers: b.answers.map((a) =>
              a.id === answerId ? { ...a, upvotes: a.upvotes + 1 } : a
            ),
          };
        }
        return b;
      })
    );
  };

  // Handle adding skill offer from modal
  const handleAddSkillOffer = (skillName: string, category: any, level: any, wantedSkill: string) => {
    const newSkill: StudentSkill = {
      name: skillName,
      category,
      level,
    };
    const updatedSkills = [...currentUser.skillsOffered, newSkill];
    const updatedWanted = wantedSkill ? [...currentUser.skillsWanted, wantedSkill] : currentUser.skillsWanted;
    const updatedUser = { 
      ...currentUser, 
      skillsOffered: updatedSkills,
      skillsWanted: updatedWanted
    };
    setCurrentUser(updatedUser);
    setStudents((prev) =>
      prev.map((s) => (s.id === currentUser.id ? updatedUser : s))
    );
    showToast(`Added ${skillName} to your offered skills!`);
  };

  // Handle creating study circle
  const handleCreateStudyCircle = (circleData: {
    title: string;
    category: string;
    description: string;
    focusTopic: string;
    maxCapacity: number;
    tags: string[];
  }) => {
    const newCircle: StudyCircle = {
      id: `circle-${Date.now()}`,
      title: circleData.title,
      category: circleData.category,
      description: circleData.description,
      hostName: currentUser.name,
      hostAvatar: currentUser.avatar,
      hostUniversity: currentUser.department || UNIVERSITY_SHORT,
      activeParticipants: [
        {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar,
          role: 'host',
          status: 'Focusing',
          micOn: false,
        }
      ],
      maxCapacity: circleData.maxCapacity || 8,
      currentFocusTopic: circleData.focusTopic,
      tags: circleData.tags,
      isLive: true,
    };

    setCircles([newCircle, ...circles]);
    showToast(`Campus Study Pod "${circleData.title}" launched!`);
  };

  // Handle creating bounty
  const handleCreateBounty = (bountyData: {
    title: string;
    description: string;
    codeSnippet?: string;
    category: string;
    tags: string[];
    bountyCredits: number;
  }) => {
    if (userCredits < bountyData.bountyCredits) {
      showToast('Insufficient skill credits to escrow for this bounty!', 'info');
      return;
    }

    setUserCredits((prev) => prev - bountyData.bountyCredits);

    const newBounty: BountyQuestion = {
      id: `bounty-${Date.now()}`,
      title: bountyData.title,
      description: bountyData.description,
      codeSnippet: bountyData.codeSnippet,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorUniversity: currentUser.department || UNIVERSITY_SHORT,
      bountyCredits: bountyData.bountyCredits,
      tags: bountyData.tags,
      category: bountyData.category,
      createdAt: 'Just now',
      status: 'open',
      answers: [],
    };

    setBounties([newBounty, ...bounties]);
    showToast(`Bounty created! ${bountyData.bountyCredits} credits placed in escrow.`);
  };

  // Update skills in passport
  const handleUpdateUserSkills = (offered: StudentSkill[], wanted: string[]) => {
    const updated = {
      ...currentUser,
      skillsOffered: offered,
      skillsWanted: wanted,
    };
    setCurrentUser(updated);
    setStudents((prev) =>
      prev.map((s) => (s.id === currentUser.id ? updated : s))
    );
    showToast('Updated your RTMSSU Skill Passport!');
  };

  // Add Notice from Organizer
  const handleAddNotice = (notice: OrganizerNotice) => {
    setNotices([notice, ...notices]);
    showToast(`Published official circular: "${notice.title}"`);
  };

  // RSVP Notice
  const handleRsvpNotice = (noticeId: string) => {
    if (rsvpdNotices.includes(noticeId)) {
      setRsvpdNotices((prev) => prev.filter((id) => id !== noticeId));
      setNotices((prev) =>
        prev.map((n) =>
          n.id === noticeId ? { ...n, registeredCount: Math.max(0, n.registeredCount - 1) } : n
        )
      );
      showToast('RSVP cancelled.', 'info');
    } else {
      setRsvpdNotices((prev) => [...prev, noticeId]);
      setNotices((prev) =>
        prev.map((n) =>
          n.id === noticeId ? { ...n, registeredCount: n.registeredCount + 1 } : n
        )
      );
      showToast('Successfully registered for RTMSSU campus event!');
    }
  };

  // Generate Certificate
  const handleGenerateCertificate = (certData: {
    skillName: string;
    skillCategory: string;
    mentorName: string;
    mentorPRN: string;
    hoursCompleted: number;
    learningOutcomes: string[];
  }) => {
    const randomHex = Math.floor(Math.random() * 900000 + 100000).toString(16).toUpperCase();
    const newCert: SkillCertificate = {
      id: `cert-${Date.now()}`,
      certificateNumber: `RTMSSU-SKILL-${randomHex}`,
      studentName: currentUser.name,
      studentPRN: currentUser.prn,
      studentEmail: currentUser.email,
      skillName: certData.skillName,
      skillCategory: certData.skillCategory,
      mentorName: certData.mentorName,
      mentorPRN: certData.mentorPRN,
      hoursCompleted: certData.hoursCompleted,
      issueDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      university: UNIVERSITY_NAME,
      signatureAuthority: 'Dr. Arvind Kulkarni (Dean, Academic Skills)',
      learningOutcomes: certData.learningOutcomes,
      status: 'endorsed',
    };

    setCertificates([newCert, ...certificates]);
    setSelectedCertificate(newCert);
    showToast(`Certificate generated for ${certData.skillName}!`);
  };

  // 1. If user navigated to the dedicated individual login page, render it
  if (isStudentLoginPageOpen) {
    return (
      <StudentLoginPage
        onSelectUser={handleLoginSuccess}
        onBackToDashboard={() => setIsStudentLoginPageOpen(false)}
      />
    );
  }

  // Quick Role Switcher Bar rendered atop every portal for instant testing & evaluation
  const roleSwitcherBar = (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-2 z-50">
      <div className="flex items-center gap-2">
        <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
          Demo Role Switcher:
        </span>
        <span className="text-slate-400 hidden sm:inline text-[11px]">
          Switch interface view:
        </span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          onClick={() => handleLoginSuccess(DEMO_USERS['student-grishma'])}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            currentUser.role === 'student' && currentUser.id === DEMO_USERS['student-grishma'].id
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Grishma Patil (Student)</span>
        </button>

        <button
          onClick={() => handleLoginSuccess(DEMO_USERS['mentor-tanvi'])}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            currentUser.role === 'mentor' && currentUser.id === DEMO_USERS['mentor-tanvi'].id
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Tanvi Deshmukh (Mentor)</span>
        </button>

        <button
          onClick={() => handleLoginSuccess(DEMO_USERS['organizer-arvind'])}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            currentUser.role === 'organizer' && currentUser.id === DEMO_USERS['organizer-arvind'].id
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Dr. Arvind (Organizer)</span>
        </button>

        <button
          onClick={() => setIsStudentLoginPageOpen(true)}
          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors flex items-center gap-1"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Login Page</span>
        </button>
      </div>
    </div>
  );

  // 2. If Current User is an Organizer, render the dedicated OrganizerPortal (distinct UI)
  if (currentUser.role === 'organizer') {
    return (
      <>
        {roleSwitcherBar}
        <OrganizerPortal
          currentUser={currentUser}
          notices={notices}
          certificates={certificates}
          students={students}
          onAddNotice={handleAddNotice}
          onViewCertificate={(cert) => setSelectedCertificate(cert)}
          onSwitchUser={handleLoginSuccess}
          onOpenLoginPage={() => setIsStudentLoginPageOpen(true)}
        />
        <CertificateModal
          isOpen={Boolean(selectedCertificate)}
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      </>
    );
  }

  // 3. If Current User is a Mentor, render the dedicated MentorPortal (distinct UI)
  if (currentUser.role === 'mentor') {
    return (
      <>
        {roleSwitcherBar}
        <MentorPortal
          currentUser={currentUser}
          certificates={certificates}
          onSwitchUser={handleLoginSuccess}
          onOpenLoginPage={() => setIsStudentLoginPageOpen(true)}
          onViewCertificate={(cert) => setSelectedCertificate(cert)}
        />
        <CertificateModal
          isOpen={Boolean(selectedCertificate)}
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      </>
    );
  }

  // 4. Default: Student Portal Interface
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-amber-100 selection:text-amber-900">
      {/* Demo Switcher Bar */}
      {roleSwitcherBar}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-lg text-xs font-medium border border-slate-800">
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        currentUser={currentUser}
        userCredits={userCredits}
        unreadCount={1}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenLoginPage={() => setIsStudentLoginPageOpen(true)}
        onSwitchUser={handleLoginSuccess}
      />

      {/* Hero Section (Rendered on Barter tab) */}
      {currentTab === 'barter' && (
        <HeroBanner
          onSearchSkills={handleHeroSearch}
          onExploreCircles={() => setCurrentTab('circles')}
        />
      )}

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'barter' && (
          <SkillBarterTab
            students={students}
            currentUser={currentUser}
            onRequestSwap={(student) => setSwapModalPartner(student)}
            onOpenChatWith={handleOpenChatWith}
            initialTeachQuery={initialTeachQuery}
            initialLearnQuery={initialLearnQuery}
          />
        )}

        {currentTab === 'circles' && (
          <StudyCirclesTab
            circles={circles}
            currentUser={currentUser}
            onCreateCircle={() => setIsCreateModalOpen(true)}
          />
        )}

        {currentTab === 'bounties' && (
          <BountyBoardTab
            bounties={bounties}
            currentUser={currentUser}
            userCredits={userCredits}
            onPostBounty={() => setIsCreateModalOpen(true)}
            onAnswerBounty={handleAnswerBounty}
            onAcceptAnswer={handleAcceptAnswer}
            onUpvoteAnswer={handleUpvoteAnswer}
          />
        )}

        {currentTab === 'passport' && (
          <GrowthPassportTab
            currentUser={currentUser}
            userCredits={userCredits}
            reviews={reviews}
            certificates={certificates}
            onUpdateSkills={handleUpdateUserSkills}
            onViewCertificate={(cert) => setSelectedCertificate(cert)}
            onGenerateCertificate={handleGenerateCertificate}
          />
        )}

        {currentTab === 'messages' && (
          <MessagesTab
            conversations={conversations}
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
            onUpdateSharedNotes={handleUpdateSharedNotes}
          />
        )}
      </main>

      {/* Modals */}
      <RequestSwapModal
        partner={swapModalPartner}
        currentUser={currentUser}
        isOpen={Boolean(swapModalPartner)}
        onClose={() => setSwapModalPartner(null)}
        onSubmitSwap={handleSubmitSwapProposal}
      />

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        currentUser={currentUser}
        userCredits={userCredits}
        onAddSkillOffer={handleAddSkillOffer}
        onCreateStudyCircle={handleCreateStudyCircle}
        onCreateBounty={handleCreateBounty}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
      />

      <CertificateModal
        isOpen={Boolean(selectedCertificate)}
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 font-display">Skill Swap</span>
            <span>·</span>
            <span>{UNIVERSITY_NAME} · Exclusive Campus Peer Knowledge Exchange</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentTab('barter')} className="hover:text-slate-900 transition-colors">
              Skill Barter
            </button>
            <button onClick={() => setCurrentTab('circles')} className="hover:text-slate-900 transition-colors">
              Study Pods
            </button>
            <button onClick={() => setCurrentTab('bounties')} className="hover:text-slate-900 transition-colors">
              Bounties
            </button>
            <button onClick={() => setCurrentTab('passport')} className="hover:text-slate-900 transition-colors">
              Certificates & Passport
            </button>
            <button onClick={() => setIsStudentLoginPageOpen(true)} className="hover:text-amber-800 font-semibold text-amber-700 transition-colors">
              Student Login Portal
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
