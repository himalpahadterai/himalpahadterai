import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import {
  Product,
  Category,
  HeroSlide,
  SiteSettings,
  PageContent,
  Enquiry,
  StaffProfile,
} from '../types';

interface AdminPageProps {
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

export const AdminPage: React.FC<AdminPageProps> = ({
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
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-red-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-neutral-600">Verifying administrative access...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 py-16">
        <div className="w-full max-w-md">
          <AdminLogin onSuccess={onRefreshData} />
          <div className="mt-4 text-center">
            <button
              onClick={onNavigateHome}
              className="text-xs text-neutral-500 hover:text-neutral-800 cursor-pointer"
            >
              &larr; Return to public homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  React.useEffect(() => {
    if (currentUser) {
      onRefreshData();
    }
  }, [currentUser]);

  return (
    <AdminDashboard
      products={products}
      categories={categories}
      slides={slides}
      settings={settings}
      pages={pages}
      enquiries={enquiries}
      staff={staff}
      onRefreshData={onRefreshData}
      onNavigateHome={onNavigateHome}
    />
  );
};
