// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDYhuwsVSHwE95KCrizDnD4MnnsmDYBng",
  authDomain: "inventory-management-7c7f0.firebaseapp.com",
  projectId: "inventory-management-7c7f0",
  storageBucket: "inventory-management-7c7f0.appspot.com",
  messagingSenderId: "74573595098",
  appId: "1:74573595098:web:0a1324682e1366341f00e3",
  measurementId: "G-09TKDKCJFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore }