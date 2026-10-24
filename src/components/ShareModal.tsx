import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Copy, Check, MessageSquare, ExternalLink, ShieldAlert } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PUBLIC_SHARED_URL = 'https://ais-pre-txzcts2niumf6ilvnqdnbl-770654019003.asia-northeast1.run.app';

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = encodeURIComponent(
    'Check out CraveLoop! Earn guaranteed ₹20 recharge vouchers on every food order, zero platform fees, and recharge your Jio/Airtel/Vi phone from wallet:\n' +
      PUBLIC_SHARED_URL
  );
  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PUBLIC_SHARED_URL);
      setCopied(true);
      showToast('Public link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('Please copy the link manually', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-stone-200 max-w-md w-full overflow-hidden shadow-2xl my-auto">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-stone-900">Share CraveLoop With Friends</h2>
            <p className="text-xs text-stone-500">Send via WhatsApp or copy the public link</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close share dialog"
            className="w-7 h-7 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {/* Important Permission Notice */}
          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Fixing the "404 / You do not have access" error:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-900/90">
              In Google AI Studio, click the <strong>Share</strong> button in the <strong>top-right header of your screen</strong> and ensure permission is set to <strong>"Anyone with the link can view"</strong>. Otherwise Google Cloud blocks external visitors.
            </p>
          </div>

          {/* WhatsApp Direct Share Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Share Directly on WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          {/* Copy Public Link Field */}
          <div className="space-y-1.5 pt-2">
            <label className="font-bold text-stone-700 block">Public Shared App Link:</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={PUBLIC_SHARED_URL}
                className="flex-1 p-2.5 bg-stone-100 border border-stone-300 rounded-xl text-stone-800 font-mono text-[11px] truncate select-all"
              />
              <button
                onClick={handleCopy}
                className="px-3.5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 text-center text-[10px] text-stone-400">
          This public URL is optimized for all mobile phones and desktop browsers.
        </div>
      </div>
    </div>
  );
};
