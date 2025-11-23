// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDS6a3XiNmPziBnDr41tUBV4I5TmWjrAbM",
  authDomain: "blog-nest-d3c2a.firebaseapp.com",
  projectId: "blog-nest-d3c2a",
  storageBucket: "blog-nest-d3c2a.firebasestorage.app",
  messagingSenderId: "297267240564",
  appId: "1:297267240564:web:565c0dccec06188e6a3b21",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
