import React from 'react';
// import { useState, useRef } from 'react';

const PetItem = (props) => {
  const { item } = props;
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
      <div className="col">
        <div className="card" style={{ width: '12rem', height: '20rem' }}>
          <img
            src={item.image}
            className="card-img-top"
            alt={item.name}
            style={{ height: '6rem', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">{item.status}</p>
            <a href={`/pets/${item.id}`} className="btn btn-primary">
              See more
            </a>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetItem;
