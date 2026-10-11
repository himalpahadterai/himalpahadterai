import React from 'react';
import { Home, Search, Layers, Phone } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-neutral-50 min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm text-center">
        <span className="text-4xl sm:text-6xl font-black text-red-600 tracking-tight block mb-2">
          404
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
          Page or Machine Not Found
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed">
          The machinery listing or page you requested may have moved or been updated. Please explore our verified catalogue or contact our desk.
        </p>

        <div className="space-y-2.5">
          <button
            onClick={() => onNavigate('/')}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => onNavigate('/machines')}
            className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Browse Machinery Catalogue</span>
          </button>

          <button
            onClick={() => onNavigate('/contact')}
            className="w-full text-xs text-neutral-600 hover:text-red-600 font-medium py-2 cursor-pointer transition-colors"
          >
            Contact Mahottari / Bardibas Desk &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
