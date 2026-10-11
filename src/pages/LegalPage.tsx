import React from 'react';
import { PageContent } from '../types';
import { ChevronRight, ShieldCheck, FileText } from 'lucide-react';

interface LegalPageProps {
  page: PageContent;
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ page, onNavigate }) => {
  return (
    <div className="bg-neutral-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-6" aria-label="Breadcrumb">
          <button onClick={() => onNavigate('/')} className="hover:text-red-600 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-neutral-800">{page.title}</span>
        </nav>

        {/* Content Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 shadow-2xs">
          <div className="border-b border-neutral-100 pb-6 mb-6">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
              Official Enterprise Terms &amp; Policies
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {page.title}
            </h1>
            {page.summary && (
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                {page.summary}
              </p>
            )}
          </div>

          <div className="prose max-w-none text-sm sm:text-base text-neutral-800 leading-relaxed whitespace-pre-line space-y-4">
            {page.body}
          </div>

          <div className="mt-10 pt-6 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Last Updated: {page.updatedAt ? new Date(page.updatedAt).toLocaleDateString() : 'October 2026'}</span>
            <button
              onClick={() => onNavigate('/contact')}
              className="text-red-600 hover:text-red-700 font-semibold cursor-pointer"
            >
              Questions? Contact Our Desk &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
