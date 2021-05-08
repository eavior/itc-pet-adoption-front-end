import React from 'react';
import { useEffect, useState, useRef } from 'react';
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
      console.log(searchQuery);
      const search = await searchPets(searchQuery, auth.token);
      setSearchPerformed(true);
      setSearchResult(search.searchResult);
      console.log(search.searchResult);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    if (event.target.id === 'name') setSearchByName(event.target.value);
    if (event.target.id === 'cat' || event.target.id === 'dog')
      setSearchByType(event.target.value);
    // const creationDate = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jerusalem' });;
    // this.setState({
    //     ...this.state,
    //     [event.target.name]: value,
    //     date: creationDate
    // });
  };

  // handleSubmit(event) {
  //     event.preventDefault();
  //     if (!this.state.noteBody) return;
  //     const note = { id: Date.now(), date: this.state.date, noteTitle: this.state.noteTitle, noteBody: this.state.noteBody };
  //     this.props.onAddNote(note);
  //     this.setState({
  //         value: "", id: "",
  //         noteTitle: "",
  //         noteBody: "",
  //         date: "",
  //     });
  // }

  return (
    <>
      {/* <div>Basic search: type of animal</div>
      <form className="d-flex" onSubmit={(event) => onSubmit(event)}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          name="searchByName"
          onChange={(event) => handleChange(event)}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <div>
        Results of search: list of animal card components that link to the pet
        page
      </div>
      <div>Advanced search: Adoption Status, Height, Weight, Type, Name</div> */}
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
        {/* <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword3"
            />
          </div>
        </div> */}
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
            {/* <div className="form-check disabled">
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                id="gridRadios3"
                value="option3"
                disabled
              />
              <label className="form-check-label" htmlFor="gridRadios3">
                Third disabled radio
              </label>
            </div> */}
          </div>
        </fieldset>
        {/* <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck1"
              />
              <label className="form-check-label" htmlFor="gridCheck1">
                Example checkbox
              </label>
            </div>
          </div>
        </div> */}
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
