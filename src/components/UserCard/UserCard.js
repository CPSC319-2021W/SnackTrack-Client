import { Card, CardActionArea, CardMedia } from '@material-ui/core';

import { ROUTES } from '../../constants';
import React from 'react';
import classNames from 'classnames';
import defaultAvatar from '../../images/illustrations/defaultAvatar.svg';
import { simpleLogin } from '../../redux/features/users/usersSlice';
import styles from '../../styles/UserCard.module.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const UserCard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = props;
  const { pathname } = history.location;
  const routeToMatch = ROUTES.USERS.split('/').join('\\/');
  const regex = new RegExp(`(${routeToMatch}/[0-9]+){1,1}`);
  const noHover = Boolean(pathname.match(regex));

  const login = () => {
    dispatch(simpleLogin(user));
    history.push(ROUTES.SNACKS);
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
        onClick={!noHover ? login : null}
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
      </CardActionArea>
    </Card>
  );
};

export default UserCard;
