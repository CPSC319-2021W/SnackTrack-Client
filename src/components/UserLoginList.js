import React from 'react';
import UserCard from './UserCard/UserCard';
import styles from '../styles/Login.module.css';

const UserLoginList = (props) => {

  const {users} = props;

  const userCards = users.map((user) => <UserCard key={user.user_id} user={user}/>);
  const visibleUserCards = userCards.slice(0, 8);

  return (
    <div className={styles.list}>
      { visibleUserCards }
    </div>
  );
};

export default UserLoginList;
