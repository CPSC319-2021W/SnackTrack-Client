import { Container } from '@material-ui/core';
import HeaderBar from './HeaderBar';
import React from 'react';
import styles from '../styles/Layout.module.css';

const Layout = (props) => {
  const { children, firstName, balance, logOut } = props;

  return (
    <div className={styles.base}>
      <HeaderBar
        balance={balance}
        firstName={firstName}
        clientid={process.env.REACT_APP_CLIENT_ID}
        handleLogOut={logOut}
      />
      <Container fixed className={styles.content}>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
