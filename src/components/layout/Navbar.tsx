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
  Cpu
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
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080C15]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <button 
            type="button"
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full rounded-[11px] bg-[#0A0F1D] flex items-center justify-center">
                <Radio className="w-5 h-5 text-indigo-400 group-hover:text-cyan-300 transition-colors" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#080C15] animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#080C15]" />
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-white font-['Plus_Jakarta_Sans']">
                  Campus Pulse
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 text-white">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide font-mono">
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
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === link.id
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
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
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:opacity-95 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 transition-all"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Notice Parser</span>
          </button>

          {/* Role Switcher (Judge friendly demo button!) */}
          <button
            type="button"
            onClick={() => onUpdateRole(student.role === 'student' ? 'admin' : 'student')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              student.role === 'admin'
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
                : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/20'
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
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Student View</span>
                <span className="sm:hidden">Student</span>
              </>
            )}
          </button>

          {/* Gemini API Key Configurator Modal Trigger */}
          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors"
            title="Configure Gemini API Key (Optional — Demo mode runs automatically)"
          >
            <Key className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors"
              title="Campus Notifications"
            >
              <Bell className="w-4 h-4" />
              {urgentCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#080C15] animate-pulse" />
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div 
                className="absolute right-0 mt-2 w-80 rounded-2xl glass-dropdown p-4 text-slate-100 z-50 border border-slate-700 animate-in fade-in slide-in-from-top-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-white">Live Campus Alerts</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold">
                    {urgentCount} Urgent
                  </span>
                </div>

                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  <div 
                    onClick={() => { setActiveTab('feed'); setShowNotifications(false); }}
                    className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-semibold text-rose-300">Registration Closing Soon!</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">Google Cloud GenAI Hackathon 2026 closes in 24 hours.</p>
                  </div>

                  <div 
                    onClick={() => { setActiveTab('briefing'); setShowNotifications(false); }}
                    className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-semibold text-indigo-300">Weekly Briefing Ready</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">Personalized intelligence summary for {student.department}.</p>
                  </div>

                  <div 
                    onClick={() => { setActiveTab('feed'); setShowNotifications(false); }}
                    className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-semibold text-cyan-300">New Placement Circular</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">Amazon SDE 1 drive scheduled for 4th years.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => { setActiveTab('feed'); setShowNotifications(false); }}
                  className="w-full mt-3 py-1.5 text-center text-xs text-indigo-400 hover:text-indigo-300 font-medium border-t border-slate-800/80 block"
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
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors"
          >
            <User className="w-3.5 h-3.5 text-indigo-400" />
            <span>Login / Demo</span>
          </button>

          {/* User Profile avatar */}
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 p-1 pl-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 transition-colors"
            title="View Student Profile"
          >
            <span className="text-xs font-medium text-slate-300 hidden md:inline">
              {student.name.split(' ')[0]}
            </span>
            <img
              src={student.avatar}
              alt={student.name}
              className="w-7 h-7 rounded-lg object-cover border border-indigo-500/40"
            />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0B0F19] px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => {
                setActiveTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === link.id
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-300 hover:bg-slate-900'
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
            className="w-full mt-2 text-center py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-2"
          >
            <Cpu className="w-4 h-4" />
            <span>Launch AI Notice Parser</span>
          </button>
        </div>
      )}

      {/* Gemini API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl glass-panel border border-slate-700 bg-[#0F172A] p-6 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
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
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Google Gemini API Key:
                </label>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
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
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white flex items-center gap-1.5 shadow-md"
                >
                  {keySaved ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
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
