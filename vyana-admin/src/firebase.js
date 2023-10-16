import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDrQklXZ9-E9LYbLbgXxpTa4locI1LRSHY',
  authDomain: process.env.REACT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_FIREBASE_APP_ID
}
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth()
export default app
