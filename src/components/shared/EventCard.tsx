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

const getCategoryBadgeStyle = (category: string) => {
  switch (category) {
    case 'Hackathons':
      return 'bg-violet-500/15 text-violet-300 border-violet-500/30';
    case 'Workshops':
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    case 'Internships':
    case 'Placements':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'Cultural Events':
      return 'bg-pink-500/15 text-pink-300 border-pink-500/30';
    case 'Academic Notices':
      return 'bg-orange-500/15 text-orange-300 border-orange-500/30';
    case 'Scholarships':
      return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
    case 'Competitions':
      return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
    default:
      return 'bg-slate-800 text-slate-300 border-white/10';
  }
};

const getPriorityBadge = (priority: PriorityLevel) => {
  switch (priority) {
    case 'Urgent':
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          Urgent
        </span>
      );
    case 'Important':
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          Important
        </span>
      );
    case 'Upcoming':
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
          Upcoming
        </span>
      );
    case 'Expired':
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-500 border border-white/5">
          Expired
        </span>
      );
    default:
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-800/80 text-slate-300 border border-white/10">
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
  const eventDateObj = new Date(announcement.eventDate);
  const formattedDate = !isNaN(eventDateObj.getTime())
    ? eventDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })
    : announcement.eventDate;

  const deadlineDays = announcement.deadline
    ? Math.ceil((new Date(announcement.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div 
      onClick={() => onSelect(announcement)}
      className="group relative flex flex-col justify-between rounded-3xl glossy-panel glossy-panel-hover p-5 cursor-pointer overflow-hidden transition-all duration-300 border border-white/10"
    >
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold border ${getCategoryBadgeStyle(announcement.category)}`}>
              {announcement.category}
            </span>
            {getPriorityBadge(announcement.priority)}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => onShare(announcement, e)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => onToggleBookmark(announcement.id, e)}
              className={`p-1.5 rounded-lg transition-colors ${
                announcement.isBookmarked
                  ? 'text-amber-400 bg-amber-500/10 hover:bg-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
              }`}
              title={announcement.isBookmarked ? 'Saved' : 'Save'}
            >
              <Bookmark className="w-4 h-4" fill={announcement.isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug mb-2">
          {announcement.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {announcement.description}
        </p>

        {/* Organizer & Verification */}
        <div className="flex items-center gap-2.5 mb-3.5 pb-3 border-b border-white/[0.08]">
          {announcement.organizerAvatar ? (
            <img
              src={announcement.organizerAvatar}
              alt={announcement.organizer}
              className="w-6 h-6 rounded-full object-cover border border-amber-500/40"
              loading="lazy"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold border border-amber-500/30">
              {announcement.organizer.charAt(0)}
            </div>
          )}
          <span className="text-xs font-semibold text-slate-300 truncate max-w-[180px]">
            {announcement.organizer}
          </span>
          {announcement.verificationStatus === 'Verified' && (
            <span title="Verified Campus Organizer" className="shrink-0 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            </span>
          )}
        </div>

        {/* Date, Time & Venue */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-3">
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{announcement.startTime || '10:00 AM'}</span>
          </div>
          <div className="col-span-2 flex items-center gap-1.5 truncate text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{announcement.venue}</span>
          </div>
        </div>

        {/* Deadline alert if urgent */}
        {deadlineDays !== null && deadlineDays >= 0 && deadlineDays <= 3 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>
              Registration closes {deadlineDays === 0 ? 'today!' : `in ${deadlineDays} day${deadlineDays > 1 ? 's' : ''}!`}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-2 flex items-center justify-between border-t border-white/[0.06] mt-1">
        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
          <Users className="w-3.5 h-3.5 text-slate-500" />
          <span>{announcement.participantCount || 42} interested</span>
        </div>

        <div>
          {announcement.registered ? (
            <span className="text-xs font-bold text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
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
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-violet-600/20 hover:from-amber-500/30 hover:to-violet-600/30 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-1"
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
