import React, { useState } from 'react';
import {
  Timestamp,
  addDoc,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { colRef, db } from '../firebase/firestoreConfig';
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/AuthContext';

export default function DocForm({}) {
  const [isPrivate, setIsPrivate] = useState(false);
  const { user } = useAuthContext();

  const changePrivacy = () => {
    setIsPrivate(!isPrivate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData);

    const userRef = doc(db, 'users', user.uid);
    const firebaseData = {
      ...data,
      createdAt: Timestamp.now(),
      createdBy: {
        name: user.name,
        uid: user.uid,
      },
    };

    try {
      if (isPrivate) {
        await updateDoc(userRef, {
          privateBooks: arrayUnion(firebaseData),
        });
      } else {
        await addDoc(colRef, firebaseData);
      }
      toast(
        `New doc with title ${data.title} and author ${data.author} added to firestore`
      );
      target.reset();
    } catch (error) {
      toast(`Ops... Something went wrong: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='py-16 w-2/3 mx-auto max-w-sm'>
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/3'>
          <label
            className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
            htmlFor='title'
          >
            Book Title
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            type='text'
            placeholder='Divergent'
            required
            id='title'
            name='title'
          />
        </div>
      </div>
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/3'>
          <label
            className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
            htmlFor='author'
          >
            Book Author
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            type='text'
            id='author'
            name='author'
            placeholder='Morgan. D'
            required
          />
        </div>
      </div>
      <div className='flex justify-center gap-2 m-2'>
        <div className='flex items-center w-full pl-4 border border-gray-200 rounded dark:border-gray-700'>
          <input
            onChange={changePrivacy}
            id='bordered-radio-1'
            type='checkbox'
            checked={isPrivate}
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          />
          <label
            htmlFor='bordered-radio-1'
            className='w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Private Book
          </label>
        </div>
        <div className='flex items-center w-full pl-4 border border-gray-200 rounded dark:border-gray-700'>
          <input
            onChange={changePrivacy}
            id='bordered-radio-2'
            type='checkbox'
            checked={!isPrivate}
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          />
          <label
            htmlFor='bordered-radio-2'
            className='w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Public Book
          </label>
        </div>
      </div>
      <div className=''>
        <button
          className='shadow w-full bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
          type='submit'
        >
          Create Doc
        </button>
      </div>
    </form>
  );
}
