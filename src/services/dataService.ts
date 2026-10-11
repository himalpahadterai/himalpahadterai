import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errorHandler';
import {
  Category,
  Product,
  HeroSlide,
  SiteSettings,
  PageContent,
  Enquiry,
  StaffProfile,
  AuditLog,
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_HERO_SLIDES,
  INITIAL_PAGES,
} from '../data/initialData';

const SETTINGS_DOC_ID = 'global';

// ----------------- SITE SETTINGS -----------------
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const docRef = doc(db, 'siteSettings', SETTINGS_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...INITIAL_SETTINGS, ...(snap.data() as Partial<SiteSettings>) };
    }
    return INITIAL_SETTINGS;
  } catch (error) {
    console.warn('Falling back to default site settings:', error);
    return INITIAL_SETTINGS;
  }
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  try {
    const docRef = doc(db, 'siteSettings', SETTINGS_DOC_ID);
    await setDoc(docRef, { ...settings, updatedAt: new Date().toISOString() }, { merge: true });
    await logAudit('update', 'siteSettings', SETTINGS_DOC_ID, 'Updated global site settings');
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `siteSettings/${SETTINGS_DOC_ID}`);
  }
}

// ----------------- CATEGORIES -----------------
export async function getCategories(includeAll = false): Promise<Category[]> {
  try {
    const colRef = collection(db, 'categories');
    const snap = await getDocs(colRef);
    if (snap.empty) {
      return includeAll ? INITIAL_CATEGORIES : INITIAL_CATEGORIES.filter(c => c.status === 'published');
    }
    const categories: Category[] = [];
    snap.forEach(d => categories.push({ id: d.id, ...d.data() } as Category));
    categories.sort((a, b) => a.order - b.order);
    return includeAll ? categories : categories.filter(c => c.status === 'published');
  } catch (error) {
    console.warn('Error fetching categories from Firestore, using initial data:', error);
    return includeAll ? INITIAL_CATEGORIES : INITIAL_CATEGORIES.filter(c => c.status === 'published');
  }
}

export async function saveCategory(category: Category): Promise<void> {
  try {
    const id = category.id || `cat-${Date.now()}`;
    const docRef = doc(db, 'categories', id);
    const dataToSave = {
      ...category,
      id,
      updatedAt: new Date().toISOString(),
      createdAt: category.createdAt || new Date().toISOString(),
    };
    await setDoc(docRef, dataToSave, { merge: true });
    await logAudit(category.id ? 'update' : 'create', 'categories', id, `Saved category: ${category.name}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `categories/${category.id}`);
  }
}

export async function deleteCategory(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'categories', id));
    await logAudit('delete', 'categories', id, `Deleted category ${id}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `categories/${id}`);
  }
}

