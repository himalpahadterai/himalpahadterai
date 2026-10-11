import React, { useState } from 'react';
import { PageContent } from '../../types';
import { savePage } from '../../services/dataService';
import { FileText, Save, CheckCircle2, AlertCircle } from 'lucide-react';

interface PagesManagerProps {
  pages: PageContent[];
  onRefresh: () => void;
}

export const PagesManager: React.FC<PagesManagerProps> = ({ pages, onRefresh }) => {
  const [selectedSlug, setSelectedSlug] = useState<string>(pages[0]?.slug || 'about');
  const [activePage, setActivePage] = useState<PageContent>(
    pages.find((p) => p.slug === selectedSlug) || pages[0]
  );
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectPage = (slug: string) => {
    setSelectedSlug(slug);
    const found = pages.find((p) => p.slug === slug);
    if (found) {
      setActivePage({ ...found });
    }
    setSavedSuccess(false);
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSavedSuccess(false);
    try {
      // Basic sanitization: strip any malicious script tags
      const sanitizedBody = activePage.body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

      await savePage({
        ...activePage,
        body: sanitizedBody,
        updatedAt: new Date().toISOString(),
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      onRefresh();
    } catch (err: any) {
      console.error('Failed to save page:', err);
      setError(err?.message || 'Failed to update page content.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">Company Pages &amp; Policy Content</h2>
        <p className="text-xs text-neutral-500">
          Edit public content for About, Raw Materials &amp; Training, Privacy Policy, and Terms.
        </p>
      </div>

      {/* Page Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {pages.map((p) => (
          <button
            key={p.slug}
            onClick={() => handleSelectPage(p.slug)}
            className={`px-4 py-2 rounded-xl font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              selectedSlug === p.slug
                ? 'bg-neutral-900 text-white'
                : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Editor Form */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-2xs">
        {savedSuccess && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Page content successfully saved to Cloud Firestore!</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-neutral-800 mb-1">Page Title</label>
            <input
              type="text"
              required
              value={activePage.title}
              onChange={(e) => setActivePage({ ...activePage, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-neutral-300"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-800 mb-1">Summary / Lead Paragraph</label>
            <input
              type="text"
              value={activePage.summary || ''}
              onChange={(e) => setActivePage({ ...activePage, summary: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-neutral-300"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-800 mb-1">
              Body Content (Text / Markdown formatted)
            </label>
            <textarea
              rows={12}
              required
              value={activePage.body}
              onChange={(e) => setActivePage({ ...activePage, body: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 font-mono text-xs leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-neutral-800 mb-1">SEO Title</label>
              <input
                type="text"
                value={activePage.seoTitle || ''}
                onChange={(e) => setActivePage({ ...activePage, seoTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-neutral-800 mb-1">SEO Meta Description</label>
              <input
                type="text"
                value={activePage.seoDescription || ''}
                onChange={(e) => setActivePage({ ...activePage, seoDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-red-600 hover:bg-red-700 disabled:bg-neutral-400 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Page Content'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
