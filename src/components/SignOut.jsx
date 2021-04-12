import React from "react";
import { useEffect, useState, useRef } from "react";

const SignOut = (props) => {
  const { item } = props;
  const [displayName, setdisplayName] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div>This is the SignOut page.

    </div>
  );
};

export default SignOut;