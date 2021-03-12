import { BASE_BLUE, DARKER_GREY, DARK_BLUE, LIGHT_BLUE, WHITE } from '../../styles/Colors.module.css';

import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'candy', label: 'Candy' },
  { value: 'chips', label: 'Chips' },
  { value: 'cookies', label: 'Cookies' },
  { value: 'crackers', label: 'Crackers' },
  { value: 'fruits', label: 'Fruits' }
];

const CategorySelect = (props) => {
  const { handleSelectCategory } = props;

  const customStyles = {
    container: (base) => ({
      ...base,
      width: '180px',
      height: '24',
      marginRight: '1rem'
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
      height: '28px',
      minHeight: '20px',
      border: `2px solid ${BASE_BLUE}`,
      '&:hover': {
        border: `2px solid ${DARK_BLUE}`
      },
      fontWeight: '600',
      backgroundColor: state.hasValue ? LIGHT_BLUE : WHITE,
      boxShadow: 'none',
      cursor: 'pointer'
    })
  };

  return (
    <div>
      <Select options={options} 
        styles={customStyles}
        onChange={handleSelectCategory}/>
    </div>
  );
};
export default CategorySelect;