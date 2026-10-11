export type ProductStatus = 'published' | 'draft' | 'archived';
export type PriceType = 'request_price' | 'fixed';
export type AvailabilityStatus = 'available_on_order' | 'in_stock' | 'inquire_lead_time';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  shortDescription: string;
  detailedDescription: string;
  images: string[];
  imageAlts: string[];
  imageSourceNotice?: string; // e.g. "Reference image—actual model may vary"
  specifications: ProductSpec[];
  price: string;
  priceType: PriceType;
  currency: string;
  availability: AvailabilityStatus;
  featured: boolean;
  videoUrl?: string;
  brochureUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  order: number;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  order: number;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export type EnquiryStatus = 'new' | 'contacted' | 'quotation_sent' | 'follow_up' | 'closed';

export interface Enquiry {
  id: string;
  refNumber: string;
  name: string;
  phone: string;
  email?: string;
  location?: string;
  machineInterest: string;
  message: string;
  privacyConsent: boolean;
  status: EnquiryStatus;
  assignedStaff?: string;
  internalNotes?: string;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type StaffRole = 'super_admin' | 'content_editor' | 'sales_staff';

export interface StaffProfile {
  uid: string;
  email: string;
  displayName: string;
  role: StaffRole;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  companyName: string;
  regAddress: string;
  branchAddress: string;
  phone: string;
  whatsappCountryCode: string;
  whatsappNumber: string;
  email: string;
  intendedDomain: string;
  canonicalBaseUrl: string;
  businessDescription: string;
  logoUrl: string;
  faviconUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  aboutSnippet?: string;
  updatedAt: string;
}

export interface PageContent {
  slug: string;
  title: string;
  summary: string;
  body: string;
  seoTitle?: string;
  seoDescription?: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  collection: string;
  docId: string;
  actorUid: string;
  actorEmail: string;
  details: string;
  timestamp: string;
}
