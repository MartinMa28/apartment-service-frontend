import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoggedIn from './components/LoginContext';
import NavBar from './components/NavBar';
import NotFoundPage from './pages/NotFoundPage';

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
          <Route path="/login" render={(props) => <LoginPage {...props} />} />
          <Route
            path="/register"
            render={(props) => <RegisterPage {...props} />}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </LoggedIn.Provider>
  );
}

export default App;
