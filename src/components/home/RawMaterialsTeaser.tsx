import React from 'react';
import { Package, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';

interface RawMaterialsTeaserProps {
  onNavigate: (path: string) => void;
  onOpenEnquiryModal: () => void;
}

export const RawMaterialsTeaser: React.FC<RawMaterialsTeaserProps> = ({
  onNavigate,
  onOpenEnquiryModal,
}) => {
  return (
    <section className="py-14 sm:py-20 bg-neutral-900 text-white relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest block mb-2">
            Integrated Enterprise Support
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Raw Materials &amp; Technical Training
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-300">
            A machine without consistent materials or operational understanding cannot succeed. We connect small producers with reliable supply lines and machine operation guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Raw Materials */}
          <div className="bg-neutral-800/80 rounded-2xl p-6 sm:p-8 border border-neutral-700/80 flex flex-col justify-between backdrop-blur-xs">
            <div>
              <div className="w-12 h-12 bg-red-600/20 text-red-500 rounded-xl flex items-center justify-center mb-6">
                <Package className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-white">
                Reliable Raw Material Linkages
              </h3>

              <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
                We assist local entrepreneurs in procuring factory-grade materials for small-scale manufacture:
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                  <span>EVA &amp; Rubber foam sheets, straps (fita), and soles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Bamboo incense sticks, charcoal premix, and fragrance oils</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Laminated PE paper rolls, plates, and Sal leaf connections</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Detergent chemical additives and continuous sealing rolls</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-neutral-700 flex items-center justify-between">
              <button
                onClick={() => onNavigate('/raw-materials-and-training')}
                className="text-xs sm:text-sm font-semibold text-red-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Read Supply Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenEnquiryModal}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Enquire Materials
              </button>
            </div>
          </div>

          {/* Card 2: Training Guidance */}
          <div className="bg-neutral-800/80 rounded-2xl p-6 sm:p-8 border border-neutral-700/80 flex flex-col justify-between backdrop-blur-xs">
            <div>
              <div className="w-12 h-12 bg-red-600/20 text-red-500 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-white">
                Practical Technical Orientation
              </h3>

              <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
                Operating cottage machinery with confidence requires practical understanding of mechanics, safety, and daily upkeep:
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Die mounting, pressure adjustment, and heater calibration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Preventive maintenance: lubricating pumps, checking hydraulic seals</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Operator safety procedures and troubleshooting electrical controls</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Hands-on trial runs prior to installation</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-neutral-700 flex items-center justify-between">
              <button
                onClick={() => onNavigate('/raw-materials-and-training')}
                className="text-xs sm:text-sm font-semibold text-red-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Training Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenEnquiryModal}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Request Training Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
