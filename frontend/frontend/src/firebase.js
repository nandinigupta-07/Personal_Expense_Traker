
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVWE-R-ylV8yGW1DLQYhsMRH29JfoofI4",
  authDomain: "finance-system-fe5a5.firebaseapp.com",
  projectId: "finance-system-fe5a5",
  storageBucket: "finance-system-fe5a5.firebasestorage.app",
  messagingSenderId: "376672807099",
  appId: "1:376672807099:web:df16698b9789c810c7e19e",
  measurementId: "G-B53DEFV019"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();