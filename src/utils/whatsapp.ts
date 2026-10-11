import { Product, SiteSettings, Enquiry } from '../types';

export function getCleanWhatsAppNumber(countryCode: string, phone: string): string {
  // Strip non-digit characters
  const cleanCode = countryCode.replace(/\D/g, '') || '977';
  let cleanPhone = phone.replace(/\D/g, '');
  
  // If phone already starts with the country code, avoid duplicating
  if (cleanPhone.startsWith(cleanCode)) {
    return cleanPhone;
  }
  // Strip leading 0 if present (e.g., 09861... -> 9861...)
  if (cleanPhone.startsWith('0')) {
    cleanPhone = cleanPhone.slice(1);
  }
  return `${cleanCode}${cleanPhone}`;
}

export function buildWhatsAppUrl(number: string, message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function getProductWhatsAppUrl(product: Product, settings: SiteSettings): string {
  const number = getCleanWhatsAppNumber(settings.whatsappCountryCode, settings.whatsappNumber);
  const baseUrl = settings.canonicalBaseUrl || 'https://himalpahadtaraitraders.com.np';
  const productUrl = `${baseUrl}/machines/${product.slug}`;
  
  const text = `Namaste Himal Pahad Tarai Traders,
I am interested in: *${product.name}*
Product link: ${productUrl}

Please provide the latest price quotation, technical specifications, and availability details for Mahottari / Nepal delivery. Thank you!`;

  return buildWhatsAppUrl(number, text);
}

export function getEnquiryWhatsAppUrl(enquiry: { refNumber: string; name: string; machineInterest: string; phone: string; message: string }, settings: SiteSettings): string {
  const number = getCleanWhatsAppNumber(settings.whatsappCountryCode, settings.whatsappNumber);
  const text = `Namaste Himal Pahad Tarai Traders,
I have submitted an enquiry on your website with Reference No: *${enquiry.refNumber}*.

*Name:* ${enquiry.name}
*Phone:* ${enquiry.phone}
*Machine / Requirement:* ${enquiry.machineInterest}
*Message:* ${enquiry.message}

Please confirm and share the official quotation and details. Thank you!`;

  return buildWhatsAppUrl(number, text);
}

export function getGeneralWhatsAppUrl(settings: SiteSettings, customNote = ''): string {
  const number = getCleanWhatsAppNumber(settings.whatsappCountryCode, settings.whatsappNumber);
  const text = customNote || `Namaste Himal Pahad Tarai Traders,
I would like to inquire about small and domestic-industry machinery, raw materials, and training in Nepal. Please guide me.`;
  return buildWhatsAppUrl(number, text);
}
