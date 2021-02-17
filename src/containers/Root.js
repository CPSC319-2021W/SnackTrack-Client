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
import { setToken } from '../redux/features/auth/authSlice';
import theme from '../styles/theme';

const Root = () => {
  const dispatch = useDispatch();
  const { username, firstName, emailAddress, balance } = useSelector(
    (state) => state.usersReducer
  );
  const token = useSelector((state) => state.authReducer.token);

  const authSetToken = (token) => dispatch(setToken({ token }));
  const getUserById = (userId) => dispatch(getUser(userId));

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
          <div>Token: {token}</div>
          <div>
            {username
              ? `Welcome, ${emailAddress}. You're currently carrying a balance of $${balance}.`
              : ''}
          </div>
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={() => authSetToken('fake_token')}
          >
            Set Token
          </Button>
          <Button variant={'outlined'} color={'secondary'} onClick={() => getUserById(2)}>
            Set Profile
          </Button>
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Root;
