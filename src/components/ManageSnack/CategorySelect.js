import { BASE_BLUE, DARKER_GREY, DARK_BLUE, LIGHT_BLUE, WHITE } from '../../styles/Colors.module.css';

import React from 'react';
import Select from 'react-select';
import { options } from '../../constants';

const CategorySelect = (props) => {
  const { handleSelectCategory } = props;

  const customStyles = {
    container: (base) => ({
      ...base,
      width: '100%',
      height: '24px',
      minHeight: '20px',
      minWidth: '180px'
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? DARK_BLUE : DARKER_GREY,
      fontWeight: state.isSelected ? '600' : '400',
      backgroundColor: state.isSelected ? LIGHT_BLUE : WHITE,
      '&:hover': {
        backgroundColor: '#F1F9FF'
      },
      cursor: 'pointer'
    }),
    control: (base, state) => ({
      ...base,
      height: '24px',
      width: '100%',
      minHeight: '20px',
      minWidth: '180px',
      border: `2px solid ${BASE_BLUE}`,
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
      height: '0px'
    }),
    placeholder: (base) => ({
      ...base,
      color: BASE_BLUE,
      '&:hover': {
        color: DARK_BLUE
      },
      height: '80%'
    })
  };

  return (
    <div>
      <Select options={options} 
        placeholder={'Select Category'}
        styles={customStyles}
        onChange={handleSelectCategory}/>
    </div>
  );
};
export default CategorySelect;