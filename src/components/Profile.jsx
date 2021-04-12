import React from "react";
import { useEffect, useState, useRef } from "react";

const Profile = (props) => {
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
    <div>This is the user's profile.<br/>
    Form with the following fields: password, email, first name, last name, phone number,user can add a short bio. <br/>
Save button to save any changes done.


    </div>
  );
};

export default Profile;