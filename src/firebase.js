// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from 'firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyApc-4H-90RpSxevHLgjU4qxIIgRcn0rUQ",
  authDomain: "quora-clone-bd9aa.firebaseapp.com",
  projectId: "quora-clone-bd9aa",
  storageBucket: "quora-clone-bd9aa.appspot.com",
  messagingSenderId: "799085862952",
  appId: "1:799085862952:web:7175d7cbafd0c8daac551d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const provider1 = new firebase.auth.FacebookAuthProvider();
const db = firebaseApp.firestore();

export {auth,provider,provider1} 
export default db;
