import '../styles/Global.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import AuthLogin from '../pages/AuthLogin';
import { Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import HeaderBar from '../components/HeaderBar';
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
  const { username, firstName, emailAddress, balance } = useSelector(
    (state) => state.usersReducer
  );

  const getUserById = (userId) => dispatch(getUser(userId));
  const authLogoutSuccess = () => dispatch(setLogout());

  const onSuccess = (res) => {
    authLogoutSuccess();
    console.log('success: ', res);
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
        <div className='root-container'>
          <HeaderBar balance={balance} firstName={firstName} />
          <Router>
            <Switch>
              <Route path='/auth-login' component={AuthLogin} />
              <Route path='/select-login' component={SelectLogin} />
              <Route path='/snacks' component={Snacks} />
              <Route path='/transactions' component={Transactions} />
              <Route path='/user-profile' component={UserProfile} />
              <Route exact path='/' component={Landing} />
            </Switch>
          </Router>

          <h4>
            {username
              ? `Welcome, ${emailAddress}. You're currently carrying a balance of $${balance}.`
              : ''}
          </h4>
          <Button variant={'outlined'} color={'secondary'} onClick={() => getUserById(2)}>
            Set Profile
          </Button>
          <Button
            clientid={process.env.REACT_APP_CLIENT_ID}
            variant='outlined'
            onClick={signOut}
          >
            LOG OUT FROM GOOGLE
          </Button>
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Root;
