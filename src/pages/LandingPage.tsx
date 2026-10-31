import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  CalendarDays, 
  ShieldCheck, 
  Clock, 
  Compass, 
  MessageSquare, 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  FileText,
  Flame,
  Star
} from 'lucide-react';
import { Announcement } from '../types';

interface LandingPageProps {
  onExplore: () => void;
  onOpenAIParser: () => void;
  featuredAnnouncements: Announcement[];
  onSelectAnnouncement: (announcement: Announcement) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExplore,
  onOpenAIParser,
  featuredAnnouncements,
  onSelectAnnouncement,
}) => {
  return (
    <div className="relative overflow-hidden bg-ambient-mesh">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-48 right-10 w-[550px] h-[400px] bg-violet-600/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-96 left-10 w-[450px] h-[350px] bg-pink-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-28 md:pb-32">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300 shadow-sm shadow-amber-500/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Google Developers Hackathon Edition</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="text-slate-300">Gemini 2.5 Intelligence</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05]">
            Your Campus. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500">
              One Intelligent Pulse.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Never miss a campus opportunity again. Discover events, deadlines, internships, and announcements—all organized intelligently in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={onExplore}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glossy-button-gold text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2.5 group"
            >
              <span>Explore Campus Feed</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onOpenAIParser}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl glossy-panel hover:bg-white/[0.08] text-amber-300 hover:text-white font-bold text-sm border border-amber-500/30 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/5"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-current" />
              <span>Launch AI Notice Parser</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-14 border-t border-white/[0.08] max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl glossy-panel border border-white/5 text-center">
              <p className="text-3xl sm:text-4xl font-black text-white font-mono">100%</p>
              <p className="text-xs text-amber-400/80 font-semibold mt-1">Structured Ingestion</p>
            </div>
            <div className="p-4 rounded-2xl glossy-panel border border-white/5 text-center">
              <p className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">16+</p>
              <p className="text-xs text-slate-400 font-semibold mt-1">Live Campus Notices</p>
            </div>
            <div className="p-4 rounded-2xl glossy-panel border border-white/5 text-center">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">0</p>
              <p className="text-xs text-slate-400 font-semibold mt-1">Missed Deadlines</p>
            </div>
            <div className="p-4 rounded-2xl glossy-panel border border-white/5 text-center">
              <p className="text-3xl sm:text-4xl font-black text-violet-400 font-mono">&lt; 1s</p>
              <p className="text-xs text-slate-400 font-semibold mt-1">Gemini AI Parsing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Interactive Extraction Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-3xl p-6 md:p-10 glossy-panel border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6 flex-wrap gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">Signature Innovation</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">From Chaotic WhatsApp Forward to Structured Reality</h2>
            </div>
            <button
              type="button"
              onClick={onOpenAIParser}
              className="px-4 py-2 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/25 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Full AI Studio</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Raw chaotic message */}
            <div className="p-6 rounded-3xl bg-slate-950/90 border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1.5 font-bold text-slate-300">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    Raw Input (WhatsApp Forward)
                  </span>
                  <span className="font-mono text-[10px] text-slate-500 uppercase">Unstructured</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/90 text-xs font-mono text-slate-300 leading-relaxed border border-white/5">
                  <p className="text-rose-400 font-bold mb-1">🚨🚨 ATTENTION TECHIES & CODER GEEKS!! 🚨🚨</p>
                  <p>GDSC is organizing HACKPULSE 2026! 36-hr offline hackathon on our campus. Central Audi 2, Nov 15th-16th. Cash pool ₹2.5 Lakhs! Register before Nov 5th midnight: https://hackpulse2026.gdg.in/apply</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-amber-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span>Detected in 24 student WhatsApp groups</span>
              </div>
            </div>

            {/* Right: Structured AI output */}
            <div className="p-6 rounded-3xl glossy-card-gold flex flex-col justify-between border border-amber-500/40">
              <div>
                <div className="flex items-center justify-between text-xs text-amber-300 mb-3">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    Gemini AI Structured Extraction
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/30">
                    98% Confidence
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-white/5">
                    <span className="text-slate-400">Title:</span>
                    <span className="font-bold text-white">Google Cloud HackPulse 2026</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
                      <span className="font-bold text-violet-300">Hackathons</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Event Date</span>
                      <span className="font-bold text-amber-300">Nov 15, 2026</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-white/5">
                    <span className="text-slate-400">Venue:</span>
                    <span className="font-medium text-slate-200">Central Audi 2, Academic Block C</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30">
                    <span className="text-rose-300 font-bold">Registration Deadline:</span>
                    <span className="font-black text-rose-300">Nov 5, 2026 (Urgent)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Auto-synced to Calendar & Feed
                </span>
                <button
                  type="button"
                  onClick={onOpenAIParser}
                  className="text-xs text-amber-400 hover:text-amber-300 font-bold"
                >
                  Parse Custom Text →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/[0.08]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400">End-to-End Intelligence</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Built for Modern Campus Life</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-3xl glossy-panel border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold border border-amber-500/30">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <h4 className="text-sm font-bold text-white">AI Notice Intelligence</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extracts venue, timings, eligibility, URLs, and deadlines from messy text with duplicate detection.
            </p>
          </div>

          <div className="p-6 rounded-3xl glossy-panel border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-violet-600/20 text-violet-400 flex items-center justify-center font-bold border border-violet-500/30">
              <CalendarDays className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Smart Interactive Calendar</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Month, Week, and Day views with Google Calendar sync and .ics export for all your devices.
            </p>
          </div>

          <div className="p-6 rounded-3xl glossy-panel border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold border border-pink-500/30">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Weekly AI Briefing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              "What do I need to know this week?" Synthesizes strict career and academic action items.
            </p>
          </div>

          <div className="p-6 rounded-3xl glossy-panel border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Admin & Trust Layer</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verified organizer badges, notice approval queue, report management, and analytics dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Announcements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/[0.08]">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">Live Campus Stream</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Happening Right Now Across Campus</h2>
          </div>
          <button
            type="button"
            onClick={onExplore}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>View All 16+ Announcements</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredAnnouncements.slice(0, 3).map((ann) => (
            <div
              key={ann.id}
              onClick={() => onSelectAnnouncement(ann)}
              className="p-6 rounded-3xl glossy-panel glossy-panel-hover cursor-pointer border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    {ann.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{ann.eventDate}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white hover:text-amber-300 transition-colors line-clamp-2 mb-2">
                  {ann.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                  {ann.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
                <span className="truncate max-w-[150px] font-medium">{ann.organizer}</span>
                <span className="text-amber-400 font-bold">View Details →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="p-8 sm:p-14 rounded-3xl glossy-panel border border-amber-500/30 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Ready to Experience the Pulse of Your College?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Zero missed hackathons, zero expired application deadlines, zero message clutter. Switch to AI-organized campus intelligence today.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onExplore}
              className="px-8 py-4 rounded-2xl glossy-button-gold text-slate-950 font-black text-sm shadow-xl transition-all"
            >
              Enter Student Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#04060B] py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">Campus Pulse AI</span>
            <span>—</span>
            <span>Developed for Google Developers Hackathon</span>
          </div>
          <div className="flex items-center gap-6 font-medium">
            <span className="text-amber-400/90 font-mono">Gemini 2.5 Flash</span>
            <span>React 19 + TypeScript</span>
            <span className="text-emerald-400 font-mono">● LIVE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
