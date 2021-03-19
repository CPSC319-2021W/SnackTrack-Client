import { Card, CardActionArea, CardMedia } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ROUTES } from '../../constants';
import { Switch } from '@material-ui/core';
import adminStyles from '../../styles/AdminUsersList.module.css';
import classNames from 'classnames';
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
  const routeToMatch = ROUTES.USERS.split('/').join('\\/');
  const regex = new RegExp(`(${routeToMatch}/[0-9]+){1,1}`);
  const noHover = Boolean(pathname.match(regex));

  const [isAdmin, setIsAdmin] = useState(false);

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
    if (pathname === ROUTES.SELECT) {
      return login;
    }
    return expandUser;
  };

  const handleMakeAdmin = () => {
    // TODO: make API call to promote user to admin
    setIsAdmin(!isAdmin);
  };

  useEffect(() => {
    setIsAdmin(user.is_admin);
  }, []);

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
        <div className={styles.text}>
          <p className={styles.text__emphasis}>
            {user.first_name} {user.last_name}
          </p>
          <p className={styles.text__reg}>
            {user.email_address}
          </p>
          {noHover ? (
            <div className={styles.switch__container}>
              <p className={styles.text__sub}>Promote to Admin</p>
              <Switch
                disableRipple
                checked={isAdmin}
                name='admin'
                onChange={handleMakeAdmin}
              />
            </div>
          ) : null}
        </div>
        {pathname === ROUTES.USERS || noHover ? (
          <div className={adminStyles.balance}>
            {noHover ? (
              <p className={adminStyles.balance__text}>Current Balance</p>
            ) : null}
            <p
              className={classNames({
                [adminStyles.balance__value]: true,
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
