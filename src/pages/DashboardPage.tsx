import React, { useState } from 'react';
import { 
  Sparkles, 
  CalendarDays, 
  AlertTriangle, 
  Bookmark, 
  ArrowRight, 
  Flame, 
  TrendingUp, 
  CheckCircle2, 
  Compass, 
  Cpu, 
  Clock, 
  MapPin,
  ExternalLink,
  ChevronRight
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

  // Personalized recommendations logic
  const studentInterestsLower = student.interests.map((i) => i.toLowerCase());
  const recommendedAnnouncements = activeAnnouncements.filter((a) => {
    const matchesCategory = studentInterestsLower.some(
      (interest) =>
        a.category.toLowerCase().includes(interest) ||
        a.tags.some((t) => interest.includes(t.toLowerCase()))
    );
    return matchesCategory;
  });

  // Filtered upcoming events
  const filteredUpcoming = activeAnnouncements.filter((a) => {
    if (filterCategory === 'All') return true;
    return a.category === filterCategory;
  });

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-slate-900 border border-indigo-500/30 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{currentDateFormatted}</span>
              <span>•</span>
              <span className="text-slate-400">{student.college}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {student.name}! 👋
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              You are viewing the personalized pulse for <span className="text-indigo-300 font-semibold">{student.department}</span> ({student.year}).
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => onNavigateTab('parser')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-all flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>Parse New Notice</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab('briefing')}
              className="px-4 py-2.5 rounded-xl glass-panel text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 hover:border-slate-600 transition-all flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>View Weekly Brief</span>
            </button>
          </div>
        </div>
      </div>

      {/* Today's Focus Alert Bar */}
      {urgentItems.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 to-slate-900 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Today's Urgent Priority
                </span>
                <span className="px-2 py-0.2 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                  {urgentItems.length} Deadlines Closing Soon
                </span>
              </div>
              <p className="text-xs text-slate-200 font-medium mt-0.5">
                {urgentItems[0]?.title} — registration closes within 48 hours!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectAnnouncement(urgentItems[0])}
            className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold self-start sm:self-auto shrink-0 transition-colors shadow-md shadow-rose-600/30"
          >
            Review Deadline Now
          </button>
        </div>
      )}

      {/* 4 Interactive Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => onNavigateTab('feed')}
          className="p-5 rounded-2xl glass-panel glass-panel-hover cursor-pointer border border-slate-800"
        >
          <div className="flex items-center justify-between text-indigo-400 mb-2">
            <CalendarDays className="w-5 h-5" />
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300">
              +4 this week
            </span>
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{activeAnnouncements.length}</p>
          <p className="text-xs text-slate-400 mt-1">Upcoming Campus Events</p>
        </div>

        <div 
          onClick={() => onNavigateTab('feed')}
          className="p-5 rounded-2xl glass-panel glass-panel-hover cursor-pointer border border-slate-800"
        >
          <div className="flex items-center justify-between text-rose-400 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 animate-pulse">
              Strict Actions
            </span>
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{urgentItems.length}</p>
          <p className="text-xs text-slate-400 mt-1">Urgent Deadlines</p>
        </div>

        <div 
          onClick={() => onNavigateTab('saved')}
          className="p-5 rounded-2xl glass-panel glass-panel-hover cursor-pointer border border-slate-800"
        >
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <Bookmark className="w-5 h-5" />
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300">
              Sync ready
            </span>
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{savedItems.length}</p>
          <p className="text-xs text-slate-400 mt-1">Bookmarked Opportunities</p>
        </div>

        <div 
          onClick={() => onNavigateTab('calendar')}
          className="p-5 rounded-2xl glass-panel glass-panel-hover cursor-pointer border border-slate-800"
        >
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300">
              Active
            </span>
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{student.registeredAnnouncementIds.length}</p>
          <p className="text-xs text-slate-400 mt-1">RSVPs & Registered</p>
        </div>
      </div>

      {/* Personalized AI Recommendations Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Recommended for Your Profile</h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
              AI Personalized
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('feed')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedAnnouncements.slice(0, 3).map((ann) => (
            <div 
              key={ann.id}
              onClick={() => onSelectAnnouncement(ann)}
              className="p-5 rounded-2xl glass-panel glass-panel-hover cursor-pointer border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {ann.category}
                  </span>
                  <span className="text-xs text-slate-400">{ann.eventDate}</span>
                </div>

                <h3 className="text-sm font-bold text-white hover:text-indigo-300 transition-colors line-clamp-2 mb-2">
                  {ann.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                  {ann.description}
                </p>

                <div className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-[11px] text-indigo-300 mb-3">
                  💡 Matches your interest in <strong>{ann.tags[0] || 'Technology'}</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate max-w-[150px]">{ann.organizer}</span>
                <span className="text-indigo-400 font-semibold">View Details →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Campus Events Grid */}
      <section className="space-y-4 pt-4 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Upcoming Campus Events</h2>
            <p className="text-xs text-slate-400">All authenticated notices sorted by date</p>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-xl">
            {['All', 'Hackathons', 'Workshops', 'Internships', 'Placements', 'Cultural Events'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  filterCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
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

        {filteredUpcoming.length === 0 && (
          <div className="py-12 text-center text-slate-400 bg-slate-900/30 rounded-2xl border border-slate-800">
            <p className="text-sm">No announcements found in this category.</p>
          </div>
        )}

        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => onNavigateTab('feed')}
            className="px-6 py-2.5 rounded-xl glass-panel hover:bg-slate-800 text-xs font-semibold text-indigo-300 hover:text-white border border-indigo-500/30 transition-all inline-flex items-center gap-2"
          >
            <span>Explore All Filterable Announcements</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
