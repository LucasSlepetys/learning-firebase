import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const SignIn = ({ toggle }) => {
  const { error, signup } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const objData = Object.fromEntries(formData);
    const res = await signup()(objData.name, objData.email, objData.password);
    if (!error) {
      navigate('/main');
    } else {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <section className=''>
      <div className='authenticationDiv '>
        <div className='authenticationInnerDiv'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white'>
              Create a new account
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium text-white'
                >
                  Your name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='bg-gray-50 border   sm:text-sm rounded-lg block w-full p-2.5  text-black focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Name LastName'
                  required=''
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='bg-gray-50 border   sm:text-sm rounded-lg block w-full p-2.5  text-black focus:ring-blue-500 focus:border-blue-500'
                  placeholder='name@company.com'
                  required=''
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium  text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className=' border   sm:text-sm rounded-lg  block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500'
                  required=''
                />
              </div>
              <button
                type='submit'
                className='w-full text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-slate-600 hover:bg-slate-700 focus:ring-slate-800'
              >
                Sign Up
              </button>
              <p
                onClick={toggle}
                className='cursor-pointer text-sm font-light text-gray-400 flex justify-between'
              >
                Already have an account yet?
                <a className='font-medium hover:underline text-slate-500'>
                  Log In
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
