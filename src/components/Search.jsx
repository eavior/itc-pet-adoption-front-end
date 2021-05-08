import React from 'react';
import { useState } from 'react';
import { useAuth } from '../context/auth';
import { searchPets } from '../lib/api';
import PetListResult from './PetListResult';

const Search = (props) => {
  const auth = useAuth();
  const [searchByName, setSearchByName] = useState('');
  const [searchByType, setSearchByType] = useState('');
  const [searchByStatus, setSearchByStatus] = useState('');
  const [searchByHeight, setSearchByHeight] = useState('');
  const [searchByWeight, setSearchByWeight] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const searchQuery = `name=${searchByName}&type=${searchByType}&status=${searchByStatus}&height=${searchByHeight}&weight=${searchByWeight}`;

    try {
      const search = await searchPets(searchQuery, auth.token);
      setSearchPerformed(true);
      setSearchResult(search.searchResult);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    if (event.target.id === 'name') setSearchByName(event.target.value);
    if (event.target.id === 'cat' || event.target.id === 'dog')
      setSearchByType(event.target.value);
  };

  return (
    <>
      <form onSubmit={(event) => onSubmit(event)}>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Pet name
          </label>
          <div className="col-sm-10">
            <input
              type="name"
              className="form-control"
              id="name"
              onChange={(event) => handleChange(event)}
            />
          </div>
        </div>

        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-2 pt-0">Type</legend>
          <div className="col-sm-10">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gridradios"
                id="cat"
                value="cat"
                onChange={(event) => handleChange(event)}
              />
              <label className="form-check-label" htmlFor="gridRadios1">
                Cat
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gridradios"
                id="dog"
                value="dog"
                onChange={(event) => handleChange(event)}
              />
              <label className="form-check-label" htmlFor="gridRadios2">
                Dog
              </label>
            </div>
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <br></br>
      {searchResult.length !== 0 && searchPerformed && (
        <PetListResult petList={searchResult} />
      )}
      {searchResult.length == 0 && !searchPerformed && <div></div>}
      {searchResult.length == 0 && searchPerformed && (
        <div>Sorry, no pets with the entered criteria were found.</div>
      )}
    </>
  );
};

export default Search;
