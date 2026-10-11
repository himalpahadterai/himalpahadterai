import React, { useState } from 'react';
import { Enquiry, EnquiryStatus, StaffProfile } from '../../types';
import { updateEnquiry, deleteEnquiry } from '../../services/dataService';
import { exportEnquiriesToCsv } from '../../utils/csv';
import {
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageCircle,
  Clock,
  CheckCircle,
  FileText,
  User,
  Trash2,
  X,
  AlertCircle,
} from 'lucide-react';
import { buildWhatsAppUrl, getCleanWhatsAppNumber } from '../../utils/whatsapp';

interface EnquiriesManagerProps {
  enquiries: Enquiry[];
  staff: StaffProfile[];
  isSuperAdmin: boolean;
  onRefresh: () => void;
}

export const EnquiriesManager: React.FC<EnquiriesManagerProps> = ({
  enquiries,
  staff,
  isSuperAdmin,
  onRefresh,
}) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [savingStatus, setSavingStatus] = useState(false);

  // Status edit form state
  const [editStatus, setEditStatus] = useState<EnquiryStatus>('new');
  const [assignedStaff, setAssignedStaff] = useState<string>('');
  const [internalNotes, setInternalNotes] = useState<string>('');
  const [followUpDate, setFollowUpDate] = useState<string>('');

  const filteredEnquiries = enquiries.filter((e) => {
    if (filterStatus !== 'all' && e.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        e.refNumber.toLowerCase().includes(q) ||
        e.name.toLowerCase().includes(q) ||
        e.phone.toLowerCase().includes(q) ||
        e.machineInterest.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenDetail = (e: Enquiry) => {
    setSelectedEnquiry(e);
    setEditStatus(e.status);
    setAssignedStaff(e.assignedStaff || '');
    setInternalNotes(e.internalNotes || '');
    setFollowUpDate(e.followUpDate || '');
  };

  const handleSaveStatusUpdates = async () => {
    if (!selectedEnquiry) return;
    setSavingStatus(true);
    try {
      await updateEnquiry(selectedEnquiry.id, {
        status: editStatus,
        assignedStaff,
        internalNotes,
        followUpDate,
      });
      setSelectedEnquiry({
        ...selectedEnquiry,
        status: editStatus,
        assignedStaff,
        internalNotes,
        followUpDate,
      });
      onRefresh();
    } catch (err: any) {
      console.error('Failed to update enquiry:', err);
      alert('Could not update enquiry: ' + (err?.message || 'Error'));
    } finally {
      setSavingStatus(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEnquiry(id);
      setDeletingId(null);
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      onRefresh();
    } catch (err: any) {
      alert('Could not delete enquiry: ' + (err?.message || 'Permission denied'));
    }
  };

  const statusColors: Record<EnquiryStatus, { bg: string; text: string }> = {
    new: { bg: 'bg-red-50', text: 'text-red-700' },
    contacted: { bg: 'bg-blue-50', text: 'text-blue-700' },
    quotation_sent: { bg: 'bg-purple-50', text: 'text-purple-700' },
    follow_up: { bg: 'bg-amber-50', text: 'text-amber-700' },
    closed: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Customer Machinery Enquiries</h2>
          <p className="text-xs text-neutral-500">
            Track quotation requests, assign sales coordinators, and record follow-ups.
          </p>
        </div>

        <button
          onClick={() => exportEnquiriesToCsv(filteredEnquiries)}
          className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-2xs self-start"
          title="Export CSV with formula injection sanitization"
        >
          <Download className="w-4 h-4" />
          <span>Export Clean CSV ({filteredEnquiries.length})</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ref, name, phone, or machine..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-1 focus:ring-red-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs">
          <span className="text-neutral-500">Status Filter:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white"
          >
            <option value="all">All Enquiries ({enquiries.length})</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="quotation_sent">Quotation Sent</option>
            <option value="follow_up">Follow-up</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Ref Number</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Machine of Interest</th>
                <th className="py-3 px-4">Submitted Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned Staff</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-neutral-400 text-xs">
                    No enquiries match the current filters.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((e) => (
                  <tr
                    key={e.id}
                    onClick={() => handleOpenDetail(e)}
                    className="hover:bg-neutral-50/70 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-red-600">
                      {e.refNumber}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-neutral-900">{e.name}</div>
                      <div className="text-[11px] text-neutral-500">{e.phone}</div>
                    </td>
                    <td className="py-3 px-4 text-neutral-800 font-medium max-w-xs truncate">
                      {e.machineInterest}
                    </td>
                    <td className="py-3 px-4 text-neutral-500 text-xs">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                          statusColors[e.status]?.bg || 'bg-neutral-100'
                        } ${statusColors[e.status]?.text || 'text-neutral-700'}`}
                      >
                        {e.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-600 text-xs">
                      {e.assignedStaff || 'Unassigned'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-xs text-red-600 font-semibold hover:underline">
                        View &amp; Manage &rarr;
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-neutral-200 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-red-600">
                  {selectedEnquiry.refNumber}
                </span>
                <h3 className="font-bold text-lg text-neutral-900">
                  Enquiry Details: {selectedEnquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded text-neutral-400 hover:text-neutral-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs sm:text-sm">
              <div>
                <span className="text-neutral-400 block text-[11px]">Phone / WhatsApp</span>
                <div className="flex items-center gap-2 mt-0.5 font-semibold text-neutral-900">
                  <Phone className="w-3.5 h-3.5 text-red-600" />
                  <a href={`tel:${selectedEnquiry.phone}`} className="hover:underline">
                    {selectedEnquiry.phone}
                  </a>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 block text-[11px]">Email</span>
                <div className="flex items-center gap-2 mt-0.5 text-neutral-800">
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{selectedEnquiry.email || 'Not provided'}</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 block text-[11px]">Location</span>
                <div className="flex items-center gap-2 mt-0.5 text-neutral-800">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{selectedEnquiry.location || 'Not provided'}</span>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 block text-[11px]">Date Received</span>
                <div className="flex items-center gap-2 mt-0.5 text-neutral-800">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Machine & Message */}
            <div className="space-y-4 mb-6">
              <div>
                <span className="text-xs font-semibold text-neutral-700 block mb-1">
                  Machine of Interest:
                </span>
                <div className="p-3 bg-neutral-100 rounded-lg text-sm font-semibold text-neutral-900">
                  {selectedEnquiry.machineInterest}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-neutral-700 block mb-1">
                  Customer Requirement / Message:
                </span>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs sm:text-sm text-neutral-700 whitespace-pre-wrap leading-relaxed">
                  {selectedEnquiry.message}
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action with Preloaded Reply */}
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-emerald-900">
                <strong className="block">Direct WhatsApp Reply:</strong>
                Start a WhatsApp conversation with {selectedEnquiry.name} regarding Ref {selectedEnquiry.refNumber}.
              </div>
              <a
                href={buildWhatsAppUrl(
                  getCleanWhatsAppNumber('977', selectedEnquiry.phone),
                  `Namaste ${selectedEnquiry.name},\nThis is Himal Pahad Tarai Traders regarding your inquiry (Ref: ${selectedEnquiry.refNumber}) for ${selectedEnquiry.machineInterest}. We have prepared the quotation details for you.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 shrink-0 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>

            {/* Staff Pipeline & Notes Controls */}
            <div className="border-t border-neutral-200 pt-6 space-y-4 text-xs sm:text-sm">
              <h4 className="font-bold text-neutral-900">Update Sales Status &amp; Internal Notes</h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Pipeline Status */}
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Status Pipeline</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as EnquiryStatus)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="quotation_sent">Quotation Sent</option>
                    <option value="follow_up">Follow-up</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                {/* Assigned Staff */}
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Assign Staff</label>
                  <select
                    value={assignedStaff}
                    onChange={(e) => setAssignedStaff(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white"
                  >
                    <option value="">Unassigned</option>
                    {staff.map((s) => (
                      <option key={s.uid} value={s.displayName || s.email}>
                        {s.displayName || s.email} ({s.role})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Follow-up Date */}
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Follow-up Date</label>
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300"
                  />
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Internal Notes &amp; Quotation History (Private to Staff)
                </label>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="e.g. Quoted NPR 1,85,000 including 3 dies on Oct 10; customer visiting Bardibas branch on Tuesday..."
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                {isSuperAdmin && (
                  <button
                    onClick={() => setDeletingId(selectedEnquiry.id)}
                    className="text-neutral-400 hover:text-red-600 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Enquiry</span>
                  </button>
                )}

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="px-4 py-2 rounded-lg border border-neutral-300 cursor-pointer text-xs"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSaveStatusUpdates}
                    disabled={savingStatus}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg cursor-pointer text-xs"
                  >
                    {savingStatus ? 'Saving...' : 'Save Updates'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-xl border border-neutral-200">
            <Trash2 className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <h3 className="font-bold text-base text-neutral-900 mb-1">Delete Customer Enquiry?</h3>
            <p className="text-xs text-neutral-500 mb-6">
              This will permanently delete this enquiry record from Firestore.
            </p>
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
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
