import React from 'react';
import { useEffect, useState, useRef } from 'react';
import PetItem from './PetItem';

const MyPetsList = (props) => {
  console.log(props.pets.length);
  console.log(props.pets);
  const { pets } = props;
  const [noPets, setNoPets] = useState(null);
  const [toggle, setToggle] = useState(null);
  const isMounted = useRef(false);
  const [amountToShow, setAmountToShow] = useState(10);
  // const [pets, setPets] = useState([]);
  const [lastKey, setLastKey] = useState('');
  const [nextTweets_loading, setNextTweetsLoading] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    props.pets.length <= 1 ? setNoPets(true) : setNoPets(false);
    return () => {
      isMounted.current = false;
    };
  }, []);

  const noPetsMessage = (
    <div>You don't have any adopted or fostered pets yet. </div>
  );

  const allPets = (
    <div className="row row-cols-1 row-cols-md-auto g-4">
      {pets.map((item) => {
        return <PetItem key={item.id} item={item} />;
      })}
    </div>
  );

  console.log(allPets);

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
              <div>{!noPets && allPets}</div>
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
              <div>{!noPets && allPets}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPetsList;
