/**
 * Firebase Configuration
 * Initializes Firebase app with authentication, database, and storage
 */

import { initializeApp, getApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration (hardcoded)
const firebaseConfig = {
  apiKey: "AIzaSyDUHblOmoHFusyXSZxV3_TH4N9rHs2TAeM",
  authDomain: "smart-application-tracker.firebaseapp.com",
  projectId: "smart-application-tracker",
  storageBucket: "smart-application-tracker.firebasestorage.app",
  messagingSenderId: "669817317444",
  appId: "1:669817317444:web:5acc36b1c1d6e65a5ef411",
  measurementId: "G-PWHMDY8CBW",
};

// Initialize Firebase - Use getApp() if already initialized to avoid re-initialization
let app;
try {
  app = getApp();
} catch {
  app = initializeApp(firebaseConfig);
}

// Initialize Firebase Authentication and get a reference to the service
export const auth: Auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db: Firestore = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage: FirebaseStorage = getStorage(app);

// Initialize Analytics (only if running in browser and not in build time)
if (typeof window !== "undefined") {
  try {
    getAnalytics(app);
  } catch (error) {
    console.warn("Analytics initialization skipped:", error);
  }
}

export default app;
