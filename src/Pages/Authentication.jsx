import React, { useState } from 'react';
import LogIn from '../Components/LogIn';
import SignIn from '../Components/SignIn';

const Authentication = () => {
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className='bg-slate-400'>
      {toggle ? (
        <LogIn toggle={handleToggle} />
      ) : (
        <SignIn toggle={handleToggle} />
      )}
    </div>
  );
};

export default Authentication;
