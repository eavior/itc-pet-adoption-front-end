import React from 'react';
import PetItem from './PetItem';

const AllPets = (props) => {
  const { petList, currentUserId } = props;
  const allPets =
    petList.length < 1 ? (
      <div>There are no pets in the list</div>
    ) : (
      <div className="row row-cols-1 row-cols-md-auto g-4">
        {petList.map((item) => {
          return (
            <PetItem key={item.id} item={item} currentUserId={currentUserId} />
          );
        })}
      </div>
    );

  return (
    <>
      <div id="accordion">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne">
                All pets
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion">
            <div className="card-body">
              <div>{allPets}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPets;
