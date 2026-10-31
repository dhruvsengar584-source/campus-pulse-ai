import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Sparkles, 
  CalendarPlus, 
  ExternalLink,
  AlertTriangle,
  Users
} from 'lucide-react';
import { Announcement } from '../types';

interface CalendarPageProps {
  announcements: Announcement[];
  onSelectAnnouncement: (announcement: Announcement) => void;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({
  announcements,
  onSelectAnnouncement,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [viewMode, setViewMode] = useState<'month' | 'agenda'>('month');

  // Month details
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Compute days in month
  const daysInMonth = useMemo(() => {
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
    const days: { dateStr: string; dayNumber: number; isCurrentMonth: boolean }[] = [];

    // Previous month padding
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const prevDate = new Date(year, month - 1, d);
      days.push({
        dateStr: prevDate.toISOString().split('T')[0],
        dayNumber: d,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      const curDate = new Date(year, month, d);
      days.push({
        dateStr: curDate.toISOString().split('T')[0],
        dayNumber: d,
        isCurrentMonth: true,
      });
    }

    // Next month padding to fill 35 or 42 cells
    const remaining = 35 - days.length >= 0 ? 35 - days.length : 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const nextDate = new Date(year, month + 1, d);
      days.push({
        dateStr: nextDate.toISOString().split('T')[0],
        dayNumber: d,
        isCurrentMonth: false,
      });
    }

    return days;
  }, [year, month]);

  // Map events to date strings
  const eventsByDate = useMemo(() => {
    const map = new Map<string, Announcement[]>();
    for (const ann of announcements) {
      if (ann.eventDate) {
        const list = map.get(ann.eventDate) || [];
        list.push(ann);
        map.set(ann.eventDate, list);
      }
    }
    return map;
  }, [announcements]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDateStr(today.toISOString().split('T')[0]);
  };

  // Events on selected day
  const selectedDayEvents = eventsByDate.get(selectedDateStr) || [];

  // Upcoming deadlines in the next 14 days
  const upcomingDeadlines = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return announcements
      .filter((a) => a.deadline && a.deadline >= today)
      .sort((a, b) => (a.deadline || '').localeCompare(b.deadline || ''))
      .slice(0, 5);
  }, [announcements]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Hackathons': return 'bg-purple-500';
      case 'Workshops': return 'bg-indigo-500';
      case 'Internships':
      case 'Placements': return 'bg-emerald-500';
      case 'Cultural Events': return 'bg-pink-500';
      case 'Academic Notices': return 'bg-amber-500';
      case 'Scholarships': return 'bg-cyan-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1 font-semibold text-xs">
            <CalendarIcon className="w-4 h-4" />
            <span>Interactive Academic Schedule</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Smart Campus Calendar</h1>
        </div>

        {/* Month Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToday}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors"
          >
            Today
          </button>
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 text-xs font-bold text-white min-w-[130px] text-center">
              {monthName}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Calendar View + Side Agenda (8 cols + 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Calendar Grid (8 cols) */}
        <div className="lg:col-span-8 p-5 rounded-3xl glass-panel border border-slate-800">
          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <span key={d} className="text-xs font-bold text-slate-500 py-1 uppercase tracking-wider">
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {daysInMonth.map((day, idx) => {
              const dayEvents = eventsByDate.get(day.dateStr) || [];
              const isSelected = selectedDateStr === day.dateStr;
              const isToday = day.dateStr === new Date().toISOString().split('T')[0];

              return (
                <div
                  key={`${day.dateStr}-${idx}`}
                  onClick={() => setSelectedDateStr(day.dateStr)}
                  className={`min-h-[85px] sm:min-h-[100px] p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/60 shadow-lg shadow-indigo-950'
                      : day.isCurrentMonth
                      ? 'bg-slate-900/60 hover:bg-slate-800/60 border-slate-800/80'
                      : 'bg-slate-950/40 border-slate-900/50 text-slate-600 opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center ${
                        isToday
                          ? 'bg-indigo-600 text-white font-bold'
                          : isSelected
                          ? 'text-indigo-300 font-bold'
                          : day.isCurrentMonth
                          ? 'text-slate-300'
                          : 'text-slate-600'
                      }`}
                    >
                      {day.dayNumber}
                    </span>

                    {dayEvents.length > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>

                  {/* Event Badges preview on day */}
                  <div className="space-y-1 mt-1">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectAnnouncement(ev);
                        }}
                        className="text-[10px] font-medium p-1 rounded bg-slate-800/90 hover:bg-indigo-900/60 text-slate-200 truncate border border-slate-700/60 flex items-center gap-1 transition-colors"
                        title={ev.title}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${getCategoryColor(ev.category)}`} />
                        <span className="truncate">{ev.title}</span>
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[9px] text-slate-500 block text-right">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Calendar Category Legend */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center gap-3 flex-wrap text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Category Legend:</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Hackathons</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Workshops</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Placements & Internships</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Exams & Notices</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-pink-500"></span> Cultural</span>
          </div>
        </div>

        {/* Side Agenda: Selected Date Events + Upcoming Deadlines (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Selected Date Agenda */}
          <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Selected Date</span>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  {new Date(selectedDateStr).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 font-semibold">
                {selectedDayEvents.length} Events
              </span>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {selectedDayEvents.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => onSelectAnnouncement(ev)}
                  className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300">
                      {ev.category}
                    </span>
                    <span className="text-slate-400">{ev.startTime || '10:00 AM'}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 line-clamp-1 mb-1">
                    {ev.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate">{ev.venue}</span>
                  </div>
                </div>
              ))}

              {selectedDayEvents.length === 0 && (
                <div className="py-8 text-center text-slate-400">
                  <p className="text-xs">No events scheduled on this day.</p>
                  <p className="text-[11px] text-slate-500 mt-1">Select a date with a numbered badge to view schedule.</p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Deadlines Widget */}
          <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Clock className="w-4 h-4 text-rose-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Action Deadlines Countdown
              </h3>
            </div>

            <div className="space-y-2.5">
              {upcomingDeadlines.map((item) => {
                const diffDays = Math.ceil(
                  (new Date(item.deadline!).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                );
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectAnnouncement(item)}
                    className="p-3 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800/80 cursor-pointer transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="truncate">
                      <p className="text-xs font-semibold text-slate-200 truncate">{item.title}</p>
                      <p className="text-[10px] text-slate-400">{item.organizer}</p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-md shrink-0 ${
                        diffDays <= 2
                          ? 'bg-rose-500/20 text-rose-300 animate-pulse border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {diffDays === 0 ? 'Today' : `${diffDays}d left`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
