import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { testFirestoreConnection } from './firebase/config';
import {
  getSiteSettings,
  getCategories,
  getProducts,
  getHeroSlides,
  getAllPages,
  getEnquiries,
  getAllStaff,
} from './services/dataService';
import {
  SiteSettings,
  Category,
  Product,
  HeroSlide,
  PageContent,
  Enquiry,
  StaffProfile,
} from './types';
import { INITIAL_SETTINGS, INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_HERO_SLIDES, INITIAL_PAGES } from './data/initialData';
import { getOrganizationSchema } from './utils/seo';

// Layout & Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { EnquiryModal } from './components/enquiry/EnquiryModal';

// Pages
import { HomePage } from './pages/HomePage';
import { CataloguePage } from './pages/CataloguePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AboutPage } from './pages/AboutPage';
import { RawMaterialsPage } from './pages/RawMaterialsPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [slides, setSlides] = useState<HeroSlide[]>(INITIAL_HERO_SLIDES);
  const [pages, setPages] = useState<PageContent[]>(INITIAL_PAGES);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [staff, setStaff] = useState<StaffProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // Global Enquiry Modal State
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [modalSelectedProduct, setModalSelectedProduct] = useState<Product | null>(null);

  // Sync with browser history back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenProductEnquiry = (product: Product) => {
    setModalSelectedProduct(product);
    setEnquiryModalOpen(true);
  };

  const handleOpenGeneralEnquiry = () => {
    setModalSelectedProduct(null);
    setEnquiryModalOpen(true);
  };

  // Load public backend data from Firestore
  const loadData = async () => {
    try {
      await testFirestoreConnection();
      const [sData, cData, pData, slData, pgData] = await Promise.all([
        getSiteSettings(),
        getCategories(true),
        getProducts(true),
        getHeroSlides(true),
        getAllPages(),
      ]);

      setSettings(sData);
      if (cData && cData.length > 0) setCategories(cData);
      if (pData && pData.length > 0) setProducts(pData);
      if (slData && slData.length > 0) setSlides(slData);
      if (pgData && pgData.length > 0) setPages(pgData);
    } catch (err) {
      console.warn('Initial data load warning:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load private admin collections strictly when user is authenticated
  const loadAdminData = async () => {
    try {
      const [enqData, staffData] = await Promise.all([getEnquiries(), getAllStaff()]);
      if (enqData) setEnquiries(enqData);
      if (staffData) setStaff(staffData);
    } catch (authErr) {
      console.warn('Admin collections fetch skipped or restricted:', authErr);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute Organization Structured Data for public pages
  const orgSchema = getOrganizationSchema(settings);

  // Simple Router Switch Logic
  const renderCurrentPage = () => {
    // 1. Admin Portal
    if (currentPath.startsWith('/admin')) {
      return (
        <AdminPage
          products={products}
          categories={categories}
          slides={slides}
          settings={settings}
          pages={pages}
          enquiries={enquiries}
          staff={staff}
          onRefreshData={async () => {
            await loadData();
            await loadAdminData();
          }}
          onNavigateHome={() => navigateTo('/')}
        />
      );
    }

    // 2. Individual Machine Page: /machines/:slug
    if (currentPath.startsWith('/machines/')) {
      const slug = currentPath.replace('/machines/', '').split('?')[0];
      const product = products.find((p) => p.slug === slug);
      if (product) {
        return (
          <ProductDetailPage
            product={product}
            categories={categories}
            allProducts={products}
            settings={settings}
            onNavigate={navigateTo}
            onOpenEnquiryModal={() => handleOpenProductEnquiry(product)}
          />
        );
      }
      return <NotFoundPage onNavigate={navigateTo} />;
    }

    // 3. Machines Catalogue: /machines
    if (currentPath === '/machines') {
      return (
        <CataloguePage
          products={products}
          categories={categories}
          settings={settings}
          onNavigate={navigateTo}
          onSelectProductForEnquiry={handleOpenProductEnquiry}
        />
      );
    }

    // 4. Category Page: /categories/:slug
    if (currentPath.startsWith('/categories/')) {
      const slug = currentPath.replace('/categories/', '').split('?')[0];
      const category = categories.find((c) => c.slug === slug);
      if (category) {
        return (
          <CataloguePage
            products={products}
            categories={categories}
            settings={settings}
            selectedCategorySlug={slug}
            onNavigate={navigateTo}
            onSelectProductForEnquiry={handleOpenProductEnquiry}
          />
        );
      }
      return <NotFoundPage onNavigate={navigateTo} />;
    }

    // 5. Categories Index: /categories
    if (currentPath === '/categories') {
      return (
        <CategoriesPage
          categories={categories}
          products={products}
          onNavigate={navigateTo}
        />
      );
    }

    // 6. About Us: /about
    if (currentPath === '/about') {
      const page = pages.find((p) => p.slug === 'about');
      return (
        <AboutPage
          settings={settings}
          pageContent={page}
          onNavigate={navigateTo}
          onOpenEnquiryModal={handleOpenGeneralEnquiry}
        />
      );
    }

    // 7. Raw Materials & Training: /raw-materials-and-training
    if (currentPath === '/raw-materials-and-training') {
      const page = pages.find((p) => p.slug === 'raw-materials-and-training');
      return (
        <RawMaterialsPage
          settings={settings}
          pageContent={page}
          onNavigate={navigateTo}
          onOpenEnquiryModal={handleOpenGeneralEnquiry}
        />
      );
    }

    // 8. Contact & Enquiry: /contact
    if (currentPath === '/contact') {
      return <ContactPage settings={settings} onNavigate={navigateTo} />;
    }

    // 9. Legal Pages: /privacy-policy and /terms-and-conditions
    if (currentPath === '/privacy-policy') {
      const page = pages.find((p) => p.slug === 'privacy-policy') || {
        slug: 'privacy-policy',
        title: 'Privacy Policy',
        summary: 'Customer enquiry data protection principles',
        body: 'Himal Pahad Tarai Traders Pvt. Ltd. holds all enquiry records securely in private database storage.',
        updatedAt: new Date().toISOString(),
      };
      return <LegalPage page={page} onNavigate={navigateTo} />;
    }

    if (currentPath === '/terms-and-conditions') {
      const page = pages.find((p) => p.slug === 'terms-and-conditions') || {
        slug: 'terms-and-conditions',
        title: 'Terms & Conditions',
        summary: 'Quotation policies and enquiry guidelines',
        body: 'Machinery quotes are subject to physical inspection and official pro-forma confirmation.',
        updatedAt: new Date().toISOString(),
      };
      return <LegalPage page={page} onNavigate={navigateTo} />;
    }

    // 10. Home Page: /
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          settings={settings}
          categories={categories}
          products={products}
          slides={slides}
          onNavigate={navigateTo}
          onOpenEnquiryModal={handleOpenGeneralEnquiry}
          onSelectProductForEnquiry={handleOpenProductEnquiry}
        />
      );
    }

    // 11. 404 Fallback
    return <NotFoundPage onNavigate={navigateTo} />;
  };

  const isAdminRoute = currentPath.startsWith('/admin');

  return (
    <AuthProvider>
      {/* Inject Organization Schema in head */}
      {!isAdminRoute && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      )}

      <div className="min-h-screen flex flex-col font-sans text-neutral-900 bg-neutral-50 antialiased selection:bg-red-600 selection:text-white">
        {/* Render Header on public pages */}
        {!isAdminRoute && (
          <Header
            settings={settings}
            currentPath={currentPath}
            onNavigate={navigateTo}
            onOpenEnquiryModal={handleOpenGeneralEnquiry}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1">{renderCurrentPage()}</main>

        {/* Render Footer & Floating WhatsApp Widget on public pages */}
        {!isAdminRoute && (
          <>
            <Footer
              settings={settings}
              categories={categories}
              onNavigate={navigateTo}
            />
            <FloatingWhatsApp settings={settings} />
            <EnquiryModal
              isOpen={enquiryModalOpen}
              onClose={() => setEnquiryModalOpen(false)}
              settings={settings}
              selectedProduct={modalSelectedProduct}
            />
          </>
        )}
      </div>
    </AuthProvider>
  );
}
