// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {  RecaptchaVerifier } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy58dvIxZFvjXkVABBP6GtZpcOUhGTCZ0",
  authDomain: "fileuploads-ba7a6.firebaseapp.com",
  projectId: "fileuploads-ba7a6",
  storageBucket: "fileuploads-ba7a6.appspot.com",
  messagingSenderId: "364342249966",
  appId: "1:364342249966:web:c6af8f066a6cf1a36326ff",
  measurementId: "G-4X384B3TNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const storage_bucket=getStorage(app);
export const authentication = getAuth(app);