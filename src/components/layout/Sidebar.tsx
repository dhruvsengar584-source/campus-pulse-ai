import React from 'react';
import { 
  LayoutDashboard, 
  Rss, 
  Cpu, 
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
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'feed', label: 'Campus Feed', icon: Rss, badge: urgentCount > 0 ? `${urgentCount} new` : undefined },
    { id: 'parser', label: 'AI Notice Parser', icon: Cpu, highlight: true },
    { id: 'calendar', label: 'Smart Calendar', icon: CalendarDays },
    { id: 'briefing', label: 'Weekly Briefing', icon: Compass },
    { id: 'saved', label: 'Saved Notices', icon: BookmarkCheck, count: savedCount },
    { id: 'profile', label: 'Student Profile', icon: UserCheck },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col justify-between border-r border-slate-800/80 bg-[#0A0E18] min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-6">
        {/* Navigation list */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
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
                    ? 'bg-gradient-to-r from-indigo-600/20 to-indigo-500/10 text-indigo-300 border border-indigo-500/30'
                    : item.highlight
                    ? 'text-cyan-300 hover:bg-cyan-950/30 border border-cyan-500/20 hover:border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : item.highlight ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                    {item.badge}
                  </span>
                )}
                {item.count !== undefined && item.count > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                    {item.count}
                  </span>
                )}
                {item.highlight && !isActive && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Admin Navigation */}
        <div className="pt-4 border-t border-slate-800/80">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Governance
          </p>
          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'admin'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-amber-300 hover:bg-slate-900/60'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Admin Center</span>
          </button>
        </div>
      </div>

      {/* Pulse Status Widget */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 text-xs">
        <div className="flex items-center gap-2 text-indigo-400 mb-1.5 font-bold">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Campus Pulse Sync</span>
        </div>
        <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
          Listening to 18 campus clubs, WhatsApp channels & official ERP portals.
        </p>
        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <span>Active Feed</span>
          <span className="text-emerald-400 font-mono font-semibold">● 100% OPERATIONAL</span>
        </div>
      </div>
    </aside>
  );
};
