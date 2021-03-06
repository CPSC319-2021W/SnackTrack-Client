import React from 'react';
import Select from 'react-select';

import { colors } from '../styles/theme';

const AddBatchSelect = (props) => {
  const { data, handleBatchSelect } = props;

  const options = data.map((item) => ({
    value: item.snack_id,
    label: item.snack_name
  }));

  const customStyles = {
    container: (base) => ({
      ...base,
      width: '170px',
      marginRight: '1rem'
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? colors.DARK_BLUE : colors.DARKER_GREY,
      fontWeight: state.isSelected ? '600' : '400',
      backgroundColor: state.isSelected ? colors.LIGHT_BLUE : colors.WHITE,
      '&:hover': {
        backgroundColor: '#F1F9FF'
      },
      cursor: 'pointer'
    }),
    placeholder: (base) => ({
      ...base,
      color: colors.BASE_BLUE,
      '&:hover': {
        color: colors.DARK_BLUE
      }
    }),
    control: (base, state) => ({
      ...base,
      height: '38px',
      border: `2px solid ${colors.BASE_BLUE}`,
      '&:hover': {
        border: `2px solid ${colors.DARK_BLUE}`
      },
      fontWeight: '600',
      backgroundColor: state.hasValue ? colors.LIGHT_BLUE : colors.WHITE,
      boxShadow: 'none',
      cursor: 'pointer'
    }),
    singleValue: (base) => ({
      ...base,
      fontWeight: '600',
      color: colors.BASE_BLUE
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: colors.BASE_BLUE,
      '&:hover': {
        color: colors.DARK_BLUE
      }
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: colors.BASE_BLUE
    })
  };

  return (
    <div>
      <Select
        isSearchable
        placeholder={'Add Snack Batch'}
        noOptionsMessage={() => 'No snacks found.'}
        options={options}
        styles={customStyles}
        onChange={handleBatchSelect}
      />
    </div>
  );
};

export default AddBatchSelect;