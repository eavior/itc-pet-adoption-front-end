import React from 'react';
import PetItem from './PetItem';

const PetListResult = (props) => {
  const { petList } = props;
  // const { ownedPets, onRefresh } = props;

  const petListGallery = (
    <div className="row row-cols-1 row-cols-md-auto g-4">
      {petList.map((item) => {
        return <PetItem key={item.id} item={item} />;
      })}
    </div>
  );

  return (
    <>
      <div>{petListGallery} </div>
    </>
  );
};

export default PetListResult;
