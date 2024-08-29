// Import the functions you need from the SDKs you need


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: ""
  authDomain: "e-commerce-6ad10.firebaseapp.com",
  projectId: "e-commerce-6ad10",
  storageBucket: "e-commerce-6ad10.appspot.com",
  messagingSenderId: "636842006286",
  appId: "1:636842006286:web:1b43eee8639bf18d7b295f",
  measurementId: "G-FFZF6W3WR1"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, firestore, storage };
