import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAC1Fba0QB0N9KtUMCKmV4aYpovBNORLsU",
    authDomain: "portfolio-website-a6cca.firebaseapp.com",
    projectId: "portfolio-website-a6cca",
    storageBucket: "portfolio-website-a6cca.firebasestorage.app",
    messagingSenderId: "962315956120",
    appId: "1:962315956120:web:c3bc679007ac6d1b5485ed",
    measurementId: "G-2872525NXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Storage (for images)
export const storage = getStorage(app);

// Initialize Firestore (for database)
export const db = getFirestore(app);

export default app;
