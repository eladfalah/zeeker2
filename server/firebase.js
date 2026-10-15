import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD89oJoJMTDoQzZnSWSpy2vm7-330HufjM",
  authDomain: "zeekr-89ea8.firebaseapp.com",
  projectId: "zeekr-89ea8",
  storageBucket: "zeekr-89ea8.firebasestorage.app",
  messagingSenderId: "70813599792",
  appId: "1:70813599792:web:693b2addb3555ac01ac5f5",
  measurementId: "G-EP43BNRTL2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
