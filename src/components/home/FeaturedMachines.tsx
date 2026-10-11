import React from 'react';
import { Product, SiteSettings, Category } from '../../types';
import { MessageCircle, FileText, ExternalLink, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { getProductWhatsAppUrl } from '../../utils/whatsapp';

interface FeaturedMachinesProps {
  products: Product[];
  categories: Category[];
  settings: SiteSettings;
  onNavigate: (path: string) => void;
  onSelectProductForEnquiry: (product: Product) => void;
}

export const FeaturedMachines: React.FC<FeaturedMachinesProps> = ({
  products,
  categories,
  settings,
  onNavigate,
  onSelectProductForEnquiry,
}) => {
  const publishedProducts = products
    .filter((p) => p.status === 'published')
    .slice(0, 6);

  const getCategoryName = (catId: string) => {
    const found = categories.find((c) => c.id === catId);
    return found ? found.name : 'Machinery';
  };

  return (
    <section className="py-12 sm:py-16 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
              Tested &amp; Available Models
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Featured Machinery
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-neutral-600 max-w-2xl">
              Transparent, enquiry-based machinery procurement. Contact our desk on WhatsApp or submit a quotation request for verified technical parameters and lead times.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/machines')}
            className="text-red-600 hover:text-red-700 font-semibold text-sm inline-flex items-center gap-1.5 self-start md:self-end group cursor-pointer"
          >
            <span>Browse All {products.filter((p) => p.status === 'published').length} Machines</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedProducts.map((product) => {
            const whatsappUrl = getProductWhatsAppUrl(product, settings);
            const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
            const categoryName = getCategoryName(product.categoryId);

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Image Container with Label */}
                  <div
                    onClick={() => onNavigate(`/machines/${product.slug}`)}
                    className="aspect-[4/3] w-full bg-neutral-100 overflow-hidden relative cursor-pointer"
                  >
                    <img
                      src={mainImage}
                      alt={product.imageAlts?.[0] || product.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Category Tag */}
                    <span className="absolute top-3 left-3 bg-neutral-900/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                      {categoryName}
                    </span>

                    {/* Reference Image Notice */}
                    {product.imageSourceNotice && (
                      <span className="absolute bottom-2 left-2 right-2 bg-neutral-950/75 text-neutral-200 text-[10px] px-2 py-0.5 rounded-sm backdrop-blur-xs text-center truncate">
                        {product.imageSourceNotice}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5">
                    <h3
                      onClick={() => onNavigate(`/machines/${product.slug}`)}
                      className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-red-600 transition-colors cursor-pointer line-clamp-2"
                    >
                      {product.name}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Pricing & Status Tag */}
                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-neutral-500 uppercase block font-medium">Pricing</span>
                        <span className="text-sm font-bold text-neutral-900">
                          {product.priceType === 'fixed' && product.price
                            ? `NPR ${product.price}`
                            : 'Request price'}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-neutral-500 uppercase block font-medium">Status</span>
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>
                            {product.availability === 'in_stock'
                              ? 'In Stock'
                              : product.availability === 'available_on_order'
                              ? 'Available on Order'
                              : 'Inquire Availability'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Buy Now on WhatsApp + Enquire */}
                <div className="p-4 sm:p-5 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Buy Now on WhatsApp button */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold py-2.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs text-center"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      <span className="truncate">Buy on WhatsApp</span>
                    </a>

                    {/* Enquire / Request Quotation */}
                    <button
                      onClick={() => onSelectProductForEnquiry(product)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold py-2.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer text-center"
                    >
                      <FileText className="w-4 h-4 shrink-0" />
                      <span className="truncate">Enquire Quote</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onNavigate(`/machines/${product.slug}`)}
                    className="w-full text-center text-xs text-neutral-600 hover:text-red-600 font-medium py-1 cursor-pointer transition-colors"
                  >
                    View Specs &amp; Technical Details &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
