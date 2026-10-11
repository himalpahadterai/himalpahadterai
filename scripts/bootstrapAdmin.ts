/**
 * Trusted Admin Bootstrap Script for Himal Pahad Tarai Traders Pvt. Ltd.
 * Usage: npx tsx scripts/bootstrapAdmin.ts <ADMIN_FIREBASE_UID>
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const SUPER_ADMIN_EMAIL = 'mithilanchalmedia486@gmail.com';

async function bootstrapSuperAdmin(uid: string) {
  if (!uid || uid.length < 5) {
    console.error('Error: Please provide a valid Firebase Auth UID.');
    console.log('Usage: npx tsx scripts/bootstrapAdmin.ts <ADMIN_FIREBASE_UID>');
    process.exit(1);
  }

  console.log(`Bootstrapping Super Admin for email: ${SUPER_ADMIN_EMAIL} with UID: ${uid}...`);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

  const staffRef = doc(db, 'staffProfiles', uid);

  await setDoc(
    staffRef,
    {
      uid,
      email: SUPER_ADMIN_EMAIL,
      displayName: 'Super Admin',
      role: 'super_admin',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  console.log(`Successfully bootstrapped ${SUPER_ADMIN_EMAIL} as Super Admin in Firestore!`);
  process.exit(0);
}

const targetUid = process.argv[2] || 'admin-bootstrap-uid';
bootstrapSuperAdmin(targetUid).catch((err) => {
  console.error('Bootstrap failed:', err);
  process.exit(1);
});
