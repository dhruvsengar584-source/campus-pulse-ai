import React from 'react';
import { Announcement, PriorityLevel } from '../../types';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Bookmark, 
  Share2, 
  ShieldCheck, 
  ExternalLink,
  Users,
  AlertTriangle
} from 'lucide-react';

interface EventCardProps {
  announcement: Announcement;
  onSelect: (announcement: Announcement) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onShare: (announcement: Announcement, e: React.MouseEvent) => void;
  onRegisterQuick?: (id: string, e: React.MouseEvent) => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Hackathons':
      return 'from-violet-600/30 to-purple-800/30 text-purple-300 border-purple-500/30';
    case 'Workshops':
      return 'from-blue-600/30 to-indigo-800/30 text-indigo-300 border-indigo-500/30';
    case 'Internships':
    case 'Placements':
      return 'from-emerald-600/30 to-teal-800/30 text-emerald-300 border-emerald-500/30';
    case 'Cultural Events':
      return 'from-pink-600/30 to-rose-800/30 text-pink-300 border-pink-500/30';
    case 'Academic Notices':
      return 'from-amber-600/30 to-orange-800/30 text-amber-300 border-amber-500/30';
    case 'Scholarships':
      return 'from-cyan-600/30 to-blue-800/30 text-cyan-300 border-cyan-500/30';
    case 'Competitions':
      return 'from-red-600/30 to-rose-800/30 text-rose-300 border-rose-500/30';
    default:
      return 'from-slate-600/30 to-slate-800/30 text-slate-300 border-slate-500/30';
  }
};

const getPriorityBadge = (priority: PriorityLevel) => {
  switch (priority) {
    case 'Urgent':
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          Urgent
        </span>
      );
    case 'Important':
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          Important
        </span>
      );
    case 'Upcoming':
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
          Upcoming
        </span>
      );
    case 'Expired':
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
          Expired
        </span>
      );
    default:
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60">
          Active
        </span>
      );
  }
};

export const EventCard: React.FC<EventCardProps> = ({
  announcement,
  onSelect,
  onToggleBookmark,
  onShare,
  onRegisterQuick,
}) => {
  // Format readable event date
  const eventDateObj = new Date(announcement.eventDate);
  const formattedDate = !isNaN(eventDateObj.getTime())
    ? eventDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })
    : announcement.eventDate;

  // Deadline calculation
  const deadlineDays = announcement.deadline
    ? Math.ceil((new Date(announcement.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div 
      onClick={() => onSelect(announcement)}
      className="group relative flex flex-col justify-between rounded-2xl glass-panel glass-panel-hover p-5 cursor-pointer overflow-hidden transition-all duration-300"
    >
      {/* Category Gradient Top Accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getCategoryColor(announcement.category)}`}></div>

      <div>
        {/* Top Meta: Category + Priority Badges + Actions */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium border bg-gradient-to-r ${getCategoryColor(announcement.category)}`}>
              {announcement.category}
            </span>
            {getPriorityBadge(announcement.priority)}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => onShare(announcement, e)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors"
              title="Share Event"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => onToggleBookmark(announcement.id, e)}
              className={`p-1.5 rounded-lg transition-colors ${
                announcement.isBookmarked
                  ? 'text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
              }`}
              title={announcement.isBookmarked ? 'Saved to Bookmarks' : 'Bookmark this announcement'}
            >
              <Bookmark className="w-4 h-4" fill={announcement.isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug mb-2">
          {announcement.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {announcement.description}
        </p>

        {/* Organizer & Verification */}
        <div className="flex items-center gap-2 mb-3.5 pb-3 border-b border-slate-800/60">
          {announcement.organizerAvatar ? (
            <img
              src={announcement.organizerAvatar}
              alt={announcement.organizer}
              className="w-6 h-6 rounded-full object-cover border border-indigo-500/30"
              loading="lazy"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-indigo-900/60 text-indigo-300 flex items-center justify-center text-xs font-bold">
              {announcement.organizer.charAt(0)}
            </div>
          )}
          <span className="text-xs font-medium text-slate-300 truncate max-w-[180px]">
            {announcement.organizer}
          </span>
          {announcement.verificationStatus === 'Verified' && (
            <span title="Verified Campus Organizer" className="shrink-0 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            </span>
          )}
        </div>

        {/* Date, Time & Venue info */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-3">
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">{announcement.startTime || '10:00 AM'}</span>
          </div>
          <div className="col-span-2 flex items-center gap-1.5 truncate text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{announcement.venue}</span>
          </div>
        </div>

        {/* Deadline alert if urgent */}
        {deadlineDays !== null && deadlineDays >= 0 && deadlineDays <= 3 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>
              Registration closes {deadlineDays === 0 ? 'today!' : `in ${deadlineDays} day${deadlineDays > 1 ? 's' : ''}!`}
            </span>
          </div>
        )}
      </div>

      {/* Card Footer: Participants + Quick CTA */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-800/40 mt-1">
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Users className="w-3.5 h-3.5 text-slate-500" />
          <span>{announcement.participantCount || 42} interested</span>
        </div>

        <div className="flex items-center gap-2">
          {announcement.registered ? (
            <span className="text-xs font-medium text-emerald-400 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
              Registered ✓
            </span>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onRegisterQuick) onRegisterQuick(announcement.id, e);
                else onSelect(announcement);
              }}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-500/30 transition-all flex items-center gap-1"
            >
              <span>View & RSVP</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
