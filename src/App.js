import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoggedIn from './components/LoginContext';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import HouseListPage from './pages/HouseListPage';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const defaultLoginInfo = {
    loggedIn: false,
    username: null,
  };

  const prevLoginInfo = localStorage.getItem('loginInfo');
  const loginInfo = prevLoginInfo
    ? JSON.parse(prevLoginInfo)
    : defaultLoginInfo;

  const [loggedIn, setLoggedIn] = useState(loginInfo);

  const setLoggedInHelper = (loggedIn, username) => {
    const loginObj = {
      loggedIn: loggedIn,
      username: username,
    };
    localStorage.setItem('loginInfo', JSON.stringify(loginObj));
    setLoggedIn(loginObj);
  };

  return (
    <LoggedIn.Provider value={{ loggedIn, setLoggedInHelper }}>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/house-list" component={HouseListPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </LoggedIn.Provider>
  );
}

export default App;
