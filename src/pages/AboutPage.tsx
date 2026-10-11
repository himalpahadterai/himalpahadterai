import React from 'react';
import { SiteSettings, PageContent } from '../types';
import { ChevronRight, MapPin, Phone, Mail, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

interface AboutPageProps {
  settings: SiteSettings;
  pageContent?: PageContent | null;
  onNavigate: (path: string) => void;
  onOpenEnquiryModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  settings,
  pageContent,
  onNavigate,
  onOpenEnquiryModal,
}) => {
  const whatsappUrl = getGeneralWhatsAppUrl(settings);

  return (
    <div className="bg-neutral-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-6" aria-label="Breadcrumb">
          <button onClick={() => onNavigate('/')} className="hover:text-red-600 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-neutral-800">About Us</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 shadow-2xs mb-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">
              Registered Nepali Trading Enterprise
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              About Himal Pahad Tarai Traders Pvt. Ltd.
            </h1>
            <p className="mt-3 text-base sm:text-lg text-neutral-600 leading-relaxed">
              Facilitating self-employment, small and domestic-scale manufacturing enterprises across Nepal with reliable machinery, raw materials, and technical training.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Body */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 shadow-2xs space-y-6 text-neutral-800 leading-relaxed">
            {pageContent?.body ? (
              <div className="prose max-w-none text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {pageContent.body}
              </div>
            ) : (
              <>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  Our Mission &amp; Foundation
                </h2>
                <p className="text-sm sm:text-base text-neutral-700">
                  <strong>Himal Pahad Tarai Traders Pvt. Ltd.</strong> was established to meet the growing need for accessible, reliable manufacturing equipment in Nepal's rural, semi-urban, and industrial corridors. We recognize that while many ambitious youths and women aspire to start local enterprises, they often face significant hurdles: sourcing durable machines without extortionate middleman markups, securing steady supplies of raw materials, and learning how to service equipment safely.
                </p>

                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 pt-2">
                  What We Stand For
                </h3>
                <div className="space-y-3 text-sm sm:text-base text-neutral-700">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-900">Direct Sourcing:</strong> We supply verified machines for slippers, agarbatti, paper plates, dona–tapari, soap, and continuous band heat sealing.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-900">Raw Material Continuity:</strong> We help our clients access EVA foam, soles, straps, bamboo sticks, incense premixes, paper rolls, and packaging bags.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-900">Practical Operational Orientation:</strong> We don't just sell crates of steel; we show entrepreneurs how to mount dies, set hydraulic pressures, balance heaters, and execute routine upkeep.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-900">Truth-in-Trade Guarantee:</strong> We do not fabricate unrealistic output promises or invent warranty claims. Prices are quoted transparently based on current import costs and physical machine configuration.
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 mt-6">
                  <h4 className="font-bold text-neutral-900 text-base mb-2">
                    Physical Presence in Mahottari &amp; Bardibas
                  </h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Our facilities are positioned along vital transport corridors in Mahottari, Madhesh Province, enabling rapid dispatch of machines, parts, and consumables to districts across the Terai and hilly regions of Nepal.
                  </p>
                </div>
              </>
            )}

            <div className="pt-6 border-t border-neutral-100 flex flex-wrap gap-4">
              <button
                onClick={onOpenEnquiryModal}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Send Us an Enquiry
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Sidebar: Key Enterprise Facts for GEO */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-neutral-800">
              <h3 className="text-lg font-bold mb-4 text-white">
                Official Enterprise Facts
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
                <div>
                  <span className="text-neutral-400 block text-[11px] uppercase tracking-wider">Company Name</span>
                  <span className="font-semibold text-white">{settings.companyName}</span>
                </div>

                <div>
                  <span className="text-neutral-400 block text-[11px] uppercase tracking-wider">Head Office</span>
                  <span className="text-white">{settings.regAddress}</span>
                </div>

                <div>
                  <span className="text-neutral-400 block text-[11px] uppercase tracking-wider">Branch Facility</span>
                  <span className="text-white">{settings.branchAddress}</span>
                </div>

                <div>
                  <span className="text-neutral-400 block text-[11px] uppercase tracking-wider">Contact Phone</span>
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-white hover:text-red-400 font-semibold">
                    {settings.phone}
                  </a>
                </div>

                <div>
                  <span className="text-neutral-400 block text-[11px] uppercase tracking-wider">Official Email</span>
                  <a href={`mailto:${settings.email}`} className="text-white hover:text-red-400">
                    {settings.email}
                  </a>
                </div>

                <div>
                  <span className="text-neutral-400 block text-[11px] uppercase tracking-wider">Official Domain</span>
                  <span className="text-neutral-400 font-mono">{settings.intendedDomain}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs">
              <h4 className="font-bold text-neutral-900 text-sm mb-3">
                Need Machinery Sourcing Advice?
              </h4>
              <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                Whether you need a single manual die press or a complete cottage production setup, talk to our technical coordinators.
              </p>
              <button
                onClick={() => onNavigate('/contact')}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                View Physical Branch Details &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
