import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCb52WtWB7I14uzj2WqKPUqgf3eAeL_cS0",
  authDomain: "offerings-aa4ae.firebaseapp.com",
  projectId: "offerings-aa4ae",
  storageBucket: "offerings-aa4ae.appspot.com",
  messagingSenderId: "667282666621",
  appId: "1:667282666621:web:14610c4000519f7f802d14",
  measurementId: "G-T9KNQX3N8Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;