// ----------------- PRODUCTS -----------------
export async function getProducts(includeAll = false): Promise<Product[]> {
  try {
    const colRef = collection(db, 'products');
    const snap = await getDocs(colRef);
    if (snap.empty) {
      return includeAll ? INITIAL_PRODUCTS : INITIAL_PRODUCTS.filter(p => p.status === 'published');
    }
    const products: Product[] = [];
    snap.forEach(d => products.push({ id: d.id, ...d.data() } as Product));
    return includeAll ? products : products.filter(p => p.status === 'published');
  } catch (error) {
    console.warn('Error fetching products from Firestore, using initial data:', error);
    return includeAll ? INITIAL_PRODUCTS : INITIAL_PRODUCTS.filter(p => p.status === 'published');
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts(true);
  const found = all.find(p => p.slug === slug);
  return found || null;
}

export async function saveProduct(product: Product): Promise<void> {
  try {
    const id = product.id || `prod-${Date.now()}`;
    const docRef = doc(db, 'products', id);
    const dataToSave = {
      ...product,
      id,
      updatedAt: new Date().toISOString(),
      createdAt: product.createdAt || new Date().toISOString(),
    };
    await setDoc(docRef, dataToSave, { merge: true });
    await logAudit(product.id ? 'update' : 'create', 'products', id, `Saved product: ${product.name}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `products/${product.id}`);
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'products', id));
    await logAudit('delete', 'products', id, `Deleted product ${id}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
  }
}

// ----------------- HERO SLIDES -----------------
export async function getHeroSlides(includeAll = false): Promise<HeroSlide[]> {
  try {
    const colRef = collection(db, 'heroSlides');
    const snap = await getDocs(colRef);
    if (snap.empty) {
      return includeAll ? INITIAL_HERO_SLIDES : INITIAL_HERO_SLIDES.filter(s => s.status === 'published');
    }
    const slides: HeroSlide[] = [];
    snap.forEach(d => slides.push({ id: d.id, ...d.data() } as HeroSlide));
    slides.sort((a, b) => a.order - b.order);
    return includeAll ? slides : slides.filter(s => s.status === 'published');
  } catch (error) {
    console.warn('Error fetching hero slides, using initial:', error);
    return includeAll ? INITIAL_HERO_SLIDES : INITIAL_HERO_SLIDES.filter(s => s.status === 'published');
  }
}

export async function saveHeroSlide(slide: HeroSlide): Promise<void> {
  try {
    const id = slide.id || `slide-${Date.now()}`;
    const docRef = doc(db, 'heroSlides', id);
    const dataToSave = {
      ...slide,
      id,
      updatedAt: new Date().toISOString(),
      createdAt: slide.createdAt || new Date().toISOString(),
    };
    await setDoc(docRef, dataToSave, { merge: true });
    await logAudit(slide.id ? 'update' : 'create', 'heroSlides', id, `Saved hero slide: ${slide.title}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `heroSlides/${slide.id}`);
  }
}

export async function deleteHeroSlide(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'heroSlides', id));
    await logAudit('delete', 'heroSlides', id, `Deleted hero slide ${id}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `heroSlides/${id}`);
  }
}

// ----------------- PAGES -----------------
export async function getPage(slug: string): Promise<PageContent | null> {
  try {
    const docRef = doc(db, 'pages', slug);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as PageContent;
    }
    const initial = INITIAL_PAGES.find(p => p.slug === slug);
    return initial || null;
  } catch (error) {
    console.warn(`Error fetching page ${slug}:`, error);
    const initial = INITIAL_PAGES.find(p => p.slug === slug);
    return initial || null;
  }
}

export async function savePage(page: PageContent): Promise<void> {
  try {
    const docRef = doc(db, 'pages', page.slug);
    await setDoc(docRef, { ...page, updatedAt: new Date().toISOString() }, { merge: true });
    await logAudit('update', 'pages', page.slug, `Saved page: ${page.title}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `pages/${page.slug}`);
  }
}

export async function getAllPages(): Promise<PageContent[]> {
  try {
    const colRef = collection(db, 'pages');
    const snap = await getDocs(colRef);
    if (snap.empty) return INITIAL_PAGES;
    const pages: PageContent[] = [];
    snap.forEach(d => pages.push(d.data() as PageContent));
    return pages;
  } catch (error) {
    return INITIAL_PAGES;
  }
}

// ----------------- ENQUIRIES -----------------
export async function submitEnquiry(data: {
  name: string;
  phone: string;
  email?: string;
  location?: string;
  machineInterest: string;
  message: string;
  privacyConsent: boolean;
}): Promise<{ refNumber: string; id: string }> {
  // Input validation & limits
  if (!data.name?.trim()) throw new Error('Name is required');
  if (!data.phone?.trim()) throw new Error('Phone number is required');
  if (!data.privacyConsent) throw new Error('Privacy consent is required');
  if (data.name.length > 100) throw new Error('Name exceeds character limit');
  if (data.phone.length > 30) throw new Error('Phone exceeds character limit');
  if (data.message && data.message.length > 2500) throw new Error('Message exceeds character limit');

  // Generate unique formatted reference number: HPT-YYYYMM-XXXX
  const dateStr = new Date().toISOString().slice(2, 7).replace('-', '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const refNumber = `HPT-${dateStr}-${randomSuffix}`;
  const enquiryId = `enq-${Date.now()}-${randomSuffix}`;

  const enquiryPayload: Enquiry = {
    id: enquiryId,
    refNumber,
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email?.trim() || '',
    location: data.location?.trim() || '',
    machineInterest: data.machineInterest?.trim() || 'General Machinery Enquiry',
    message: data.message?.trim() || 'Quotation and price inquiry',
    privacyConsent: true,
    status: 'new',
    assignedStaff: '',
    internalNotes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const docRef = doc(db, 'enquiries', enquiryId);
    await setDoc(docRef, enquiryPayload);
    return { refNumber, id: enquiryId };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `enquiries/${enquiryId}`);
  }
}

export async function getEnquiries(): Promise<Enquiry[]> {
  if (!auth.currentUser) {
    return [];
  }
  try {
    const colRef = collection(db, 'enquiries');
    const snap = await getDocs(colRef);
    const list: Enquiry[] = [];
    snap.forEach(d => list.push({ id: d.id, ...d.data() } as Enquiry));
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'enquiries');
  }
}

export async function updateEnquiry(
  id: string,
  updates: Partial<Pick<Enquiry, 'status' | 'assignedStaff' | 'internalNotes' | 'followUpDate'>>
): Promise<void> {
  try {
    const docRef = doc(db, 'enquiries', id);
    await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
    await logAudit('update', 'enquiries', id, `Updated enquiry status to ${updates.status || 'modified'}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `enquiries/${id}`);
  }
}

export async function deleteEnquiry(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'enquiries', id));
    await logAudit('delete', 'enquiries', id, `Deleted enquiry ${id}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `enquiries/${id}`);
  }
}

// ----------------- STAFF & ROLES -----------------
export async function getStaffProfile(uid: string): Promise<StaffProfile | null> {
  if (!auth.currentUser) {
    return null;
  }
  try {
    const docRef = doc(db, 'staffProfiles', uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as StaffProfile;
    }
    return null;
  } catch (error) {
    console.warn(`Error getting staff profile for ${uid}:`, error);
    return null;
  }
}

export async function getAllStaff(): Promise<StaffProfile[]> {
  if (!auth.currentUser) {
    return [];
  }
  try {
    const colRef = collection(db, 'staffProfiles');
    const snap = await getDocs(colRef);
    const staff: StaffProfile[] = [];
    snap.forEach(d => staff.push(d.data() as StaffProfile));
    return staff;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'staffProfiles');
  }
}

export async function saveStaffProfile(profile: StaffProfile): Promise<void> {
  try {
    const docRef = doc(db, 'staffProfiles', profile.uid);
    await setDoc(docRef, { ...profile, updatedAt: new Date().toISOString() }, { merge: true });
    await logAudit('update', 'staffProfiles', profile.uid, `Assigned role ${profile.role} to ${profile.email}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `staffProfiles/${profile.uid}`);
  }
}

