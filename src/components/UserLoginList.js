import React from 'react';
import UserCard from './UserCard/UserCard';
import styles from '../styles/Login.module.css';

const UserLoginList = (props) => {

  const {users} = props;

  const compareUsers = (a, b) => {
    return compareName(a,b) || compareAdmin(a,b);
  };

  const compareName = (a, b) => {
    return a.full_name.localeCompare(b.full_name);
  };

  const compareAdmin = (a, b) => {
    if (a.is_admin && !b.is_admin) {
      return -1;
    } else if (!a.is_admin && b.is_admin) {
      return 1;
    } else {
      return 0;
    }
  };

  const userCards = users.sort(compareUsers).map((user) => <UserCard key={user.user_id} user={user}/>);
  const visibleUserCards = userCards.slice(0, 8);

  return (
    <div className={styles.list}>
      { visibleUserCards }
    </div>
  );
};

export default UserLoginList;
