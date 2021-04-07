import { Card, Tooltip } from '@material-ui/core';
import { Fragment, React, useEffect, useRef, useState } from 'react';
import {
  addShoppingListItem,
  addShoppingListItems,
  removeShoppingListItem,
  setShoppingList
} from '../redux/features/shoppingList/shoppingListSlice';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from './AppButton';
import { GENERIC_ERROR } from '../constants';
import ShoppingListDropDown from './ShoppingListDropDown';
import ShoppingListItem from './ShoppingListItem';
import classNames from 'classnames';
import { clearActiveStates } from '../redux/features/snacks/snacksSlice';
import { exportComponentAsPNG } from 'react-component-export-image';
import styles from '../styles/ShoppingList.module.css';
import suggestionStyles from '../styles/SuggestionsBox.module.css';

const ShoppingList = ({ snacks, outOfStock, error }) => {
  const fileNamePrefix = 'ShoppingList';
  const componentToSave = useRef();
  const dispatch = useDispatch();
  const [hashSet, setHashSet] = useState(null);
  const { shoppingList } = useSelector((state) => state.shoppingListReducer);
  const { suggestions } = useSelector((state) => state.snacksReducer);

  const buildFileName = () => {
    const currentDTM = new Date().toLocaleString();
    return `${fileNamePrefix}_${currentDTM}`;
  };

  const populateShoppingList = () => {
    dispatch(setShoppingList(outOfStock));
  };

  const addToShoppingList = (item) => {
    dispatch(addShoppingListItem(item));
  };

  const removeFromShoppingList = (item) => {
    dispatch(removeShoppingListItem(item));
  };

  const suggestionToShoppingListItem = (suggestion) => {
    return { snack_name: suggestion.text, id: suggestion.id, fromSuggestions: true };
  };

  const hashItem = (item) => {
    return `${item.snack_id} ${item.snack_name}`;
  };

  const handleAddShoppingList = (item) => {
    addToShoppingList(item.value);
  };

  const addLowStock = () => {
    const toAdd = snacks.filter(
      (snack) => snack.quantity < snack.order_threshold && snack.quantity !== 0
    );
    dispatch(addShoppingListItems(toAdd));
  };

  const addOutOfStock = () => {
    const toAdd = outOfStock.filter((snack) => !hashSet?.has(hashItem(snack)));
    dispatch(addShoppingListItems(toAdd));
  };

  const clearAll = () => {
    dispatch(setShoppingList([]));
    dispatch(clearActiveStates());
  };

  const renderEmptyState = () => {
    return <p>The shopping list is empty.</p>;
  };

  const renderError = () => {
    return <p>{GENERIC_ERROR}</p>;
  };

  const renderList = () => {
    return (
      <Fragment>
        {shoppingList.length > 0
          ? shoppingList.map((item, i) => {
            return (
              <ShoppingListItem
                key={i}
                index={++i}
                item={item}
                onClick={removeFromShoppingList}
              />
            );
          })
          : renderEmptyState()}
      </Fragment>
    );
  };

  useEffect(() => {
    if (outOfStock) {
      populateShoppingList();
    }
  }, [outOfStock]);

  useEffect(() => {
    if (shoppingList) {
      const set = new Set(shoppingList.map(hashItem));
      setHashSet(set);
    }
  }, [shoppingList]);

  useEffect(() => {
    if (suggestions) {
      const suggestion = suggestions.find(
        (suggestion) => suggestion.recentlyUpdated === true
      );
      if (suggestion?.isActive === true) {
        addToShoppingList(suggestionToShoppingListItem(suggestion));
      } else if (suggestion?.isActive === false) {
        removeFromShoppingList(suggestionToShoppingListItem(suggestion));
      }
    }
  }, [suggestions]);

  return (
    <Card ref={componentToSave} className={suggestionStyles.card__base}>
      <div className={suggestionStyles.header}>
        <h5 className={suggestionStyles.title}>Shopping List</h5>
        <AppButton
          primary
          onClick={() =>
            exportComponentAsPNG(componentToSave, { fileName: buildFileName() })
          }
        >
          Export As PNG
        </AppButton>
      </div>
      <div>
        <ShoppingListDropDown
          data={snacks.filter((item) => !hashSet?.has(hashItem(item)))}
          onSubmit={handleAddShoppingList}
        />
        <Tooltip title='Add Low Stock Snacks'>
          <span
            className={classNames({ [styles.dot]: true, [styles.dot__orange]: true })}
            onClick={addLowStock}
          />
        </Tooltip>
        <Tooltip title='Add Out of Stock Snacks'>
          <span
            className={classNames({ [styles.dot]: true, [styles.dot__red]: true })}
            onClick={addOutOfStock}
          />
        </Tooltip>
        <Tooltip title='Clear All'>
          <span
            className={classNames({ [styles.dot]: true, [styles.dot__blue]: true })}
            onClick={clearAll}
          />
        </Tooltip>
      </div>
      <div className={suggestionStyles.bean__container}>
        {error ? renderError() : renderList()}
      </div>
    </Card>
  );
};

export default ShoppingList;
