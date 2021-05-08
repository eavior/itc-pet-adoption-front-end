import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PetItem = (props) => {
  const { item } = props;
  const [petPicURL, setPetPicURL] = useState(item.picture_url);

  useEffect(() => {
    if (!item.picture_url) {
      if (item.type === 'dog') setPetPicURL('../dog.png');
      if (item.type === 'cat') setPetPicURL('../cat.png');
    }
  }, []);

  return (
    <>
      <div className="col">
        <div className="card" style={{ width: '12rem', height: '15rem' }}>
          <img
            src={petPicURL}
            className="card-img-top"
            alt={item.name}
            style={{ height: '6rem', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h5 className="card-title text-center">{item.name}</h5>
            <NavLink
              className="nav-link btn btn-primary"
              activeClassName="selected"
              to={`/pets/${item.id}`}>
              See more
            </NavLink>
          </div>
          <div className="card-footer text-center">
            <small className="text-muted">{item.status}</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetItem;
