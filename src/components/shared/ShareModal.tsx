import React, { useState } from 'react';
import { Announcement } from '../../types';
import { X, Copy, Check, MessageSquare, Globe, Mail, Share2 } from 'lucide-react';

interface ShareModalProps {
  announcement: Announcement | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ announcement, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!announcement) return null;

  const shareText = `*${announcement.title}*\n🗓️ Date: ${announcement.eventDate}\n📍 Venue: ${announcement.venue}\n${announcement.registrationUrl ? `🔗 Register: ${announcement.registrationUrl}` : ''}\n\nDiscovered via Campus Pulse AI! 🚀`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`Check out ${announcement.title} on Campus Pulse AI! 🎓⚡`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Campus Opportunity: ${announcement.title}`);
    const body = encodeURIComponent(shareText);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-sm rounded-2xl glass-panel border border-slate-700 bg-[#0F172A] p-5 text-slate-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Share Announcement</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-4 line-clamp-2">
          {announcement.title}
        </p>

        {/* Quick Social Action Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-600/15 border border-emerald-500/30 hover:bg-emerald-600/25 text-emerald-300 transition-colors"
          >
            <MessageSquare className="w-5 h-5 mb-1 text-emerald-400" />
            <span className="text-[11px] font-medium">WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleTwitterShare}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-cyan-600/15 border border-cyan-500/30 hover:bg-cyan-600/25 text-cyan-300 transition-colors"
          >
            <Globe className="w-5 h-5 mb-1 text-cyan-400" />
            <span className="text-[11px] font-medium">X (Twitter)</span>
          </button>

          <button
            type="button"
            onClick={handleEmailShare}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-indigo-600/15 border border-indigo-500/30 hover:bg-indigo-600/25 text-indigo-300 transition-colors"
          >
            <Mail className="w-5 h-5 mb-1 text-indigo-400" />
            <span className="text-[11px] font-medium">Email</span>
          </button>
        </div>

        {/* Copy snippet button */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-indigo-500/50 text-xs font-semibold text-slate-200 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-400" />
              <span>Copy Formatted WhatsApp Message</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
