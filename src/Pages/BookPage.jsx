import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firestoreConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const loader = async ({ params }) => {
  const { id } = params;

  const docRef = doc(db, 'books', id);
  const docRes = await getDoc(docRef);

  return { data: docRes.data(), id };
};

const BookPage = () => {
  const { data, id } = useLoaderData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const docRef = doc(db, 'books', id);

    try {
      updateDoc(docRef, {
        ...data,
        lastUpdateAt: serverTimestamp(),
      });
      toast('Doc has been updated');
      navigate('/main');
    } catch (error) {
      toast(`Error! ${error.message}`);
    }
  };

  return (
    <div>
      <Link to='..' className='absolute left-8 top-8'>
        <FaArrowCircleLeft className=' text-4xl text-black' />
      </Link>
      <form onSubmit={handleSubmit} className='py-28 w-2/3 mx-auto max-w-sm'>
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
              className='bg-gray-200 font-bold text-xl appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              type='text'
              placeholder='Divergent'
              required
              id='title'
              name='title'
              defaultValue={data.title}
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
              className='bg-gray-200 font-bold text-xl appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              type='text'
              id='author'
              name='author'
              placeholder='Morgan. D'
              defaultValue={data.author}
              required
            />
          </div>
        </div>
        <div className=''>
          <button
            className='shadow w-full bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
            type='submit'
          >
            Edit Doc
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookPage;
