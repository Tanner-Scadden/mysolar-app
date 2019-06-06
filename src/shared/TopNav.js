import React from 'react';

import '../Styles/TopNav.scss';

const TopNav = (props) => {

  const { name } = props;

  return(
    <div className="topnav">
      <h1>{name}</h1>
    </div>
  )
}

export default TopNav