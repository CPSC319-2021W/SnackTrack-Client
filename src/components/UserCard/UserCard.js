import defaultAvatar from '../../images/illustrations/defaultAvatar.svg';

import styles from '../../styles/UserCard.module.css';

import { Card, CardActionArea, CardMedia} from '@material-ui/core';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { simpleLogin } from '../../redux/features/users/usersSlice';

const UserCard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = props;

  const login = () => {
    dispatch(simpleLogin(user));
    history.push('/snacks');
  };

  let img = typeof user.image_uri === 'undefined' ? defaultAvatar : user.image_uri;



  return (
    <Card variant={'outlined'} className={styles.base}>
      <CardActionArea className={styles.action_area} onClick={login}>
        <CardMedia
          className={styles.image}
          title={user.first_name}
          component='img'
          image={img}/>
        <div className={styles.text}>
          <p className={styles.fullname}>{user.first_name} {user.last_name}</p>
          <p>{user.username}</p>
        </div>
      </CardActionArea>
    </Card>
  );
};

{/* <Skeleton className={styles.fullname} variant={'text'} />
<Skeleton variant={'text'} /> */}

export default UserCard; 
