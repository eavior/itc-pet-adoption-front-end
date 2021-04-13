import React from 'react';
import '../App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import Search from './Search';
import AdminDashboard from './Admin_dashboard';
import SignOut from './SignOut';
import MyPetsList from './MyPetsList';
import { petsDB, petsDB2 } from '../db/database';
import PetProfile from './PetProfile';

const NavBar = () => {
  return (
    <nav className="container navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        {/* <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="selected"
                exact
                to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="selected"
                to="/my_pets">
                My pets
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="selected"
                to="/search">
                Search a pet
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="selected"
                to="/profile">
                My profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="selected"
                to="/admin">
                Admin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="selected"
                to="/sign_out">
                Sign out
              </NavLink>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

const Home = (props) => {
  //   const {authUser} = props;
  const [pets, setPets] = useState(petsDB2);
  const [greeting, setGreeting] = useState('Good morning');

  // useEffect(() => {
  //   getPets()
  //     .then(pets => {
  //       setPets(pets);
  //     });
  // }, []);
  const handleOnNewPet = (newPet) => {
    setPets((prevPets) => [...prevPets, newPet]);
  };
  const handleOnDeleteItem = (itemIndex) => {
    setPets((prevPets) => {
      const left = prevPets.slice(0, itemIndex);
      const right = prevPets.slice(itemIndex + 1);
      return [...left, ...right];
    });
  };

  const array = pets.pets;
  const animal = pets.pets.filter((x) => x.id == 2);

  console.log(animal);

  return (
    // <MyContext.Provider value={{ error, currentUser, onAddTweet }}>
    <Router>
      <NavBar />
      <div className="container" style={{ marginTop: '5rem' }}>
        <Switch>
          <Route exact path="/">
            <h2>{greeting}, Elisha Avior!</h2>
            <ul>
              <li>
                <NavLink
                  className="nav-link"
                  activeClassName="selected"
                  to="/search">
                  Search a pet
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-link"
                  activeClassName="selected"
                  to="/my_pets">
                  Go to your pets
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-link"
                  activeClassName="selected"
                  to="/profile">
                  My profile
                </NavLink>
              </li>
            </ul>
          </Route>
          <Route path="/my_pets">
            <MyPetsList pets={pets.pets} onDeleteItem={handleOnDeleteItem} />
          </Route>

          {/* <Route path="/pets/:id">
            <PetProfile pets={pets.pets} onDeleteItem={handleOnDeleteItem} />
          </Route> */}

          <Route path="/pets/:id">
            <PetProfile pets={pets.pets} />
          </Route>

          <Route path="/profile">
            <UserProfile />
            {/* <Profile currentUser={authUser.uid}></Profile> */}
          </Route>

          <Route path="/admin">
            <AdminDashboard />
            {/* <Profile currentUser={authUser.uid}></Profile> */}
          </Route>

          <Route path="/sign_out">
            <SignOut />
            {/* <SignOut /> */}
          </Route>
        </Switch>
      </div>
    </Router>
    // </MyContext.Provider>
  );
};

export default Home;
