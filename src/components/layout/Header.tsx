import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Shield, Lock, ExternalLink } from 'lucide-react';
import { SiteSettings } from '../../types';
import { getGeneralWhatsAppUrl } from '../../utils/whatsapp';
import defaultLogo from '../../assets/images/regenerated_image_1791949718649.jpg';

interface HeaderProps {
  settings: SiteSettings;
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenEnquiryModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  currentPath,
  onNavigate,
  onOpenEnquiryModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Machines Catalogue', path: '/machines' },
    { label: 'Categories', path: '/categories' },
    { label: 'Raw Materials & Training', path: '/raw-materials-and-training' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const whatsappUrl = getGeneralWhatsAppUrl(settings);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-xs">
      {/* Top Notification / Contact Bar */}
      <div className="bg-neutral-900 text-neutral-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium text-neutral-200">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {settings.branchAddress} &amp; {settings.regAddress}
            </span>
            <span className="hidden sm:inline text-neutral-500">•</span>
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>Call: {settings.phone}</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
            <span className="text-neutral-700">|</span>
            <button
              onClick={() => handleLinkClick('/admin')}
              className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Staff Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Company Title */}
          <div
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-3.5 cursor-pointer group select-none py-1"
          >
            {/* Official Logo Container - Preserving original aspect ratio & object-fit: contain */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center p-1 bg-white rounded-lg border border-neutral-100 shadow-2xs group-hover:border-red-200 transition-colors overflow-hidden">
              <img
                src={settings.logoUrl && !settings.logoUrl.includes('logo.svg') ? settings.logoUrl : (defaultLogo || '/images/logo.jpg')}
                alt="Himal Pahad Tarai Traders Pvt. Ltd. Official Logo"
                className="max-h-full max-w-full object-contain"
                loading="eager"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== window.location.origin + '/images/logo.jpg') {
                    target.src = '/images/logo.jpg';
                  }
                }}
              />
            </div>
            <div>
              <span className="block text-base sm:text-lg font-bold text-neutral-900 tracking-tight leading-tight group-hover:text-red-600 transition-colors">
                Himal Pahad Tarai Traders
              </span>
              <span className="block text-xs font-semibold text-red-600 tracking-wider uppercase">
                Pvt. Ltd. • Mahottari, Nepal
              </span>
              <span className="hidden md:block text-[11px] text-neutral-500">
                Machinery, Raw Materials &amp; Technical Training
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-sm font-medium transition-colors py-2 cursor-pointer ${
                  currentPath === link.path
                    ? 'text-red-600 font-semibold border-b-2 border-red-600'
                    : 'text-neutral-700 hover:text-red-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenEnquiryModal}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Request Quotation</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenEnquiryModal}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-2 rounded-lg cursor-pointer sm:hidden"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:text-red-600 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  currentPath === link.path
                    ? 'bg-red-50 text-red-700 font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-red-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onOpenEnquiryModal();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2.5 rounded-lg text-center"
            >
              Send Machinery Enquiry
            </button>
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 text-center"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>Call: {settings.phone}</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
