import React from 'react';
import { Redirect } from 'react-router-dom';
import SnackCard from '../components/SnackCard';
import { useSelector } from 'react-redux';

const Snacks = () => {
  const profile = useSelector((state) => state.authReducer.profile);

  return (
    <div>
      {!profile?.token ? <Redirect to='/auth-login' /> : null}
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
};

export default Snacks;
