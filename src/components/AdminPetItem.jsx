import React from 'react';
// import { useState, useRef } from 'react';

const AdminPetItem = (props) => {
  const { item } = props;

  return (
    <>
      <li>
        <a href={`/pets/edit/${item.id}`}>
          {item.name} | {item.type} | {item.status}
        </a>
      </li>
    </>
  );
};

export default AdminPetItem;
