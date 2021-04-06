import { Card, CardActionArea, CardMedia } from '@material-ui/core';

import React from 'react';
import adminStyles from '../styles/AdminUsersList.module.css';
import classNames from 'classnames';
import styles from '../styles/UserCard.module.css';
import { useParams } from 'react-router-dom';

const UserProfileNotFound = () => {
  const { id } = useParams();
  const user = {
    first_name: 'User',
    last_name: 'Not Found',
    emailAddress: `There is no user with ID ${id}`,
    balance: 404,
    image_uri:
      'https://i.pinimg.com/originals/a6/6e/76/a66e76f9a9f9671b6e5e535f5d44eea3.png'
  };

  return (
    <Card variant={'outlined'} className={styles.base__noHover}>
      <CardActionArea
        className={classNames({
          [styles.action_area]: true,
          [styles.action_area__unclickable]: true
        })}
      >
        <CardMedia
          className={styles.image}
          title={user.first_name}
          component='img'
          image={user.image_uri}
        />
        <div className={styles.text}>
          <p className={styles.fullname}>
            {user.first_name} {user.last_name}
          </p>
          <p>{user.emailAddress}</p>
        </div>
        <div className={adminStyles.balance}>
          <p className={adminStyles.balance__text}>Oops!</p>
          <p
            className={classNames({
              [adminStyles.balance__value]: true,
              [adminStyles.balance__value__large]: true
            })}
          >
            {user.balance}
          </p>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default UserProfileNotFound;
