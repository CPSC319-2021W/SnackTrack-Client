import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import BottomNavigation from '../components/BottomNavigation';
import HeaderBar from '../components/HeaderBar';
import { ROUTES } from '../constants';
import { isAuthenticated } from '../helpers/AuthHelper';
import styles from '../styles/Layout.module.css';

const PrivateRoute = ({ component: Component, signOut, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <div className={styles.base}>
            <HeaderBar handleLogOut={signOut} />
            <Container fixed className={styles.content}>
              <Component {...props} />
            </Container>
            <BottomNavigation handleLogOut={signOut} />
          </div>
        ) : (
          <Redirect to={ROUTES.LOGIN} />
        )
      }
    />
  );
};

export default PrivateRoute;
