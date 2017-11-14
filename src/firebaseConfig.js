import Firebase from 'firebase'

/* Firebase configuration */
var config = {
    apiKey: "AIzaSyB6I78iXFS7h8mRww7V6fhQuSXddh0RQcA",
    authDomain: "pay-cuisine.firebaseapp.com",
    databaseURL: "https://pay-cuisine.firebaseio.com",
    projectId: "pay-cuisine",
    storageBucket: "pay-cuisine.appspot.com",
    messagingSenderId: "971235894561"
};

const firebaseApp = Firebase.initializeApp(config);
const db = firebaseApp.database();

export {firebaseApp, db};