// ----------------- AUDIT LOGS -----------------
export async function logAudit(
  action: string,
  collectionName: string,
  docId: string,
  details: string
): Promise<void> {
  try {
    const user = auth.currentUser;
    const logId = `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const logDoc: AuditLog = {
      id: logId,
      action,
      collection: collectionName,
      docId,
      actorUid: user?.uid || 'system',
      actorEmail: user?.email || 'system',
      details,
      timestamp: new Date().toISOString(),
    };
    await setDoc(doc(db, 'auditLogs', logId), logDoc);
  } catch (error) {
    console.warn('Non-fatal: could not write audit log:', error);
  }
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  if (!auth.currentUser) {
    return [];
  }
  try {
    const colRef = collection(db, 'auditLogs');
    const snap = await getDocs(colRef);
    const logs: AuditLog[] = [];
    snap.forEach(d => logs.push(d.data() as AuditLog));
    logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return logs;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'auditLogs');
  }
}

// ----------------- SEEDING -----------------
export async function seedInitialDatabase(): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Settings
    const settingsRef = doc(db, 'siteSettings', SETTINGS_DOC_ID);
    const settingsSnap = await getDoc(settingsRef);
    if (!settingsSnap.exists()) {
      await setDoc(settingsRef, INITIAL_SETTINGS);
    }

    // 2. Categories
    for (const cat of INITIAL_CATEGORIES) {
      const catRef = doc(db, 'categories', cat.id);
      const catSnap = await getDoc(catRef);
      if (!catSnap.exists()) {
        await setDoc(catRef, cat);
      }
    }

    // 3. Products
    for (const prod of INITIAL_PRODUCTS) {
      const prodRef = doc(db, 'products', prod.id);
      const prodSnap = await getDoc(prodRef);
      if (!prodSnap.exists()) {
        await setDoc(prodRef, prod);
      }
    }

    // 4. Hero Slides
    for (const slide of INITIAL_HERO_SLIDES) {
      const slideRef = doc(db, 'heroSlides', slide.id);
      const slideSnap = await getDoc(slideRef);
      if (!slideSnap.exists()) {
        await setDoc(slideRef, slide);
      }
    }

    // 5. Pages
    for (const page of INITIAL_PAGES) {
      const pageRef = doc(db, 'pages', page.slug);
      const pageSnap = await getDoc(pageRef);
      if (!pageSnap.exists()) {
        await setDoc(pageRef, page);
      }
    }

    return { success: true, message: 'Database seeded successfully with initial verified data.' };
  } catch (error) {
    console.error('Seeding error:', error);
    return { success: false, message: error instanceof Error ? error.message : String(error) };
  }
}
