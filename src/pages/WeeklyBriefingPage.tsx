import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Download, 
  Clock, 
  Briefcase, 
  Calendar, 
  Printer
} from 'lucide-react';
import { Announcement, StudentProfile, WeeklyBriefing } from '../types';
import { GeminiService } from '../services/geminiService';

interface WeeklyBriefingPageProps {
  student: StudentProfile;
  announcements: Announcement[];
  onSelectAnnouncement: (announcement: Announcement) => void;
}

export const WeeklyBriefingPage: React.FC<WeeklyBriefingPageProps> = ({
  student,
  announcements,
  onSelectAnnouncement,
}) => {
  const [briefing, setBriefing] = useState<WeeklyBriefing | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateBriefing = async () => {
    setIsGenerating(true);
    try {
      const data = await GeminiService.generateWeeklyBriefing(student, announcements);
      setBriefing(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateBriefing();
  }, [student, announcements]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1 font-semibold text-xs">
            <Compass className="w-4 h-4" />
            <span>AI Campus Intelligence Report</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Weekly AI Briefing</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            "What do I need to know this week?" — Synthesized specifically for {student.department} ({student.year}).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-2 rounded-xl glass-panel hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export / Print</span>
          </button>

          <button
            type="button"
            onClick={generateBriefing}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl glossy-button-gold text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Synthesizing...' : 'Regenerate Briefing'}</span>
          </button>
        </div>
      </div>

      {briefing && (
        <div className="space-y-6">
          {/* Executive Overview Banner */}
          <div className="p-6 sm:p-8 rounded-3xl glossy-panel border border-amber-500/30 shadow-2xl space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-amber-300">
              <span className="flex items-center gap-2 font-black tracking-wider uppercase">
                <Sparkles className="w-4 h-4 text-amber-400" />
                EXECUTIVE INTELLIGENCE SYNTHESIS
              </span>
              <span className="font-mono text-slate-400">{briefing.generatedAt}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {briefing.headline}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {briefing.summary}
            </p>
          </div>

          {/* 2-Column Intelligence Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Urgent Deadlines Closing This Week */}
            <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-rose-400">
                  <AlertTriangle className="w-4 h-4" />
                  <h3 className="text-sm font-bold text-white">Strict Registration Deadlines</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
                  Action Required
                </span>
              </div>

              <div className="space-y-3">
                {briefing.urgentDeadlines.map((item) => {
                  const ann = announcements.find((a) => a.id === item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => ann && onSelectAnnouncement(ann)}
                      className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                    >
                      <div>
                        <span className="text-[10px] font-semibold text-rose-400 block mb-0.5">
                          Deadline: {item.date}
                        </span>
                        <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 line-clamp-1">
                          {item.title}
                        </h4>
                      </div>

                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-lg bg-indigo-600/30 group-hover:bg-indigo-600 text-indigo-300 group-hover:text-white text-xs font-semibold shrink-0 transition-colors"
                      >
                        {item.action}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Top Career & Technical Recommendations */}
            <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Briefcase className="w-4 h-4" />
                  <h3 className="text-sm font-bold text-white">Personalized Top Opportunities</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                  Profile Matched
                </span>
              </div>

              <div className="space-y-3">
                {briefing.topPicks.map((pick) => {
                  const ann = announcements.find((a) => a.id === pick.id);
                  return (
                    <div
                      key={pick.id}
                      onClick={() => ann && onSelectAnnouncement(ann)}
                      className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="px-2 py-0.2 rounded bg-purple-500/20 text-purple-300 font-semibold">
                          {pick.category}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 line-clamp-1 mb-1">
                        {pick.title}
                      </h4>
                      <p className="text-[11px] text-indigo-300/90 leading-tight">
                        ✨ {pick.reason}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Action Checklist for the Week */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Recommended Weekly Action Checklist</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {briefing.actionChecklist.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
