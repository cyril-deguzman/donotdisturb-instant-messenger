import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.manifest.fbConfig.apiKey,
  authDomain: Constants.manifest.fbConfig.authDomain,
  projectId: Constants.manifest.fbConfig.projectId,
  storageBucket: Constants.manifest.fbConfig.storageBucket,
  messagingSenderId: Constants.manifest.fbConfig.messagingSenderId,
  appId: Constants.manifest.fbConfig.appId,
  databaseURL: Constants.manifest.fbConfig.databaseURL,
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
