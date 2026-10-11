import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { SiteSettings } from '../../types';
import { getGeneralWhatsAppUrl } from '../../utils/whatsapp';

interface FloatingWhatsAppProps {
  settings: SiteSettings;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ settings }) => {
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const whatsappUrl = getGeneralWhatsAppUrl(settings);
  const cleanPhone = settings.phone.replace(/\s+/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Informative Tooltip Popover */}
      {tooltipVisible && (
        <div className="pointer-events-auto bg-white border border-neutral-200 shadow-xl rounded-xl p-3.5 max-w-xs text-xs text-neutral-800 animate-slideUp relative mb-1">
          <button
            onClick={() => setTooltipVisible(false)}
            className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="font-semibold text-neutral-900 mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Have questions about machinery?
          </div>
          <p className="text-neutral-600 mb-2.5">
            Chat directly with our Mahottari sales team on WhatsApp for prompt price quotations &amp; availability.
          </p>
          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Start WhatsApp</span>
            </a>
            <a
              href={`tel:${cleanPhone}`}
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span>Call</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        {/* Click-to-call round button */}
        <a
          href={`tel:${cleanPhone}`}
          className="w-11 h-11 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
          title={`Call ${settings.phone}`}
          aria-label="Direct Phone Call"
        >
          <Phone className="w-5 h-5 text-red-500" />
        </a>

        {/* WhatsApp Round Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 relative group"
          title="Chat with us on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
          <MessageCircle className="w-7 h-7" />
        </a>
      </div>
    </div>
  );
};
