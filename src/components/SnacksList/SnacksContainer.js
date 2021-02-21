import { React, useState } from 'react';

import CategoryFilter from './CategoryFilter';
import OrderSnackDialog from '../OrderSnackDialog';
import SnackGrid from './SnackGrid';
import { makeOrder } from '../../services/OrdersService';
import { useSelector } from 'react-redux';

const SnacksContainer = (props) => {
  const { snacks, filters } = props;
  const { userId } = useSelector((state) => state.usersReducer.profile);
  const [isSnackOrderOpen, setIsSnackOrderOpen] = useState(false);
  const [snackQuantity, setSnackQuantity] = useState('');

  const handleCloseSnackOrder = () => {
    setIsSnackOrderOpen(false);
  };

  const openSnackOrder = () => {
    setIsSnackOrderOpen(true);
  };

  const handleChangeQuantity = (event) => {
    setSnackQuantity(event.target.value);
  };

  const handleSubmit = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      makeOrder(userId, snackQuantity);
      setIsSnackOrderOpen(false);
      setSnackQuantity('');
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
