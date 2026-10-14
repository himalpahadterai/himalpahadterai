/**
 * Centralized Firebase initialization module
 * Re-exports initialized Firebase app, Cloud Firestore database instance, and Auth services.
 */
export { app, db, auth, googleProvider, testFirestoreConnection } from '../firebase/config';
