import React from 'react';
import '../App.css';
import Modal from 'react-modal';
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
// import Home from './Home';

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
                to="/login">
                Log in
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="selected"
                to="/sign_up">
                Create an account
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const HomeLoggedOut = (props) => {
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
            <h2>{greeting}, Stranger!</h2>
            <h5>
              Please identify yourself by logging in, or signing up for an
              account if you don't have one yet.
            </h5>
            <p>
              Once logged in, you will be able to use our services. We connect
              dogs and cats to potential foster or adoptive owners. On our site,
              you will be able to browse for profiles of dogs and cats waiting
              for foster/adoption. With a click of the button, you can arrange
              for an animal to be fostered or adopted by you.
            </p>
            <p>
              Currently, there are x dogs and y cats waiting for fostering or
              adoption.
            </p>

            <div class="d-flex flex-row bd-highlight mb-3">
              <div class="p-2 bd-highlight">
                <button
                  //   onSubmit={handleSubmit(onSubmit)}
                  type="submit"
                  className="btn btn-primary float-start ms-4">
                  Create an account
                </button>
              </div>
              <div class="p-2 bd-highlight"></div>
              <div class="p-2 bd-highlight">
                <button
                  //   onSubmit={handleSubmit(onSubmit)}
                  type="submit"
                  className="btn btn-primary float-end me-4">
                  Login (registered users)
                </button>
              </div>
            </div>
          </Route>
          <Route path="/login">
            <Modal
              isOpen={true}
              //   onRequestClose={() => this.setState({ isModalOpen: false })}
              className="w-50 m-auto mt-5 shadow">
              <div>This is a text</div>
              <UserProfile></UserProfile>
              {/* <NewOrEditTodoForm
                item={item}
                onNewOrEditTodo={this.props.onUpdate}
              /> */}
            </Modal>
          </Route>

          {/* <Route path="/pets/:id">
            <PetProfile pets={pets.pets} onDeleteItem={handleOnDeleteItem} />
          </Route> */}

          <Route path="/sign_up"></Route>
        </Switch>
      </div>
    </Router>
    //{' '}
  );
};

export default HomeLoggedOut;
