import React from 'react';
import { useEffect, useState, useRef } from 'react';
import PetItem from './PetItem';
import { useAuth } from '../context/auth';
import { getOwnedPets, getSavedPets } from '../lib/api';

const MyPetsList = (props) => {
   const isMounted = useRef(false);
  const { currentUserId } = props;
  const auth = useAuth();
  const [ownedPets, setOwnedPets] = useState('');
  const [savedPets, setSavedPets] = useState('');
  const [noOwnedPets, setNoOwnedPets] = useState(null);
  const [noSavedPets, setNoSavedPets] = useState(null);

  useEffect(() => {
        isMounted.current = true;

    getOwnedPets(currentUserId, auth.token).then((data) => {
      setOwnedPets(`${data.owned}`);
      console.log(data);
      console.log(ownedPets);
    });

    getSavedPets(currentUserId, auth.token).then((data) => {
      setSavedPets(`${data.saved}`);
      console.log(data);
      console.log(savedPets);
    });
    ownedPets.length <= 1 ? setNoOwnedPets(true) : setNoOwnedPets(false);
    savedPets.length <= 1 ? setNoSavedPets(true) : setNoSavedPets(false);

    return () => {
      isMounted.current = false;
    };
  }, [ownedPets.length, savedPets.length]);

  const { pets, currentUser } = props;

  // const [toggle, setToggle] = useState(null);

  // const [amountToShow, setAmountToShow] = useState(10);
  // const [pets, setPets] = useState([]);
  // const [lastKey, setLastKey] = useState('');

  // useEffect(() => {
  //   isMounted.current = true;
  //   pets.length <= 1 ? setNoPets(true) : setNoPets(false);
  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, [pets.length]);

  const noOwnedPetsMessage = (
    <div>You don't have any adopted or fostered pets yet. </div>
  );

    const noSavedPetsMessage = (
    <div>You don't have any saved pets yet. </div>
  );

  // const petsOfCurrentUser = pets.filter((x) => x.ownerID === currentUser.id);

  const allOwnedPets = (
    <div className="row row-cols-1 row-cols-md-auto g-4">
      {/* {petsOfCurrentUser.map((item) => {
        return <PetItem key={item.id} item={item} currentUser={currentUser} />;
      })} */}
    </div>
  );

  // const savedPetIDs = currentUser.savedPets;

  // const petsSavedByCurrentUser = pets.filter(function (item) {
  //   return savedPetIDs.includes(item.id);
  // });

  const allSavedPets = (
    <div className="row row-cols-1 row-cols-md-auto g-4">
      {/* {petsSavedByCurrentUser.map((item) => {
        return <PetItem key={item.id} item={item} currentUser={currentUser} />;
      })} */}
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
              <div>{noOwnedPets && noOwnedPetsMessage}</div>
              <div>{!noOwnedPets && allOwnedPets}</div>
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
              <div>{noSavedPets && noSavedPetsMessage}</div>
              <div>{!noSavedPets && allSavedPets}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPetsList;
