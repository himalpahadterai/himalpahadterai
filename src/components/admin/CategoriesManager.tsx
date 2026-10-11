import React, { useState } from 'react';
import { Category } from '../../types';
import { saveCategory, deleteCategory } from '../../services/dataService';
import { Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';

interface CategoriesManagerProps {
  categories: Category[];
  onRefresh: () => void;
}

export const CategoriesManager: React.FC<CategoriesManagerProps> = ({ categories, onRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Partial<Category> | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setCurrentCategory({
      name: '',
      slug: '',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      order: categories.length + 1,
      status: 'published',
    });
    setIsEditing(true);
    setError(null);
  };

  const handleOpenEdit = (cat: Category) => {
    setCurrentCategory({ ...cat });
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
    if (!currentCategory?.name || !currentCategory?.slug) {
      setError('Name and slug are required.');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const categoryToSave: Category = {
        id: currentCategory.id || `cat-${Date.now()}`,
        name: currentCategory.name,
        slug: currentCategory.slug,
        description: currentCategory.description || '',
        imageUrl: currentCategory.imageUrl || '',
        order: Number(currentCategory.order) || 1,
        status: currentCategory.status || 'published',
        createdAt: currentCategory.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveCategory(categoryToSave);
      setIsEditing(false);
      onRefresh();
    } catch (err: any) {
      console.error('Error saving category:', err);
      setError(err?.message || 'Failed to save category.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      setDeletingId(null);
      onRefresh();
    } catch (err: any) {
      console.error('Error deleting category:', err);
      alert('Could not delete category: ' + (err?.message || 'Permission denied'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Machine Categories Taxonomy</h2>
          <p className="text-xs text-neutral-500">
            Define machinery sectors, display ordering, and category thumbnails.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-2xs self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Category Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-neutral-500">{cat.order}</td>
                  <td className="py-3 px-4 font-semibold text-neutral-900">{cat.name}</td>
                  <td className="py-3 px-4 font-mono text-neutral-500 text-xs">{cat.slug}</td>
                  <td className="py-3 px-4 text-neutral-600 max-w-xs truncate">{cat.description}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        cat.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {cat.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="text-neutral-600 hover:text-red-600 p-1 rounded cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingId(cat.id)}
                      className="text-neutral-400 hover:text-red-600 p-1 rounded cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {isEditing && currentCategory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-neutral-200 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
              <h3 className="font-bold text-base text-neutral-900">
                {currentCategory.id ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded text-neutral-400 hover:text-neutral-600 cursor-pointer"
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
              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={currentCategory.name || ''}
                  onChange={(e) => {
                    const name = e.target.value;
                    setCurrentCategory({
                      ...currentCategory,
                      name,
                      slug: currentCategory.slug ? currentCategory.slug : generateSlug(name),
                    });
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={currentCategory.slug || ''}
                  onChange={(e) =>
                    setCurrentCategory({ ...currentCategory, slug: generateSlug(e.target.value) })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={currentCategory.description || ''}
                  onChange={(e) =>
                    setCurrentCategory({ ...currentCategory, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Image URL</label>
                <input
                  type="url"
                  value={currentCategory.imageUrl || ''}
                  onChange={(e) =>
                    setCurrentCategory({ ...currentCategory, imageUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Display Order</label>
                  <input
                    type="number"
                    min={1}
                    value={currentCategory.order || 1}
                    onChange={(e) =>
                      setCurrentCategory({ ...currentCategory, order: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Status</label>
                  <select
                    value={currentCategory.status || 'published'}
                    onChange={(e) =>
                      setCurrentCategory({
                        ...currentCategory,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-xl cursor-pointer"
                >
                  {saving ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-neutral-200 shadow-xl text-center">
            <Trash2 className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-900 mb-1">Delete Category?</h3>
            <p className="text-xs text-neutral-500 mb-6">
              Are you sure you want to delete this category from the database?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-xs rounded-lg border border-neutral-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
