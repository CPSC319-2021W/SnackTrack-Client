
import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container } from '@material-ui/core';
import HeaderBar from '../components/HeaderBar';
import styles from '../styles/Layout.module.css';

import { ROUTES } from '../constants';

const CommonRoute = ({ component: Component, signOut, switchUser, ...rest}) => {
  const { firstName, balance } = useSelector((state) => state.usersReducer.profile);

  return (
    <Route {...rest} render={(props) => (
      firstName !== null
        ? (
          <div className={styles.base}>
            <HeaderBar
              firstName={firstName}
              balance={balance}
              clientid={process.env.REACT_APP_CLIENT_ID}
              handleLogOut={balance !== null ? signOut : switchUser}
            />
            <Container fixed className={styles.content}>
              <Component {...props} />
            </Container>
          </div>
        )
        : <Redirect to={ROUTES.LOGIN} />
    )} />
  );
};

export default CommonRoute;