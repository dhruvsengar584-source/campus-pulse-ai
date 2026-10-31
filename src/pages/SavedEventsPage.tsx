import React from 'react';
import { Bookmark, Sparkles, ArrowRight, Trash2, Calendar, MapPin } from 'lucide-react';
import { Announcement } from '../types';
import { EventCard } from '../components/shared/EventCard';

interface SavedEventsPageProps {
  announcements: Announcement[];
  onSelectAnnouncement: (announcement: Announcement) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onShare: (announcement: Announcement, e: React.MouseEvent) => void;
  onNavigateTab: (tab: string) => void;
}

export const SavedEventsPage: React.FC<SavedEventsPageProps> = ({
  announcements,
  onSelectAnnouncement,
  onToggleBookmark,
  onShare,
  onNavigateTab,
}) => {
  const savedAnnouncements = announcements.filter((a) => a.isBookmarked);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1 font-semibold text-xs">
            <Bookmark className="w-4 h-4" />
            <span>Personal Watchlist</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Saved Opportunities</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Keep track of upcoming hackathons, placement assessments, and scholarship deadlines.
          </p>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 font-semibold border border-indigo-500/20 self-start sm:self-auto">
          {savedAnnouncements.length} Saved Items
        </span>
      </div>

      {/* Grid */}
      {savedAnnouncements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedAnnouncements.map((ann) => (
            <EventCard
              key={ann.id}
              announcement={ann}
              onSelect={onSelectAnnouncement}
              onToggleBookmark={onToggleBookmark}
              onShare={onShare}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center rounded-3xl glass-panel border border-slate-800 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Your Watchlist is Empty</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Click the bookmark icon on any campus announcement in the Feed or Dashboard to save it here for quick access.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('feed')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors inline-flex items-center gap-2"
          >
            <span>Explore Campus Feed</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
