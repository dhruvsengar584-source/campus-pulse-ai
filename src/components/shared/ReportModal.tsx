import React, { useState } from 'react';
import { Announcement } from '../../types';
import { X, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface ReportModalProps {
  announcement: Announcement | null;
  onClose: () => void;
  onSubmitReport: (announcementId: string, reason: string) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  announcement,
  onClose,
  onSubmitReport,
}) => {
  const [selectedReason, setSelectedReason] = useState('Incorrect Event Date or Venue');
  const [customNotes, setCustomNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!announcement) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalReason = customNotes ? `${selectedReason}: ${customNotes}` : selectedReason;
    onSubmitReport(announcement.id, finalReason);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  const presetReasons = [
    'Incorrect Event Date or Venue',
    'Broken or Inactive Registration Link',
    'Misleading Eligibility Criteria',
    'Duplicate of Existing Announcement',
    'Expired or Cancelled Event',
    'Spam or Unauthorized Promotion',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-md rounded-2xl glass-panel border border-slate-700 bg-[#0F172A] p-6 text-slate-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertOctagon className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Report Inaccurate Notice</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
            <h4 className="text-lg font-bold text-white">Report Submitted</h4>
            <p className="text-xs text-slate-400 max-w-xs">
              Thank you for keeping Campus Pulse accurate. The Campus Admin team will review this notice.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Target Announcement:</p>
              <p className="text-xs font-semibold text-slate-200 truncate bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                {announcement.title}
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Primary Issue:
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {presetReasons.map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center gap-2.5 p-2 rounded-lg text-xs cursor-pointer border transition-colors ${
                      selectedReason === reason
                        ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-200'
                        : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={() => setSelectedReason(reason)}
                      className="accent-indigo-500"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Additional Details (Optional):
              </label>
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Describe what is incorrect or share the correct link/date..."
                className="w-full text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500 min-h-[70px] resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md transition-colors"
              >
                Submit Report to Admin
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
