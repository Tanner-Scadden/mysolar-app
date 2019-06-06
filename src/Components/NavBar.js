import React from 'react';
import axios from 'axios';

import '../Styles/NavBar.scss';
import logoT from '../Images/logo_transparent.png';

const NavBar = (props) => {

  const {setDisplay} = props;

  function logout() {
    axios.delete('/auth/logout').then(() => {
      props.setAccount('No User');
      props.history.push('/');
    }).catch(err => console.log(err));
  };

  return (
    <div className="nav">
      <img src={logoT} alt="logo" className="logo" />

      <h4>Logged in as</h4>
      <h1 onClick={() => setDisplay('Settings')}>{props.account.first_name} {props.account.last_name}</h1>

      <nav className="nav-menu">
        <ul>
          <li onClick={() => setDisplay('Calendar')}><i className="far fa-calendar-alt"></i></li>
          <li onClick={() => setDisplay('Projects')}><i className="fas fa-project-diagram"></i></li>
          <li onClick={() => setDisplay('Accounts')}><i className="fas fa-user"></i></li>
          <li onClick={() => setDisplay('Task')}><i className="fas fa-tasks"></i></li>
          <li onClick={() => setDisplay('Appointment')}><i className="fas fa-clock"></i></li>
          <li onClick={() => setDisplay('Leads')}><i className="fas fa-users"></i></li>
          {props.account.user_type === 'admin' 
            ? <li onClick={() => setDisplay('Admin')}><i className="fas fa-unlock-alt"></i></li>
            : null
          }
          <li onClick={() => setDisplay('Settings')}><i className="fas fa-cogs"></i></li>
          <li onClick={logout}><i className="fas fa-power-off"></i></li>
        </ul>
        <ul>
          <li onClick={() => setDisplay('Calendar')}>Calendar</li>
          <li onClick={() => setDisplay('Projects')}>Projects</li>
          <li onClick={() => setDisplay('Accounts')}>Accounts</li>
          <li onClick={() => setDisplay('Task')}>My Tasks</li>
          <li onClick={() => setDisplay('Appointment')}>Schedule Appointment</li>
          <li onClick={() => setDisplay('Leads')}>Leads</li>
          {props.account.user_type === 'admin' 
            ? <li onClick={() => setDisplay('Admin')}>Admin</li>
            : null
          }
          <li onClick={() => setDisplay('Settings')}>Settings</li>
          <li onClick={logout}>Logout</li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar;