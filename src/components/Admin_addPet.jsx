import React from "react";
import { useEffect, useState, useRef } from "react";

const AddPet = (props) => {
  const { item } = props;
  const [displayName, setdisplayName] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    
    return () => {
      isMounted.current = false;
    };
  }, [item.petID]);

  return (
    <div>Here the admin can add a pet<br/>
Components: <br/>
Form allowing admin to add a pet (with all of the pet details)<br/>
    </div>
  );
};

export default AddPet;