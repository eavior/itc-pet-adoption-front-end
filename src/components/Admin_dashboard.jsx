import React from "react";
import { useEffect, useState, useRef } from "react";

const AdminDashboard = (props) => {
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
    <div>This is the admin dashboard<br/>
<br/>
Components: <br/>
List of all the users in the database (pet owners and administrators) <br/>
Clicking on a user should display all the pets that the user owns along with all of their profile details so the administrators can contact the user. <br/>

List of all pets and ability to go to the pet page and edit. (The edit should be just like adding a pet but with the details already displayed there)<br/>

    </div>
  );
};

export default AdminDashboard;