import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, Lock, ChevronRight } from 'lucide-react';
import { SiteSettings, Category } from '../../types';
import { getGeneralWhatsAppUrl } from '../../utils/whatsapp';

interface FooterProps {
  settings: SiteSettings;
  categories: Category[];
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, categories, onNavigate }) => {
  const whatsappUrl = getGeneralWhatsAppUrl(settings);

  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800">
      {/* Upper Footer: Core Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white p-1 rounded-lg flex items-center justify-center">
                <img
                  src={settings.logoUrl && settings.logoUrl !== '/images/logo.svg' ? settings.logoUrl : '/src/assets/images/regenerated_image_1791949718649.jpg'}
                  alt="Himal Pahad Tarai Traders Logo"
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">
                  {settings.companyName}
                </h3>
                <p className="text-xs text-red-500 font-semibold tracking-wide">
                  Mahottari &amp; Bardibas, Nepal
                </p>
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {settings.businessDescription} Dedicated to supporting domestic self-employment, small manufacturing enterprises, and technical skill development across Nepal.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-700/30 text-emerald-400 hover:bg-emerald-700/50 rounded-md text-xs font-medium transition-colors border border-emerald-600/30"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>
              <span className="text-neutral-500 text-xs">Reg. in Nepal</span>
            </div>
          </div>

          {/* Col 2: Machine Categories */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
              Machinery Categories
            </h4>
            <ul className="space-y-2 text-sm">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate(`/categories/${cat.slug}`)}
                    className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('/machines')}
                  className="text-red-400 hover:text-red-300 font-medium text-xs mt-1 block cursor-pointer"
                >
                  View All Machinery &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Information */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
              Enterprise &amp; Guidance
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  About Our Enterprise
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/raw-materials-and-training')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Raw Materials &amp; Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Contact &amp; Physical Branches
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy-policy')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms-and-conditions')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Terms &amp; Quotation Conditions
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('/admin')}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                >
                  <Lock className="w-3 h-3 text-neutral-500" />
                  <span>Admin &amp; Staff Dashboard</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact Facts */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
              Verified Addresses
            </h4>
            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Head Office:</span>
                  <span>{settings.regAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Branch Location:</span>
                  <span>{settings.branchAddress}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="text-white hover:text-red-400 font-medium transition-colors"
                >
                  {settings.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  {settings.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 bg-neutral-950/80 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3">
          <p>
            &copy; {new Date().getFullYear()} {settings.companyName}. All rights reserved. Nepal.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-neutral-600">Domain: {settings.intendedDomain}</span>
            <span>•</span>
            <span className="text-neutral-500">Enquiry-Based Machinery Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
