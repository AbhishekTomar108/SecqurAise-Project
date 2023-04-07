import firebase from "firebase/compat/app"
import "firebase/compat/database"
import {getDownloadURL, getStorage, ref} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBAAUc0U2Otqm377AgSXle_vAI-XAs_xtI",
    authDomain: "secquraiseproject-3a8dc.firebaseapp.com",
    databaseURL: "https://secquraiseproject-3a8dc-default-rtdb.firebaseio.com",
    projectId: "secquraiseproject-3a8dc",
    storageBucket: "secquraiseproject-3a8dc.appspot.com",
    messagingSenderId: "379906985451",
    appId: "1:379906985451:web:3cc075e3e951bda3a29dae"
  };

  firebase.initializeApp(firebaseConfig);
  export const dataRef = firebase.database();
  export const storage = getStorage();
  export default firebase;

  // const storageRef  =ref(storage);