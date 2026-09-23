export type NavigationTab = 'barter' | 'circles' | 'bounties' | 'organizer' | 'passport' | 'messages';

export type UserRole = 'student' | 'mentor' | 'organizer';

export interface StudentSkill {
  name: string;
  category: 'tech' | 'math' | 'design' | 'language' | 'business' | 'other';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  prn: string;
  role: UserRole;
  avatar: string;
  university: string; // "Ratan Tata Maharashtra State Skills University (RTMSSU)"
  department: string;
  major: string;
  year: string;
  bio: string;
  rating: number;
  reviewCount: number;
  hoursTaught: number;
  skillsOffered: StudentSkill[];
  skillsWanted: string[];
  availability: string;
  verifiedStudent: boolean;
  online: boolean;
  mentorOfficeHours?: string;
  mentorSlotsAvailable?: number;
}

export interface SkillSwapRequest {
  id: string;
  fromStudentId: string;
  fromStudentName: string;
  fromStudentPRN: string;
  fromStudentAvatar: string;
  fromStudentMajor: string;
  toStudentId: string;
  skillOffered: string;
  skillRequested: string;
  status: 'pending' | 'accepted' | 'completed' | 'declined';
  scheduledTime?: string;
  sessionFormat: '30min' | '60min' | 'recurring';
  notes: string;
  createdAt: string;
}

export interface StudyCircleParticipant {
  id: string;
  name: string;
  avatar: string;
  role: 'host' | 'member';
  status: 'Focusing' | 'Screen Sharing' | 'Helping' | 'Taking Break';
  micOn: boolean;
}

export interface StudyCircle {
  id: string;
  title: string;
  category: string;
  description: string;
  hostName: string;
  hostAvatar: string;
  hostUniversity: string;
  activeParticipants: StudyCircleParticipant[];
  maxCapacity: number;
  currentFocusTopic: string;
  tags: string[];
  isLive: boolean;
}

export interface BountyAnswer {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorUniversity: string;
  content: string;
  codeSnippet?: string;
  createdAt: string;
  upvotes: number;
  isAccepted: boolean;
}

export interface BountyQuestion {
  id: string;
  title: string;
  description: string;
  codeSnippet?: string;
  authorName: string;
  authorAvatar: string;
  authorUniversity: string;
  bountyCredits: number;
  tags: string[];
  category: string;
  createdAt: string;
  status: 'open' | 'solved';
  answers: BountyAnswer[];
}

export interface PeerReview {
  id: string;
  reviewerName: string;
  reviewerAvatar: string;
  reviewerUniversity: string;
  skillTaught: string;
  skillReceived: string;
  rating: number;
  comment: string;
  date: string;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface ChatConversation {
  id: string;
  partner: StudentProfile;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messages: DirectMessage[];
  sharedNotes?: string;
  nextSession?: {
    date: string;
    topic: string;
    duration: string;
  };
}

export interface OrganizerNotice {
  id: string;
  title: string;
  type: 'hackathon' | 'exam' | 'campaign' | 'announcement';
  organizerName: string;
  organizerRole: string;
  department: string;
  description: string;
  eventDate?: string;
  deadline?: string;
  venueOrLink?: string;
  tags: string[];
  postedDate: string;
  prizesOrIncentive?: string;
  eligibleBatches?: string;
  registeredCount: number;
  isUrgent?: boolean;
}

export interface SkillCertificate {
  id: string;
  certificateNumber: string;
  studentName: string;
  studentPRN: string;
  studentEmail: string;
  skillName: string;
  skillCategory: string;
  mentorName: string;
  mentorPRN: string;
  hoursCompleted: number;
  issueDate: string;
  university: string;
  learningOutcomes: string[];
  signatureAuthority: string;
  status?: 'endorsed' | 'pending_approval';
}

export interface MentorshipSession {
  id: string;
  mentorId: string;
  menteeName: string;
  menteePRN: string;
  menteeAvatar: string;
  topic: string;
  scheduledTime: string;
  durationMinutes: number;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  nepCreditsApplied: boolean;
  notes: string;
}
