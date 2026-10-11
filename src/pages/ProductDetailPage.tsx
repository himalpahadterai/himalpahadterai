import React, { useState } from 'react';
import { Product, Category, SiteSettings } from '../types';
import { getProductWhatsAppUrl } from '../utils/whatsapp';
import { getProductSchema } from '../utils/seo';
import {
  ChevronRight,
  MessageCircle,
  FileText,
  Phone,
  CheckCircle2,
  AlertCircle,
  Share2,
  Table,
  ShieldCheck,
  Video,
  FileDown,
} from 'lucide-react';
import { EnquiryForm } from '../components/enquiry/EnquiryForm';

interface ProductDetailPageProps {
  product: Product;
  categories: Category[];
  allProducts: Product[];
  settings: SiteSettings;
  onNavigate: (path: string) => void;
  onOpenEnquiryModal: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  categories,
  allProducts,
  settings,
  onNavigate,
  onOpenEnquiryModal,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const category = categories.find((c) => c.id === product.categoryId);
  const categoryName = category ? category.name : 'Machinery';

  const whatsappUrl = getProductWhatsAppUrl(product, settings);

  // Related products in the same category
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId && p.status === 'published')
    .slice(0, 3);

  const images = product.images?.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
  ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const productSchema = getProductSchema(product, settings);

  return (
    <div className="bg-neutral-50 min-h-screen py-8 sm:py-12">
      {/* Inject JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-6 flex-wrap" aria-label="Breadcrumb">
          <button onClick={() => onNavigate('/')} className="hover:text-red-600 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => onNavigate('/machines')} className="hover:text-red-600 cursor-pointer">
            Machinery
          </button>
          {category && (
            <>
              <ChevronRight className="w-3 h-3" />
              <button
                onClick={() => onNavigate(`/categories/${category.slug}`)}
                className="hover:text-red-600 cursor-pointer"
              >
                {categoryName}
              </button>
            </>
          )}
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-neutral-900 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Showcase Section */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xs overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10">
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              {/* Primary Image Viewer */}
              <div className="aspect-[4/3] w-full bg-neutral-100 rounded-xl overflow-hidden relative border border-neutral-200">
                <img
                  src={images[selectedImageIndex] || images[0]}
                  alt={product.imageAlts?.[selectedImageIndex] || product.name}
                  className="w-full h-full object-cover"
                />

                {/* Reference Notice Label */}
                {product.imageSourceNotice && (
                  <div className="absolute bottom-3 left-3 right-3 bg-neutral-950/80 text-white text-xs px-3 py-1 rounded-md backdrop-blur-xs text-center">
                    {product.imageSourceNotice}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-20 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                        selectedImageIndex === idx ? 'border-red-600 ring-2 ring-red-100' : 'border-neutral-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Key Details & Immediate Quotation Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Category & Availability Badges */}
                <div className="flex items-center gap-2.5 flex-wrap mb-3">
                  <span className="text-xs font-semibold bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full">
                    {categoryName}
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      {product.availability === 'in_stock'
                        ? 'In Stock at Bardibas/Mahottari'
                        : product.availability === 'available_on_order'
                        ? 'Available on Order'
                        : 'Inquire Availability & Lead Time'}
                    </span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                  {product.name}
                </h1>

                {/* Pricing Block */}
                <div className="mt-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-500 font-medium block">Price Indication</span>
                    <span className="text-xl sm:text-2xl font-bold text-neutral-900">
                      {product.priceType === 'fixed' && product.price
                        ? `NPR ${product.price}`
                        : 'Request price'}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500 max-w-[180px] text-right">
                    *Ex-warehouse Mahottari / Bardibas. Formal quote on request.
                  </span>
                </div>

                {/* Short Description */}
                <p className="mt-4 text-sm sm:text-base text-neutral-700 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Additional Media Links if provided */}
                <div className="mt-4 flex items-center gap-4 flex-wrap text-xs text-neutral-600">
                  {product.videoUrl && (
                    <a
                      href={product.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 font-medium"
                    >
                      <Video className="w-4 h-4" />
                      <span>Watch Operation Video</span>
                    </a>
                  )}
                  {product.brochureUrl && (
                    <a
                      href={product.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-red-600 font-medium"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Download Brochure</span>
                    </a>
                  )}
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-neutral-800 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{copiedLink ? 'Link copied!' : 'Share product link'}</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Buy Now + Request Quotation */}
              <div className="space-y-3 pt-4 border-t border-neutral-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Buy Now on WhatsApp button */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all text-sm text-center"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0" />
                    <span>Buy Now on WhatsApp</span>
                  </a>

                  {/* Enquire / Request Quotation button */}
                  <button
                    onClick={onOpenEnquiryModal}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all text-sm cursor-pointer text-center"
                  >
                    <FileText className="w-5 h-5 shrink-0" />
                    <span>Enquire / Request Quote</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-500 px-1 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Direct manufacturer enquiry desk
                  </span>
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="hover:text-red-600 font-medium"
                  >
                    Call: {settings.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description & Specifications Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Detailed Description */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Product Overview &amp; Intended Use
            </h2>
            <div className="text-sm sm:text-base text-neutral-700 leading-relaxed whitespace-pre-line">
              {product.detailedDescription || product.shortDescription}
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 bg-neutral-50 p-4 rounded-xl">
              <h4 className="font-bold text-neutral-900 text-sm mb-1">
                Technical Training &amp; Commissioning
              </h4>
              <p className="text-xs text-neutral-600">
                Himal Pahad Tarai Traders provides technical guidance, trial runs, and maintenance tips with every machine supplied to domestic enterprises across Nepal.
              </p>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-4">
              <Table className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-bold text-neutral-900">
                Verified Specifications
              </h2>
            </div>

            {product.specifications && product.specifications.length > 0 ? (
              <div className="divide-y divide-neutral-100 text-xs sm:text-sm">
                {product.specifications.map((spec, i) => (
                  <div key={i} className="py-2.5 flex justify-between gap-4">
                    <span className="font-medium text-neutral-600">{spec.label}</span>
                    <span className="font-semibold text-neutral-900 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500 py-4">
                Detailed custom specifications are prepared according to motor phase and die configuration on quotation.
              </p>
            )}

            <div className="mt-6 pt-4 border-t border-neutral-100">
              <button
                onClick={onOpenEnquiryModal}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer text-center"
              >
                Inquire Specific Technical Customization
              </button>
            </div>
          </div>
        </div>

        {/* Embedded Persistent Enquiry Form specifically for this Machine */}
        <div className="mb-14">
          <EnquiryForm
            settings={settings}
            preselectedProduct={product}
            onSuccess={() => {}}
          />
        </div>

        {/* Related Machines in Same Category */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 mb-6">
              Related Machinery in {categoryName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigate(`/machines/${rel.slug}`)}
                  className="bg-white rounded-xl border border-neutral-200 p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 mb-3">
                    <img
                      src={rel.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-red-600 line-clamp-1">
                    {rel.name}
                  </h3>
                  <div className="mt-2 flex items-center justify-between text-xs text-neutral-500">
                    <span>{rel.priceType === 'fixed' ? `NPR ${rel.price}` : 'Request price'}</span>
                    <span className="text-red-600 font-semibold group-hover:underline">View Machine &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
