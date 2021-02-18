import React, { useState } from 'react';
import classNames from 'classnames';

import { DEFAULT_CATEGORIES } from '../constants';

import { ReactComponent as Candy } from '../assets/icons/candy.svg';
import { ReactComponent as Fruits } from '../assets/icons/fruits.svg';

import '../styles/Animations.css';

const FilterIcon = ({ type }) => {
  const [active, setActive] = useState(false);

  const renderSwitch = () => {
    switch(type) {
    case DEFAULT_CATEGORIES.FRUITS:
      return (
        <Fruits
          className={classNames({ 'icon_button': true, 'active': active })}
          onClick={() => setActive(prevActive => !prevActive)} />
      );
    case DEFAULT_CATEGORIES.CANDY:
      return (
        <Candy
          className={classNames({ 'icon_button': true, 'active': active })} 
          onClick={() => setActive(prevActive => !prevActive)} />
      );
    default:
      break;
    }
  };
  
  return (
    <div>
      { renderSwitch() }
      {/* <button
        className='icon_container'
        onClick={() => setActive(prevActive => !prevActive)}>
        { renderSwitch() }
      </button> */}
    </div>
  );
};

export default FilterIcon;
