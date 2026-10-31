import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  CalendarDays, 
  ShieldCheck, 
  Clock, 
  Compass, 
  MessageSquare, 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  FileText
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
    <div className="relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-10 w-[500px] h-[350px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Google Developers Hackathon Edition</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span className="text-slate-400">Gemini 2.5 Intelligence</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Your Campus. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
              One Intelligent Pulse.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Never miss a campus opportunity again. Discover events, deadlines, internships, and announcements—all organized intelligently in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              type="button"
              onClick={onExplore}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore Campus Feed</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onOpenAIParser}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl glass-panel hover:bg-slate-800/80 text-cyan-300 hover:text-white font-bold text-sm border border-cyan-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Try AI Notice Parser</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 border-t border-slate-800/80 max-w-4xl mx-auto">
            <div className="p-3 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100%</p>
              <p className="text-xs text-slate-400 mt-1">Structured Extraction</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">16+</p>
              <p className="text-xs text-slate-400 mt-1">Live Campus Notices</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">0</p>
              <p className="text-xs text-slate-400 mt-1">Missed Deadlines</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">&lt; 1s</p>
              <p className="text-xs text-slate-400 mt-1">Gemini AI Ingestion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Interactive Extraction Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-3xl p-6 md:p-10 border border-slate-800 bg-gradient-to-b from-slate-900/90 to-[#0A0E18] shadow-2xl">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6 flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Signature Innovation</span>
              <h2 className="text-2xl font-bold text-white mt-1">From Chaotic WhatsApp Forward to Structured Reality</h2>
            </div>
            <button
              type="button"
              onClick={onOpenAIParser}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/30 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Full AI Studio</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Raw chaotic message */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    Raw Input (WhatsApp Forward)
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">Unstructured</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 text-xs font-mono text-slate-300 leading-relaxed border border-slate-800">
                  <p className="text-rose-400 font-bold mb-1">🚨🚨 ATTENTION TECHIES & CODER GEEKS!! 🚨🚨</p>
                  <p>GDSC is organizing HACKPULSE 2026! 36-hr offline hackathon on our campus. Central Audi 2, Nov 15th-16th. Cash pool ₹2.5 Lakhs! Register before Nov 5th midnight: https://hackpulse2026.gdg.in/apply</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span>Detected in 24 student WhatsApp groups</span>
              </div>
            </div>

            {/* Right: Structured AI output */}
            <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-indigo-300 mb-3">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    Gemini AI Structured Extraction
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    98% Confidence
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Title:</span>
                    <span className="font-semibold text-white">Google Cloud HackPulse 2026</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Category</span>
                      <span className="font-semibold text-purple-300">Hackathons</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Event Date</span>
                      <span className="font-semibold text-cyan-300">Nov 15, 2026</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-400">Venue:</span>
                    <span className="font-medium text-slate-200">Central Audi 2, Academic Block C</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                    <span className="text-rose-300 font-semibold">Registration Deadline:</span>
                    <span className="font-bold text-rose-300">Nov 5, 2026 (Urgent)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Auto-synced to Calendar & Feed
                </span>
                <button
                  type="button"
                  onClick={onOpenAIParser}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Parse Custom Text →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Campus Problem & Our Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">The Problem We Solve</span>
          <h2 className="text-3xl font-extrabold text-white mt-2">Why College Students Miss Critical Opportunities</h2>
          <p className="text-sm text-slate-400 mt-3">
            Campus communication is currently fragmented across WhatsApp chats, unread email chains, torn notice boards, and unofficial social pages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">WhatsApp & Chat Fatigue</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Crucial hackathon deadlines and placement notices drown inside class WhatsApp groups beneath hundreds of random casual texts and memes.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Zero Deadline Intelligence</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Students open a forward only to discover the registration deadline expired yesterday. There is no central countdown or calendar sync.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Zero Personalization</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              A 3rd year CS student gets bombarded with 1st year chemistry lab notices, while missing the Goldman Sachs or Google Cloud internship drives.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">End-to-End Capabilities</span>
          <h2 className="text-3xl font-extrabold text-white mt-2">Built for Modern Campus Life</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-2.5">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <h4 className="text-sm font-bold text-white">AI Notice Intelligence</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extracts venue, timings, eligibility, URLs, and deadlines from unstructured text with duplicate detection.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-2.5">
            <CalendarDays className="w-6 h-6 text-indigo-400" />
            <h4 className="text-sm font-bold text-white">Smart Interactive Calendar</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Category color coding, countdown alerts, Google Calendar sync, and .ics export for all your devices.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-2.5">
            <Compass className="w-6 h-6 text-purple-400" />
            <h4 className="text-sm font-bold text-white">Weekly AI Briefing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              "What do I need to know this week?" Synthesizes high-priority career and academic action items.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">Admin & Trust Layer</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verified organizer badges, notice approval queue, report management, and analytics dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Announcements Carousel/Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Live Campus Stream</span>
            <h2 className="text-2xl font-bold text-white mt-1">Happening Right Now Across Campus</h2>
          </div>
          <button
            type="button"
            onClick={onExplore}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
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
              className="p-5 rounded-2xl glass-panel glass-panel-hover cursor-pointer border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium">
                    {ann.category}
                  </span>
                  <span className="text-slate-400">{ann.eventDate}</span>
                </div>
                <h3 className="text-sm font-bold text-white hover:text-indigo-300 transition-colors line-clamp-2 mb-2">
                  {ann.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                  {ann.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate max-w-[150px]">{ann.organizer}</span>
                <span className="text-indigo-400 font-semibold">View Details →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Experience the Pulse of Your College?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Zero missed hackathons, zero expired application deadlines, zero message clutter. Switch to AI-organized campus intelligence today.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onExplore}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all"
            >
              Enter Student Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#060911] py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">Campus Pulse AI</span>
            <span>—</span>
            <span>Developed for Google Developers Hackathon</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Powered by Gemini 2.5 Flash</span>
            <span>React + TypeScript + Tailwind</span>
            <span>Production Prototype</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
