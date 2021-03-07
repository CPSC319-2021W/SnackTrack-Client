import React from 'react';
import { useSelector } from 'react-redux';

import { Redirect, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import BottomNavigation from '../components/BottomNavigation';
import HeaderBar from '../components/HeaderBar';
import { ROUTES } from '../constants';
import { isAdmin } from '../helpers/AuthHelper';
import styles from '../styles/Layout.module.css';

const AdminRoute = ({ component: Component, signOut, ...rest }) => {
  const { firstName, lastName } = useSelector((state) => state.usersReducer.profile);
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin() ? (
          <div className={styles.base}>
            <HeaderBar
              isAdminRoute
              firstName={firstName}
              lastName={lastName}
              clientid={process.env.REACT_APP_CLIENT_ID}
              handleLogOut={signOut}
            />
            <Container fixed className={styles.content}>
              <Component {...props} />
            </Container>
            <BottomNavigation
              isAdminRoute
              handleLogOut={signOut}
            />
          </div>
        ) : (
          <Redirect to={ROUTES.LOGIN} />
        )
      }
    />
  );
};

export default AdminRoute;
