import React from 'react';

import TopNav from '../shared/TopNav';

const Admin = (props) => {


  return (
    <div className="container">
      <TopNav 
        name="Admin"
      />
      <div className="Admin">
        <h1>Admin</h1>
      </div>
    </div>
  )
}

export default Admin;