// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//Auth firebase
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'fir-learning-6c76b.firebaseapp.com',
  projectId: 'fir-learning-6c76b',
  storageBucket: 'fir-learning-6c76b.appspot.com',
  messagingSenderId: '1068993029364',
  appId: '1:1068993029364:web:6bd7b906133da609936aa1',
  measurementId: 'G-EHTRP3XZMP',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
