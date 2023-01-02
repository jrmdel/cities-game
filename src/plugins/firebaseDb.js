import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

initializeApp({
  apiKey: "AIzaSyA1IIkG7nEb-J4ZQ-I6NwwrfTqhNPGklzY",
  authDomain: "city-game-1ef21.firebaseapp.com",
  projectId: "city-game-1ef21",
  storageBucket: "city-game-1ef21.appspot.com",
  messagingSenderId: "699106521049",
  appId: "1:699106521049:web:29dcd325595632847933c8"
});

// const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore();