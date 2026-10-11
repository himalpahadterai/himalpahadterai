import { Enquiry } from '../types';

/**
 * Escapes characters that can trigger formula execution in spreadsheet software (CSV Injection / Formula Injection).
 * Prefixes sensitive characters (=, +, -, @, \t, \r) with a single quote (').
 */
export function sanitizeCsvCell(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return '""';
  const str = String(value).trim();
  
  // Check for formula injection triggers
  const formulaPrefixes = ['=', '+', '-', '@', '\t', '\r'];
  let safeStr = str;
  if (formulaPrefixes.some(prefix => safeStr.startsWith(prefix))) {
    safeStr = `'${safeStr}`;
  }

  // Escape quotes
  const escaped = safeStr.replace(/"/g, '""');
  return `"${escaped}"`;
}

export function exportEnquiriesToCsv(enquiries: Enquiry[]): void {
  const headers = [
    'Reference Number',
    'Date Submitted',
    'Customer Name',
    'Phone Number',
    'Email',
    'Location',
    'Machine of Interest',
    'Message / Requirements',
    'Status',
    'Assigned Staff',
    'Internal Notes',
    'Follow-up Date',
  ];

  const rows = enquiries.map(e => [
    sanitizeCsvCell(e.refNumber),
    sanitizeCsvCell(new Date(e.createdAt).toLocaleString()),
    sanitizeCsvCell(e.name),
    sanitizeCsvCell(e.phone),
    sanitizeCsvCell(e.email || ''),
    sanitizeCsvCell(e.location || ''),
    sanitizeCsvCell(e.machineInterest),
    sanitizeCsvCell(e.message),
    sanitizeCsvCell(e.status),
    sanitizeCsvCell(e.assignedStaff || ''),
    sanitizeCsvCell(e.internalNotes || ''),
    sanitizeCsvCell(e.followUpDate || ''),
  ]);

  const csvContent = [headers.map(h => `"${h}"`).join(','), ...rows.map(r => r.join(','))].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `HPT_Traders_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
