import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, FormControlLabel, Switch } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import '../Styles/Login.scss';
import logoT from '../Images/logo_transparent.png';

const Login = (props) => {

  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [employee, toggleEmployee] = useState(false);

  useEffect(() => {
    return () => {
      return (email, password, employee);
    };
  }, [email, password, employee]);

  function login() {
    axios.post('/auth/login', { email, password, employee }).then((res) => {
      props.setAccount(res.data);
      props.history.push('/dashboard');
    }).catch(err => console.log(err));
  };

  return (
    <div className="login">
      <div className="box">
        <img src={logoT} alt="logo" />
        <TextField
          label="Email"
          onChange={(e) => updateEmail(e.target.value)}
          margin="normal"
          required
          className="input"
          variant="outlined"
        />
        <TextField
          label="Password"
          onChange={(e) => updatePassword(e.target.value)}
          margin="normal"
          required
          type="password"
          className="input"
          variant="outlined"
        />
        <div className="switch">
          <FormControlLabel
            control={<Switch checked={employee} onChange={() => toggleEmployee(!employee)} aria-label="LoginSwitch" />}
            label={employee ? 'Employee' : 'Customer'}
            className="switch"
          />
          <button onClick={login}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Login);