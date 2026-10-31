import React, { useState } from 'react';
import { 
  Sparkles, 
  CalendarDays, 
  AlertTriangle, 
  Bookmark, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  Compass, 
  Clock, 
  MapPin,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  BarChart3
} from 'lucide-react';
import { Announcement, StudentProfile } from '../types';
import { EventCard } from '../components/shared/EventCard';

interface DashboardPageProps {
  student: StudentProfile;
  announcements: Announcement[];
  onSelectAnnouncement: (announcement: Announcement) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onShare: (announcement: Announcement, e: React.MouseEvent) => void;
  onNavigateTab: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  student,
  announcements,
  onSelectAnnouncement,
  onToggleBookmark,
  onShare,
  onNavigateTab,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const activeAnnouncements = announcements.filter((a) => a.priority !== 'Expired');
  const urgentItems = activeAnnouncements.filter((a) => a.priority === 'Urgent');
  const savedItems = announcements.filter((a) => a.isBookmarked);

  // Personalized recommendations
  const studentInterestsLower = student.interests.map((i) => i.toLowerCase());
  const recommendedAnnouncements = activeAnnouncements.filter((a) => {
    return studentInterestsLower.some(
      (interest) =>
        a.category.toLowerCase().includes(interest) ||
        a.tags.some((t) => interest.includes(t.toLowerCase()))
    );
  });

  const filteredUpcoming = activeAnnouncements.filter((a) => {
    if (filterCategory === 'All') return true;
    return a.category === filterCategory;
  });

