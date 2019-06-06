import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './Styles/reset.css';
import './Styles/Global.scss';

import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import NotFound404 from './Pages/NotFound404';

function App() {

  const [account, setAccount] = useState('No User');

  useEffect(() => {
    return () => {
      return account
    }
  }, [account])

  useEffect(() => {
    axios.get('/auth/getUser').then((res) => {
      setAccount(res.data);
    }).catch((err) => console.log(err))
  }, [])

  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route
            exact path="/"
            render={(routeProps) => (
              <Login setAccount={setAccount} />
            )}
          />
          <Route
            path="/dashboard"
            render={(routeProps) => (
              <Dashboard account={account} setAccount={setAccount} />
            )}
          />
          <Route component={NotFound404}/>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
