import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';
import React from 'react';
import { setSuggestionStateFalse } from '../redux/features/snacks/snacksSlice';
import styles from '../styles/ShoppingList.module.css';
import { useDispatch } from 'react-redux';

const ShoppingListItem = (props) => {
  const dispatch = useDispatch();
  const { index, item, onClick } = props;

  const handleSetActiveFalse = (suggestion) => {
    dispatch(setSuggestionStateFalse(suggestion));
  };

  const handleOnClick = () => {
    if (item.fromSuggestions) {
      handleSetActiveFalse(item);
    }
    onClick(item);
  };

  return (
    <div className={styles.shoppingList__item}>
      <p>{`${index}. ${item.snack_name}`}</p>
      <button className={styles.deleteIcon__container} onClick={handleOnClick}>
        <DeleteIcon className={styles.deleteIcon} />
      </button>
    </div>
  );
};

export default ShoppingListItem;
