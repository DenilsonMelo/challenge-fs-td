import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBX7u6vc-k88oe5BC7fpA3p67pepnWuAM8",
  authDomain: "fs-talentus.firebaseapp.com",
  projectId: "fs-talentus",
  storageBucket: "fs-talentus.appspot.com",
  messagingSenderId: "852141522259",
  appId: "1:852141522259:web:331be7f47f1a8ee27975a6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);