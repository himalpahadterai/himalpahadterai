import React from 'react';
import { Category, Product } from '../types';
import { ChevronRight, ArrowRight, Layers } from 'lucide-react';

interface CategoriesPageProps {
  categories: Category[];
  products: Product[];
  onNavigate: (path: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  categories,
  products,
  onNavigate,
}) => {
  const publishedCategories = categories
    .filter((c) => c.status === 'published')
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-neutral-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-6" aria-label="Breadcrumb">
          <button onClick={() => onNavigate('/')} className="hover:text-red-600 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-neutral-800">Machinery Categories</span>
        </nav>

        {/* Page Header */}
        <div className="mb-10">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
            Manufacturing Sectors
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Industrial &amp; Cottage Machinery Categories
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-3xl leading-relaxed">
            Select a specialized category to view available machines, dies, compatible raw materials, and technical specifications for setting up domestic production in Nepal.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedCategories.map((cat) => {
            const count = products.filter(
              (p) => p.status === 'published' && p.categoryId === cat.id
            ).length;

            return (
              <div
                key={cat.id}
                onClick={() => onNavigate(`/categories/${cat.slug}`)}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] w-full bg-neutral-100 overflow-hidden relative">
                    <img
                      src={cat.imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 text-white font-bold text-lg drop-shadow-xs">
                      {cat.name}
                    </span>
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                      {cat.description}
                    </p>
                    <span className="inline-block text-xs font-semibold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-md">
                      {count} {count === 1 ? 'Machine Model' : 'Machine Models'} Available
                    </span>
                  </div>
                </div>

                <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-red-600 group-hover:text-red-700">
                  <span>Explore Machinery &amp; Dies</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
