import {
  BASE_BLUE,
  DARKER_GREY,
  DARK_BLUE,
  LIGHT_BLUE,
  WHITE
} from '../styles/Colors.module.css';
import { React, useEffect, useState } from 'react';

import { DEFAULT_TOP_SNACK_RANGE } from '../constants';
import Select from 'react-select';

const options = DEFAULT_TOP_SNACK_RANGE.map((range) => ({
  value: range.id,
  label: range.name
}));

const TopSnackSelect = (props) => {
  const { rangeValue, handleSelectRange } = props;
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    if(rangeValue) {
      const [option] = DEFAULT_TOP_SNACK_RANGE.filter(option => option.id === rangeValue);
      setSelectedText(option.name);
    }
  }, [rangeValue]);

  const customStyles = {
    container: (base) => ({
      ...base,
      width: '170px'
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? DARK_BLUE : DARKER_GREY,
      fontWeight: state.isSelected ? '600' : '400',
      backgroundColor: state.isSelected ? LIGHT_BLUE : WHITE,
      '&:hover': {
        backgroundColor: state.isSelected ? LIGHT_BLUE : '#F1F9FF'
      },
      cursor: 'pointer'
    }),
    placeholder: (base) => ({
      ...base,
      color: BASE_BLUE,
      '&:hover': {
        color: DARK_BLUE
      }
    }),
    control: (base, state) => ({
      ...base,
      height: '38px',
      border: `2px solid ${BASE_BLUE}`,
      borderRadius: '6px',
      '&:hover': {
        border: `2px solid ${DARK_BLUE}`
      },
      fontWeight: '600',
      backgroundColor: state.hasValue ? LIGHT_BLUE : WHITE,
      boxShadow: 'none',
      cursor: 'pointer'
    }),
    singleValue: (base) => ({
      ...base,
      fontWeight: '600',
      color: BASE_BLUE
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: BASE_BLUE,
      '&:hover': {
        color: DARK_BLUE
      }
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: 'none'
    })
  };

  return(
    <Select 
      isSearchable={false}
      menuPosition={'fixed'}
      placeholder={selectedText}
      options={options}
      styles={customStyles}
      value={rangeValue}
      onChange={handleSelectRange}
    />
  );
};

export default TopSnackSelect;