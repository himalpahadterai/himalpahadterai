import React, { useState } from 'react';
import { SiteSettings } from '../../types';
import { saveSiteSettings } from '../../services/dataService';
import { Save, CheckCircle2, AlertCircle, RefreshCw, Phone, MessageCircle } from 'lucide-react';
import { getCleanWhatsAppNumber } from '../../utils/whatsapp';

interface SettingsManagerProps {
  settings: SiteSettings;
  onRefresh: () => void;
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({ settings, onRefresh }) => {
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSavedSuccess(false);
    try {
      await saveSiteSettings(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      onRefresh();
    } catch (err: any) {
      console.error('Failed to save settings:', err);
      setError(err?.message || 'Failed to save settings to Firestore.');
    } finally {
      setSaving(false);
    }
  };

  const formattedWhatsApp = getCleanWhatsAppNumber(
    formData.whatsappCountryCode || '977',
    formData.whatsappNumber || ''
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">Enterprise Contact &amp; Site Configuration</h2>
        <p className="text-xs text-neutral-500">
          Modify enterprise contact numbers, WhatsApp destination, addresses, and branding assets.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-2xs">
        {savedSuccess && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Site settings successfully updated and saved to Firestore!</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6 text-xs sm:text-sm">
          {/* Identity & Company Name */}
          <div className="space-y-3">
            <h3 className="font-bold text-neutral-900 text-sm border-b border-neutral-100 pb-2">
              Enterprise Identity &amp; Domain
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Company Registered Name</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Intended Custom Domain</label>
                <input
                  type="text"
                  required
                  value={formData.intendedDomain}
                  onChange={(e) => setFormData({ ...formData, intendedDomain: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 font-mono text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-neutral-800 mb-1">
                  Canonical Base URL (Configurable before custom domain connects)
                </label>
                <input
                  type="url"
                  required
                  value={formData.canonicalBaseUrl}
                  onChange={(e) => setFormData({ ...formData, canonicalBaseUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 font-mono text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-neutral-800 mb-1">Business Summary</label>
                <input
                  type="text"
                  value={formData.businessDescription}
                  onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
            </div>
          </div>

          {/* Contact Numbers & WhatsApp Destination */}
          <div className="space-y-3 pt-3 border-t border-neutral-100">
            <h3 className="font-bold text-neutral-900 text-sm border-b border-neutral-100 pb-2">
              Communication &amp; WhatsApp Configuration
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  Public Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  WhatsApp Country Code
                </label>
                <input
                  type="text"
                  required
                  value={formData.whatsappCountryCode}
                  onChange={(e) => setFormData({ ...formData, whatsappCountryCode: e.target.value })}
                  placeholder="977"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  WhatsApp Phone Digits
                </label>
                <input
                  type="text"
                  required
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  placeholder="9861730194"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-neutral-800 mb-1">Official Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  Resolved International WhatsApp Format
                </label>
                <div className="px-3 py-2 rounded-lg bg-neutral-100 text-neutral-700 font-mono text-xs flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>+{formattedWhatsApp}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Physical Branch Addresses */}
          <div className="space-y-3 pt-3 border-t border-neutral-100">
            <h3 className="font-bold text-neutral-900 text-sm border-b border-neutral-100 pb-2">
              Physical Enterprise Addresses
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  Registered Head Office Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.regAddress}
                  onChange={(e) => setFormData({ ...formData, regAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  Branch Facility Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.branchAddress}
                  onChange={(e) => setFormData({ ...formData, branchAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>
            </div>
          </div>

          {/* Logo & Branding */}
          <div className="space-y-3 pt-3 border-t border-neutral-100">
            <h3 className="font-bold text-neutral-900 text-sm border-b border-neutral-100 pb-2">
              Logo &amp; Visual Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Logo URL or Path</label>
                <input
                  type="text"
                  required
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, logoUrl: '/images/logo.svg' })}
                  className="text-[11px] text-red-600 hover:underline mt-1 cursor-pointer block"
                >
                  Reset to original official logo asset (/images/logo.svg)
                </button>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center gap-4">
                <div className="w-16 h-16 bg-white border border-neutral-200 rounded-lg p-1 flex items-center justify-center">
                  <img
                    src={formData.logoUrl || '/images/logo.svg'}
                    alt="Active Logo Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="text-xs text-neutral-600">
                  <strong className="text-neutral-900 block">Live Logo Preview</strong>
                  Preserved with original proportions and object-fit: contain.
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-neutral-200 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-red-600 hover:bg-red-700 disabled:bg-neutral-400 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Site Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
