import { getFirestore, collection } from 'firebase/firestore';
import { app } from './firebaseConfig';

//init firestore services
export const db = getFirestore(app);

//collection ref
export const colRef = collection(db, 'books');
