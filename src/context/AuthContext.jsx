import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firestoreConfig';

const AuthGlobalContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthGlobalContext);
};

import React from 'react';

const AuthContext = ({ children }) => {
  const localUser = JSON.parse(localStorage.getItem('user') || null);
  const [user, setUser] = useState(localUser);
  const [error, setError] = useState(null);

  const getUser = async (uid) => {
    const resp = await getDoc(doc(db, 'users', uid));
    const userData = resp.data();
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const login = useCallback(
    () => async (email, password) => {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        getUser(res.user.uid);
        setError(null);
        return res;
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    },
    []
  );

  const signup = useCallback(
    () => async (name, email, password) => {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const uid = res.user.uid;

        await setDoc(doc(db, 'users', uid), {
          name: name,
          uid: uid,
          email: email,
        });

        getUser(uid);
        setError(null);
        return res;
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    },
    []
  );

  const logOut = useCallback(() => {
    signOut(auth);
    setUser(null);
    localStorage.clear();
  }, []);

  const values = { user, login, signup, error, logOut };

  return (
    <AuthGlobalContext.Provider value={values}>
      {children}
    </AuthGlobalContext.Provider>
  );
};

export default AuthContext;
