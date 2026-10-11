import React, { useState } from 'react';
import { submitEnquiry } from '../../services/dataService';
import { SiteSettings, Product } from '../../types';
import { getEnquiryWhatsAppUrl } from '../../utils/whatsapp';
import { CheckCircle2, MessageCircle, AlertCircle, Send, ShieldCheck, RefreshCw } from 'lucide-react';

interface EnquiryFormProps {
  settings: SiteSettings;
  preselectedProduct?: Product | null;
  onSuccess?: (refNumber: string) => void;
  compact?: boolean;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  settings,
  preselectedProduct,
  onSuccess,
  compact = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    machineInterest: preselectedProduct ? preselectedProduct.name : '',
    message: preselectedProduct
      ? `I would like to inquire about the price, technical specs, and availability for ${preselectedProduct.name}.`
      : '',
    privacyConsent: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedResult, setSubmittedResult] = useState<{
    refNumber: string;
    details: typeof formData;
  } | null>(null);

  // Simple client-side submission anti-spam rate limiting
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Anti-spam rate limiting: 10 seconds cooldown
    const now = Date.now();
    if (now - lastSubmissionTime < 10000) {
      setError('Please wait a few moments before submitting another enquiry.');
      return;
    }

    if (!formData.name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      setError('Please enter a valid phone number so our sales team can contact you.');
      return;
    }
    if (!formData.privacyConsent) {
      setError('Please agree to the privacy consent to allow us to contact you.');
      return;
    }

    setLoading(true);
    try {
      const result = await submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        machineInterest: formData.machineInterest || 'General Machinery Enquiry',
        message: formData.message,
        privacyConsent: formData.privacyConsent,
      });

      setLastSubmissionTime(Date.now());
      setSubmittedResult({
        refNumber: result.refNumber,
        details: { ...formData },
      });

      if (onSuccess) {
        onSuccess(result.refNumber);
      }
    } catch (err) {
      console.error('Enquiry submission error:', err);
      setError(err instanceof Error ? err.message : 'Could not submit enquiry. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedResult(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      location: '',
      machineInterest: '',
      message: '',
      privacyConsent: true,
    });
    setError(null);
  };

  if (submittedResult) {
    const whatsappUrl = getEnquiryWhatsAppUrl(
      {
        refNumber: submittedResult.refNumber,
        name: submittedResult.details.name,
        phone: submittedResult.details.phone,
        machineInterest: submittedResult.details.machineInterest,
        message: submittedResult.details.message,
      },
      settings
    );

    return (
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm text-center animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-1">
          Enquiry Received Successfully!
        </h3>
        <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6">
          Your enquiry has been recorded in our official system. Our sales staff in Mahottari / Bardibas will review your requirements.
        </p>

        {/* Reference Number Badge */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 max-w-md mx-auto mb-6 text-left">
          <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold block mb-1">
            Official Reference Number
          </span>
          <div className="text-xl sm:text-2xl font-mono font-bold text-red-600 tracking-wider">
            {submittedResult.refNumber}
          </div>
          <p className="text-[11px] text-neutral-500 mt-2">
            *Keep this reference number handy for fast order tracking and quotation verification.
          </p>
        </div>

        {/* Continue on WhatsApp Option */}
        <div className="max-w-md mx-auto space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Continue on WhatsApp with Reference No.</span>
          </a>

          <p className="text-xs text-neutral-500">
            Submission is already saved durably in our database. Opening WhatsApp is optional for immediate chat.
          </p>

          <button
            onClick={handleReset}
            className="text-xs text-neutral-600 hover:text-red-600 font-medium inline-flex items-center gap-1.5 pt-2 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Submit another enquiry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
          Request Quotation &amp; Machinery Information
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1">
          Provide your requirements. We do not invent speculative rates; our sales desk prepares factual quotations tailored to your setup.
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-neutral-800 mb-1">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            maxLength={100}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Ramesh Kumar Chaudhary"
            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-neutral-800 mb-1">
            Contact Phone / WhatsApp <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            required
            maxLength={30}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. 9861730194"
            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-neutral-800 mb-1">
            Email Address <span className="text-neutral-400 font-normal">(Optional)</span>
          </label>
          <input
            type="email"
            maxLength={120}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. enterprise@gmail.com"
            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-neutral-800 mb-1">
            Your Location / District <span className="text-neutral-400 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            maxLength={120}
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g. Bardibas, Mahottari, Janakpur"
            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
          />
        </div>

        {/* Machine of Interest */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-neutral-800 mb-1">
            Machine or Material of Interest <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            maxLength={150}
            value={formData.machineInterest}
            onChange={(e) => setFormData({ ...formData, machineInterest: e.target.value })}
            placeholder="e.g. Slipper Making Hydraulic Machine, Paper Plate Machine, Agarbatti, Raw Materials..."
            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
          />
        </div>

        {/* Requirement / Message */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-neutral-800 mb-1">
            Requirement Details / Message
          </label>
          <textarea
            rows={compact ? 3 : 4}
            maxLength={2000}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please specify intended production capacity, die requirements, or delivery location..."
            className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white resize-y"
          />
        </div>

        {/* Privacy Consent */}
        <div className="sm:col-span-2">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-neutral-700 select-none">
            <input
              type="checkbox"
              required
              checked={formData.privacyConsent}
              onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
              className="mt-0.5 rounded-sm border-neutral-300 text-red-600 focus:ring-red-500"
            />
            <span>
              I agree to allow Himal Pahad Tarai Traders Pvt. Ltd. to store my contact details to reply with quotations and operational assistance.
            </span>
          </label>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Private &amp; Secure • No automated payments</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 disabled:bg-neutral-400 text-white font-semibold text-sm px-7 py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <span>Recording Enquiry...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Quotation Request</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
