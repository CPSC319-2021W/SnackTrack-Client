import React from 'react';

import { Container } from '@material-ui/core';
import styles from '../styles/Layout.module.css';

const Users = () => {
  return (
    <div className={styles.base}>
      <Container fixed className={styles.content}>
        <h4>Users</h4>
      </Container>
    </div>
  );
};

export default Users;
