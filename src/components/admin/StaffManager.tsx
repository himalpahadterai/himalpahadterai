import React, { useState } from 'react';
import { StaffProfile, StaffRole } from '../../types';
import { saveStaffProfile } from '../../services/dataService';
import { Plus, UserCheck, ShieldAlert, X, AlertCircle } from 'lucide-react';

interface StaffManagerProps {
  staff: StaffProfile[];
  onRefresh: () => void;
}

export const StaffManager: React.FC<StaffManagerProps> = ({ staff, onRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentStaff, setCurrentStaff] = useState<Partial<StaffProfile>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setCurrentStaff({
      uid: `staff-${Date.now()}`,
      email: '',
      displayName: '',
      role: 'sales_staff',
      status: 'active',
    });
    setIsEditing(true);
    setError(null);
  };

  const handleOpenEdit = (s: StaffProfile) => {
    setCurrentStaff({ ...s });
    setIsEditing(true);
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStaff.uid || !currentStaff.email || !currentStaff.role) {
      setError('UID/ID, Email, and Role are required.');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const profileToSave: StaffProfile = {
        uid: currentStaff.uid,
        email: currentStaff.email.trim(),
        displayName: currentStaff.displayName || currentStaff.email.split('@')[0],
        role: currentStaff.role as StaffRole,
        status: (currentStaff.status as any) || 'active',
        createdAt: currentStaff.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveStaffProfile(profileToSave);
      setIsEditing(false);
      onRefresh();
    } catch (err: any) {
      console.error('Error saving staff profile:', err);
      setError(err?.message || 'Failed to save staff profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Staff &amp; Role-Based Access Control</h2>
          <p className="text-xs text-neutral-500">
            Super Admin access: assign privileges to Sales Staff, Content Editors, and Administrators.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-2xs self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Name / Email</th>
                <th className="py-3 px-4">Firebase UID</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {staff.map((s) => (
                <tr key={s.uid} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-neutral-900">{s.displayName || 'Staff Member'}</div>
                    <div className="text-xs text-neutral-500">{s.email}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-neutral-400 truncate max-w-[140px]">
                    {s.uid}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                        s.role === 'super_admin'
                          ? 'bg-red-50 text-red-700'
                          : s.role === 'content_editor'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {s.role.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[11px] font-medium ${
                        s.status === 'active' ? 'text-emerald-600' : 'text-neutral-400'
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleOpenEdit(s)}
                      className="text-xs text-red-600 font-semibold hover:underline cursor-pointer"
                    >
                      Edit Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-neutral-200 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
              <h3 className="font-bold text-base text-neutral-900">
                {currentStaff.uid?.startsWith('staff-') ? 'Assign Staff Profile' : 'Edit Staff Role'}
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
                <label className="block font-semibold text-neutral-800 mb-1">
                  Firebase User UID or Identifier *
                </label>
                <input
                  type="text"
                  required
                  value={currentStaff.uid || ''}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, uid: e.target.value })}
                  placeholder="UID from Firebase Auth"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Staff Email *</label>
                <input
                  type="email"
                  required
                  value={currentStaff.email || ''}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, email: e.target.value })}
                  placeholder="name@gmail.com"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Display Name</label>
                <input
                  type="text"
                  value={currentStaff.displayName || ''}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, displayName: e.target.value })}
                  placeholder="e.g. Sales Coordinator"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Assigned Role *</label>
                <select
                  value={currentStaff.role || 'sales_staff'}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, role: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="sales_staff">Sales Staff (Enquiries, Notes, Follow-ups)</option>
                  <option value="content_editor">Content Editor (Products, Categories, Slides, Pages)</option>
                  <option value="super_admin">Super Admin (Full Administrative Authority)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 mb-1">Account Status</label>
                <select
                  value={currentStaff.status || 'active'}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
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
                  {saving ? 'Saving...' : 'Save Staff Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
