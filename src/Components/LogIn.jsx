import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const LogIn = ({ toggle }) => {
  const { error, login, user } = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();
  // location.state?.from?.pathname ||
  const from = '/main';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const objData = Object.fromEntries(formData);
    const res = await login()(objData.email, objData.password);
    if (!error) {
      console.log(res);
      navigate(from, { replace: true });
    } else {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <section className=''>
      <div className='authenticationDiv'>
        <div className='authenticationInnerDiv'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white'>
              Log in to your account
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
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
              <div className='flex items-center justify-between'>
                <a className='text-sm font-medium text-white hover:underline '>
                  Forgot password?
                </a>
              </div>
              <button
                type='submit'
                className='w-full text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-slate-600 hover:bg-slate-700 focus:ring-slate-800'
              >
                Log In
              </button>
              <p
                onClick={toggle}
                className='cursor-pointer text-sm font-light text-gray-400 flex justify-between'
              >
                Don’t have an account yet?
                <a className='font-medium hover:underline text-slate-500'>
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
