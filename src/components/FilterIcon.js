import React from 'react';
import classNames from 'classnames';

import { DEFAULT_CATEGORIES } from '../constants';

import '../styles/Animations.css';
import styles from '../styles/Category.module.css';

import { ReactComponent as Candy } from '../assets/icons/candy.svg';
import { ReactComponent as Chips } from '../assets/icons/chips.svg';
import { ReactComponent as Chocolate } from '../assets/icons/chocolate.svg';
import { ReactComponent as Cookies } from '../assets/icons/cookies.svg';
import { ReactComponent as Crackers } from '../assets/icons/crackers.svg';
import { ReactComponent as Fruits } from '../assets/icons/fruits.svg';

const FilterIcon = ({ type, isSelected }) => {

  const renderSwitch = () => {
    switch(type) {
    case DEFAULT_CATEGORIES.FRUITS:
      return (
        <Fruits
          className={classNames({ [styles.icon_button]: true, 'active': isSelected })} />
      );
    case DEFAULT_CATEGORIES.CANDY:
      return (
        <Candy
          className={classNames({ [styles.icon_button]: true, 'active': isSelected })} />
      );
    case DEFAULT_CATEGORIES.CHOCOLATE:
      return (
        <Chocolate
          className={classNames({ [styles.icon_button]: true, 'active': isSelected })} />
      );
    case DEFAULT_CATEGORIES.CHIPS:
      return (
        <Chips
          className={classNames({ [styles.icon_button]: true, 'active': isSelected })} />
      );
    case DEFAULT_CATEGORIES.CRACKERS:
      return (
        <Crackers
          className={classNames({ [styles.icon_button]: true, 'active': isSelected })} />
      );
    case DEFAULT_CATEGORIES.COOKIES:
      return (
        <Cookies
          className={classNames({ [styles.icon_button]: true, 'active': isSelected })} />
      );
    default:
      break;
    }
  };
  
  return (
    <div>
      { renderSwitch() }
    </div>
  );
};

export default FilterIcon;
