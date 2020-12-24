import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDKQm8D5Tvz9SxIEXWYI7nJuI0fxC0PgEI",
  authDomain: "facebook-clone-49b75.firebaseapp.com",
  projectId: "facebook-clone-49b75",
  storageBucket: "facebook-clone-49b75.appspot.com",
  messagingSenderId: "1085156244517",
  appId: "1:1085156244517:web:b2b3c2e53cbe420cafd3cc",
  measurementId: "G-17G2YMBG1E",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider, storage };
export default db;
