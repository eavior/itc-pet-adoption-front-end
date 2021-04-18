import React from 'react';
import { useEffect, useState, useRef } from 'react';
import PetItem from './PetItem';

const MyPetsList = (props) => {
  const { pets, currentUser } = props;
  const [noPets, setNoPets] = useState(null);
  // const [toggle, setToggle] = useState(null);
  const isMounted = useRef(false);
  // const [amountToShow, setAmountToShow] = useState(10);
  // const [pets, setPets] = useState([]);
  // const [lastKey, setLastKey] = useState('');

  useEffect(() => {
    isMounted.current = true;
    pets.length <= 1 ? setNoPets(true) : setNoPets(false);
    return () => {
      isMounted.current = false;
    };
  }, [pets.length]);

  const noPetsMessage = (
    <div>You don't have any adopted or fostered pets yet. </div>
  );

  const petsOfCurrentUser = pets.filter((x) => x.ownerID === currentUser.id);
  const allOwnedPets = (
    <div className="row row-cols-1 row-cols-md-auto g-4">
      {petsOfCurrentUser.map((item) => {
        return <PetItem key={item.id} item={item} currentUser={currentUser} />;
      })}
    </div>
  );

  const savedPetIDs = currentUser.savedPets;
  const petsSavedByCurrentUser = pets.filter(function (item) {
    return savedPetIDs.includes(item.id);
  });
  const allSavedPets = (
    <div className="row row-cols-1 row-cols-md-auto g-4">
      {petsSavedByCurrentUser.map((item) => {
        return <PetItem key={item.id} item={item} currentUser={currentUser} />;
      })}
    </div>
  );

  return (
    <>
      {/* <div className="container"> */}

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
                Your adopted and/or fostered pets
              </button>
            </h5>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion">
            <div className="card-body">
              <div>{noPets && noPetsMessage}</div>
              <div>{!noPets && allOwnedPets}</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h5 className="mb-0">
              <button
                className="btn btn-link collapsed"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo">
                Your saved pets
              </button>
            </h5>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordion">
            <div className="card-body">
              <div>{noPets && noPetsMessage}</div>
              <div>{!noPets && allSavedPets}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPetsList;
