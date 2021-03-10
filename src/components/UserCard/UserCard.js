import { Card, CardActionArea, CardMedia } from '@material-ui/core';

import { ROUTES } from '../../constants';
import React from 'react';
import adminStyles from '../../styles/AdminUsersList.module.css';
import defaultAvatar from '../../images/illustrations/defaultAvatar.svg';
import { simpleLogin } from '../../redux/features/users/usersSlice';
import styles from '../../styles/UserCard.module.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const UserCard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = history.location;
  const { user } = props;

  const formatPrice = (amount) => {
    amount = amount / 100;
    return `$${amount.toFixed(2)}`;
  };

  const login = () => {
    dispatch(simpleLogin(user));
    history.push(ROUTES.SNACKS);
  };

  const expandUser = () => {
    history.push(`${ROUTES.USERS}/${user.user_id}`);
  };

  let img = typeof user.image_uri === 'undefined' ? defaultAvatar : user.image_uri;

  return (
    <Card variant={'outlined'} className={styles.base}>
      <CardActionArea
        className={styles.action_area}
        onClick={pathname === ROUTES.SELECT ? login : expandUser}
      >
        <CardMedia
          className={styles.image}
          title={user.first_name}
          component='img'
          image={img}
        />
        <div className={styles.text}>
          <p className={styles.fullname}>
            {user.first_name} {user.last_name}
          </p>
          <p>{user.username}</p>
        </div>
        {pathname === ROUTES.USERS ? (
          <div className={adminStyles.balance}>
            <p className={adminStyles.balance__text}>{formatPrice(user.balance)}</p>
          </div>
        ) : null}
      </CardActionArea>
    </Card>
  );
};

export default UserCard;
