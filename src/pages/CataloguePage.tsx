import React, { useState, useMemo } from 'react';
import { Product, Category, SiteSettings } from '../types';
import { Search, Filter, MessageCircle, FileText, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

interface CataloguePageProps {
  products: Product[];
  categories: Category[];
  settings: SiteSettings;
  selectedCategorySlug?: string;
  onNavigate: (path: string) => void;
  onSelectProductForEnquiry: (product: Product) => void;
}

const ITEMS_PER_PAGE = 6;

export const CataloguePage: React.FC<CataloguePageProps> = ({
  products,
  categories,
  settings,
  selectedCategorySlug,
  onNavigate,
  onSelectProductForEnquiry,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(selectedCategorySlug || 'all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Sync with prop if it changes
  React.useEffect(() => {
    if (selectedCategorySlug) {
      setActiveCategorySlug(selectedCategorySlug);
    }
  }, [selectedCategorySlug]);

  const publishedCategories = categories.filter(c => c.status === 'published').sort((a, b) => a.order - b.order);

  // Filter published products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.status === 'published')
      .filter((p) => {
        // Category filter
        if (activeCategorySlug !== 'all') {
          const cat = categories.find((c) => c.slug === activeCategorySlug);
          if (cat && p.categoryId !== cat.id) return false;
        }

        // Availability filter
        if (availabilityFilter !== 'all' && p.availability !== availabilityFilter) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.shortDescription.toLowerCase().includes(q) || p.detailedDescription.toLowerCase().includes(q);
          return matchName || matchDesc;
        }

        return true;
      });
  }, [products, categories, activeCategorySlug, availabilityFilter, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getCategoryName = (catId: string) => {
    const found = categories.find((c) => c.id === catId);
    return found ? found.name : 'Machinery';
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-6" aria-label="Breadcrumb">
          <button onClick={() => onNavigate('/')} className="hover:text-red-600 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-neutral-800">Machinery Catalogue</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Small &amp; Domestic Industry Machinery Catalogue
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
            Browse our catalogue of slipper making, agarbatti, paper plate, dona–tapari, and packaging machinery. All products are backed by verified consultation, technical guidance, and direct quotation through our Mahottari desk.
          </p>
        </div>

        {/* Search & Filters Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-2xs mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search machines by name or keyword..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-3">
              <select
                value={activeCategorySlug}
                onChange={(e) => {
                  setActiveCategorySlug(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full py-2.5 px-3 text-sm rounded-xl border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
              >
                <option value="all">All Categories</option>
                {publishedCategories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Dropdown */}
            <div className="md:col-span-3">
              <select
                value={availabilityFilter}
                onChange={(e) => {
                  setAvailabilityFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full py-2.5 px-3 text-sm rounded-xl border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
              >
                <option value="all">All Availability</option>
                <option value="in_stock">In Stock</option>
                <option value="available_on_order">Available on Order</option>
                <option value="inquire_lead_time">Inquire Lead Time</option>
              </select>
            </div>
          </div>

          {/* Category Quick Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
            <button
              onClick={() => {
                setActiveCategorySlug('all');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                activeCategorySlug === 'all'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All Machinery ({products.filter((p) => p.status === 'published').length})
            </button>
            {publishedCategories.map((cat) => {
              const count = products.filter(
                (p) => p.status === 'published' && p.categoryId === cat.id
              ).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategorySlug(cat.slug);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                    activeCategorySlug === cat.slug
                      ? 'bg-red-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-xl mx-auto">
            <Layers className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-neutral-900 mb-1">No machinery matched your query</h3>
            <p className="text-xs sm:text-sm text-neutral-600 mb-4">
              Try adjusting your search terms or view our complete category listings.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategorySlug('all');
                setAvailabilityFilter('all');
              }}
              className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => {
              const whatsappUrl = getProductWhatsAppUrl(product, settings);
              const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
              const categoryName = getCategoryName(product.categoryId);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Image Container */}
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

                      <span className="absolute top-3 left-3 bg-neutral-900/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                        {categoryName}
                      </span>

                      {product.imageSourceNotice && (
                        <span className="absolute bottom-2 left-2 right-2 bg-neutral-950/75 text-neutral-200 text-[10px] px-2 py-0.5 rounded-sm backdrop-blur-xs text-center truncate">
                          {product.imageSourceNotice}
                        </span>
                      )}
                    </div>

                    {/* Content */}
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

                      {/* Pricing & Status */}
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

                  {/* WhatsApp Buy Now & Enquiry Buttons */}
                  <div className="p-4 sm:p-5 pt-0 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold py-2.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs text-center"
                      >
                        <MessageCircle className="w-4 h-4 shrink-0" />
                        <span className="truncate">Buy on WhatsApp</span>
                      </a>

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
                      View Full Specs &amp; Technical Details &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-neutral-300 bg-white text-xs font-semibold text-neutral-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:bg-neutral-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-9 h-9 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  currentPage === idx + 1
                    ? 'bg-red-600 text-white'
                    : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-neutral-300 bg-white text-xs font-semibold text-neutral-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:bg-neutral-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
