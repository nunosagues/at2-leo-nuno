// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV56lk8YDCuDUFlmMaPJcrIHq4LmzBvB8",
  authDomain: "crud-nuno-leo.firebaseapp.com",
  projectId: "crud-nuno-leo",
  storageBucket: "crud-nuno-leo.appspot.com",
  messagingSenderId: "935598570207",
  appId: "1:935598570207:web:2781edc126a45564bc076a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
