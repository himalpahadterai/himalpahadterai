import React from 'react';
import { SiteSettings } from '../types';
import { ChevronRight, MapPin, Phone, Mail, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { EnquiryForm } from '../components/enquiry/EnquiryForm';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

interface ContactPageProps {
  settings: SiteSettings;
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings, onNavigate }) => {
  const whatsappUrl = getGeneralWhatsAppUrl(settings);
  const cleanPhone = settings.phone.replace(/\s+/g, '');

  return (
    <div className="bg-neutral-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-6" aria-label="Breadcrumb">
          <button onClick={() => onNavigate('/')} className="hover:text-red-600 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-neutral-800">Contact &amp; Physical Branches</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
            Registered Enterprise Locations
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Contact &amp; Enquiry Desk
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
            Reach out to Himal Pahad Tarai Traders Pvt. Ltd. via phone, WhatsApp, or through our persistent enquiry form. We welcome in-person visits to inspect machinery at our Mahottari and Bardibas facilities.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Registered Head Office */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Registered Head Office</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {settings.regAddress}
            </p>
            <p className="text-xs text-neutral-400">
              Mahottari District, Madhesh Province, Nepal
            </p>
          </div>

          {/* Card 2: Branch Facility */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Bardibas Branch</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {settings.branchAddress}
            </p>
            <p className="text-xs text-neutral-400">
              Highway Junction Logistics Corridor, Nepal
            </p>
          </div>

          {/* Card 3: Direct Contacts & WhatsApp */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Direct Consultation</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-neutral-500 text-xs">Phone:</span>
                <a href={`tel:${cleanPhone}`} className="font-semibold text-neutral-900 hover:text-red-600">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500 text-xs">WhatsApp:</span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500 text-xs">Email:</span>
                <a href={`mailto:${settings.email}`} className="text-neutral-700 hover:text-red-600">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Form + Operational Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8">
            <EnquiryForm settings={settings} />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-neutral-900 text-base">Office &amp; Workshop Hours</h3>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-neutral-600 divide-y divide-neutral-100">
                <div className="flex justify-between pt-1">
                  <span>Sunday – Friday</span>
                  <span className="font-semibold text-neutral-900">9:30 AM – 6:00 PM (NPT)</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span>Saturday</span>
                  <span className="font-semibold text-neutral-900">By Appointment / Emergency</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span>WhatsApp Desk</span>
                  <span className="font-semibold text-emerald-600">24/7 Message Reception</span>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-md border border-neutral-800 space-y-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-sm">Need a Written Quotation?</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                If your cooperative, micro-finance group, or enterprise requires a stamped pro-forma quotation for machinery or die sets, specify in your enquiry or message our desk directly.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
