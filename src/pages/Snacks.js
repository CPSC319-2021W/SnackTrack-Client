import React from 'react';
import CategoryFilter from '../components/CategoryFilter';
import SnackCard from '../components/SnackCard';

const Snacks = () => {
  return (
    <div>
      <p>Snacks Page</p>
      <CategoryFilter />
      <SnackCard
        snack={{
          imageUri:
            'https://www.hersheys.com/content/dam/smartlabelproductsimage/kitkat/00034000002467-0010.png',
          snackName: 'KitKat',
          price: 200
        }}
        onClick={alert}
      />
    </div>
  );
};

export default Snacks;
