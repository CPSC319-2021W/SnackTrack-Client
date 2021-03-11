import React, { useState } from 'react';
import classNames from 'classnames';

import { DEFAULT_CATEGORIES } from '../../constants';

import '../../styles/Animations.css';
import styles from '../../styles/Category.module.css';

import { ReactComponent as Candy } from '../../assets/icons/candy.svg';
import { ReactComponent as Chips } from '../../assets/icons/chips.svg';
import { ReactComponent as Chocolate } from '../../assets/icons/chocolate.svg';
import { ReactComponent as Cookies } from '../../assets/icons/cookies.svg';
import { ReactComponent as Crackers } from '../../assets/icons/crackers.svg';
import { ReactComponent as Fruits } from '../../assets/icons/fruits.svg';

const FilterIcon = ({ type, isSelected }) => {
  const [hover, setHover] = useState(false);

  const renderLabel = () => {
    return (
      <p className={classNames({
        [styles.unselectable]: true,
        [styles.categoryText]: true,
        [styles.selectedText]: isSelected || hover })}>
        { type }
      </p>
    );
  };

  const getClasses = () => {
    return (
      classNames({
        [styles.filter_hover]: hover,
        [styles.icon_button]: true,
        'active': isSelected
      })
    );
  };

  const renderSwitch = () => {
    switch(type) {
    case DEFAULT_CATEGORIES.CANDY:
      return (
        <div className={styles.icon__container}>
          <Candy className={getClasses()} />
          { renderLabel(type) }
        </div>
      );
    case DEFAULT_CATEGORIES.CHIPS:
      return (
        <div className={styles.icon__container}>
          <Chips className={getClasses()} />
          { renderLabel(type) }
        </div>
      );
    case DEFAULT_CATEGORIES.CHOCOLATE:
      return (
        <div className={styles.icon__container}>
          <Chocolate className={getClasses()} />
          { renderLabel(type) }
        </div>
      );
    case DEFAULT_CATEGORIES.COOKIES:
      return (
        <div className={styles.icon__container}>
          <Cookies className={getClasses()} />
          { renderLabel(type) }
        </div>
      );
    case DEFAULT_CATEGORIES.CRACKERS:
      return (
        <div className={styles.icon__container}>
          <Crackers className={getClasses()} />
          { renderLabel(type) }
        </div>
      );
    case DEFAULT_CATEGORIES.FRUITS:
      return (
        <div className={styles.icon__container}>
          <Fruits className={getClasses()} />
          { renderLabel(type) }
        </div>
      );
    default:
      break;
    }
  };
  
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      { renderSwitch() }
    </div>
  );
};

export default FilterIcon;
