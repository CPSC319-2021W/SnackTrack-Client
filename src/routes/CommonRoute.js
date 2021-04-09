import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated, isCommonLogin } from '../helpers/AuthHelper';

import BottomNavigation from '../components/BottomNavigation';
import { Container } from '@material-ui/core';
import HeaderBar from '../components/HeaderBar';
import { ROUTES } from '../constants';
import styles from '../styles/Layout.module.css';
import { useSelector } from 'react-redux';

const CommonRoute = ({ component: Component, signOut, switchUser, ...rest }) => {
  const { profile } = useSelector((state) => state.usersReducer);
  const token = isAuthenticated();
  const common = isCommonLogin(profile);

  return (
    <Route
      {...rest}
      render={(props) =>
        common || token ? (
          <div className={styles.base}>
            <HeaderBar handleLogOut={token ? signOut : switchUser} />
            <Container fixed className={styles.content}>
              <Component {...props} />
            </Container>
            {token ? <BottomNavigation handleLogOut={signOut} /> : null}
          </div>
        ) : (
          <Redirect to={ROUTES.LOGIN} />
        )
      }
    />
  );
};

export default CommonRoute;
