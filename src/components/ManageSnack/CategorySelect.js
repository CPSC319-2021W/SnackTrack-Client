import {
  BASE_BLUE,
  DARK_BLUE,
  DARK_GREY,
  LIGHT_BLUE,
  LIGHT_GREY,
  MID_GREY,
  WHITE
} from '../../styles/Colors.module.css';
import React, { useState } from 'react';

import { CATEGORIES_LIST } from '../../constants';
import Select from 'react-select';
import classNames from 'classnames';
import styles from '../../styles/Field.module.css';

const options = CATEGORIES_LIST.map((category) => ({
  value: category.id,
  label: category.name
}));

const CategorySelect = (props) => {
  const { id, label, error, categoryValue, handleSelectCategory } = props;

  const [isFocused, setIsFocused] = useState(false);

  const customStyles = {
    container: (base) => ({
      ...base,
      width: '100%'
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? DARK_BLUE : DARK_GREY,
      fontWeight: state.isSelected ? '600' : '400',
      backgroundColor: state.isSelected ? LIGHT_BLUE : WHITE,
      '&:hover': {
        backgroundColor: state.isSelected ? LIGHT_BLUE : '#F1F9FF'
      },
      cursor: 'pointer'
    }),
    control: (base, state) => ({
      ...base,
      height: '32px',
      width: '100%',
      minHeight: 0,
      border: state.isFocused ? `2px solid ${BASE_BLUE}` : `1px solid ${LIGHT_GREY}`,
      '&:hover': {
        border: state.isFocused ? `2px solid ${BASE_BLUE}` : `1px solid ${LIGHT_GREY}`
      },
      borderRadius: '6px',
      backgroundColor: WHITE,
      boxShadow: 'none',
      cursor: 'pointer'
    }),
    singleValue: (base, state) => ({
      ...base,
      color: state.isFocused ? BASE_BLUE : DARK_GREY
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: MID_GREY,
      padding: '4px'
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: 'none'
    }),
    placeholder: (base) => ({
      ...base,
      color: MID_GREY
    })
  };

  return (
    <div className={styles.input__group}>
      <label
        className={classNames({
          [styles.label__base]: true,
          [styles.label__focused]: isFocused,
          [styles.label__error]: error
        })}
        htmlFor={id}
      >
        {label}
      </label>
      <div className={styles.input__container}>
        <Select
          isSearchable={false}
          options={options}
          value={categoryValue}
          placeholder='Select Category'
          styles={customStyles}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleSelectCategory}
        />
      </div>
    </div>
  );
};
export default CategorySelect;
