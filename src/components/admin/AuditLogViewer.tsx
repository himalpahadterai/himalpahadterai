import React, { useEffect, useState } from 'react';
import { AuditLog } from '../../types';
import { getAuditLogs } from '../../services/dataService';
import { Shield, Clock, RefreshCw } from 'lucide-react';

export const AuditLogViewer: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const result = await getAuditLogs();
      setLogs(result);
    } catch (err) {
      console.warn('Error fetching audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Administrative Audit Trail</h2>
          <p className="text-xs text-neutral-500">
            Immutable log of backend changes, mutations, and staff interactions.
          </p>
        </div>
        <button
          onClick={fetchLogs}
          disabled={loading}
          className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 p-2 flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Collection / Target</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-neutral-400">
                    {loading ? 'Loading audit trail...' : 'No audit entries logged yet.'}
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-neutral-50/50">
                    <td className="py-2.5 px-4 text-neutral-500 font-mono whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-neutral-800">
                      {log.actorEmail}
                    </td>
                    <td className="py-2.5 px-4 uppercase font-semibold text-red-600 font-mono text-[11px]">
                      {log.action}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-neutral-600">
                      {log.collection}
                    </td>
                    <td className="py-2.5 px-4 text-neutral-600 max-w-sm truncate">
                      {log.details}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
