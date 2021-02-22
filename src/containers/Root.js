import { Route, Switch, useHistory } from 'react-router-dom';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../constants';

import AuthLogin from '../pages/AuthLogin';
import { Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fallback from '../pages/Fallback';
import React from 'react';
import SelectLogin from '../pages/SelectLogin';
import Snacks from '../pages/Snacks';
import Transactions from '../pages/Transactions';
import UserProfile from '../pages/UserProfile';
import { setBalance } from '../redux/features/users/usersSlice';
import { setLogout } from '../redux/features/auth/authSlice';
import theme from '../styles/theme';
import { useGoogleLogout } from 'react-google-login';

import CommonRoute from '../routes/CommonRoute';
import PrivateRoute from '../routes/PrivateRoute';

const Root = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { balance } = useSelector((state) => state.usersReducer.profile);

  const toggleHeader = () => {
    balance === null ? dispatch(setBalance(0)) : dispatch(setBalance(null));
  };

  const authLogoutSuccess = () => dispatch(setLogout());

  const onSuccess = () => {
    authLogoutSuccess();
    history.push(ROUTES.LOGIN);
  };

  const onFailure = (res) => {
    console.log('failed: ', res);
  };

  const { signOut } = useGoogleLogout({
    onFailure: onFailure,
    clientId: process.env.REACT_APP_CLIENT_ID,
    onLogoutSuccess: onSuccess
  });

  const switchUser = () => {
    history.push(ROUTES.SELECT);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route exact path={ROUTES.LOGIN} component={AuthLogin} />
          <Route path={ROUTES.SELECT} component={SelectLogin} />
          <CommonRoute path={ROUTES.SNACKS} signOut={signOut} switchUser={switchUser} component={Snacks} />
          <PrivateRoute path={ROUTES.TRANSACTIONS} signOut={signOut} component={Transactions} />
          <PrivateRoute path={ROUTES.PROFILE} signOut={signOut} component={UserProfile} />
          <Route component={Fallback} />
        </Switch>
        <Button variant={'outlined'} color={'secondary'} onClick={toggleHeader}>
          Toggle Header
        </Button>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Root;
