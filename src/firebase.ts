import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { firebaseConfig } from "./env";


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const fireAuth = firebase.auth();
export const fireDatabase = firebase.database();