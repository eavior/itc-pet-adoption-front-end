import './App.css';
import Home from './components/Home';
import HomeLoggedOut from './components/HomeLoggedOut';

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
  if (!auth.isInitiallyLoaded) {
    return <div></div>;
  }
  return (
    <Router>
      <Switch>
        <Route path="/unknown_user">
          {auth.token && <Redirect to="/" />}
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
