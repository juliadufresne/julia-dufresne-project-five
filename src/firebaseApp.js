import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhzIWM15VHeaV1TAggFvl1Yx7bOhKGAuo",
    authDomain: "fir-practice-jd.firebaseapp.com",
    databaseURL: "https://fir-practice-jd.firebaseio.com",
    projectId: "fir-practice-jd",
    storageBucket: "fir-practice-jd.appspot.com",
    messagingSenderId: "929111914354",
    appId: "1:929111914354:web:595190dc28da9686b00feb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;