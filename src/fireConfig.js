import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAaMqxCkX9FLDklyKLHL9qZTPKGdaP4oug",
  authDomain: "ecomm-1e233.firebaseapp.com",
  projectId: "ecomm-1e233",
  storageBucket: "ecomm-1e233.appspot.com",
  messagingSenderId: "281677572423",
  appId: "1:281677572423:web:a8930ccc3d160d68748462",
  measurementId: "G-7ZN5Z63MCR",
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export default fireDB;
