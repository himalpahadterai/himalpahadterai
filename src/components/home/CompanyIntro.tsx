import React from 'react';
import { SiteSettings } from '../../types';
import { MapPin, Phone, Mail, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

interface CompanyIntroProps {
  settings: SiteSettings;
  onNavigate: (path: string) => void;
}

export const CompanyIntro: React.FC<CompanyIntroProps> = ({ settings, onNavigate }) => {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Facts */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span>Registered Nepali Trading Enterprise</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Empowering Small &amp; Domestic Industry Across Nepal
            </h2>

            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              <strong>{settings.companyName}</strong> operates to facilitate local employment and cottage-scale production across Nepal's Terai, Hill, and Mountain districts. Headquartered in Mahottari Rural Municipality–5 with an operational facility in Bardibas, Mahottari, we specialize in supplying proven manufacturing machinery, consistent raw materials, and hands-on operational training.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <CheckCircle2 className="w-5 h-5 text-red-600" />
                  <h4 className="font-bold text-neutral-900 text-sm">Cottage Machinery</h4>
                </div>
                <p className="text-xs text-neutral-600">
                  Durable equipment for footwear cutting, agarbatti, paper plates, dona–tapari, and soap blending.
                </p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <CheckCircle2 className="w-5 h-5 text-red-600" />
                  <h4 className="font-bold text-neutral-900 text-sm">Raw Material Linkage</h4>
                </div>
                <p className="text-xs text-neutral-600">
                  Connecting new producers with reliable EVA sheets, incense powders, paper reels, and dies.
                </p>
              </div>
            </div>

            {/* Factual Address Summary for GEO */}
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 space-y-2 text-xs sm:text-sm text-neutral-700">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-neutral-900">Head Office: </span>
                  {settings.regAddress}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-neutral-900">Branch Location: </span>
                  {settings.branchAddress}
                </div>
              </div>
              <div className="flex items-center gap-4 pt-1 text-xs">
                <span className="inline-flex items-center gap-1 font-semibold text-neutral-900">
                  <Phone className="w-3.5 h-3.5 text-red-600" /> {settings.phone}
                </span>
                <span className="inline-flex items-center gap-1 text-neutral-700">
                  <Mail className="w-3.5 h-3.5 text-red-600" /> {settings.email}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: GEO Fact Card & Operational Principles */}
          <div className="lg:col-span-5 bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-neutral-800">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-2 text-white">
              Enterprise Procurement Policy
            </h3>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              We believe in honest, transparent trade without misleading promises or exaggerated claims.
            </p>

            <ul className="space-y-4 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-neutral-100">Enquiry-Based Pricing</h4>
                  <p className="text-neutral-400 text-xs mt-0.5">
                    Machinery import and freight values vary. We provide updated, written price quotations directly to interested buyers.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-neutral-100">Physical Inspection Welcome</h4>
                  <p className="text-neutral-400 text-xs mt-0.5">
                    Clients are invited to visit our Bardibas / Mahottari facilities to inspect machinery models before dispatch.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-neutral-100">Operator Orientation</h4>
                  <p className="text-neutral-400 text-xs mt-0.5">
                    Every machine comes with practical setup and maintenance guidance to ensure your production line runs smoothly.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between">
              <button
                onClick={() => onNavigate('/about')}
                className="text-red-400 hover:text-red-300 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Learn More About Our Team &rarr;
              </button>
              <button
                onClick={() => onNavigate('/contact')}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Contact Desk
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
