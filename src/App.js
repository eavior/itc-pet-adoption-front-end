// import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import HomeLoggedOut from './components/HomeLoggedOut';
import { useState } from 'react';
// import { useEffect, useState, useRef } from 'react';

function App() {
  const [auth] = useState(true);
  const [userID] = useState(3);

  if (auth) {
    return <Home userID={userID} />;
  }

  if (!auth) {
    return <HomeLoggedOut />;
  }
}

export default App;
