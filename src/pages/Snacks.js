import React from 'react';
import SnackCard from '../components/SnackCard';

const Snacks = () => (
  <div>
    <p>Snacks Page</p>
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

export default Snacks;
