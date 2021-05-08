// import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import HomeLoggedOut from './components/HomeLoggedOut';
import { useState, useEffect } from 'react';
// import { useEffect, useState, useRef } from 'react';

// function App() {
//   const [auth] = useState(false);
//   const [userID] = useState(3);

//   if (auth) {
//     return <Home userID={userID} />;
//   }

//   if (!auth) {
//     return <HomeLoggedOut />;
//   }
// }

// export default App;

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import AuthProvider, { useAuth } from './context/auth';

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/unknown_user',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const AppRouter = () => {
  let auth = useAuth();
  console.log(auth.userId);
  console.log(auth.fullName);

  if (!auth.isInitiallyLoaded) {
    return <div></div>;
  }
  return (
    <Router>
      <Switch>
        <Route path="/unknown_user">
          {auth.token && <Redirect to="/" />}
          {/* {auth.token && <Home />} */}
          {!auth.token && <HomeLoggedOut />}
        </Route>
        <PrivateRoute path="/">
          {/* <Home userName={currentUserName} /> */}
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
