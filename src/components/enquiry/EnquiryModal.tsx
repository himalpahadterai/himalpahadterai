import React from 'react';
import { X } from 'lucide-react';
import { SiteSettings, Product } from '../../types';
import { EnquiryForm } from './EnquiryForm';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
  selectedProduct?: Product | null;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  settings,
  selectedProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-neutral-200 overflow-hidden my-8">
        {/* Header bar */}
        <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base sm:text-lg">
              {selectedProduct ? `Enquire: ${selectedProduct.name}` : 'Direct Machinery & Material Enquiry'}
            </h3>
            <p className="text-xs text-neutral-400">
              Himal Pahad Tarai Traders Pvt. Ltd. • Mahottari &amp; Bardibas
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          <EnquiryForm
            settings={settings}
            preselectedProduct={selectedProduct}
            onSuccess={() => {}}
            compact={true}
          />
        </div>
      </div>
    </div>
  );
};
