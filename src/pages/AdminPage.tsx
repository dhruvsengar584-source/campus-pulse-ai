import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertOctagon, 
  TrendingUp, 
  FileText, 
  Users, 
  Clock, 
  ExternalLink, 
  Filter, 
  X,
  Sparkles,
  Award,
  BarChart3,
  Check,
  Ban
} from 'lucide-react';
import { Announcement, AnnouncementCategory, PriorityLevel, ReportItem } from '../types';

interface AdminPageProps {
  announcements: Announcement[];
  reports: ReportItem[];
  onApproveNotice: (id: string) => void;
  onDeleteNotice: (id: string) => void;
  onResolveReport: (reportId: string, status: 'Resolved' | 'Dismissed') => void;
  onCreateOfficialAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt'>) => void;
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

interface OrganizerChapter {
  id: string;
  name: string;
  category: string;
  department: string;
  isVerified: boolean;
  noticesPublished: number;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  announcements,
  reports,
  onApproveNotice,
  onDeleteNotice,
  onResolveReport,
  onCreateOfficialAnnouncement,
}) => {
  const [activeTab, setActiveTab] = useState<'queue' | 'all' | 'reports' | 'organizers' | 'analytics'>('queue');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state for creating official announcement
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<AnnouncementCategory>('Academic Notices');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('10:00 AM');
  const [endTime, setEndTime] = useState('05:00 PM');
  const [venue, setVenue] = useState('Academic Main Hall');
  const [organizer, setOrganizer] = useState('Office of Campus Dean');
  const [registrationUrl, setRegistrationUrl] = useState('');
  const [eligibility, setEligibility] = useState('All registered campus students');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('Important');

  // Campus clubs state for Organizer Verification tab
  const [organizers, setOrganizers] = useState<OrganizerChapter[]>([
    { id: 'org-1', name: 'Google Developer Student Clubs (GDSC)', category: 'Technical Society', department: 'CS & IT', isVerified: true, noticesPublished: 12 },
    { id: 'org-2', name: 'ACM Student Chapter', category: 'Computing Society', department: 'CS & Engineering', isVerified: true, noticesPublished: 8 },
    { id: 'org-3', name: 'Training & Placement Cell (T&P)', category: 'Administrative Cell', department: 'University-wide', isVerified: true, noticesPublished: 24 },
    { id: 'org-4', name: 'Student Cultural Council (SCC)', category: 'Cultural Council', department: 'Student Welfare', isVerified: true, noticesPublished: 15 },
    { id: 'org-5', name: 'Robotics & Automation Society (RAS)', category: 'Technical Society', department: 'Mechanical & ECE', isVerified: true, noticesPublished: 6 },
    { id: 'org-6', name: 'Campus Design Collective (CDC)', category: 'Design Club', department: 'Architecture & Design', isVerified: true, noticesPublished: 5 },
    { id: 'org-7', name: 'Unofficial Campus Meme Forwarders', category: 'Informal Student Group', department: 'General', isVerified: false, noticesPublished: 2 },
  ]);

  const toggleOrganizerVerification = (id: string) => {
    setOrganizers((prev) =>
      prev.map((org) => (org.id === id ? { ...org, isVerified: !org.isVerified } : org))
    );
  };

  // Computed metrics
  const pendingApprovals = announcements.filter(
    (a) => a.verificationStatus === 'Community Submitted' || a.verificationStatus === 'Pending Review'
  );
  const pendingReports = reports.filter((r) => r.status === 'Pending');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateOfficialAnnouncement({
      title,
      description,
      category,
      eventDate,
      startTime,
      endTime,
      venue,
      organizer,
      registrationUrl,
      eligibility,
      deadline,
      priority,
      source: 'Official Campus Administration Portal',
      sourceType: 'Admin Notice',
      verificationStatus: 'Verified',
      tags: [category.toLowerCase(), 'official-admin'],
      isBookmarked: false,
      participantCount: 1,
    });

    setShowCreateModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-1 font-semibold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Campus Administrative Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Administration & Governance</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Review community notices, verify campus organizers, manage accuracy reports, and publish official circulars.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-2xl glossy-button-gold text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Publish Official Notice</span>
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-slate-800">
          <p className="text-xs font-semibold text-slate-400">Total Active Notices</p>
          <p className="text-2xl font-extrabold text-white font-mono mt-1">{announcements.length}</p>
          <p className="text-[11px] text-emerald-400 mt-1">Across 11 categories</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-amber-500/30">
          <p className="text-xs font-semibold text-amber-300">Pending Approval Queue</p>
          <p className="text-2xl font-extrabold text-amber-400 font-mono mt-1">{pendingApprovals.length}</p>
          <p className="text-[11px] text-amber-200/80 mt-1">Requires admin review</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800">
          <p className="text-xs font-semibold text-slate-400">Verified Organizers</p>
          <p className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">
            {organizers.filter((o) => o.isVerified).length} Chapters
          </p>
          <p className="text-[11px] text-slate-400 mt-1">GDSC, ACM, T&P, SCC</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-rose-500/30">
          <p className="text-xs font-semibold text-rose-300">Reported Flags</p>
          <p className="text-2xl font-extrabold text-rose-400 font-mono mt-1">{pendingReports.length}</p>
          <p className="text-[11px] text-rose-200/80 mt-1">Crowdsourced issues</p>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('queue')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'queue'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Approval Queue</span>
          {pendingApprovals.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
              {pendingApprovals.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All Announcements ({announcements.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('organizers')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'organizers'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Organizer Verification</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'reports'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Reported Inaccuracies</span>
          {pendingReports.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-bold text-[10px]">
              {pendingReports.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'analytics'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Platform Analytics</span>
        </button>
      </div>

      {/* Tab 1: Approval Queue */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          {pendingApprovals.length > 0 ? (
            <div className="space-y-3">
              {pendingApprovals.map((ann) => (
                <div
                  key={ann.id}
                  className="p-5 rounded-2xl glass-panel border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        {ann.category}
                      </span>
                      <span className="text-xs text-slate-400">Date: {ann.eventDate}</span>
                      <span className="text-xs text-slate-400">• Venue: {ann.venue}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white">{ann.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {ann.description}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                      <span>Source: <strong className="text-slate-300">{ann.source}</strong></span>
                      <span>Organizer: <strong className="text-slate-300">{ann.organizer}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onApproveNotice(ann.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve & Verify</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteNotice(ann.id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                      title="Reject and Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center rounded-2xl glass-panel border border-slate-800 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-bold text-white">Approval Queue is Clear!</h3>
              <p className="text-xs text-slate-400">All submitted campus notices have been verified and processed.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: All Announcements Table */}
      {activeTab === 'all' && (
        <div className="rounded-2xl glass-panel border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Announcement</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Event Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Priority</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {announcements.map((ann) => (
                  <tr key={ann.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-3.5 max-w-xs">
                      <p className="font-semibold text-white truncate">{ann.title}</p>
                      <p className="text-[11px] text-slate-400 truncate">{ann.organizer}</p>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">{ann.category}</td>
                    <td className="p-3.5 whitespace-nowrap">{ann.eventDate}</td>
                    <td className="p-3.5 whitespace-nowrap">
                      {ann.verificationStatus === 'Verified' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                          Verified
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                          {ann.verificationStatus}
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ann.priority === 'Urgent' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {ann.priority}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onDeleteNotice(ann.id)}
                        className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-slate-800"
                        title="Delete Announcement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Organizer Verification Management */}
      {activeTab === 'organizers' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>
                <strong>Trust Layer:</strong> Verified organizers receive a blue shield badge and can publish without manual moderation queue.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {organizers.map((org) => (
              <div
                key={org.id}
                className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{org.name}</h3>
                    {org.isVerified && (
                      <span title="Verified" className="shrink-0">
                        <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{org.category} • {org.department}</p>
                  <p className="text-[11px] text-slate-500">{org.noticesPublished} announcements published</p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleOrganizerVerification(org.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    org.isVerified
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-emerald-600/20'
                  }`}
                >
                  {org.isVerified ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </>
                  ) : (
                    <span>Verify Chapter</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Reported Inaccuracies Queue */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {reports.length > 0 ? (
            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-5 rounded-2xl glass-panel border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 text-rose-400" />
                      <span className="text-xs font-bold text-rose-300">Reported Notice Issue</span>
                      <span className="text-[10px] text-slate-500">{report.timestamp}</span>
                    </div>
                    <p className="text-xs font-semibold text-white">
                      Notice: "{report.announcementTitle}"
                    </p>
                    <p className="text-xs text-rose-200/90 bg-rose-950/30 p-2.5 rounded-lg border border-rose-500/20">
                      Reason: {report.reason}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onResolveReport(report.id, 'Resolved')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                    >
                      Mark Resolved
                    </button>
                    <button
                      type="button"
                      onClick={() => onResolveReport(report.id, 'Dismissed')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center rounded-2xl glass-panel border border-slate-800 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-bold text-white">No Flagged Reports</h3>
              <p className="text-xs text-slate-400">All campus announcements have verified data accuracy.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Platform Analytics & Distribution */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-2">
              <p className="text-xs text-slate-400">Total Student RSVPs</p>
              <p className="text-2xl font-extrabold text-white font-mono">1,420</p>
              <p className="text-[11px] text-emerald-400">+28% growth this semester</p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-2">
              <p className="text-xs text-slate-400">Average Notice Parsing Time</p>
              <p className="text-2xl font-extrabold text-cyan-400 font-mono">0.82s</p>
              <p className="text-[11px] text-slate-400">Powered by Gemini 2.5 Flash</p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-2">
              <p className="text-xs text-slate-400">Information Accuracy Score</p>
              <p className="text-2xl font-extrabold text-indigo-400 font-mono">99.4%</p>
              <p className="text-[11px] text-emerald-400">Based on verified sources</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Announcement Ingestion Channels</h3>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>WhatsApp Student Channels & Forwards</span>
                  <span className="font-mono text-emerald-400">42% (68 notices)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Official University Portal Circulars</span>
                  <span className="font-mono text-indigo-400">31% (50 notices)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '31%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Department Faculty Broadcasts</span>
                  <span className="font-mono text-cyan-400">18% (29 notices)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: '18%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Club Posters & Social Media Captions</span>
                  <span className="font-mono text-pink-400">9% (15 notices)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-pink-500 h-full rounded-full" style={{ width: '9%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Official Announcement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div 
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel border border-amber-500/30 bg-[#0F172A] p-6 text-slate-100 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-amber-400">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Publish Official Notice</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. End Semester Theory Examination Schedule 2026"
                  required
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Full circular details, instructions, or timetable notice..."
                  rows={3}
                  required
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as AnnouncementCategory)}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Priority:</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="Important">Important</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Event Date:</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Deadline:</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Venue:</label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Official Organizer:</label>
                  <input
                    type="text"
                    value={organizer}
                    onChange={(e) => setOrganizer(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Registration / Circular URL:</label>
                  <input
                    type="url"
                    value={registrationUrl}
                    onChange={(e) => setRegistrationUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-lg shadow-amber-600/30 transition-all flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Publish Official Circular</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
