import React from 'react';

import TopNav from '../shared/TopNav';

const SetAppointments = (props) => {


  return (
    <div className="container">
      <TopNav 
        name="Set Appointment"
      />
      <div className="appointments">
        <h1>Appointments</h1>
      </div>
    </div>
  )
}

export default SetAppointments;