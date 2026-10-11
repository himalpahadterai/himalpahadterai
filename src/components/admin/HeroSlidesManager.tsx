import React, { useState } from 'react';
import { HeroSlide } from '../../types';
import { saveHeroSlide, deleteHeroSlide } from '../../services/dataService';
import { Plus, Edit2, Trash2, X, AlertCircle } from 'lucide-react';

interface HeroSlidesManagerProps {
  slides: HeroSlide[];
  onRefresh: () => void;
}

export const HeroSlidesManager: React.FC<HeroSlidesManagerProps> = ({ slides, onRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<Partial<HeroSlide>>({});
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setCurrentSlide({
      title: '',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
      buttonText: 'Explore Machines',
      buttonLink: '/machines',
      order: slides.length + 1,
      status: 'published',
    });
    setIsEditing(true);
    setError(null);
  };

  const handleOpenEdit = (slide: HeroSlide) => {
    setCurrentSlide({ ...slide });
    setIsEditing(true);
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSlide.title || !currentSlide.imageUrl) {
      setError('Slide title and image URL are required.');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const slideToSave: HeroSlide = {
        id: currentSlide.id || `slide-${Date.now()}`,
        title: currentSlide.title,
        description: currentSlide.description || '',
        imageUrl: currentSlide.imageUrl,
        buttonText: currentSlide.buttonText || 'Explore Machines',
        buttonLink: currentSlide.buttonLink || '/machines',
        order: Number(currentSlide.order) || 1,
        status: currentSlide.status || 'published',
        createdAt: currentSlide.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveHeroSlide(slideToSave);
      setIsEditing(false);
      onRefresh();
    } catch (err: any) {
      console.error('Error saving slide:', err);
      setError(err?.message || 'Failed to save slide.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteHeroSlide(id);
      setDeletingId(null);
      onRefresh();
    } catch (err: any) {
      alert('Could not delete slide: ' + (err?.message || 'Permission denied'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Homepage Hero Slider CRUD</h2>
          <p className="text-xs text-neutral-500">
            Control full-width banners, headings, ordering, and button destinations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-2xs self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Slide</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/9] w-full bg-neutral-100 overflow-hidden relative">
                <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-neutral-900/80 text-white text-[11px] font-mono px-2 py-0.5 rounded">
                  Order: #{slide.order}
                </span>
                <span
                  className={`absolute top-2 right-2 text-[11px] font-semibold px-2 py-0.5 rounded ${
                    slide.status === 'published' ? 'bg-emerald-600 text-white' : 'bg-neutral-600 text-white'
                  }`}
                >
                  {slide.status}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm text-neutral-900 line-clamp-1">{slide.title}</h3>
                <p className="text-xs text-neutral-600 line-clamp-2 mt-1">{slide.description}</p>
                <div className="mt-3 text-[11px] text-neutral-400">
                  Button: <span className="font-semibold text-neutral-700">{slide.buttonText}</span> &rarr;{' '}
                  <span className="font-mono">{slide.buttonLink}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center justify-end gap-2 border-t border-neutral-100 mt-2">
              <button
                onClick={() => handleOpenEdit(slide)}
                className="text-xs text-neutral-600 hover:text-red-600 font-semibold p-1 cursor-pointer flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setDeletingId(slide.id)}
                className="text-xs text-neutral-400 hover:text-red-600 font-semibold p-1 cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-neutral-200 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
              <h3 className="font-bold text-base text-neutral-900">
                {currentSlide.id ? 'Edit Hero Slide' : 'Add New Hero Slide'}
              </h3>
              <button onClick={() => setIsEditing(false)} className="p-1 text-neutral-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-2.5 rounded bg-red-50 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Slide Title *</label>
                <input
                  type="text"
                  required
                  value={currentSlide.title || ''}
                  onChange={(e) => setCurrentSlide({ ...currentSlide, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={currentSlide.description || ''}
                  onChange={(e) => setCurrentSlide({ ...currentSlide, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Hero Image URL *</label>
                <input
                  type="url"
                  required
                  value={currentSlide.imageUrl || ''}
                  onChange={(e) => setCurrentSlide({ ...currentSlide, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Button Label</label>
                  <input
                    type="text"
                    value={currentSlide.buttonText || ''}
                    onChange={(e) => setCurrentSlide({ ...currentSlide, buttonText: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Destination URL</label>
                  <input
                    type="text"
                    value={currentSlide.buttonLink || ''}
                    onChange={(e) => setCurrentSlide({ ...currentSlide, buttonLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Slide Order</label>
                  <input
                    type="number"
                    min={1}
                    value={currentSlide.order || 1}
                    onChange={(e) =>
                      setCurrentSlide({ ...currentSlide, order: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-800 mb-1">Status</label>
                  <select
                    value={currentSlide.status || 'published'}
                    onChange={(e) =>
                      setCurrentSlide({ ...currentSlide, status: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-xl cursor-pointer"
                >
                  {saving ? 'Saving...' : 'Save Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
            <Trash2 className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <h3 className="font-bold text-base text-neutral-900 mb-1">Delete Slide?</h3>
            <p className="text-xs text-neutral-500 mb-6">Are you sure you want to remove this hero slide?</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-xs border rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                className="bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                Delete Slide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
