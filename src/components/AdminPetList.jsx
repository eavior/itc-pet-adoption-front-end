import React from 'react';
import AdminPetItem from './AdminPetItem';

const AdminPetList = (props) => {
  const { petList } = props;

  const allPets =
    petList.length < 1 ? (
      <div>There are no pets in the list</div>
    ) : (
      <div className="row row-cols-1 row-cols-md-auto g-4">
        {petList.map((item) => {
          return <AdminPetItem key={item.id} item={item} />;
        })}
      </div>
    );

  return (
    <>
      <ul>{allPets}</ul>
    </>
  );
};

export default AdminPetList;
