import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CategoryFilter from './CategoryFilter';
import OrderSnackDialog from '../OrderSnackDialog';
import SnackGrid from './SnackGrid';
import { makeOrder } from '../../services/OrdersService';
import { selectOneSnack } from '../../redux/features/snacks/snacksSlice';

const SnacksContainer = (props) => {
  const dispatch = useDispatch();
  const { snacks, filters } = props;
  const { userId } = useSelector((state) => state.usersReducer.profile);
  const [isSnackOrderOpen, setIsSnackOrderOpen] = useState(false);
  const [snackQuantity, setSnackQuantity] = useState(1);
  const snack = useSelector(state => state.snacksReducer.selectedSnack);
  const setSelectedSnack = (snack) => dispatch(selectOneSnack(snack));
  const { selectedSnack } = useSelector(state => state.snacksReducer);
  
  const selectSnack = (snackId) => {
    console.log(snack);
    setSelectedSnack(snacks.filter((oneSnack) => oneSnack.snack_id === snackId)[0]);
  };

  const handleCloseSnackOrder = () => {
    setIsSnackOrderOpen(false);
  };

  const openSnackOrder = (snackId) => {
    setIsSnackOrderOpen(true);
    selectSnack(snackId);
  };

  const handleChangeQuantity = (event) => {
    setSnackQuantity(event.target.value);
  };

  const handleSubmit = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      //TODO: needed to change for API call 
      const transaction_type_id = 0;
      const transaction_amount = snackQuantity * selectedSnack.price;
      makeOrder(userId, transaction_type_id, selectedSnack.snack_id, transaction_amount, snackQuantity);
      setIsSnackOrderOpen(false);
      setSnackQuantity();
    }
  };
  
  return (
    <div>
      <CategoryFilter />
      <div>
        {filters.length === 0 ? (
          <SnackGrid snacks={snacks} onClick={openSnackOrder} />
        ) : (
          <SnackGrid
            snacks={snacks.filter((item) => {
              return filters.includes(item.snack_type_id);
            })}
            onClick={openSnackOrder}
          />
        )}
      </div>
      <OrderSnackDialog
        open={isSnackOrderOpen}
        value={snackQuantity}
        handleClose={handleCloseSnackOrder}
        onSubmit={handleSubmit}
        onChangeQuantity={handleChangeQuantity}
      />
    </div>
  );
};

export default SnacksContainer;
