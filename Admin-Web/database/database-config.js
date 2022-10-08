  
// https://console.firebase.google.com/u/0/project/criminal-investigation-face/database

const firebaseConfig = {
    apiKey: "AIzaSyAuqVY3LG7Boppnl5yPad9f8hl1AAA0bPQ",
    authDomain: "criminal-investigation-face.firebaseapp.com",
    databaseURL: "https://criminal-investigation-face-default-rtdb.firebaseio.com",
    projectId: "criminal-investigation-face",
    storageBucket: "criminal-investigation-face.appspot.com",
    messagingSenderId: "1062175923855",
    appId: "1:1062175923855:web:9b5080e34c246c44ea9afa",
    measurementId: "G-53JPPJP47M"
};

const fApp = firebase.initializeApp(firebaseConfig);
const fAuth = firebase.auth();
const fDatabase = firebase.database();
const fStorage = firebase.storage();
const fAnalytics = firebase.analytics();

const userID = window.localStorage.getItem("userID");
const userEmail = window.localStorage.getItem("userEmail");
const userName = window.localStorage.getItem("userName");
const userAccount = window.localStorage.getItem("userAccount");
