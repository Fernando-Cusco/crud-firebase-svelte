import firebase from  'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyClJR-wbMexHCAR08bNz6vIVfHooAmksm0",
    authDomain: "svelte-crud-ee3d4.firebaseapp.com",
    databaseURL: "https://svelte-crud-ee3d4.firebaseio.com",
    projectId: "svelte-crud-ee3d4",
    storageBucket: "svelte-crud-ee3d4.appspot.com",
    messagingSenderId: "930779485680",
    appId: "1:930779485680:web:072fbaa585c794d7067935"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();  // devuelve una instancia de la base de datos
  