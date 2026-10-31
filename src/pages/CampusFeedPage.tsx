import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Flame, 
  SlidersHorizontal, 
  Calendar, 
  Clock, 
  Check, 
  RotateCcw,
  LayoutGrid,
  List
} from 'lucide-react';
import { Announcement, AnnouncementCategory, PriorityLevel } from '../types';
import { EventCard } from '../components/shared/EventCard';

interface CampusFeedPageProps {
  announcements: Announcement[];
  onSelectAnnouncement: (announcement: Announcement) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onShare: (announcement: Announcement, e: React.MouseEvent) => void;
  onRegisterQuick: (id: string, e: React.MouseEvent) => void;
}

const CATEGORIES: AnnouncementCategory[] = [
  'Hackathons',
  'Workshops',
  'Internships',
  'Placements',
  'Cultural Events',
  'Academic Notices',
  'Scholarships',
  'Competitions',
  'Sports',
  'Club Activities',
  'General Announcements',
];

export const CampusFeedPage: React.FC<CampusFeedPageProps> = ({
  announcements,
  onSelectAnnouncement,
  onToggleBookmark,
  onShare,
  onRegisterQuick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'recent' | 'priority' | 'popular'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: announcements.length };
    for (const ann of announcements) {
      counts[ann.category] = (counts[ann.category] || 0) + 1;
    }
    return counts;
  }, [announcements]);

  // Filtered and sorted announcements
  const filteredAnnouncements = useMemo(() => {
    return announcements
      .filter((ann) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = ann.title.toLowerCase().includes(q);
          const matchDesc = ann.description.toLowerCase().includes(q);
          const matchOrg = ann.organizer.toLowerCase().includes(q);
          const matchVenue = ann.venue.toLowerCase().includes(q);
          const matchTags = ann.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchOrg && !matchVenue && !matchTags) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'All' && ann.category !== selectedCategory) {
          return false;
        }

        // Priority filter
        if (selectedPriority !== 'All' && ann.priority !== selectedPriority) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
        }
        if (sortBy === 'recent') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'priority') {
          const rank: Record<PriorityLevel, number> = {
            Urgent: 1,
            Important: 2,
            Upcoming: 3,
            Normal: 4,
            Expired: 5,
          };
          return (rank[a.priority] || 4) - (rank[b.priority] || 4);
        }
        if (sortBy === 'popular') {
          return (b.participantCount || 0) - (a.participantCount || 0);
        }
        return 0;
      });
  }, [announcements, searchQuery, selectedCategory, selectedPriority, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPriority('All');
    setSortBy('date');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Feed Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Campus Discovery Feed</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Explore authentic events, deadlines, workshops & recruitment circulars across all college departments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">
            Showing <strong className="text-white">{filteredAnnouncements.length}</strong> of {announcements.length} notices
          </span>
        </div>
      </div>

      {/* Search and Sort Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by title, organizer, keywords (e.g. Google, hackathon, placement, scholarship)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-slate-100 text-xs focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Priority & Sorting Selectors */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-white/10 text-xs">
            <span className="text-slate-400 pl-2">Priority:</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-transparent text-amber-300 text-xs focus:outline-none pr-2 cursor-pointer font-bold"
            >
              <option value="All" className="bg-[#0B0E17]">All</option>
              <option value="Urgent" className="bg-[#0B0E17]">Urgent Only</option>
              <option value="Important" className="bg-[#0B0E17]">Important</option>
              <option value="Upcoming" className="bg-[#0B0E17]">Upcoming</option>
              <option value="Expired" className="bg-[#0B0E17]">Expired</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-white/10 text-xs">
            <span className="text-slate-400 pl-2">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none pr-2 cursor-pointer font-medium"
            >
              <option value="date" className="bg-[#0B0E17]">Event Date (Earliest)</option>
              <option value="priority" className="bg-[#0B0E17]">Priority (Urgent First)</option>
              <option value="recent" className="bg-[#0B0E17]">Recently Added</option>
              <option value="popular" className="bg-[#0B0E17]">Most Interested</option>
            </select>
          </div>

          {(searchQuery || selectedCategory !== 'All' || selectedPriority !== 'All') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-amber-400 text-xs transition-colors flex items-center gap-1 border border-white/10"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedCategory('All')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            selectedCategory === 'All'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <span>All Categories</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900 text-slate-300">
            {categoryCounts.All}
          </span>
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <span>{cat}</span>
            {categoryCounts[cat] !== undefined && categoryCounts[cat] > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900 text-slate-300">
                {categoryCounts[cat]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAnnouncements.map((ann) => (
          <EventCard
            key={ann.id}
            announcement={ann}
            onSelect={onSelectAnnouncement}
            onToggleBookmark={onToggleBookmark}
            onShare={onShare}
            onRegisterQuick={onRegisterQuick}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredAnnouncements.length === 0 && (
        <div className="py-16 text-center rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">No Matching Campus Announcements</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any notices matching your selected category, search query, or priority filter.
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors"
          >
            Clear Filters & View All
          </button>
        </div>
      )}
    </div>
  );
};
