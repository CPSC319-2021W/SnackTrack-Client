import React, { useState } from 'react';
import { addCategory, removeCategory } from '../redux/features/snackSlice';

import { defaultCategories } from '../constants';
import styles from '../styles/Category.module.css';
import { useDispatch } from 'react-redux';

const CategoryFilter = () => {

  const [filters, setFilters] = useState([]);
  const [categories, setCategories] = useState(defaultCategories);  
  const dispatch = useDispatch();

  const addFilter = (category) => dispatch(addCategory(category));
  const removeFilter = (category) => dispatch(removeCategory(category));

  const toggleCategory = i => {
    categories[i].selected = !categories[i].selected;
    setCategories([...categories]);
    if (categories[i].selected) { 
      setFilters([...filters, categories[i].name]); 
      addFilter(categories[i].name);
    } else {
      removeFilter (categories[i].name);
      setFilters([...filters.filter(category => category !== categories[i].name)]);     
    }
  };
  
  return (
    <div className={styles.container}>
      {categories.map(({name, src, selected}, i) => (
        <div key={i} className={styles.categoryBox}>
          {selected ?(
            <button className={styles.buttonToggle} onClick={() => toggleCategory(i)}>
              <img src={src} className={styles.imgToggle} alt={name} />
              <br />
              {name}
            </button>
          ) : (
            <button className={styles.button} onClick={() => toggleCategory(i)}>
              <img src={src} className={styles.img} alt={name} />
              <br />
              {name}
            </button>
          )
          }
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;