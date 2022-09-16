import app from 'firebase/app';

import firebaseConfig from './config';
import 'firebase/firestore';
import 'firebase/storage';

export const firebase = app.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const storage = firebase.storage();