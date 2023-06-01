import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDknVXbDrNMz_g5Tqguw9Pl9kPAieh988s",
  authDomain: "clone-bd749.firebaseapp.com",
  projectId: "clone-bd749",
  storageBucket: "clone-bd749.appspot.com",
  messagingSenderId: "521250136609",
  appId: "1:521250136609:web:8e4b42b105367dbc99b960",
  measurementId: "G-Q8GPEETC02",
};


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp);


export {db, auth}