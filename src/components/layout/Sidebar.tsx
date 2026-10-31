import React from 'react';
import { 
  LayoutDashboard, 
  Rss, 
  Zap, 
  CalendarDays, 
  Compass, 
  BookmarkCheck, 
  ShieldAlert, 
  UserCheck, 
  Flame
} from 'lucide-react';
import { StudentProfile } from '../../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  student: StudentProfile;
  savedCount: number;
  urgentCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  student,
  savedCount,
  urgentCount,
}) => {
  const mainNav = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'feed', label: 'Campus Feed', icon: Rss, badge: urgentCount > 0 ? `${urgentCount} urgent` : undefined },
    { id: 'parser', label: 'AI Notice Parser', icon: Zap, highlight: true },
    { id: 'calendar', label: 'Smart Calendar', icon: CalendarDays },
    { id: 'briefing', label: 'Weekly Briefing', icon: Compass },
    { id: 'saved', label: 'Saved Notices', icon: BookmarkCheck, count: savedCount },
    { id: 'profile', label: 'Student Profile', icon: UserCheck },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col justify-between border-r border-white/[0.08] bg-[#070912] min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-6">
        {/* Navigation list */}
        <div className="space-y-1.5">
          <p className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
            Campus Hub
          </p>
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-violet-600/15 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-500/10'
                    : item.highlight
                    ? 'text-amber-400 hover:bg-amber-950/20 border border-amber-500/20 hover:border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : item.highlight ? 'text-amber-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30 animate-pulse">
                    {item.badge}
                  </span>
                )}
                {item.count !== undefined && item.count > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium border border-white/5">
                    {item.count}
                  </span>
                )}
                {item.highlight && !isActive && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-black">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Admin Navigation */}
        <div className="pt-4 border-t border-white/[0.08]">
          <p className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
            Governance
          </p>
          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'admin'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-amber-300 hover:bg-white/[0.04]'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Admin Center</span>
          </button>
        </div>
      </div>

      {/* Pulse Status Widget */}
      <div className="p-4 rounded-2xl glossy-card-gold text-xs space-y-2">
        <div className="flex items-center gap-2 text-amber-300 font-bold">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Campus Pulse Sync</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Listening to 18 campus clubs, WhatsApp channels & official portals.
        </p>
        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-amber-500/20">
          <span>Active Intelligence</span>
          <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            LIVE
          </span>
        </div>
      </div>
    </aside>
  );
};
