import React from 'react';
import { SiteSettings, PageContent } from '../types';
import { ChevronRight, Package, GraduationCap, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { EnquiryForm } from '../components/enquiry/EnquiryForm';

interface RawMaterialsPageProps {
  settings: SiteSettings;
  pageContent?: PageContent | null;
  onNavigate: (path: string) => void;
  onOpenEnquiryModal: () => void;
}

export const RawMaterialsPage: React.FC<RawMaterialsPageProps> = ({
  settings,
  pageContent,
  onNavigate,
  onOpenEnquiryModal,
}) => {
  const whatsappUrl = getGeneralWhatsAppUrl(
    settings,
    'Namaste Himal Pahad Tarai Traders, I would like to inquire about raw material availability, pricing per kg/roll, and technical training in Nepal.'
  );

  return (
    <div className="bg-neutral-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-6" aria-label="Breadcrumb">
          <button onClick={() => onNavigate('/')} className="hover:text-red-600 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-neutral-800">Raw Materials &amp; Training</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 shadow-2xs mb-10">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">
            Supply Continuity &amp; Technical Skill Transfer
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Raw Materials &amp; Enterprise Training
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
            A small manufacturing unit needs dependable raw material supply lines and proper operator training. We support startup owners in Nepal from procurement through day-to-day operation.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-8 space-y-8">
            {/* Raw Materials Deep Dive */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-neutral-900">
                  Raw Materials for Domestic Manufacturing
                </h2>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed mb-6">
                We connect local producers in Mahottari, Bardibas, and across Nepal to verified factory sources and wholesale suppliers for consumable manufacturing inputs:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <h4 className="font-bold text-neutral-900 mb-1.5 text-sm">Footwear &amp; Slipper</h4>
                  <ul className="space-y-1.5 text-neutral-600">
                    <li>• EVA foam &amp; rubber sole sheets</li>
                    <li>• Men, women &amp; kids PVC straps</li>
                    <li>• Strap inserting rods &amp; adhesive</li>
                    <li>• Screen printing ink &amp; stencils</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <h4 className="font-bold text-neutral-900 mb-1.5 text-sm">Incense &amp; Agarbatti</h4>
                  <ul className="space-y-1.5 text-neutral-600">
                    <li>• Round bamboo sticks (8", 9", 10")</li>
                    <li>• Charcoal &amp; wood powder premixes</li>
                    <li>• Joss powder (T1 bonding binder)</li>
                    <li>• Aromatic perfumery oils &amp; DEP</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <h4 className="font-bold text-neutral-900 mb-1.5 text-sm">Paper Plates &amp; Dona–Tapari</h4>
                  <ul className="space-y-1.5 text-neutral-600">
                    <li>• Silver / printed PE paper rolls</li>
                    <li>• 80 to 350 GSM craft reels</li>
                    <li>• Natural dried Sal leaf discs</li>
                    <li>• Precision cutting &amp; forming dies</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <h4 className="font-bold text-neutral-900 mb-1.5 text-sm">Detergent &amp; Packaging</h4>
                  <ul className="space-y-1.5 text-neutral-600">
                    <li>• Soda ash, slurry, sodium sulphate</li>
                    <li>• Soap perfumes and color granules</li>
                    <li>• Continuous band teflon sealing belts</li>
                    <li>• Laminated pouches &amp; rolls</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technical Training Deep Dive */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-neutral-900">
                  Practical Technical Training &amp; Orientation
                </h2>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed mb-6">
                Lack of technical knowledge can lead to machine downtime, burnt heating coils, and unnecessary die wear. When you acquire machinery through Himal Pahad Tarai Traders, our orientation covers:
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-neutral-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900">Die Installation &amp; Alignment:</strong> Centering cutting dies and hydraulic platens to prevent uneven wear.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900">Temperature &amp; Pressure Calibration:</strong> Setting digital thermostats for laminated paper and leaf dona presses to avoid burning or peeling.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900">Daily Maintenance Protocols:</strong> Lubrication intervals, hydraulic oil level monitoring, motor phase checks, and cleaning abrasive dust from gears.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900">Safety &amp; Emergency Stop Operation:</strong> Ensuring safe physical positioning of operators during hydraulic compression.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: WhatsApp & Contact Actions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-md border border-emerald-800">
              <h3 className="text-lg font-bold mb-2">
                Fast Material Quotes on WhatsApp
              </h3>
              <p className="text-xs text-emerald-200 mb-6 leading-relaxed">
                Send us your required raw material quantities (e.g. rolls of paper, bags of premix, bundles of bamboo sticks) for prompt price availability.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs">
              <h4 className="font-bold text-neutral-900 text-sm mb-2">
                Need In-Person Orientation?
              </h4>
              <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                Visit our Bardibas or Mahottari facility to see physical sample plates, slippers, incense, and machine test runs.
              </p>
              <button
                onClick={() => onNavigate('/contact')}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                View Physical Address &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Embedded Enquiry Form */}
        <div className="mb-12">
          <EnquiryForm
            settings={settings}
            onSuccess={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
