import React from 'react';
import AdminPetItem from './AdminPetItem';

const AdminPetList = (props) => {
  const { petList, onLoadPets } = props;

  const allPets =
    petList.length < 1 ? (
      <div>There are no pets in the list</div>
    ) : (
      <div className="row row-cols-1 row-cols-md-auto g-4">
        {petList.map((item) => {
          return (
            <AdminPetItem
              key={item.id}
              item={item}
              onLoadPets={() => onLoadPets()}
            />
          );
        })}
      </div>
    );

  return (
    <>
      <div className="list-group">{allPets}</div>
    </>
  );
};

export default AdminPetList;
