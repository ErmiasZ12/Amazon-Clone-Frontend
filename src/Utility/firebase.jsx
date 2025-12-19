

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9NrooQNkfqNLTsTaGvRB0x92UKTDuYu8",
  authDomain: "clone-6aaaf.firebaseapp.com",
  projectId: "clone-6aaaf",
  storageBucket: "clone-6aaaf.appspot.com",
  messagingSenderId: "625648944980",
  appId: "1:625648944980:web:f37c78f14dbd0a6799aac1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
// export const db = app.firestore()
export const db = getFirestore(app);
