import React from 'react';
import Select from 'react-select';
import styles from '../styles/Select.module.css';

const AddBatchSelect = (props) => {
  const { data, handleBatchSelect } = props;

  const options = data.map((item) => ({
    value: item.snack_id,
    label: item.snack_name
  }));

  return (
    <div className={styles.select__container}>
      <Select
        isSearchable
        placeholder={'Add Snack Batch'}
        noOptionsMessage={() => 'No snacks found.'}
        options={options}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: 'hotpink'
          }
        })}
        onChange={handleBatchSelect}
      />
    </div>
  );
};

export default AddBatchSelect;