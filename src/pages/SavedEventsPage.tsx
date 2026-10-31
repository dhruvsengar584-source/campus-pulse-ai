import React, { useState } from 'react';
import { 
  Bookmark, 
  ArrowRight, 
  FileText, 
  Save, 
  Check, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Edit3 
} from 'lucide-react';
import { Announcement } from '../types';
import { AnnouncementService } from '../services/announcementService';

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
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>('');
  const [savedSuccessId, setSavedSuccessId] = useState<string | null>(null);

  const handleOpenNoteEdit = (ann: Announcement, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingNoteId(ann.id);
    setNoteText(ann.notes || '');
  };

  const handleSaveNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    AnnouncementService.updateAnnouncement(id, { notes: noteText });
    setEditingNoteId(null);
    setSavedSuccessId(id);
    setTimeout(() => setSavedSuccessId(null), 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1 font-semibold text-xs">
            <Bookmark className="w-4 h-4" />
            <span>Personal Watchlist & Notes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Saved Opportunities</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Keep track of upcoming hackathons, placement assessments, and add private study/preparation notes.
          </p>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 font-semibold border border-indigo-500/20 self-start sm:self-auto">
          {savedAnnouncements.length} Saved Opportunities
        </span>
      </div>

      {/* Grid with Private Notes Feature */}
      {savedAnnouncements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedAnnouncements.map((ann) => (
            <div
              key={ann.id}
              onClick={() => onSelectAnnouncement(ann)}
              className="p-5 rounded-2xl glass-panel glass-panel-hover border border-slate-800 flex flex-col justify-between cursor-pointer space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium">
                    {ann.category}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => onToggleBookmark(ann.id, e)}
                    className="p-1 rounded text-indigo-400 hover:text-slate-400"
                    title="Remove from saved"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <h3 className="text-sm font-bold text-white hover:text-indigo-300 line-clamp-2 mb-2">
                  {ann.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{ann.eventDate}</span>
                  <span>•</span>
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate">{ann.venue}</span>
                </div>

                {/* Private Student Notes Box */}
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-cyan-400" />
                      Private Student Note
                    </span>
                    {editingNoteId !== ann.id && (
                      <button
                        type="button"
                        onClick={(e) => handleOpenNoteEdit(ann, e)}
                        className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
                      >
                        <Edit3 className="w-2.5 h-2.5" />
                        <span>{ann.notes ? 'Edit' : '+ Add Note'}</span>
                      </button>
                    )}
                  </div>

                  {editingNoteId === ann.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="e.g. Prepare resume by Thursday, team squad: Priya & Rohan..."
                        className="w-full text-xs p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-indigo-500 resize-none h-16"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingNoteId(null)}
                          className="px-2 py-1 text-[11px] text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleSaveNote(ann.id, e)}
                          className="px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm"
                        >
                          <Save className="w-3 h-3" />
                          <span>Save Note</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-300 italic">
                      {ann.notes || 'No private notes added yet. Click "+ Add Note" to jot down team members or prep steps.'}
                    </p>
                  )}

                  {savedSuccessId === ann.id && (
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 pt-1">
                      <Check className="w-3 h-3" />
                      <span>Note saved!</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate max-w-[140px]">{ann.organizer}</span>
                <span className="text-indigo-400 font-semibold">View Notice Details →</span>
              </div>
            </div>
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
              Click the bookmark icon on any campus announcement in the Feed or Dashboard to save it here with private preparation notes.
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
