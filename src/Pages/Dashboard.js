import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'

import NavBar from '../Components/NavBar';
import Projects from '../Components/Projects';
import Accounts from '../Components/Accounts';
import Leads from '../Components/Leads';
import SetAppointments from '../Components/SetAppointments';
import Settings from '../Components/Settings';
import Task from '../Components/Task';
import Calendar from '../Components/Calendar';
import Admin from '../Components/Admin';

import '../Styles/Dashboard.scss';

const Dashboard = (props) => {

  const [display, setDisplay] = useState('Calendar');

  useEffect(() => {
    return () => {
      return display;
    }
  }, [display])

  function chooseDisplay() {
    switch(display) {

      case('Calendar'): {
        return <Calendar 
          account={props.account}
        />
      }

      case('Projects'): {
        return <Projects />
      }

      case('Accounts'): {
        return <Accounts />
      }

      case('Task'): {
        return <Task />
      }

      case('Appointment'): {
        return <SetAppointments />
      }

      case('Leads'): {
        return <Leads />
      }

      case('Settings'): {
        return <Settings />
      }

      case('Admin'): {
        return <Admin />
      }

      default: {
        return;
      }
    }
  }

  return(
    <div className="dashboard">
      <NavBar 
        setDisplay={setDisplay}
        setAccount={props.setAccount}
        account={props.account}
        history={props.history}
      />
      <div className="display-container">
        {chooseDisplay()}
      </div>
    </div>
  )
}

export default withRouter(Dashboard)