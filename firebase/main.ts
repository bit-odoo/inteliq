// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

function initializeAppIfNecessary() {
  try {
    return getApp();
  } catch (any) {
    const firebaseConfig = {
      apiKey: "AIzaSyC-aAtzOE6qwG6WhyQrj0npUITFpNkq05g",
      authDomain: "intellectiq-668b4.firebaseapp.com",
      projectId: "intellectiq-668b4",
      storageBucket: "intellectiq-668b4.appspot.com",
      messagingSenderId: "690351378709",
      appId: "1:690351378709:web:bc0560ceb9a9041157d91c",
      measurementId: "G-RHCDRFTSDB",
    };
    return initializeApp(firebaseConfig);
  }
}
// if a Firebase instance doesn't exist, create one
const app = initializeAppIfNecessary();
if (typeof window !== "undefined") {
  getAnalytics(app);
}
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);