import React from 'react';

import TopNav from '../shared/TopNav';

const Task = (props) => {


  return (
    <div className="container">
      <TopNav 
        name="Tasks"
      />
      <div className="task">
        <h1>Task</h1>
      </div>
    </div>
  )
}

export default Task;