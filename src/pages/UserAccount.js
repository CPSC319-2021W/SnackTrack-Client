import React from 'react';
import { useParams } from 'react-router-dom';

import styles from '../styles/Layout.module.css';

const UserAccount = () => {
  const { id } = useParams();

  return (
    <div className={styles.content}>
      <h4>Account: { id }</h4>
    </div>
  );
};

export default UserAccount;
