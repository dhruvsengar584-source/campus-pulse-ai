import React, { useState } from 'react';
import { Announcement } from '../../types';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ExternalLink, 
  ShieldCheck, 
  Bookmark, 
  Share2, 
  AlertOctagon, 
  CheckCircle2,
  CalendarPlus,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EventModalProps {
  announcement: Announcement | null;
  onClose: () => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onRegister: (id: string) => void;
  onOpenReport: (announcement: Announcement) => void;
  onShare: (announcement: Announcement) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  announcement,
  onClose,
  onToggleBookmark,
  onRegister,
  onOpenReport,
  onShare,
}) => {
  const [isRegistering, setIsRegistering] = useState(false);

  if (!announcement) return null;

  const handleRegisterClick = () => {
    setIsRegistering(true);
    setTimeout(() => {
      onRegister(announcement.id);
      setIsRegistering(false);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#06b6d4', '#10b981'],
        });
      } catch (e) {
        console.error(e);
      }
    }, 400);
  };

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(announcement.title);
    const details = encodeURIComponent(`${announcement.description}\n\nVenue: ${announcement.venue}\nOrganizer: ${announcement.organizer}`);
    const location = encodeURIComponent(announcement.venue);
    // Simple date range
    const cleanDate = announcement.eventDate.replace(/-/g, '');
    const dates = `${cleanDate}T090000Z/${cleanDate}T170000Z`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  // Download iCal (.ics) file
  const handleDownloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Campus Pulse AI//Event Calendar//EN
BEGIN:VEVENT
SUMMARY:${announcement.title}
DESCRIPTION:${announcement.description.replace(/\n/g, '\\n')}
LOCATION:${announcement.venue}
DTSTART:${announcement.eventDate.replace(/-/g, '')}T090000
DTEND:${announcement.eventDate.replace(/-/g, '')}T170000
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${announcement.title.slice(0, 20).replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deadlineDays = announcement.deadline
    ? Math.ceil((new Date(announcement.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glossy-panel border border-white/10 shadow-2xl bg-[#090D18] p-7 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header & Close button */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {announcement.category}
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
              Priority: {announcement.priority}
            </span>
            {announcement.verificationStatus === 'Verified' ? (
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Organizer
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Community Submitted
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
          {announcement.title}
        </h2>

        {/* Organizer Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 mb-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            {announcement.organizerAvatar ? (
              <img
                src={announcement.organizerAvatar}
                alt={announcement.organizer}
                className="w-8 h-8 rounded-full object-cover border border-indigo-500/30"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-900/60 text-indigo-300 flex items-center justify-center text-sm font-bold">
                {announcement.organizer.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-xs text-slate-400">Organized by</p>
              <p className="text-sm font-semibold text-slate-200">{announcement.organizer}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onShare(announcement)}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => onToggleBookmark(announcement.id, e)}
              className={`p-2 rounded-lg transition-colors ${
                announcement.isBookmarked
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
              }`}
              title="Bookmark"
            >
              <Bookmark className="w-4 h-4" fill={announcement.isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Key Event Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Event Date</p>
              <p className="text-sm font-medium text-slate-200">{announcement.eventDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Timing</p>
              <p className="text-sm font-medium text-slate-200">{announcement.startTime || '10:00 AM'} - {announcement.endTime || '05:00 PM'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:col-span-2">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Venue</p>
              <p className="text-sm font-medium text-slate-200">{announcement.venue}</p>
            </div>
          </div>
        </div>

        {/* Deadline Banner */}
        {announcement.deadline && (
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 mb-5">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-xs font-semibold text-amber-300">Registration Deadline: </span>
                <span className="text-xs text-slate-200">{announcement.deadline}</span>
              </div>
            </div>
            {deadlineDays !== null && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${deadlineDays <= 2 ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'}`}>
                {deadlineDays <= 0 ? 'Closing Today' : `${deadlineDays} days remaining`}
              </span>
            )}
          </div>
        )}

        {/* Description */}
        <div className="mb-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Announcement Details</h4>
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {announcement.description}
          </p>
        </div>

        {/* Eligibility & Tags */}
        <div className="mb-6 space-y-3">
          {announcement.eligibility && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Eligibility Criteria</h4>
              <p className="text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-800/80">
                {announcement.eligibility}
              </p>
            </div>
          )}

          {announcement.tags && announcement.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-2">
              <span className="text-xs text-slate-500 font-medium">Tags:</span>
              {announcement.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Source & Trust Verification Footer */}
        <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 mb-6 flex items-start gap-2.5 text-xs text-slate-400">
          <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p>
              <strong className="text-slate-300">Source:</strong> {announcement.source} ({announcement.sourceType})
            </p>
            <p className="text-[11px] text-slate-500">
              Extracted & structured by Campus Pulse AI Intelligence Engine.
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadIcs}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Download .ics file"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-indigo-400" />
              <span>Export .ICS</span>
            </button>
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>Google Cal</span>
            </a>
            <button
              type="button"
              onClick={() => onOpenReport(announcement)}
              className="px-2.5 py-2 text-xs text-rose-400/80 hover:text-rose-300 flex items-center gap-1"
              title="Report inaccuracy"
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Report</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {announcement.registrationUrl && (
              <a
                href={announcement.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
              >
                <span>Portal Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {announcement.registered ? (
              <div className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-emerald-500/20 text-emerald-300 font-bold text-sm border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
                <span>You are Registered!</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleRegisterClick}
                disabled={isRegistering}
                className="px-6 py-2.5 rounded-2xl glossy-button-gold text-slate-950 font-black text-sm shadow-xl flex items-center gap-2"
              >
                <span>{isRegistering ? 'Registering...' : 'Quick RSVP / Register'}</span>
                <Users className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
