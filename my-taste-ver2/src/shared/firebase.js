import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAt8BaxkFizyfmIaB4dsVF7B0mGWBfx54g',
  authDomain: 'my-taste-e6d3f.firebaseapp.com',
  projectId: 'my-taste-e6d3f',
  storageBucket: 'my-taste-e6d3f.appspot.com',
  messagingSenderId: '843241165360',
  appId: '1:843241165360:web:4f67bd9e0acfc46b2f93f5'
};

firebase.initializeApp(firebaseConfig);
export const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();

export { auth, firestore, storage, realtime };
