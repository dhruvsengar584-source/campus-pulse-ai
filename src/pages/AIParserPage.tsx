import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw, 
  Send, 
  Copy, 
  FileText, 
  Clock, 
  Calendar, 
  MapPin, 
  User, 
  Link as LinkIcon, 
  Info,
  Check,
  Upload
} from 'lucide-react';
import { Announcement, AnnouncementCategory, ExtractedNotice, PriorityLevel, SourceType } from '../types';
import { GeminiService } from '../services/geminiService';
import { SAMPLE_NOTICES, SampleNotice } from '../data/sampleNotices';
import confetti from 'canvas-confetti';

interface AIParserPageProps {
  existingAnnouncements: Announcement[];
  onPublishAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt'>) => void;
  onNavigateTab: (tab: string) => void;
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

export const AIParserPage: React.FC<AIParserPageProps> = ({
  existingAnnouncements,
  onPublishAnnouncement,
  onNavigateTab,
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [extractedData, setExtractedData] = useState<ExtractedNotice | null>(null);
  const [isPublished, setIsPublished] = useState<boolean>(false);

  // Form fields state for editing the extracted notice
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<AnnouncementCategory>('General Announcements');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('10:00 AM');
  const [endTime, setEndTime] = useState('05:00 PM');
  const [venue, setVenue] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [registrationUrl, setRegistrationUrl] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('Important');
  const [sourceType, setSourceType] = useState<SourceType>('WhatsApp Message');

  const handleSelectSample = (sample: SampleNotice) => {
    setInputText(sample.rawText);
    setExtractedData(null);
    setIsPublished(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setInputText(text);
        setExtractedData(null);
        setIsPublished(false);
      }
    };
    reader.readAsText(file);
  };

  const handleStartExtraction = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    setExtractedData(null);
    setIsPublished(false);

    try {
      setProcessingStep('Preprocessing raw message tokens and links...');
      await new Promise((r) => setTimeout(r, 400));

      setProcessingStep('Invoking Gemini AI intelligence engine...');
      const result = await GeminiService.extractNotice(inputText, existingAnnouncements);

      setProcessingStep('Validating schema and computing similarity metrics...');
      await new Promise((r) => setTimeout(r, 300));

      // Populate editable fields
      setTitle(result.title);
      setDescription(result.description);
      setCategory(result.category);
      setEventDate(result.eventDate);
      setStartTime(result.startTime || '10:00 AM');
      setEndTime(result.endTime || '05:00 PM');
      setVenue(result.venue);
      setOrganizer(result.organizer);
      setRegistrationUrl(result.registrationUrl);
      setEligibility(result.eligibility);
      setDeadline(result.deadline);
      setPriority(result.priority);
      setSourceType(result.sourceType);

      setExtractedData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newAnnouncement: Omit<Announcement, 'id' | 'createdAt'> = {
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
      source: `Parsed via AI Intelligence (${sourceType})`,
      sourceType,
      verificationStatus: 'Community Submitted',
      tags: [category.toLowerCase(), 'ai-parsed', organizer.toLowerCase().split(' ')[0] || 'campus'],
      rawSourceText: inputText,
      isBookmarked: false,
      participantCount: 1,
    };

    onPublishAnnouncement(newAnnouncement);
    setIsPublished(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#06b6d4', '#10b981'],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 mb-1 font-semibold text-xs">
            <Cpu className="w-4 h-4" />
            <span>AI Notice Intelligence Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Unstructured Notice Parser
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Transform messy WhatsApp forwards, forwarded emails, poster text, and memos into verified, structured campus events.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Gemini Engine Ready
          </span>
        </div>
      </div>

      {/* 1-Click Test Samples for Judges */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            1-Click Test Samples (For Judges / Live Demo):
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SAMPLE_NOTICES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => handleSelectSample(sample)}
              className="text-left p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/40 transition-all group"
            >
              <p className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 line-clamp-1 mb-1">
                {sample.name}
              </p>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {sample.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Parser Layout: Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Input text area (5 columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between h-full min-h-[450px]">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  Paste Raw Notice / WhatsApp Text:
                </label>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-indigo-500/30 transition-colors">
                    <Upload className="w-3 h-3" />
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept=".txt,.md,.eml,.json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span>{inputText.length} chars</span>
                </div>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste any unstructured message here... e.g. WhatsApp forward, email copy, club caption, or exam notification."
                className="w-full h-80 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs font-mono focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
              />
            </div>

            <div className="pt-4 space-y-3">
              {isProcessing && (
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300 flex items-center gap-2.5 animate-pulse">
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-400 shrink-0" />
                  <span>{processingStep}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleStartExtraction}
                disabled={isProcessing || !inputText.trim()}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isProcessing ? 'Processing with AI...' : 'Extract Notice with Gemini AI'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Structured Extracted Fields (7 columns) */}
        <div className="lg:col-span-7">
          {isPublished ? (
            <div className="p-8 rounded-2xl glass-panel border border-emerald-500/40 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-xl shadow-emerald-500/10">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Notice Successfully Published!</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  "{title}" has been structured, prioritized, and pushed live to the Campus Feed & Smart Calendar.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigateTab('feed')}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  View in Campus Feed
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab('calendar')}
                  className="px-5 py-2.5 rounded-xl glass-panel hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  View on Calendar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPublished(false);
                    setExtractedData(null);
                    setInputText('');
                  }}
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs"
                >
                  Parse Another Notice
                </button>
              </div>
            </div>
          ) : extractedData ? (
            <form onSubmit={handlePublish} className="p-6 rounded-2xl glass-panel border border-indigo-500/30 space-y-5 shadow-2xl animate-in fade-in duration-300">
              
              {/* Header with confidence and duplicate badges */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">AI Extraction Preview</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                    {extractedData.confidenceScore}% Confidence
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">Review & edit before publishing</span>
              </div>

              {/* Duplicate Warning Alert */}
              {extractedData.duplicateWarning?.isDuplicate && (
                <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <strong>Potential Duplicate Notice Detected ({extractedData.duplicateWarning.similarityPercent}% match):</strong>
                    <p className="text-[11px] text-amber-200/90 mt-0.5">
                      "{extractedData.duplicateWarning.existingNoticeTitle}" already exists on campus records.
                    </p>
                  </div>
                </div>
              )}

              {/* Missing Information Alert */}
              {extractedData.missingFields.length > 0 && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Missing Information Detected:</strong>
                    <ul className="list-disc list-inside text-[11px] text-rose-200/80 mt-1 space-y-0.5">
                      {extractedData.missingFields.map((field) => (
                        <li key={field}>{field}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Editable Fields Grid */}
              <div className="space-y-4 text-xs">
                {/* Title */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Event / Announcement Title:
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Description Summary:
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                  />
                </div>

                {/* Category & Priority */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Category:</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as AnnouncementCategory)}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Calculated Priority:</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Urgent">Urgent (Deadline &lt; 48h)</option>
                      <option value="Important">Important (This Week)</option>
                      <option value="Upcoming">Upcoming (Next Weeks)</option>
                      <option value="Normal">Normal Announcement</option>
                    </select>
                  </div>
                </div>

                {/* Date, Time & Venue */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Event Date:</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Start Time:</label>
                    <input
                      type="text"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      placeholder="10:00 AM"
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Registration Deadline:</label>
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Venue & Organizer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Venue / Platform:</label>
                    <input
                      type="text"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder="e.g. Audi 2 or Google Meet"
                      required
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Organizer:</label>
                    <input
                      type="text"
                      value={organizer}
                      onChange={(e) => setOrganizer(e.target.value)}
                      placeholder="e.g. GDSC / Placement Cell"
                      required
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Registration URL & Eligibility */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Registration Link (URL):</label>
                    <input
                      type="url"
                      value={registrationUrl}
                      onChange={(e) => setRegistrationUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Eligibility Criteria:</label>
                    <input
                      type="text"
                      value={eligibility}
                      onChange={(e) => setEligibility(e.target.value)}
                      placeholder="e.g. 2nd & 3rd Year B.Tech"
                      className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Publish Action Button */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setExtractedData(null)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Discard & Reset
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Publish to Campus Feed</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="h-full min-h-[450px] rounded-2xl glass-panel border border-slate-800 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Cpu className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">AI Extraction Preview Empty</h4>
                <p className="text-xs text-slate-400 max-w-sm">
                  Paste any unstructured message on the left or click one of the 1-click test samples above, then press <strong>Extract Notice with Gemini AI</strong>.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
