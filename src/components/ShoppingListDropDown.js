import {
  BASE_BLUE,
  DARKER_GREY,
  DARK_BLUE,
  LIGHT_BLUE,
  WHITE
} from '../styles/Colors.module.css';
import { React, useEffect, useState } from 'react';

import { DEFAULT_SEARCH_THRESHOLD } from '../constants';
import Select from 'react-select';
import { handleSearch } from '../helpers/SearchHelpers';

const ShoppingListDropDown = (props) => {
  const { data, onSubmit } = props;
  const [allOptions, setAllOptions] = useState([]);
  const [searchedOptions, setSearchedOptions] = useState([]);

  const searchOptions = {
    keys: ['label'],
    threshold: DEFAULT_SEARCH_THRESHOLD
  };

  useEffect(() => {
    const options = data.map((item) => ({
      value: item,
      label: item.snack_name
    }));
    setAllOptions(options);
    setSearchedOptions(options);
  }, [data]);

  const customStyles = {
    container: (base) => ({
      ...base,
      width: '160px'
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

  return (
    <Select
      isSearchable
      placeholder={'Add Snack'}
      noOptionsMessage={() => 'No snacks found.'}
      options={searchedOptions}
      filterOption={(options) => options}
      styles={customStyles}
      value={null}
      onInputChange={(searchValue) =>
        handleSearch(allOptions, searchValue, setSearchedOptions, searchOptions)
      }
      onChange={onSubmit}
    />
  );
};

export default ShoppingListDropDown;
