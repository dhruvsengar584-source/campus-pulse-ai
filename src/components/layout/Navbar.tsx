import React, { useState } from 'react';
import { 
  Sparkles, 
  Bell, 
  ShieldCheck, 
  User, 
  Menu, 
  X, 
  Key, 
  Check, 
  Radio, 
  Cpu,
  Flame,
  Zap
} from 'lucide-react';
import { StudentProfile } from '../../types';
import { GeminiService } from '../../services/geminiService';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  student: StudentProfile;
  onUpdateRole: (role: 'student' | 'admin') => void;
  onOpenAIParser: () => void;
  onOpenAuth: () => void;
  urgentCount: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  student,
  onUpdateRole,
  onOpenAIParser,
  onOpenAuth,
  urgentCount,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(
    localStorage.getItem('campus_pulse_gemini_key') || ''
  );
  const [keySaved, setKeySaved] = useState(false);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    GeminiService.setApiKey(apiKeyInput);
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setShowKeyModal(false);
    }, 1000);
  };

  const navLinks = [
    { id: 'landing', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'feed', label: 'Campus Feed' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'briefing', label: 'Weekly Briefing' },
    { id: 'saved', label: 'Saved' },
    { id: 'admin', label: 'Admin Portal' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#05070D]/90 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <button 
            type="button"
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-violet-600 to-pink-500 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all">
              <div className="w-full h-full rounded-[14px] bg-[#070A12] flex items-center justify-center">
                <Radio className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#05070D] animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#05070D]" />
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white font-['Plus_Jakarta_Sans']">
                  Campus Pulse
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-slate-950 shadow-sm">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-amber-400/80 tracking-wider font-mono uppercase font-semibold">
                One Intelligent Pulse
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => setActiveTab(link.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === link.id
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Section Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick AI Parser Button */}
          <button
            type="button"
            onClick={onOpenAIParser}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-violet-600 hover:opacity-95 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>AI Notice Parser</span>
          </button>

          {/* Role Switcher (Judge friendly demo button!) */}
          <button
            type="button"
            onClick={() => onUpdateRole(student.role === 'student' ? 'admin' : 'student')}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              student.role === 'admin'
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 hover:bg-amber-500/25 shadow-sm'
                : 'bg-violet-600/15 text-violet-300 border-violet-500/30 hover:bg-violet-600/25'
            }`}
            title="Click to toggle between Student and Admin perspective"
          >
            {student.role === 'admin' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Admin Mode</span>
                <span className="sm:hidden">Admin</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-violet-400" />
                <span className="hidden sm:inline">Student View</span>
                <span className="sm:hidden">Student</span>
              </>
            )}
          </button>

          {/* Gemini API Key Configurator Modal Trigger */}
          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-white/[0.04] transition-colors"
            title="Configure Gemini API Key"
          >
            <Key className="w-4 h-4" />
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-white/[0.04] transition-colors"
              title="Campus Notifications"
            >
              <Bell className="w-4 h-4" />
              {urgentCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#05070D] animate-pulse" />
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div 
                className="absolute right-0 mt-2 w-80 rounded-2xl glossy-panel p-4 text-slate-100 z-50 border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
                  <div className="flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">Live Campus Alerts</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                    {urgentCount} Urgent
                  </span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  <div 
                    onClick={() => { setActiveTab('feed'); setShowNotifications(false); }}
                    className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-rose-500/20 cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-semibold text-rose-300">Registration Closing Soon!</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">Google Cloud GenAI Hackathon 2026 closes in 24 hours.</p>
                  </div>

                  <div 
                    onClick={() => { setActiveTab('briefing'); setShowNotifications(false); }}
                    className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-amber-500/20 cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-semibold text-amber-300">Weekly Briefing Ready</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">Personalized intelligence summary for {student.department}.</p>
                  </div>

                  <div 
                    onClick={() => { setActiveTab('feed'); setShowNotifications(false); }}
                    className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-violet-500/20 cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-semibold text-violet-300">New Placement Circular</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">Amazon SDE 1 drive scheduled for 4th years.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => { setActiveTab('feed'); setShowNotifications(false); }}
                  className="w-full mt-3 py-1.5 text-center text-xs text-amber-400 hover:text-amber-300 font-semibold border-t border-white/[0.08] block"
                >
                  View All Campus Announcements →
                </button>
              </div>
            )}
          </div>

          {/* Auth Modal Trigger */}
          <button
            type="button"
            onClick={onOpenAuth}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-amber-300 hover:text-amber-200 border border-amber-500/30 text-xs font-semibold transition-all shadow-sm"
          >
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span>Login / Switch</span>
          </button>

          {/* User Profile avatar */}
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 p-1 pl-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] transition-colors"
            title="View Student Profile"
          >
            <span className="text-xs font-semibold text-slate-200 hidden md:inline">
              {student.name.split(' ')[0]}
            </span>
            <img
              src={student.avatar}
              alt={student.name}
              className="w-7 h-7 rounded-lg object-cover border border-amber-500/40"
            />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#070A12] px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => {
                setActiveTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === link.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-300 hover:bg-white/[0.04]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              onOpenAIParser();
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 text-center py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-violet-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Launch AI Notice Parser</span>
          </button>
        </div>
      )}

      {/* Gemini API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl glossy-panel border border-white/10 bg-[#0A0D16] p-6 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Gemini API Settings</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Campus Pulse AI includes a <strong>Zero-Config Live Heuristic Engine</strong> that works out of the box. You can optionally paste a Google Gemini API key below to enable direct cloud model calls.
            </p>

            <form onSubmit={handleSaveKey} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Google Gemini API Key:
                </label>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setApiKeyInput('');
                    GeminiService.setApiKey('');
                    setShowKeyModal(false);
                  }}
                  className="text-xs text-slate-400 hover:text-rose-400"
                >
                  Clear Key (Use Demo AI)
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                >
                  {keySaved ? (
                    <>
                      <Check className="w-4 h-4 text-slate-950" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <span>Save Key</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
