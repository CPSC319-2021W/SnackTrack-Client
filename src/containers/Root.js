import '../index.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AuthLogin from '../pages/AuthLogin';
import HeaderBar from '../components/HeaderBar';
import Landing from '../pages/LandingPage';
import React from 'react';
import SelectLogin from '../pages/SelectLogin';
import Snacks from '../pages/Snacks';
import TransactionHistory from '../pages/TransactionHistory';
import UserProfile from '../pages/UserProfile';
import { getUser } from '../redux/features/users/usersSlice';
import { setToken } from '../redux/features/auth/authSlice';

const Root = () => {
  const dispatch = useDispatch();
  const { username, firstName, emailAddress, balance } = useSelector(
    (state) => state.usersReducer
  );
  const token = useSelector((state) => state.authReducer.token);

  const authSetToken = (token) => dispatch(setToken({ token }));
  const getUserById = (userId) => dispatch(getUser(userId));

  return (
    <div className='App'>
      <header className='App-header'>
        <HeaderBar balance={balance} firstName={firstName} />

        <Router>
          <Switch>
            <Route path='/auth-login' component={AuthLogin} />
            <Route path='/select-login' component={SelectLogin} />
            <Route path='/snacks' component={Snacks} />
            <Route path='/transaction-history' component={TransactionHistory} />
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
        <button onClick={() => getUserById(2)}>Get User (Communal View)</button>
        <button onClick={() => getUserById(7)}>Get User (Authenticated View)</button>
        <button onClick={() => authSetToken('fake_token')}>Set Token</button>
        <p>
          <code>brb building things</code>
        </p>
      </header>
    </div>
  );
};

export default Root;
