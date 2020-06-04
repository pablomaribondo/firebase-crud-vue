import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
//firebase config
};

const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
export const namesRef = db.collection('names');
