import React from 'react';
import { useEffect, useRef } from 'react';

const SignOut = (props) => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return <div>This is the SignOut page.</div>;
};

export default SignOut;
