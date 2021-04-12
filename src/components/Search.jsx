import React from "react";
import { useEffect, useState, useRef } from "react";

const Search = (props) => {
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
    <div>This is the search page.<br/>
Components:<br/>
Search bar<br/>
Results of search (List of animal card components that link to the pet page)<br/>
<br/>
Search Bar Component: <br/>
Can toggle between basic and advanced search <br/>
<br/>
Basic Search:<br/>
Can search based on Type of animal <br/>
<br/>
Advanced search:<br/>
Can search based on Adoption Status, Height, Weight, Type, Name<br/>

    </div>
  );
};

export default Search;