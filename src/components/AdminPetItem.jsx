import React from 'react';
// import { useState, useRef } from 'react';

const AdminPetItem = (props) => {
  const { item } = props;

  return (
    <>
      <li>
        {item.name} ({item.type}). To add: edit function (same page as 'add pet'
        but with values filled in).
      </li>
    </>
  );
};

export default AdminPetItem;
