import { useDispatch, useSelector } from 'react-redux';
import { addCategory, removeCategory } from '../redux/features/snackFilterSlice';
import {defaultCategory} from '../constant';
import styles from '../styles/Category.module.css';


import React, {useState} from 'react';

const CategoryFilter = () => {
  const [filters, setFilters] = useState([]);
  const [categories, setCategories] = useState(defaultCategory);  
  const dispatch = useDispatch();
  const snackFilter = useSelector((state) => state.snackFilterReducer);
  const snackFilterSet = (category) => dispatch(addCategory(category));
  const snackFilterDel= (category) => dispatch(removeCategory(category));

  const toggleCategory = i => {
    console.log(`index is${ i}`);
    categories[i].selected = !categories[i].selected;
    setCategories([...categories]);
    if (categories[i].selected) { 
      setFilters([...filters, categories[i].name]); 
      snackFilterSet(categories[i].name);
    } else {
      setFilters([...filters.filter(category => category !== categories[i].name)]);
      snackFilter.filter(category => category != categories[i].name);
      snackFilterDel(categories[i].name);
    }
    console.log(`filters is${ filters}`);
    console.log(`category is${ categories}`);
    console.log(`redux is${ snackFilter}`);
    
  };
  return (
    <div className={styles.container}>
      {categories.map(({name, src, selected}, i) => (
        <div key={i} className={styles.categoryBox}>
          {/* {console.log(snackFilter)}
          {console.log(filters)} */}
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
        // <CategoryContainer key={i} {...props} />
      ))}
    </div>
  );
};

// const CategoryFilter = () => (
//   <div className={styles.container}>
//     {defaultCategory.map((props, i) => (
//       <CategoryContainer key={i} {...props} />
//     ))}
//   </div>
// );

export default CategoryFilter;