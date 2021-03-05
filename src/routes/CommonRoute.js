import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated, isCommonLogin } from '../helpers/AuthHelper';

import { Container } from '@material-ui/core';
import HeaderBar from '../components/HeaderBar';
import { ROUTES } from '../constants';
import React from 'react';
import styles from '../styles/Layout.module.css';
import { useSelector } from 'react-redux';

const CommonRoute = ({ component: Component, signOut, switchUser, ...rest }) => {
  const { profile } = useSelector((state) => state.usersReducer);
  const { firstName, lastName, balance } = profile;
  const token = isAuthenticated();
  const common = isCommonLogin(profile);

  return (
    <Route
      {...rest}
      render={(props) =>
        common || token ? (
          <div className={styles.base}>
            <HeaderBar
              firstName={firstName}
              lastName={lastName}
              balance={balance}
              clientid={process.env.REACT_APP_CLIENT_ID}
              handleLogOut={token ? signOut : switchUser}
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

export default CommonRoute;
