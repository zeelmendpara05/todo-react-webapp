import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB9xGLjxLapQCjEXTmXAsdQlaP-zCnq92Y",
    authDomain: "todo-react-web-app.firebaseapp.com",
    projectId: "todo-react-web-app",
    storageBucket: "todo-react-web-app.appspot.com",
    messagingSenderId: "726804622820",
    appId: "1:726804622820:web:992ef41d324198cce8abf1",
    measurementId: "G-PKBQ8CDFF1"
});

const db = firebaseApp.firestore();

export default db;