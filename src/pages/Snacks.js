import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSnacks } from '../redux/features/snacks/snacksSlice';
import SnacksContainer from '../components/SnacksList/SnacksContainer';

const Snacks = () => {
  const dispatch = useDispatch();
  const { snacks, categories } = useSelector((state) => state.snacksReducer);

  useEffect(() => {
    dispatch(fetchSnacks());
  }, [dispatch]);

  return (
    <div>
      <SnacksContainer snacks={snacks} filters={categories} />
    </div>
  );
};

export default Snacks;
