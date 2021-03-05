import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import HeaderBar from '../components/HeaderBar';
import { ROUTES } from '../constants';
import { isAuthenticated } from '../helpers/AuthHelper';
import styles from '../styles/Layout.module.css';

const AdminRoute = ({ component: Component, signOut, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <div className={styles.base}>
            <HeaderBar
              isAdminRoute
              clientid={process.env.REACT_APP_CLIENT_ID}
              handleLogOut={signOut}
            />
            <Container fixed className={styles.content}>
              <Component {...props} />
            </Container>
          </div>
        ) : (
          <Redirect to={ROUTES.LOGIN} />
        )
      }
    />
  );
};

export default AdminRoute;
