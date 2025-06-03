import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "YOUR_API-KEY",
  authDomain: "YOUR_AUTH-DOMAIN",
  databaseURL: "YOUR_DATABASE-URL",
  projectId: "YOUR_PROJECT-ID",
  storageBucket: "YOUR_STORAGE-BUCKET",
  messagingSenderId: "YOUR_MESSAGING-SENDER",
  appId: "YOUR_APP-ID"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)