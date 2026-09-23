import React, { useState } from 'react';
import { NavigationTab, StudentProfile } from '../types';
import { UNIVERSITY_SHORT, DEMO_USERS } from '../mockData';
import { 
  Sparkles, 
  MessageSquare, 
  Users, 
  HelpCircle, 
  Award, 
  Repeat, 
  Plus, 
  BookOpen,
  Building2,
  LogIn,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  LogOut,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  currentUser: StudentProfile;
  userCredits: number;
  unreadCount: number;
  onOpenCreateModal: () => void;
  onOpenLoginModal: () => void;
  onOpenLoginPage?: () => void;
  onSwitchUser?: (user: StudentProfile) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  userCredits,
  unreadCount,
  onOpenCreateModal,
  onOpenLoginModal,
  onOpenLoginPage,
  onSwitchUser,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand title & RTMSSU college mark */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => onSelectTab('barter')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 font-bold text-sm font-display">
              {UNIVERSITY_SHORT}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold font-display tracking-tight text-slate-900 block leading-tight">
                  Skill Swap
                </span>
                <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 text-[10px] font-bold rounded-sm tracking-wide">
                  Student Portal
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase block">
                Ratan Tata MSSU Campus
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          <button
            onClick={() => onSelectTab('barter')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors relative ${
              currentTab === 'barter'
                ? 'text-amber-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Skill Barter</span>
            {currentTab === 'barter' && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('circles')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors relative ${
              currentTab === 'circles'
                ? 'text-amber-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Study Pods</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Live rooms active" />
            {currentTab === 'circles' && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('bounties')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors relative ${
              currentTab === 'bounties'
                ? 'text-amber-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Bounties</span>
            {currentTab === 'bounties' && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('passport')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors relative ${
              currentTab === 'passport'
                ? 'text-amber-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Passport & Certs</span>
            {currentTab === 'passport' && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('messages')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors relative ${
              currentTab === 'messages'
                ? 'text-amber-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chats</span>
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-600" />
            )}
            {currentTab === 'messages' && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-600 rounded-full" />
            )}
          </button>

          {/* Quick link to switch to Mentor / Organizer interfaces */}
          {onSwitchUser && (
            <div className="hidden xl:flex items-center gap-1 ml-2 pl-2 border-l border-slate-200">
              <button
                onClick={() => onSwitchUser(DEMO_USERS['mentor-tanvi'])}
                className="px-2 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                title="Switch to Mentor View"
              >
                🎓 Mentor View
              </button>
              <button
                onClick={() => onSwitchUser(DEMO_USERS['organizer-arvind'])}
                className="px-2 py-1 text-[11px] font-semibold text-amber-800 hover:bg-amber-50 rounded-md transition-colors"
                title="Switch to Organizer View"
              >
                🏛️ Organizer View
              </button>
            </div>
          )}
        </nav>

        {/* Zone 3: Primary Action, Credit Balance & Login / Account */}
        <div className="flex items-center gap-2.5">
          {/* Time Banked Credits Balance */}
          <div 
            onClick={() => onSelectTab('passport')}
            className="cursor-pointer hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 border border-amber-200/80 rounded-lg text-xs font-semibold text-amber-900 hover:bg-amber-100/70 transition-colors"
            title="1 Skill Credit = 1 Hour of peer mentorship banked"
          >
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span className="font-mono tabular-nums">{userCredits}</span>
            <span className="font-normal text-amber-700 hidden lg:inline">Credits</span>
          </div>

          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 rounded-lg hover:bg-amber-700 active:scale-[0.98] transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Offer Skill</span>
            <span className="sm:hidden">Offer</span>
          </button>

          {/* User Profile / Switch Account Button */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              title="Campus Profile & Role"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-lg bg-slate-100 object-cover ring-1 ring-amber-300"
              />
              <div className="hidden xl:block text-left text-[11px] leading-tight pr-1">
                <span className="font-bold text-slate-800 block truncate max-w-[110px]">
                  {currentUser.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-amber-700 font-mono block">
                  {currentUser.prn.split('-').slice(-2).join('-')}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setShowProfileMenu(false)}
              >
                <div className="pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {currentUser.name}
                    </span>
                    <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      {currentUser.role.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-amber-800 mt-0.5">
                    PRN: {currentUser.prn}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {currentUser.department}
                  </p>
                </div>

                <div className="py-2 space-y-1 text-xs">
                  <button
                    onClick={() => onSelectTab('passport')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-between"
                  >
                    <span>Growth Passport & Certs</span>
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                  </button>

                  {onOpenLoginPage && (
                    <button
                      onClick={onOpenLoginPage}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-between"
                    >
                      <span>Student Portal Login Page</span>
                      <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <button
                    onClick={onOpenLoginModal}
                    className="w-full py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Quick Role Switcher</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile navigation tab strip */}
      <div className="md:hidden border-t border-slate-100 bg-white px-2 py-1.5 flex justify-around">
        <button
          onClick={() => onSelectTab('barter')}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] ${
            currentTab === 'barter' ? 'text-amber-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <Repeat className="w-3.5 h-3.5" />
          <span>Barter</span>
        </button>
        <button
          onClick={() => onSelectTab('circles')}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] ${
            currentTab === 'circles' ? 'text-amber-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Pods</span>
        </button>
        <button
          onClick={() => onSelectTab('bounties')}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] ${
            currentTab === 'bounties' ? 'text-amber-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Bounties</span>
        </button>
        <button
          onClick={() => onSelectTab('passport')}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] ${
            currentTab === 'passport' ? 'text-amber-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Passport</span>
        </button>
        <button
          onClick={() => onSelectTab('messages')}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] ${
            currentTab === 'messages' ? 'text-amber-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Chat</span>
        </button>
      </div>
    </header>
  );
};
