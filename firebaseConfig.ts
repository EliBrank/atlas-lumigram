// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4Oh3e9kFbN0hNdRWvvgn_Q6cAiqVUL1s",
  authDomain: "lumigram-1c59c.firebaseapp.com",
  projectId: "lumigram-1c59c",
  storageBucket: "lumigram-1c59c.firebasestorage.app",
  messagingSenderId: "804064522610",
  appId: "1:804064522610:web:6985b22ff1dbf68e142deb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const storage = getStorage();
