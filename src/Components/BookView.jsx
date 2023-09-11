import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firestoreConfig';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Book({ id, title, author, createdBy }) {
  const delBook = () => {
    //deleteDoc(ref to document) to del doc
    try {
      const docRef = doc(db, 'books', id);
      deleteDoc(docRef);
      toast('Doc deleted');
    } catch (error) {
      toast(`Opps something went wrong: ${error.message}`);
    }
  };

  return (
    <div
      key={id}
      className='flex flex-col gap-4 p-4 bg-gradient-to-br from-slate-100 to-slate-300 shadow-lg'
    >
      <div className='flex flex-col gap-2 text-lg font-bold'>
        <p className=''>
          Title:
          <span className='font-normal text-sm'> {title}</span>
        </p>
        <p className=''>
          Author:
          <span className='font-normal text-sm'> {author}</span>
        </p>
        <p className='py-4'>
          Created By:
          <span className='font-normal text-sm'> {createdBy.name}</span>
        </p>
      </div>
      <Link
        to={`/book/${id}`}
        className='text-center flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-base text-white w-full'
      >
        Edit
      </Link>
      <button
        onClick={delBook}
        className='flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-base text-white w-full'
      >
        Del
      </button>
    </div>
  );
}

export default Book;
