import { Route, Switch, useHistory } from 'react-router-dom';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../components/Layout';

import AuthLogin from '../pages/AuthLogin';
import { Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Landing from '../pages/LandingPage';
import React from 'react';
import SelectLogin from '../pages/SelectLogin';
import Snacks from '../pages/Snacks';
import Transactions from '../pages/Transactions';
import UserProfile from '../pages/UserProfile';
import { getUser } from '../redux/features/users/usersSlice';
import { setLogout } from '../redux/features/auth/authSlice';
import theme from '../styles/theme';
import { useGoogleLogout } from 'react-google-login';

const Root = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { username, firstName, emailAddress, balance } = useSelector(
    (state) => state.usersReducer
  );

  const getUserById = (userId) => dispatch(getUser(userId));
  const authLogoutSuccess = () => dispatch(setLogout());

  const onSuccess = () => {
    authLogoutSuccess();
    history.push('/auth-login');
  };

  const onFailure = (res) => {
    console.log('failed: ', res);
  };

  const { signOut } = useGoogleLogout({
    onFailure: onFailure,
    clientId: process.env.REACT_APP_CLIENT_ID,
    onLogoutSuccess: onSuccess
  });

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route path='/auth-login' component={AuthLogin} />
          <Route path='/select-login' component={SelectLogin} />
          <Layout firstName={firstName} balance={balance} logOut={signOut} history={history}>
            <Route path='/snacks' component={Snacks} />
            <Route path='/transactions' component={Transactions} />
            <Route path='/user-profile' component={UserProfile} />
          </Layout>
          <Route exact path='/' component={Landing} />
        </Switch>
        <h4>
          {username
            ? `Welcome, ${emailAddress}. You're currently carrying a balance of $${balance}.`
            : ''}
        </h4>
        <Button variant={'outlined'} color={'secondary'} onClick={() => getUserById(2)}>
            Set Profile
        </Button>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Root;
