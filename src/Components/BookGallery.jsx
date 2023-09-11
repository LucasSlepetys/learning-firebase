import Book from './BookView';
import { colRef, db } from '../firebase/firestoreConfig';
import { doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { useAuthContext } from '../context/AuthContext';

const BookGallery = () => {
  const [books, setBooks] = useState([]);
  const { logOut } = useAuthContext();
  const { user } = useAuthContext();

  useEffect(() => {
    console.log(user);

    //getDocs for one time doc data getting
    //onSnapshot gets data every time colRef is updated

    const q = query(colRef, orderBy('createdAt'));
    const qUser = query(doc(db, 'users', user.uid));

    onSnapshot(qUser, (snapshot) => {
      const cBooks = [];
      console.log(snapshot.data().privateBooks);
      snapshot.data().privateBooks.forEach((book) => {
        cBooks.push(book);
      });
      console.log(cBooks);
      setBooks(cBooks);
    });

    onSnapshot(q, (snapshot) => {
      const cBooks = [];
      snapshot.docs.forEach((doc) => {
        cBooks.push({ ...doc.data(), id: doc.id });
      });
      setBooks(cBooks);
    });
  }, []);

  return (
    <div className=''>
      <div className='w-4/5 mx-auto py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {books.map((book) => {
          return <Book key={book.id} {...book} />;
        })}
      </div>
      <button onClick={logOut}>Signot</button>
    </div>
  );
};

export default BookGallery;
