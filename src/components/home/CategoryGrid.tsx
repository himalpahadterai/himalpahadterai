import React from 'react';
import { Category } from '../../types';
import { ArrowRight, Layers } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
  onNavigate: (path: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onNavigate }) => {
  const publishedCategories = categories.filter(c => c.status === 'published').sort((a, b) => a.order - b.order);

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-widest mb-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Small &amp; Cottage Manufacturing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Machinery Categories
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-neutral-600 max-w-2xl">
              Equip your local production unit with durable, tested machinery for domestic and commercial consumer goods.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/machines')}
            className="text-red-600 hover:text-red-700 font-semibold text-sm inline-flex items-center gap-1.5 self-start md:self-end group cursor-pointer"
          >
            <span>View Complete Catalogue</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(`/categories/${cat.slug}`)}
              className="group relative bg-neutral-50 hover:bg-white rounded-xl border border-neutral-200 hover:border-red-400/80 shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              {/* Category Image */}
              <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-200 relative">
                <img
                  src={cat.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-white font-bold text-base sm:text-lg drop-shadow-xs">
                  {cat.name}
                </span>
              </div>

              {/* Description & Action */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 mb-4 leading-relaxed">
                  {cat.description}
                </p>

                <div className="flex items-center justify-between text-xs font-semibold text-red-600 group-hover:text-red-700 pt-2 border-t border-neutral-100">
                  <span>Browse Category Machines</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
