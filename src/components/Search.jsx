import React from 'react';
// import { useEffect, useState, useRef } from 'react';

const Search = (props) => {
  // const { item } = props;

  // const isMounted = useRef(false);

  // useEffect(() => {
  //   isMounted.current = true;

  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, []);

  return (
    <>
      <div>Basic search: type of animal</div>
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <div>
        Results of search: list of animal card components that link to the pet
        page
      </div>
      <div>Advanced search: Adoption Status, Height, Weight, Type, Name</div>
    </>
  );
};

export default Search;
