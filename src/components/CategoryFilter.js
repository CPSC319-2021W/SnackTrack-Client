import { addCategory, removeCategory } from '../redux/features/snackFilterSlice';
import { useDispatch } from 'react-redux';
import {defaultCategory} from '../constant';
import styles from '../styles/Category.module.css';


import React, {useState} from 'react';

const CategoryFilter = () => {

  const [filters, setFilters] = useState([]);
  const [categories, setCategories] = useState(defaultCategory);  
  const dispatch = useDispatch();

  const snackFilterSet = (category) => dispatch(addCategory(category));
  const snackFilterDel= (category) => dispatch(removeCategory(category));

  const toggleCategory = i => {
    categories[i].selected = !categories[i].selected;
    setCategories([...categories]);
    if (categories[i].selected) { 
      setFilters([...filters, categories[i].name]); 
      snackFilterSet(categories[i].name);
    } else {
      snackFilterDel(categories[i].name);
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