import '../styles/Global.css';
import { Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AuthLogin from '../pages/AuthLogin';
import Landing from '../pages/LandingPage';
import React from 'react';
import SelectLogin from '../pages/SelectLogin';
import SnackList from '../pages/SnackList';
import TransactionHistory from '../pages/TransactionHistory';
import UserProfile from '../pages/UserProfile';
import { getUser } from '../redux/features/users/usersSlice';
import { setToken } from '../redux/features/auth/authSlice';

const Root = () => {
  const dispatch = useDispatch();
  const { username, firstName, lastName, balance } = useSelector(
    (state) => state.usersReducer
  );
  const token = useSelector((state) => state.authReducer.token);

  const authSetToken = (token) => dispatch(setToken({ token }));
  const getUserById = (userId) => dispatch(getUser(userId));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='root-container'>
        <Router>
          <Switch>
            <Route path='/auth-login' component={AuthLogin} />
            <Route path='/select-login' component={SelectLogin} />
            <Route path='/snack-list' component={SnackList} />
            <Route path='/transaction-history' component={TransactionHistory} />
            <Route path='/user-profile' component={UserProfile} />
            <Route exact path='/' component={Landing} />
          </Switch>
        </Router>
        <div>Token: {token}</div>
        <div>
          {username
            ? `Welcome, ${firstName} ${lastName}. You're currently carrying a balance of $${balance}.00.`
            : ''}
        </div>
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={() => authSetToken('fake_token')}>
          Set Token
        </Button>
        <Button
          variant={'outlined'}
          color={'secondary'}
          onClick={() => getUserById(2)}>
          Set Profile
        </Button>
        <p>
          <code>brb building things</code>
        </p>
      </div>
    </ThemeProvider>
  );
};

export default Root;
