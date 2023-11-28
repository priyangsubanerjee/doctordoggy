import "firebase/messaging";
import firebase, { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config";

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
