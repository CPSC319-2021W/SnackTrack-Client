import styles from '../styles/UserCard.module.css';

import { Card, CardActionArea, CardMedia } from '@material-ui/core';

import React from 'react';
import { useDispatch } from 'react-redux';

import { simpleLogin } from '../redux/features/users/usersSlice';

const UserCard = (props) => {
  // TODO: add imageUri
  const { user } = props;
  const dispatch = useDispatch();

  

  const login = () => {
    dispatch(simpleLogin(user));
    // TODO: route to snack list
  };

  return (
    <Card variant={'outlined'} className={styles.base}>
      <CardActionArea className={styles.action_area} onClick={login}>
        <CardMedia
          className={styles.image}
          /** title={user.firstName} */
          component='img'
          /** src={imageUri} *//>
      </CardActionArea>
    </Card>
  );
};

export default UserCard; 
