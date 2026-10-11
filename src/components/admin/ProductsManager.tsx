import React, { useState } from 'react';
import { Product, Category, ProductSpec, ProductStatus, PriceType, AvailabilityStatus } from '../../types';
import { saveProduct, deleteProduct } from '../../services/dataService';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  ExternalLink,
  AlertCircle,
  PlusCircle,
  MinusCircle,
  Layers,
} from 'lucide-react';

interface ProductsManagerProps {
  products: Product[];
  categories: Category[];
  onRefresh: () => void;
}

export const ProductsManager: React.FC<ProductsManagerProps> = ({
  products,
  categories,
  onRefresh,
}) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Specifications state for active editing product
  const [specs, setSpecs] = useState<ProductSpec[]>([]);
  // Image URLs state
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const filteredProducts = products.filter((p) => {
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
    }
    return true;
  });

  const handleOpenAdd = () => {
    setCurrentProduct({
      name: '',
      slug: '',
      categoryId: categories[0]?.id || '',
      shortDescription: '',
      detailedDescription: '',
      images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'],
      imageAlts: ['Industrial machinery unit'],
      imageSourceNotice: 'Reference image—actual model may vary',
      price: 'Request price',
      priceType: 'request_price',
      currency: 'NPR',
      availability: 'available_on_order',
      featured: false,
      status: 'draft',
      specifications: [
        { label: 'Operation Type', value: 'Semi-Automatic' },
        { label: 'Power Source', value: 'Single Phase 220V' },
      ],
    });
    setSpecs([
      { label: 'Operation Type', value: 'Semi-Automatic' },
      { label: 'Power Source', value: 'Single Phase 220V' },
    ]);
    setImageUrls(['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80']);
    setIsEditing(true);
    setError(null);
  };

  const handleOpenEdit = (product: Product) => {
    setCurrentProduct({ ...product });
    setSpecs(product.specifications || []);
    setImageUrls(product.images || []);
    setIsEditing(true);
    setError(null);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct?.name || !currentProduct?.slug || !currentProduct?.categoryId) {
      setError('Name, Slug, and Category are required.');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const productToSave: Product = {
        id: currentProduct.id || `prod-${Date.now()}`,
        name: currentProduct.name,
        slug: currentProduct.slug,
        categoryId: currentProduct.categoryId,
        shortDescription: currentProduct.shortDescription || '',
        detailedDescription: currentProduct.detailedDescription || currentProduct.shortDescription || '',
        images: imageUrls.filter((url) => url.trim().length > 0),
        imageAlts: imageUrls.map((_, i) => `${currentProduct.name} image ${i + 1}`),
        imageSourceNotice: currentProduct.imageSourceNotice || 'Reference image—actual model may vary',
        specifications: specs.filter((s) => s.label.trim().length > 0),
        price: currentProduct.price || 'Request price',
        priceType: (currentProduct.priceType as PriceType) || 'request_price',
        currency: 'NPR',
        availability: (currentProduct.availability as AvailabilityStatus) || 'available_on_order',
        featured: !!currentProduct.featured,
        videoUrl: currentProduct.videoUrl || '',
        brochureUrl: currentProduct.brochureUrl || '',
        seoTitle: currentProduct.seoTitle || `${currentProduct.name} | Himal Pahad Tarai Traders`,
        seoDescription: currentProduct.seoDescription || currentProduct.shortDescription || '',
        status: (currentProduct.status as ProductStatus) || 'draft',
        createdAt: currentProduct.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveProduct(productToSave);
      setIsEditing(false);
      onRefresh();
    } catch (err: any) {
      console.error('Error saving product:', err);
      setError(err?.message || 'Failed to save product to Firestore.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setDeletingId(null);
      onRefresh();
    } catch (err: any) {
      console.error('Error deleting product:', err);
      alert('Could not delete product: ' + (err?.message || 'Permission denied'));
    }
  };

  const handleAddSpecRow = () => {
    setSpecs([...specs, { label: '', value: '' }]);
  };

  const handleRemoveSpecRow = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  const handleRemoveImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Machinery Catalogue Management</h2>
          <p className="text-xs text-neutral-500">
            Create, edit, draft, and archive industrial machines and specifications.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-2xs self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Machine</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or slug..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-1 focus:ring-red-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs">
          <span className="text-neutral-500">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white"
          >
            <option value="all">All ({products.length})</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Machine Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price Indicator</th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredProducts.map((p) => {
                const category = categories.find((c) => c.id === p.categoryId);
                return (
                  <tr key={p.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-neutral-900">{p.name}</div>
                      <div className="text-[11px] font-mono text-neutral-400">/{p.slug}</div>
                      {p.featured && (
                        <span className="inline-block mt-1 text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-neutral-700">
                      {category ? category.name : 'Unassigned'}
                    </td>
                    <td className="py-3 px-4 font-medium text-neutral-900">
                      {p.priceType === 'fixed' && p.price ? `NPR ${p.price}` : 'Request price'}
                    </td>
                    <td className="py-3 px-4 text-neutral-600">
                      <span className="capitalize">{p.availability.replace(/_/g, ' ')}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          p.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700'
                            : p.status === 'draft'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="text-neutral-600 hover:text-red-600 p-1 rounded cursor-pointer"
                        title="Edit machine"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingId(p.id)}
                        className="text-neutral-400 hover:text-red-600 p-1 rounded cursor-pointer"
                        title="Delete machine"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {isEditing && currentProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
              <h3 className="font-bold text-lg text-neutral-900">
                {currentProduct.id ? 'Edit Machinery Product' : 'Add New Machinery Product'}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">
                    Machine Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={currentProduct.name || ''}
                    onChange={(e) => {
                      const name = e.target.value;
                      setCurrentProduct({
                        ...currentProduct,
                        name,
                        slug: currentProduct.slug ? currentProduct.slug : generateSlug(name),
                      });
                    }}
                    placeholder="e.g. Hydraulic Slipper Sole Cutting Press"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-1 focus:ring-red-500"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={currentProduct.slug || ''}
                    onChange={(e) =>
                      setCurrentProduct({ ...currentProduct, slug: generateSlug(e.target.value) })
                    }
                    placeholder="e.g. hydraulic-slipper-sole-cutting-press"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 font-mono text-xs focus:ring-1 focus:ring-red-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Category *</label>
                  <select
                    value={currentProduct.categoryId || ''}
                    onChange={(e) =>
                      setCurrentProduct({ ...currentProduct, categoryId: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Publish Status</label>
                  <select
                    value={currentProduct.status || 'draft'}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        status: e.target.value as ProductStatus,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                  >
                    <option value="draft">Draft (Private)</option>
                    <option value="published">Published (Public)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Price Type */}
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Pricing Model</label>
                  <select
                    value={currentProduct.priceType || 'request_price'}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        priceType: e.target.value as PriceType,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                  >
                    <option value="request_price">Request price (Recommended)</option>
                    <option value="fixed">Fixed Price in NPR</option>
                  </select>
                </div>

                {/* Price Field */}
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">
                    Price Value
                  </label>
                  <input
                    type="text"
                    value={currentProduct.price || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                    placeholder={currentProduct.priceType === 'fixed' ? 'e.g. 185000' : 'Request price'}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>

                {/* Availability */}
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Availability Status</label>
                  <select
                    value={currentProduct.availability || 'available_on_order'}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        availability: e.target.value as AvailabilityStatus,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                  >
                    <option value="available_on_order">Available on Order</option>
                    <option value="in_stock">In Stock at Mahottari/Bardibas</option>
                    <option value="inquire_lead_time">Inquire Lead Time</option>
                  </select>
                </div>

                {/* Featured */}
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={!!currentProduct.featured}
                      onChange={(e) =>
                        setCurrentProduct({ ...currentProduct, featured: e.target.checked })
                      }
                      className="rounded border-neutral-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="font-semibold text-neutral-800">Featured on Homepage</span>
                  </label>
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  Short Summary (1-2 sentences) *
                </label>
                <input
                  type="text"
                  required
                  value={currentProduct.shortDescription || ''}
                  onChange={(e) =>
                    setCurrentProduct({ ...currentProduct, shortDescription: e.target.value })
                  }
                  placeholder="Concise overview for listing cards..."
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  Detailed Description &amp; Technical Capabilities
                </label>
                <textarea
                  rows={4}
                  value={currentProduct.detailedDescription || ''}
                  onChange={(e) =>
                    setCurrentProduct({ ...currentProduct, detailedDescription: e.target.value })
                  }
                  placeholder="Comprehensive specifications, die compatibility, intended use..."
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              {/* Image Notice Label */}
              <div>
                <label className="block font-semibold text-neutral-800 mb-1">
                  Image Source / Disclaimer Label
                </label>
                <input
                  type="text"
                  value={currentProduct.imageSourceNotice || ''}
                  onChange={(e) =>
                    setCurrentProduct({ ...currentProduct, imageSourceNotice: e.target.value })
                  }
                  placeholder="e.g. Reference image—actual model may vary"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              {/* Image URLs Editor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-semibold text-neutral-800">Gallery Image URLs</label>
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Image URL</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {imageUrls.map((url, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => {
                          const updated = [...imageUrls];
                          updated[idx] = e.target.value;
                          setImageUrls(updated);
                        }}
                        placeholder="https://..."
                        className="flex-1 px-3 py-1.5 rounded-lg border border-neutral-300 text-xs"
                      />
                      {imageUrls.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImageUrl(idx)}
                          className="text-neutral-400 hover:text-red-600 cursor-pointer"
                        >
                          <MinusCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications Table Editor */}
              <div className="pt-2 border-t border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-semibold text-neutral-800">
                    Verified Specifications Table
                  </label>
                  <button
                    type="button"
                    onClick={handleAddSpecRow}
                    className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Specification Row</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {specs.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={s.label}
                        onChange={(e) => {
                          const updated = [...specs];
                          updated[idx].label = e.target.value;
                          setSpecs(updated);
                        }}
                        placeholder="Parameter (e.g. Motor Power)"
                        className="w-1/2 px-3 py-1.5 rounded-lg border border-neutral-300 text-xs"
                      />
                      <input
                        type="text"
                        value={s.value}
                        onChange={(e) => {
                          const updated = [...specs];
                          updated[idx].value = e.target.value;
                          setSpecs(updated);
                        }}
                        placeholder="Value (e.g. 2 HP Single Phase)"
                        className="w-1/2 px-3 py-1.5 rounded-lg border border-neutral-300 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecRow(idx)}
                        className="text-neutral-400 hover:text-red-600 cursor-pointer"
                      >
                        <MinusCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-neutral-400 text-white font-semibold px-6 py-2 rounded-xl cursor-pointer"
                >
                  {saving ? 'Saving...' : 'Save Product Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-neutral-200 shadow-xl text-center">
            <Trash2 className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-900 mb-1">Confirm Machine Deletion</h3>
            <p className="text-xs text-neutral-500 mb-6">
              Are you sure you want to delete this machine? This action will remove the record from Cloud Firestore.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-xs rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                Yes, Delete Machine
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
