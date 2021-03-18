import React from 'react';

import UserCardAdmin from './UserCardAdmin';
import styles from '../styles/AdminUsersList.module.css';

const UsersContainerAdmin = (props) => {
  const { users } = props;

  return (
    <div className={styles.list}>
      {
        users?.map((user, i) => (
          <UserCardAdmin key={i} user={user} />
        ))
      }
    </div>
  );
};

export default UsersContainerAdmin;
