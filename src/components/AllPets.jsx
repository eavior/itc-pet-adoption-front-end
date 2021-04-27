import React from 'react';
import { useEffect, useState, useRef } from 'react';
import PetItem from './PetItem';
import { useAuth } from '../context/auth';
import { getAllPets } from '../lib/api';

const AllPets = (props) => {
  const { currentUserId } = props;
  const isMounted = useRef(false);
  const auth = useAuth();
  const [pets, setPets] = useState('');
  const [noPets, setNoPets] = useState(true);

  useEffect(() => {
    isMounted.current = true;

    getAllPets(auth.token)
      .then((data) => {
        setPets(data);
      })
      .then(pets.length <= 1 ? setNoPets(true) : setNoPets(false));

    return () => {
      isMounted.current = false;
    };
  });

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

  const noPetsMessage = <div>There are no pets in the database... </div>;

  // const petsOfCurrentUser = pets.filter((x) => x.ownerID === currentUser.id);
  const allPets = noPets ? (
    <div></div>
  ) : (
    <div className="row row-cols-1 row-cols-md-auto g-4">
      {pets.map((item) => {
        return (
          <PetItem key={item.id} item={item} currentUserId={currentUserId} />
        );
      })}
    </div>
  );

  // const savedPetIDs = currentUser.savedPets;

  // const petsSavedByCurrentUser = pets.filter(function (item) {
  //   return savedPetIDs.includes(item.id);
  // });

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
              <div>{noPets && noPetsMessage}</div>
              <div>{!noPets && allPets}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPets;