  // Current hour greeting
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // AI Skill / Focus Profile attributes
  const skillProfile = [
    { name: 'Generative AI & LLMs', level: 92, category: 'AI/ML' },
    { name: 'Cloud Architecture & Docker', level: 78, category: 'DevOps' },
    { name: 'Full-Stack Web Engineering', level: 85, category: 'Engineering' },
    { name: 'Data Structures & Algorithms', level: 74, category: 'Core CS' },
    { name: 'Hackathon & Rapid Prototyping', level: 88, category: 'Execution' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. TOP HEADER (Inspired by Reference Layout) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {timeGreeting}, {student.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Your complete campus intelligence and opportunity pulse at a glance.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigateTab('parser')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-violet-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 hover:opacity-95 transition-all flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Parse Notice</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('briefing')}
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Weekly Brief</span>
          </button>
        </div>
      </div>

      {/* 2. FOUR LUXURY METRIC CARDS (Directly Matching Reference Image Structure) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div 
          onClick={() => onNavigateTab('feed')}
          className="p-6 rounded-3xl glossy-panel glossy-panel-hover border border-white/10 cursor-pointer space-y-2 relative overflow-hidden group"
        >
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            CAMPUS READINESS
          </p>
          <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            94%
          </p>
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 pt-1">
            <span>↑ 8% this month</span>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/15 transition-all" />
        </div>

        {/* Metric 2 */}
        <div 
          onClick={() => onNavigateTab('feed')}
          className="p-6 rounded-3xl glossy-panel glossy-panel-hover border border-white/10 cursor-pointer space-y-2 relative overflow-hidden group"
        >
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            AI MATCH SCORE
          </p>
          <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            88%
          </p>
          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 pt-1">
            <span>Top matches found</span>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-full blur-2xl pointer-events-none group-hover:bg-violet-600/15 transition-all" />
        </div>

        {/* Metric 3 */}
        <div 
          onClick={() => onNavigateTab('feed')}
          className="p-6 rounded-3xl glossy-panel glossy-panel-hover border border-white/10 cursor-pointer space-y-2 relative overflow-hidden group"
        >
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            ACTIVE OPPORTUNITIES
          </p>
          <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            {activeAnnouncements.length}
          </p>
          <div className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 pt-1">
            <span>{urgentItems.length} urgent action</span>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/15 transition-all" />
        </div>

        {/* Metric 4 */}
        <div 
          onClick={() => onNavigateTab('saved')}
          className="p-6 rounded-3xl glossy-panel glossy-panel-hover border border-white/10 cursor-pointer space-y-2 relative overflow-hidden group"
        >
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            PORTFOLIO WATCHLIST
          </p>
          <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            {savedItems.length}
          </p>
          <div className="flex items-center gap-1 text-[11px] font-bold text-violet-400 pt-1">
            <span>✓ Verified Sync</span>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-pink-500/15 transition-all" />
        </div>
      </div>

      {/* 3. SPLIT SECTION: AI Skill Profile & Recommended for You (Matching Reference Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Card: AI Skill Profile (7 columns) */}
        <div className="lg:col-span-7 p-7 rounded-3xl glossy-panel border border-white/10 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="text-lg font-bold text-white">AI Skill & Readiness Profile</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Calibrated against current semester campus recruitments & hackathon tracks
              </p>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              {student.department}
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {skillProfile.map((skill) => (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{skill.name}</span>
                  <span className="font-mono font-bold text-amber-300">{skill.level}%</span>
                </div>
                {/* Glossy Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-900 border border-white/5 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-violet-600 transition-all duration-1000 shadow-sm shadow-amber-500/40"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-400">Target Semester Goal: Full-Stack Placement Assessment</span>
            <span className="text-emerald-400 font-bold">On Track (Top 5%)</span>
          </div>
        </div>

        {/* Right Card: Recommended for You (5 columns) */}
        <div className="lg:col-span-5 p-7 rounded-3xl glossy-panel border border-white/10 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h2 className="text-lg font-bold text-white">Recommended for You</h2>
              <span className="text-xs text-slate-400">AI Personalized</span>
            </div>

            <div className="space-y-3.5 pt-3">
              {recommendedAnnouncements.slice(0, 3).map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => onSelectAnnouncement(item)}
                  className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-amber-500/30 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-violet-600/20 text-amber-300 flex items-center justify-center font-bold text-sm shrink-0 border border-amber-500/30">
                      {item.title.charAt(0)}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-white group-hover:text-amber-300 truncate">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">{item.organizer}</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-400 shrink-0">
                    {94 - idx * 4}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('feed')}
            className="w-full py-3 rounded-2xl glossy-button-violet text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>Explore All AI Matches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 4. TODAY'S URGENT PRIORITY ALERT BANNER */}
      {urgentItems.length > 0 && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-rose-950/40 via-amber-950/20 to-slate-900 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30 shadow-lg shadow-rose-500/20">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Strict Action Deadline
                </span>
                <span className="px-2 py-0.2 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                  {urgentItems.length} Urgent Notices
                </span>
              </div>
              <p className="text-xs text-slate-200 font-semibold mt-0.5">
                {urgentItems[0]?.title} — registration closes within 48 hours!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectAnnouncement(urgentItems[0])}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:opacity-95 text-white text-xs font-bold self-start sm:self-auto shrink-0 shadow-lg shadow-rose-600/30 transition-all"
          >
            Review Deadline Now
          </button>
        </div>
      )}

      {/* 5. MAIN CAMPUS EVENTS FEED (Categorized Grid) */}
      <section className="space-y-4 pt-4 border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Happening Across Campus</h2>
            <p className="text-xs text-slate-400">Authentic notices sorted by nearest event dates</p>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-xl scrollbar-none">
            {['All', 'Hackathons', 'Workshops', 'Internships', 'Placements', 'Cultural Events'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  filterCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUpcoming.slice(0, 6).map((ann) => (
            <EventCard
              key={ann.id}
              announcement={ann}
              onSelect={onSelectAnnouncement}
              onToggleBookmark={onToggleBookmark}
              onShare={onShare}
            />
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => onNavigateTab('feed')}
            className="px-6 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-amber-300 hover:text-amber-200 text-xs font-bold border border-amber-500/30 transition-all inline-flex items-center gap-2 shadow-sm"
          >
            <span>Explore All 16+ Campus Announcements</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
