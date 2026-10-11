import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { StaffProfile, StaffRole } from '../types';
import { getStaffProfile, saveStaffProfile } from '../services/dataService';

interface AuthContextType {
  currentUser: User | null;
  staffProfile: StaffProfile | null;
  role: StaffRole | null;
  isSuperAdmin: boolean;
  isContentEditor: boolean;
  isSalesStaff: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  staffProfile: null,
  role: null,
  isSuperAdmin: false,
  isContentEditor: false,
  isSalesStaff: false,
  loading: true,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  sendPasswordReset: async () => {},
  logOut: async () => {},
});

export const SUPER_ADMIN_EMAIL = 'mithilanchalmedia486@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [staffProfile, setStaffProfile] = useState<StaffProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        let profile = await getStaffProfile(user.uid);
        
        // Auto-bootstrap super admin for designated admin email
        if (!profile && user.email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()) {
          const newProfile: StaffProfile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || 'Super Admin',
            role: 'super_admin',
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          try {
            await saveStaffProfile(newProfile);
            profile = newProfile;
          } catch (e) {
            console.warn('Could not auto-save super admin profile, using in-memory fallback:', e);
            profile = newProfile;
          }
        } else if (user.email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase() && profile?.role !== 'super_admin') {
          profile = { ...profile!, role: 'super_admin', status: 'active' };
        }
        setStaffProfile(profile);
      } else {
        setStaffProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const role = staffProfile?.role || (currentUser?.email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase() ? 'super_admin' : null);
  const isSuperAdmin = role === 'super_admin' || currentUser?.email?.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
  const isContentEditor = isSuperAdmin || role === 'content_editor';
  const isSalesStaff = isSuperAdmin || role === 'sales_staff';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        staffProfile,
        role,
        isSuperAdmin,
        isContentEditor,
        isSalesStaff,
        loading,
        signInWithGoogle,
        signInWithEmail,
        sendPasswordReset,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
