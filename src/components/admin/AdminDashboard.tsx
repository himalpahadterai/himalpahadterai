import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Product,
  Category,
  HeroSlide,
  SiteSettings,
  PageContent,
  Enquiry,
  StaffProfile,
} from '../../types';
import { ProductsManager } from './ProductsManager';
import { CategoriesManager } from './CategoriesManager';
import { HeroSlidesManager } from './HeroSlidesManager';
import { EnquiriesManager } from './EnquiriesManager';
import { PagesManager } from './PagesManager';
import { SettingsManager } from './SettingsManager';
import { StaffManager } from './StaffManager';
import { AuditLogViewer } from './AuditLogViewer';
import { seedInitialDatabase } from '../../services/dataService';
import defaultLogo from '../../assets/images/regenerated_image_1791949718649.jpg';
import {
  LayoutDashboard,
  Box,
  Layers,
  Image as ImageIcon,
  MessageSquare,
  FileText,
  Settings,
  Users,
  Shield,
  LogOut,
  ExternalLink,
  Database,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  categories: Category[];
  slides: HeroSlide[];
  settings: SiteSettings;
  pages: PageContent[];
  enquiries: Enquiry[];
  staff: StaffProfile[];
  onRefreshData: () => void;
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  categories,
  slides,
  settings,
  pages,
  enquiries,
  staff,
  onRefreshData,
  onNavigateHome,
}) => {
  const { currentUser, role, isSuperAdmin, isContentEditor, isSalesStaff, logOut } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [seeding, setSeeding] = useState(false);
  const [seedNotice, setSeedNotice] = useState<string | null>(null);

  const handleSeed = async () => {
    if (!confirm('Run idempotent seed process? This will ensure initial categories and verified products are populated.')) {
      return;
    }
    setSeeding(true);
    setSeedNotice(null);
    try {
      const res = await seedInitialDatabase();
      setSeedNotice(res.message);
      onRefreshData();
    } catch (e: any) {
      setSeedNotice('Seeding error: ' + (e?.message || 'Failed'));
    } finally {
      setSeeding(false);
    }
  };

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-neutral-900 text-white px-4 sm:px-6 lg:px-8 py-3.5 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg p-0.5 flex items-center justify-center overflow-hidden">
            <img
              src={settings.logoUrl && !settings.logoUrl.includes('logo.svg') ? settings.logoUrl : (defaultLogo || '/images/logo.jpg')}
              alt="HPT Logo"
              className="max-h-full max-w-full object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== window.location.origin + '/images/logo.jpg') {
                  target.src = '/images/logo.jpg';
                }
              }}
            />
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base leading-tight">
              HPT Administrative Console
            </h1>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-400">{currentUser?.email}</span>
              <span className="text-neutral-600">•</span>
              <span className="text-red-400 font-semibold uppercase tracking-wider font-mono text-[10px]">
                {role?.replace(/_/g, ' ') || 'Staff'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="text-neutral-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer py-1.5 px-3 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Public Website</span>
          </button>

          <button
            onClick={logOut}
            className="bg-neutral-800 hover:bg-red-700 text-neutral-300 hover:text-white text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body: Sidebar + Main Content Panel */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        {/* Navigation Tabs Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-2xl border border-neutral-200 p-3 shadow-2xs shrink-0 self-start">
          <nav className="space-y-1 text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium cursor-pointer transition-colors ${
                activeTab === 'overview'
                  ? 'bg-red-600 text-white font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </div>
            </button>

            {/* Enquiries tab - Sales Staff + Super Admin */}
            {isSalesStaff && (
              <button
                onClick={() => setActiveTab('enquiries')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium cursor-pointer transition-colors ${
                  activeTab === 'enquiries'
                    ? 'bg-red-600 text-white font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquiries</span>
                </div>
                {newEnquiriesCount > 0 && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      activeTab === 'enquiries' ? 'bg-white text-red-600' : 'bg-red-600 text-white'
                    }`}
                  >
                    {newEnquiriesCount}
                  </span>
                )}
              </button>
            )}

            {/* Products CRUD - Content Editor + Super Admin */}
            {isContentEditor && (
              <>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium cursor-pointer transition-colors ${
                    activeTab === 'products'
                      ? 'bg-red-600 text-white font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Box className="w-4 h-4" />
                    <span>Machinery Catalogue</span>
                  </div>
                  <span className="text-[11px] opacity-75">{products.length}</span>
                </button>

                <button
                  onClick={() => setActiveTab('categories')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium cursor-pointer transition-colors ${
                    activeTab === 'categories'
                      ? 'bg-red-600 text-white font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4" />
                    <span>Categories</span>
                  </div>
                  <span className="text-[11px] opacity-75">{categories.length}</span>
                </button>

                <button
                  onClick={() => setActiveTab('slides')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium cursor-pointer transition-colors ${
                    activeTab === 'slides'
                      ? 'bg-red-600 text-white font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ImageIcon className="w-4 h-4" />
                    <span>Hero Slider</span>
                  </div>
                  <span className="text-[11px] opacity-75">{slides.length}</span>
                </button>

                <button
                  onClick={() => setActiveTab('pages')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium cursor-pointer transition-colors ${
                    activeTab === 'pages'
                      ? 'bg-red-600 text-white font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4" />
                    <span>Pages &amp; Policies</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium cursor-pointer transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-red-600 text-white font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4" />
                    <span>Site &amp; WhatsApp Settings</span>
                  </div>
                </button>
              </>
            )}

            {/* Super Admin Exclusive Modules */}
            {isSuperAdmin && (
              <>
                <div className="pt-2 my-2 border-t border-neutral-100 text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-3">
                  Super Admin
                </div>

                <button
                  onClick={() => setActiveTab('staff')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium cursor-pointer transition-colors ${
                    activeTab === 'staff'
                      ? 'bg-red-600 text-white font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4" />
                    <span>Staff &amp; Roles</span>
                  </div>
                  <span className="text-[11px] opacity-75">{staff.length}</span>
                </button>

                <button
                  onClick={() => setActiveTab('audit')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium cursor-pointer transition-colors ${
                    activeTab === 'audit'
                      ? 'bg-red-600 text-white font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4" />
                    <span>Audit Log</span>
                  </div>
                </button>
              </>
            )}
          </nav>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 min-w-0">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  Dashboard Overview
                </h2>
                <p className="text-xs text-neutral-500">
                  Real-time metrics and system state for Himal Pahad Tarai Traders Pvt. Ltd.
                </p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
                  <span className="text-xs text-neutral-500 font-medium block">Catalogue Machines</span>
                  <span className="text-2xl font-extrabold text-neutral-900 mt-1 block">
                    {products.length}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
                    {products.filter((p) => p.status === 'published').length} published
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
                  <span className="text-xs text-neutral-500 font-medium block">Categories</span>
                  <span className="text-2xl font-extrabold text-neutral-900 mt-1 block">
                    {categories.length}
                  </span>
                  <span className="text-[11px] text-neutral-500 mt-1 block">Sectors active</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
                  <span className="text-xs text-neutral-500 font-medium block">Total Enquiries</span>
                  <span className="text-2xl font-extrabold text-neutral-900 mt-1 block">
                    {enquiries.length}
                  </span>
                  <span className="text-[11px] text-red-600 font-semibold mt-1 block">
                    {newEnquiriesCount} new incoming
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs">
                  <span className="text-xs text-neutral-500 font-medium block">Hero Slides</span>
                  <span className="text-2xl font-extrabold text-neutral-900 mt-1 block">
                    {slides.length}
                  </span>
                  <span className="text-[11px] text-neutral-500 mt-1 block">Homepage banners</span>
                </div>
              </div>

              {/* Database Provisioning & Seed Tool */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Database className="w-5 h-5 text-red-600" />
                      <h3 className="font-bold text-neutral-900 text-sm sm:text-base">
                        Idempotent Database Seed &amp; Sync Tool
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed max-w-xl">
                      Populates initial verified machine categories, contact settings, and representative models into Cloud Firestore if not already present.
                    </p>
                  </div>

                  <button
                    onClick={handleSeed}
                    disabled={seeding}
                    className="bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-semibold text-xs px-4 py-2.5 rounded-xl cursor-pointer transition-colors shadow-2xs whitespace-nowrap self-start sm:self-center"
                  >
                    {seeding ? 'Seeding Firestore...' : 'Run Idempotent Seed'}
                  </button>
                </div>

                {seedNotice && (
                  <div className="mt-4 p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{seedNotice}</span>
                  </div>
                )}
              </div>

              {/* Quick Jump Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {isSalesStaff && (
                  <div
                    onClick={() => setActiveTab('enquiries')}
                    className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs hover:border-red-500 cursor-pointer transition-colors"
                  >
                    <h4 className="font-bold text-neutral-900 text-sm mb-1 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-red-600" />
                      <span>Manage Customer Enquiries</span>
                    </h4>
                    <p className="text-xs text-neutral-500">
                      View recent quotations, update statuses to Contacted / Follow-up, or export clean CSV.
                    </p>
                  </div>
                )}

                {isContentEditor && (
                  <div
                    onClick={() => setActiveTab('products')}
                    className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-2xs hover:border-red-500 cursor-pointer transition-colors"
                  >
                    <h4 className="font-bold text-neutral-900 text-sm mb-1 flex items-center gap-2">
                      <Box className="w-4 h-4 text-red-600" />
                      <span>Edit Machinery Catalogue</span>
                    </h4>
                    <p className="text-xs text-neutral-500">
                      Add newly arrived machines, update technical specifications, or edit draft products.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === 'products' && isContentEditor && (
            <ProductsManager products={products} categories={categories} onRefresh={onRefreshData} />
          )}

          {/* CATEGORIES TAB */}
          {activeTab === 'categories' && isContentEditor && (
            <CategoriesManager categories={categories} onRefresh={onRefreshData} />
          )}

          {/* SLIDES TAB */}
          {activeTab === 'slides' && isContentEditor && (
            <HeroSlidesManager slides={slides} onRefresh={onRefreshData} />
          )}

          {/* ENQUIRIES TAB */}
          {activeTab === 'enquiries' && isSalesStaff && (
            <EnquiriesManager
              enquiries={enquiries}
              staff={staff}
              isSuperAdmin={isSuperAdmin}
              onRefresh={onRefreshData}
            />
          )}

          {/* PAGES TAB */}
          {activeTab === 'pages' && isContentEditor && (
            <PagesManager pages={pages} onRefresh={onRefreshData} />
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && isContentEditor && (
            <SettingsManager settings={settings} onRefresh={onRefreshData} />
          )}

          {/* STAFF TAB */}
          {activeTab === 'staff' && isSuperAdmin && (
            <StaffManager staff={staff} onRefresh={onRefreshData} />
          )}

          {/* AUDIT TAB */}
          {activeTab === 'audit' && isSuperAdmin && <AuditLogViewer />}
        </main>
      </div>
    </div>
  );
};
