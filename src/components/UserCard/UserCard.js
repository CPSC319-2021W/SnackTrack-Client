import { Card, CardActionArea, CardMedia } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../../constants';
import { Switch } from '@material-ui/core';
import adminStyles from '../../styles/AdminUsersList.module.css';
import classNames from 'classnames';
import defaultAvatar from '../../images/illustrations/defaultAvatar.svg';
import { setUserAsAdmin } from '../../services/UsersService';
import { simpleLogin } from '../../redux/features/users/usersSlice';
import styles from '../../styles/UserCard.module.css';
import { useHistory } from 'react-router-dom';

const UserCard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = history.location;
  const { user, onHandleApiResponse } = props;
  const routeToMatch = ROUTES.USERS.split('/').join('\\/');
  const regex = new RegExp(`(${routeToMatch}/[0-9]+){1,1}`);
  const noHover = Boolean(pathname.match(regex));
  const { userId } = useSelector(
    (state) => state.usersReducer.profile
  );

  const [isAdmin, setIsAdmin] = useState(user.is_admin);

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

  const onClick = () => {
    if (noHover) {
      return;
    }
    if (pathname === ROUTES.COMMON) {
      return login;
    }
    return expandUser;
  };

  const announceAdminChange = async (response) => {
    if (typeof onHandleApiResponse === 'function') {
      onHandleApiResponse(response);
    }
  };

  const handleMakeAdmin = async () => {
    const optimistic = !isAdmin;
    try {
      // Make an optimistic UI update
      setIsAdmin(optimistic);

      await setUserAsAdmin(user.user_id, optimistic);
      const response = optimistic ? 'ADMIN_PROMOTION_SUCCESS' : 'ADMIN_DEMOTION_SUCCESS';
      announceAdminChange(response);
    } catch (err) {
      console.err(err);
      announceAdminChange('ERROR');
      // Revert the optimistic update if it failed
      setIsAdmin(!optimistic);
    }
  };

  let img = typeof user.image_uri === 'undefined' ? defaultAvatar : user.image_uri;

  return (
    <Card
      variant={'outlined'}
      className={classNames({ [styles.base]: !noHover, [styles.base__noHover]: noHover })}
    >
      <CardActionArea
        className={classNames({
          [styles.action_area]: true,
          [styles.action_area__unclickable]: noHover
        })}
        onClick={onClick()}
      >
        <CardMedia
          className={classNames({
            [styles.image]: !noHover,
            [styles.image__noHover]: noHover
          })}
          title={user.first_name}
          component='img'
          image={img}
        />
        <div className={`${styles.text} ${noHover ? null : styles.login__text}`}>
          <p className={styles.text__emphasis}>
            {user.first_name} {user.last_name}
          </p>
          <p className={styles.text__reg}>
            {user.email_address}
          </p>
          {noHover ? (
            user.user_id !== userId ? (
              <div className={styles.switch__container}>
                <p className={styles.text__sub}>Promote to Admin</p>
                <Switch
                  disableRipple
                  checked={isAdmin}
                  name='admin'
                  onChange={handleMakeAdmin}
                />
              </div>
            ) : null
          ) : null}
        </div>
        {pathname === ROUTES.USERS || noHover ? (
          <div className={classNames({
            [adminStyles.balance]: !noHover,
            [adminStyles.balance__noHover]: noHover
          })}>
            {noHover ? (
              <p className={adminStyles.balance__text}>Current Balance</p>
            ) : null}
            <p
              className={classNames({
                [adminStyles.balance__value]: !noHover,
                [adminStyles.balance__value__large]: noHover
              })}
            >
              {formatPrice(user.balance)}
            </p>
          </div>
        ) : null}
      </CardActionArea>
    </Card>
  );
};

export default UserCard;
