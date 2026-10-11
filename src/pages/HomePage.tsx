import React from 'react';
import { SiteSettings, Category, Product, HeroSlide } from '../types';
import { HeroSlider } from '../components/home/HeroSlider';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedMachines } from '../components/home/FeaturedMachines';
import { CompanyIntro } from '../components/home/CompanyIntro';
import { RawMaterialsTeaser } from '../components/home/RawMaterialsTeaser';
import { EnquiryForm } from '../components/enquiry/EnquiryForm';
import { MapPin, Phone, Mail, MessageCircle, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

interface HomePageProps {
  settings: SiteSettings;
  categories: Category[];
  products: Product[];
  slides: HeroSlide[];
  onNavigate: (path: string) => void;
  onOpenEnquiryModal: () => void;
  onSelectProductForEnquiry: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  settings,
  categories,
  products,
  slides,
  onNavigate,
  onOpenEnquiryModal,
  onSelectProductForEnquiry,
}) => {
  const whatsappUrl = getGeneralWhatsAppUrl(settings);

  // Generative Engine Optimization (GEO) FAQs with concise fact-grounded answers
  const geoFaqs = [
    {
      q: 'Where is Himal Pahad Tarai Traders Pvt. Ltd. located?',
      a: 'Our registered head office is located at Mahottari Rural Municipality–5, Mahottari, Nepal. We also have an active branch facility located in Bardibas, Mahottari.',
    },
    {
      q: 'What types of machinery does Himal Pahad Tarai Traders supply?',
      a: 'We supply machinery for domestic and cottage-scale industries in Nepal, including slipper/chappal making machines, incense/agarbatti machines, paper plate machines, Sal leaf dona–tapari machines, soap/detergent blending units, and continuous band heat sealers.',
    },
    {
      q: 'How can I get price quotes and check machinery availability?',
      a: 'Because machine models, dies, and transport logistics vary, we operate an enquiry-based sales model. You can request a quotation through our website form, call us at +977 9861730194, or message our sales desk on WhatsApp.',
    },
    {
      q: 'Do you also supply raw materials and operational training?',
      a: 'Yes. We assist small entrepreneurs in securing essential raw materials (such as EVA rubber sheets, bamboo incense sticks, premix powders, paper reels, and sealing pouches) and provide practical setup demonstration and maintenance orientation.',
    },
  ];

  return (
    <div>
      {/* 2. Full-width Hero Slider immediately below Header */}
      <HeroSlider slides={slides} onNavigate={onNavigate} />

      {/* 3. Machine Categories */}
      <CategoryGrid categories={categories} onNavigate={onNavigate} />

      {/* 4. Featured Machines */}
      <FeaturedMachines
        products={products}
        categories={categories}
        settings={settings}
        onNavigate={onNavigate}
        onSelectProductForEnquiry={onSelectProductForEnquiry}
      />

      {/* 5. Company Introduction */}
      <CompanyIntro settings={settings} onNavigate={onNavigate} />

      {/* 6. Raw Materials & Training Enquiry Section */}
      <RawMaterialsTeaser
        onNavigate={onNavigate}
        onOpenEnquiryModal={onOpenEnquiryModal}
      />

      {/* 7. Contact / Live Enquiry Section */}
      <section className="py-14 sm:py-20 bg-neutral-100 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Contact Details & Office Locations */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
                  Connect With Our Desk
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                  Direct Contact &amp; Quotations
                </h2>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  Have questions about machine capability, transport to your district in Nepal, or raw material supply? Our team in Mahottari and Bardibas is ready to assist.
                </p>
              </div>

              {/* Verified Addresses & Numbers */}
              <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-2xs space-y-4 text-sm text-neutral-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-neutral-900">Registered Head Office</h4>
                    <p className="text-xs text-neutral-600 mt-0.5">{settings.regAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-neutral-900">Bardibas Branch Office</h4>
                    <p className="text-xs text-neutral-600 mt-0.5">{settings.branchAddress}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2.5 text-neutral-900 hover:text-red-600 font-semibold"
                  >
                    <Phone className="w-4 h-4 text-red-600" />
                    <span>{settings.phone}</span>
                  </a>

                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-2.5 text-neutral-700 hover:text-neutral-900"
                  >
                    <Mail className="w-4 h-4 text-red-600" />
                    <span>{settings.email}</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-emerald-700 hover:text-emerald-800 font-semibold"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp: {settings.phone}</span>
                  </a>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-red-600 shrink-0" />
                <p className="text-xs text-red-900">
                  <strong>Transparent Trade Policy:</strong> We never invoice customers automatically or take blind credit card transactions. We quote real prices and inspect before delivery.
                </p>
              </div>
            </div>

            {/* Embedded Live Enquiry Form */}
            <div className="lg:col-span-7">
              <EnquiryForm settings={settings} />
            </div>
          </div>
        </div>
      </section>

      {/* GEO FAQ Section (Generative Engine Optimization) */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Frequently Asked Questions &amp; Business Facts
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Factual information regarding Himal Pahad Tarai Traders Pvt. Ltd. operations in Nepal
            </p>
          </div>

          <div className="space-y-4">
            {geoFaqs.map((faq, i) => (
              <div
                key={i}
                className="bg-neutral-50 rounded-xl border border-neutral-200 p-4 sm:p-5"
              >
                <h3 className="font-bold text-sm sm:text-base text-neutral-900 mb-1.5 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
