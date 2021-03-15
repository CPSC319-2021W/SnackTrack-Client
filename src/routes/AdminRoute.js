import BottomNavigation from '../components/BottomNavigation';
import { Container } from '@material-ui/core';
import HeaderBar from '../components/HeaderBar';
import React from 'react';
import { Route } from 'react-router-dom';
import Unauthorized from '../pages/Unauthorized';
import { isAdmin } from '../helpers/AuthHelper';
import styles from '../styles/Layout.module.css';
import { useSelector } from 'react-redux';

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
            <BottomNavigation isAdminRoute handleLogOut={signOut} />
          </div>
        ) : (
          <Unauthorized />
        )
      }
    />
  );
};

export default AdminRoute;
