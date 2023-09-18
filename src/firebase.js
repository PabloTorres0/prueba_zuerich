// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCvZ0i__9pdUWU098V0lsrvP39JpJwMkUY',
  authDomain: 'proyecto-zurich.firebaseapp.com',
  projectId: 'proyecto-zurich',
  storageBucket: 'proyecto-zurich.appspot.com',
  messagingSenderId: '996529512867',
  appId: '1:996529512867:web:f9efa7c1f78190be6cba16'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
