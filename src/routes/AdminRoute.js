import React from 'react';

import BottomNavigationAdmin from '../components/BottomNavigationAdmin';
import { Container } from '@material-ui/core';
import HeaderBarAdmin from '../components/HeaderBarAdmin';
import { Route } from 'react-router-dom';
import Unauthorized from '../pages/Unauthorized';
import { isAdmin } from '../helpers/AuthHelper';
import styles from '../styles/Layout.module.css';

const AdminRoute = ({ component: Component, signOut, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin() ? (
          <div className={styles.base}>
            <HeaderBarAdmin handleLogOut={signOut} />
            <Container fixed className={styles.content}>
              <Component {...props} />
            </Container>
            <BottomNavigationAdmin handleLogOut={signOut} />
          </div>
        ) : (
          <Unauthorized />
        )
      }
    />
  );
};

export default AdminRoute;
