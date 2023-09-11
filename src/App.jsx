import MainPage from './Pages/MainPage';

import { ToastContainer } from 'react-toastify';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import ErrorPage from './Pages/ErrorPage';
import BookPage, { loader as bookLoader } from './Pages/BookPage';
import Error from './Components/Error';
import Authentication from './Pages/Authentication';
import PrivateRoutesLayout from './layouts/PrivateRoutesLayout';
import AuthContext from './context/AuthContext';
import Routes from './layouts/Routes';

const App = () => {
  return (
    <>
      <AuthContext>
        <Routes />
      </AuthContext>

      <ToastContainer position='top-center' />
    </>
  );
};

export default App;
