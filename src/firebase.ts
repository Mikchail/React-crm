import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";


const firebaseConfig = {
  
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const fireAuth = firebase.auth();
export const fireDatabase = firebase.database();