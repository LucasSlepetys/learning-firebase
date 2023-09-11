import React, { useEffect } from 'react';
import MainPage from '../Pages/MainPage';

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import ErrorPage from '../Pages/ErrorPage';
import BookPage, { loader as bookLoader } from '../Pages/BookPage';
import Error from '../Components/Error';
import Authentication from '../Pages/Authentication';
import PrivateRoutesLayout from './PrivateRoutesLayout';
import { useAuthContext } from '../context/AuthContext';

const Routes = () => {
  const { user } = useAuthContext();

  const router = createBrowserRouter([
    {
      element: <PrivateRoutesLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'main',
          element: <MainPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: 'book/:id',
          element: <BookPage />,
          loader: bookLoader,
          errorElement: <Error />,
        },
      ],
    },
    {
      path: 'authentication',
      element: user ? <Navigate to='/main' /> : <Authentication />,
      errorElement: <Error />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
