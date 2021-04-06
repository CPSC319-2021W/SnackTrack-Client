import React, { useEffect, useState } from 'react';
// import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { addCategory, removeCategory } from '../../redux/features/snacks/snacksSlice';
import FilterButton from './FilterButton';

import { CATEGORIES_LIST } from '../../constants';
import styles from '../../styles/Category.module.css';

const CategoryFilter = ({ selectedFilters }) => {
  const categoriesMapped = CATEGORIES_LIST.map((category) => ({ ...category, 'selected': false }));
  const [categories, setCategories] = useState(categoriesMapped);  
  const dispatch = useDispatch();

  const addFilter = (category) => dispatch(addCategory(category));
  const removeFilter = (category) => dispatch(removeCategory(category));

  const toggleCategory = (i) => {
    categories[i].selected = !categories[i].selected;
    setCategories([...categories]);
    if (categories[i].selected) {
      addFilter(categories[i].id);
    } else {
      removeFilter(categories[i].id);
    }
  };

  useEffect(() => {
    categories.forEach((category) => {
      selectedFilters.includes(category.id)
        ? category.selected = true
        : category.selected = false;
    });
  });
  
  return (
    <div className={styles.container}>
      {categories.map((category, i) => (
        <div key={i} className={styles.categoryBox}>
          <FilterButton
            category={category}
            lastChild={i === categories.length - 1}
            onToggle={() => toggleCategory(i)}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
