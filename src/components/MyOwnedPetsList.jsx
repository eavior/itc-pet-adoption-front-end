import React from 'react';
import PetItem from './PetItem';

const MyOwnedPetsList = (props) => {
  const { ownedPets } = props;

  const ownedPetsList =
    ownedPets.length < 1 ? (
      <div>You do not own a pet yet. Please foster or adopt one.</div>
    ) : (
      <div className="row row-cols-1 row-cols-md-auto g-4">
        {ownedPets.map((item) => {
          return <PetItem key={item.id} item={item} />;
        })}
      </div>
    );

  return (
    <>
      <div>{ownedPetsList}</div>
    </>
  );
};

export default MyOwnedPetsList;
