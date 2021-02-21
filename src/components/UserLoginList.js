import React from 'react';
import UserCard from './UserCard/UserCard';
import styles from '../styles/UserLoginList.module.css';

const UserLoginList = (props) => {

  const {users} = props;

  const usersToDisplay = users.map((user) => <UserCard key={user.user_id} user={user}/>);

  return (
    <div className={styles.container}>
      { usersToDisplay }
    </div>
  );
};

export default UserLoginList;
