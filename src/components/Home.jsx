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

import AdminDashboard from './AdminDashboard';
import SignOut from './SignOut';
import MyPets from './MyPets';
import PetProfile from './PetProfile';
import Search from './Search';
import { useAuth } from '../context/auth';
import { getAllPets } from '../lib/api';
import AllPets from './AllPets';
import AdminEditPet from './AdminEditPet';

const NavBar = () => {
  const auth = useAuth();
  return (
    <nav className="container navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                exact
                to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/my_pets">
                My pets
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/search">
                Search a pet
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/all_pets">
                Pet gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/profile">
                My profile
              </NavLink>
            </li>
            {auth.admin && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/admin">
                  Admin
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/sign_out">
                Sign out
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Home = () => {
  const [petList, setPetList] = useState([]);
  const [greeting] = useState('Hello');
  const auth = useAuth();

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      const pets = await getAllPets(auth.token);
      setPetList(pets);
    } catch (error) {}
  };

  return (
    <Router>
      <NavBar />
      <div className="container" style={{ marginTop: '5rem' }}>
        <Switch>
          <Route exact path="/">
            <h2>
              {greeting}, {auth.fullName}!
            </h2>
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
            <MyPets />
          </Route>
          <Route path="/all_pets">
            <AllPets petList={petList} />
          </Route>

          <Route path="/pets/edit/:id">
            <AdminEditPet />
          </Route>

          <Route path="/pets/:id">
            <PetProfile />
          </Route>

          <Route path="/profile">
            <UserProfile />
          </Route>

          <Route path="/admin">{auth.admin && <AdminDashboard />}</Route>

          <Route path="/search">
            <Search />
          </Route>

          <Route path="/sign_out">
            <SignOut />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Home;
