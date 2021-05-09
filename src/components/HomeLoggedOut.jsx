import React from 'react';
import '../App.css';
import Modal from 'react-modal';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
import SignUpPage from './SignUpPage';

const NavBar = () => {
  return (
    <nav className="container navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

const HomeLoggedOut = () => {
  const [greeting] = useState('Hello');
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalSignUp, setShowModalSignUp] = useState(false);

  const overlay = {
    position: 'fixed',
    backgroundColor: 'rgba(224, 224, 224, 0.75)',
    boxShadow: 'inset 0 0 2000px rgba(255, 255, 255, .5)',
    backdropFilter: 'blur(5px)',
  };
  const contentLogin = {
    position: 'absolute',
    top: '6rem',
    left: '30%',
    right: '30%',
    height: '17rem',
    border: '1px solid #ccc',
    background: '#fff',
    backdropFilter: 'blur(5px)',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
  };

  const contentSignUp = {
    position: 'absolute',
    top: '6rem',
    left: '30%',
    right: '30%',
    height: '35rem',
    border: '1px solid #ccc',
    background: '#fff',
    backdropFilter: 'blur(5px)',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
  };

  const modalStyleLogin = {
    overlay: overlay,
    content: contentLogin,
  };

  const modalStyleSignUp = {
    overlay: overlay,
    content: contentSignUp,
  };

  return (
    <>
      <Router>
        <NavBar />
      </Router>
      <div className="container" style={{ marginTop: '5rem' }}>
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
        {/* <p>
          Currently, there are x dogs and y cats waiting for fostering or
          adoption.
        </p> */}

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
          contentLabel="modal"
          style={modalStyleLogin}
          onRequestClose={() => setShowModalLogin(false)}
          ariaHideApp={false}>
          <h5>Login page</h5>
          <Login />
        </Modal>

        <Modal
          closeTimeoutMS={200}
          isOpen={showModalSignUp}
          contentLabel="modal"
          style={modalStyleSignUp}
          onRequestClose={() => setShowModalSignUp(false)}
          ariaHideApp={false}>
          <h5>Create an account</h5>
          <SignUpPage />
        </Modal>
      </div>
    </>
  );
};

export default HomeLoggedOut;
