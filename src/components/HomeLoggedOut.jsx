import React from 'react';
import '../App.css';
import Modal from 'react-modal';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { useState } from 'react';

import Login from './Login';
import SignUp from './SignUp';

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
            {/* <li className="nav-item">
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
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const HomeLoggedOut = (props) => {
  //   const {authUser} = props;

  const [greeting] = useState('Good morning');
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalSignUp, setShowModalSignUp] = useState(false);

  const modalStyle = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(224, 224, 224, 0.75)',
      // boxShadow: 'inset 0 0 2000px rgba(255, 255, 255, .5)',
      // backgroundColor: 'rgba(255, 255, 255, .15)',
      backdropFilter: 'blur(5px)',
    },
    content: {
      position: 'absolute',
      top: '80px',
      left: '30%',
      right: '30%',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      // backgroundColor: 'rgba(255, 255, 255, .15)',
      backdropFilter: 'blur(5px)',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px',
    },
  };

  return (
    // <MyContext.Provider value={{ error, currentUser, onAddTweet }}>

    <>
      <Router>
        <NavBar />
      </Router>
      <div className="container" style={{ marginTop: '5rem' }}>
        {/* <Switch> */}
        {/* <Route exact path="/"> */}
        <h2>{greeting}, stranger!</h2>
        <h5>
          Please identify yourself by logging in. If you don't have an account
          yet, you can create one here.
        </h5>
        <p>
          Once logged in, you will be able to use our services. We connect dogs
          and cats to potential foster or adoptive owners. On our site, you will
          be able to browse for profiles of dogs and cats waiting for
          foster/adoption. With a click of the button, you can arrange for an
          animal to be fostered or adopted by you.
        </p>
        <p>
          Currently, there are x dogs and y cats waiting for fostering or
          adoption.
        </p>

        <div className="d-flex flex-row bd-highlight mb-3">
          <div className="p-2 bd-highlight">
            <button
              onClick={() => setShowModalLogin(true)}
              type="submit"
              className="btn btn-primary float-end me-4">
              Login (registered users)
            </button>
          </div>
          <div className="p-2 bd-highlight">
            <button
              onClick={() => setShowModalSignUp(true)}
              type="submit"
              className="btn btn-primary float-start ms-4">
              Create an account
            </button>
          </div>
        </div>
        <Modal
          closeTimeoutMS={200}
          isOpen={showModalLogin}
          // shouldCloseOnOverlayClick={true}
          contentLabel="modal"
          style={modalStyle}
          onRequestClose={() => setShowModalLogin(false)}
          ariaHideApp={false}>
          <h5>Login page</h5>
          <Login />
        </Modal>

        <Modal
          closeTimeoutMS={200}
          isOpen={showModalSignUp}
          contentLabel="modal"
          style={modalStyle}
          onRequestClose={() => setShowModalSignUp(false)}
          ariaHideApp={false}>
          <h5>Create an account</h5>
          <SignUp />
        </Modal>
      </div>
    </>
  );
};

export default HomeLoggedOut;
