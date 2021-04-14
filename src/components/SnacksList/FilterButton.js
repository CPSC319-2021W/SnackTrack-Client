import React, { Fragment, useState } from 'react';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';

import { DEFAULT_CATEGORIES } from '../../constants';

import '../../styles/Animations.css';
import styles from '../../styles/Category.module.css';

import { ReactComponent as Candy } from '../../assets/icons/candy.svg';
import { ReactComponent as Chips } from '../../assets/icons/chips.svg';
import { ReactComponent as Chocolate } from '../../assets/icons/chocolate.svg';
import { ReactComponent as Cookies } from '../../assets/icons/cookies.svg';
import { ReactComponent as Crackers } from '../../assets/icons/crackers.svg';
import { ReactComponent as Fruits } from '../../assets/icons/fruits.svg';
import { ReactComponent as Other } from '../../assets/icons/other.svg';

const FilterButton = ({ category, lastChild, onToggle }) => {
  const { name, selected } = category;
  const [hover, setHover] = useState(false);

  const renderLabel = () => {
    return (
      <p className={classNames({
        [styles.unselectable]: true,
        [styles.categoryText]: true,
        [styles.selectedText]: selected || (isMobile ? false : hover) })}>
        { name }
      </p>
    );
  };

  const handleToggle = () => {
    onToggle();
  };

  const getClasses = () => {
    return (
      classNames({
        [styles.filter_hover]: hover,
        [styles.icon_button]: true,
        'active': selected
      })
    );
  };

  const renderSwitch = () => {
    switch(name) {
    case DEFAULT_CATEGORIES.CANDY:
      return (
        <Fragment>
          <Candy className={getClasses()} />
          { renderLabel(name) }
        </Fragment>
      );
    case DEFAULT_CATEGORIES.CHIPS:
      return (
        <Fragment>
          <Chips className={getClasses()} />
          { renderLabel(name) }
        </Fragment>
      );
    case DEFAULT_CATEGORIES.CHOCOLATE:
      return (
        <Fragment>
          <Chocolate className={getClasses()} />
          { renderLabel(name) }
        </Fragment>
      );
    case DEFAULT_CATEGORIES.COOKIES:
      return (
        <Fragment>
          <Cookies className={getClasses()} />
          { renderLabel(name) }
        </Fragment>
      );
    case DEFAULT_CATEGORIES.CRACKERS:
      return (
        <Fragment>
          <Crackers className={getClasses()} />
          { renderLabel(name) }
        </Fragment>
      );
    case DEFAULT_CATEGORIES.FRUITS:
      return (
        <Fragment>
          <Fruits className={getClasses()} />
          { renderLabel(name) }
        </Fragment>
      );
    case DEFAULT_CATEGORIES.OTHER:
      return (
        <Fragment>
          <Other className={getClasses()} />
          { renderLabel(name) }
        </Fragment>
      );
    default:
      break;
    }
  };
  
  return (
    <button
      className={classNames({
        [styles.buttonToggle]: true,
        [styles.buttonToggle__lastChild]: lastChild
      })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleToggle}
    >
      { renderSwitch() }
    </button>
  );
};

export default FilterButton;
