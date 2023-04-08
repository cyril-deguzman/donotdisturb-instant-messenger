import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

import firebase from  "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  // apiKey: Constants.manifest.extra.apiKey,
  // authDomain: Constants.manifest.extra.authDomain,
  // projectId: Constants.manifest.extra.projectId,
  // storageBucket: Constants.manifest.extra.storageBucket,
  // messagingSenderId: Constants.manifest.extra.messagingSenderId,
  // appId: Constants.manifest.extra.appId,
  // databaseURL: Constants.manifest.extra.databaseURL,
  apiKey: "AIzaSyD6BrovSnKFdnCj822qvKD4GjDfRTyMF4E",
  authDomain: "donotdisturb-instant-messenger.firebaseapp.com",
  projectId: "donotdisturb-instant-messenger",
  storageBucket: "donotdisturb-instant-messenger.appspot.com",
  messagingSenderId: "35764339609",
  appId: "1:35764339609:web:102abc14fda5b7fc6e0908",
  measurementId: "G-VDSM27RLZM"
};

initializeApp(firebaseConfig);

if(!firebase.apps.length)
{
  firebase.initializeApp(firebaseConfig);
}
  
export const auth = getAuth();
export const database = getFirestore();
export {firebase};
