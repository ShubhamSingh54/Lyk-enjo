import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCxyc3O4Id0PQ8UXtuEQByyQ-uw5GGCjH4",
    authDomain: "lyk-app-93e29.firebaseapp.com",
    projectId: "lyk-app-93e29",
    storageBucket: "lyk-app-93e29.appspot.com",
    messagingSenderId: "962750880624",
    appId: "1:962750880624:web:c7d52ed49e44b84cbdcdb5",
    measurementId: "G-3ZXQH80495"
  };


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const auth = getAuth(app);

export {auth,db};