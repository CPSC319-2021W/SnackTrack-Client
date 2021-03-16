import { React, useEffect, useState } from 'react';
import { selectOneSnack, setQuantity } from '../../redux/features/snacks/snacksSlice';
import { useDispatch, useSelector } from 'react-redux';

import CategoryFilter from './CategoryFilter';
import Fuse from 'fuse.js';
import OrderSnackDialog from '../OrderSnackDialog';
import SnackGrid from './SnackGrid';
import { TRANSACTION_TYPES } from '../../constants';
import { isAuthenticated } from '../../helpers/AuthHelper';
import { makeOrder } from '../../services/TransactionsService';
import { setBalance } from '../../redux/features/users/usersSlice';

const SnacksContainer = (props) => {
  const dispatch = useDispatch();
  const { snacks, filters, onApiResponse, openToastNotification } = props;
  const { userId, balance } = useSelector((state) => state.usersReducer.profile);
  const [isLoaded, setLoaded] = useState(snacks.length > 0);
  const [isSnackOrderOpen, setIsSnackOrderOpen] = useState(false);
  const [snacksToDisplay, setSnacksToDisplay] = useState([]);
  const [snackQuantity, setSnackQuantity] = useState(1);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const { selectedSnack } = useSelector((state) => state.snacksReducer);
  const { snackSearchValue } = useSelector((state) => state.searchbarReducer);

  const searchOptions = {
    keys: ['snack_name']
  };

  const updateSnackQuantity = (snackId, newQuantity) => {
    dispatch(setQuantity({ snackId, newQuantity }));
  };

  const setSelectedSnack = (snack) => dispatch(selectOneSnack(snack));

  const updateBalance = (balance) => dispatch(setBalance(balance));

  const selectSnack = (snackId) => {
    setSelectedSnack(snacks.filter((oneSnack) => oneSnack.snack_id === snackId)[0]);
  };

  const handleSearch = (snacksArray, searchValue) => {
    if (searchValue === '') {
      setSnacksToDisplay(snacksArray);
    } else {
      const fuse = new Fuse(snacksArray, searchOptions);
      const results = fuse.search(searchValue);
      const searchedSnacks = results.map((itemIndexPair) => {
        return itemIndexPair.item;
      });
      setSnacksToDisplay(searchedSnacks);
    }
  };

  const handleCloseSnackOrder = () => {
    setIsSnackOrderOpen(false);
  };

  const openSnackOrder = (snackId) => {
    setSnackQuantity(1);
    setIsSnackOrderOpen(true);
    selectSnack(snackId);
  };

  const handleChangeQuantity = (event) => {
    const { value } = event.target;
    if (value >= 0 || value === '') {
      setSnackQuantity(value);
    }
  };

  const handleSubmit = async (event, snackId) => {
    if (event.key === 'Enter' || event.type === 'click') {
      setIsOrderLoading(true);
      const transactionAmount = snackQuantity * selectedSnack.price;
      const { PENDING, PURCHASE } = TRANSACTION_TYPES;
      let transactionTypeId = PENDING;
      if (isAuthenticated()) {
        transactionTypeId = PURCHASE;
      }
      try {
        await makeOrder(
          userId,
          transactionTypeId,
          selectedSnack.snack_id,
          transactionAmount,
          parseInt(snackQuantity)
        );
        onApiResponse('ORDER_SUCCESS');
        openToastNotification(true);
        if (transactionTypeId != PENDING) {
          updateBalance(balance + transactionAmount);
        }
        updateSnackQuantity(snackId, snackQuantity);
      } catch (err) {
        console.log(err);
        onApiResponse('ERROR');
        openToastNotification(true);
      }
      setIsOrderLoading(false);
      setIsSnackOrderOpen(false);
    }
  };

  useEffect(() => {
    if (filters.length === 0) {
      handleSearch(snacks, snackSearchValue.trim());
    } else {
      const filtered = snacks.filter((item) => {
        return filters.includes(item.snack_type_id);
      });
      handleSearch(filtered, snackSearchValue.trim());
    }
  }, [filters, snackSearchValue]);

  useEffect(() => {
    if (snacks.length > 0) {
      setLoaded(true);
      setSnacksToDisplay(snacks);
    }
  }, [snacks]);

  return (
    <div>
      <CategoryFilter selectedFilters={filters} />
      <div>
        {snacksToDisplay.length === 0 && isLoaded ? (
          <h6>There are no snacks that match your filter/search criteria.</h6>
        ) : (
          <SnackGrid
            snacks={snacksToDisplay}
            loaded={isLoaded}
            onClick={openSnackOrder}
          />
        )}
      </div>
      <OrderSnackDialog
        open={isSnackOrderOpen}
        value={snackQuantity}
        isOrderLoading={isOrderLoading}
        setSnackQuantity={setSnackQuantity}
        handleClose={handleCloseSnackOrder}
        onSubmit={handleSubmit}
        onChangeQuantity={handleChangeQuantity}
      />
    </div>
  );
};

export default SnacksContainer;
