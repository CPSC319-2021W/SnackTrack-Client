import { Card, CardActionArea, CardMedia } from '@material-ui/core';

import { ROUTES } from '../constants';
import React from 'react';
import adminStyles from '../styles/AdminUsersList.module.css';
import classNames from 'classnames';
import defaultAvatar from '../images/illustrations/defaultAvatar.svg';
import styles from '../styles/SnackCard.module.css';
import { useHistory } from 'react-router-dom';

const UserCardAdmin = (props) => {
  const { user: { user_id, first_name, last_name, email_address, image_uri, balance, is_admin } } = props;

  const history = useHistory();

  const formatPrice = (amount) => {
    amount = amount / 100;
    return `$${amount.toFixed(2)}`;
  };

  const expandUser = () => {
    history.push(`${ROUTES.USERS}/${user_id}`);
  };

  let img = typeof image_uri === 'undefined' ? defaultAvatar : image_uri;

  return (
    <Card variant={'outlined'} className={classNames({
      [styles.base]: true,
      [adminStyles.card__base]: true,
      [adminStyles.card__base__admin]: is_admin
    })}>
      <CardActionArea
        className={adminStyles.action_area}
        onClick={expandUser}
      >
        {is_admin
          ? (
            <span className={adminStyles.admin__pill}>
              ADMIN
            </span>
          ) : null}
        <CardMedia
          className={adminStyles.image}
          title={first_name}
          component='img'
          image={img}
        />
        <div className={adminStyles.content}>
          <p className={adminStyles.user__fullname}>
            { first_name } { last_name }
          </p>
          <p className={adminStyles.user__email}>
            { email_address }
          </p>
          <p className={adminStyles.balance__value}>
            {formatPrice(balance)}
          </p>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default UserCardAdmin;
