import React, { useState } from 'react';
import { X, ShieldCheck, User, Sparkles, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { StudentProfile } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginAsStudent: () => void;
  onLoginAsAdmin: () => void;
  onCustomAuth: (name: string, email: string, role: 'student' | 'admin') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginAsStudent,
  onLoginAsAdmin,
  onCustomAuth,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const displayName = name.trim() || (role === 'admin' ? 'Dr. Sunita Rao (Admin)' : 'Aarav Sharma');
    onCustomAuth(displayName, email, role);
    setSuccessMsg(mode === 'login' ? 'Successfully authenticated!' : 'Account created successfully!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-3xl glass-panel border border-slate-700/80 bg-[#0F172A] p-6 text-slate-100 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider">Campus Pulse Identity</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            {mode === 'login' ? 'Welcome Back' : 'Join Campus Pulse'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access personalized campus notices, AI parser, and verified updates.
          </p>
        </div>

        {/* 1-Click Fast Demo Credentials for Judges */}
        <div className="mb-6 p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-3">
          <p className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
            ⚡ Quick Demo Logins (For Judges):
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onLoginAsStudent();
                onClose();
              }}
              className="p-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-center"
            >
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>Student Profile</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onLoginAsAdmin();
                onClose();
              }}
              className="p-2.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 text-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-center"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Campus Admin</span>
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center mb-5">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-[#0F172A] px-3 text-[11px] text-slate-500 font-semibold absolute">
            or continue with email
          </span>
        </div>

        {successMsg ? (
          <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-bounce" />
            <p className="text-sm font-bold text-white">{successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {mode === 'signup' && (
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            <div>
              <label className="block text-slate-300 font-medium mb-1">Campus Email Address:</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@campus.edu"
                  required
                  className="w-full pl-9 pr-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Password:</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <label
                className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border cursor-pointer text-xs font-semibold ${
                  role === 'student'
                    ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="userRole"
                  value="student"
                  checked={role === 'student'}
                  onChange={() => setRole('student')}
                  className="hidden"
                />
                <User className="w-3.5 h-3.5" />
                <span>Student</span>
              </label>

              <label
                className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border cursor-pointer text-xs font-semibold ${
                  role === 'admin'
                    ? 'bg-amber-600/20 border-amber-500/40 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="userRole"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  className="hidden"
                />
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="mt-5 text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
