import '../index.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { setProfile, setToken } from '../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

import AuthLogin from '../pages/AuthLogin';
import Landing from '../pages/LandingPage';
import SelectLogin from '../pages/SelectLogin';
import SnackList from '../pages/SnackList';
import TransactionHistory from '../pages/TransactionHistory';
import UserProfile from '../pages/UserProfile';

const Root = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const profile = useSelector((state) => state.authReducer.profile);

  const authSetToken = (token) => dispatch(setToken({ token }));
  const authSetProfile = (profile) => dispatch(setProfile(profile));

  return (
    <div className='App'>
      <header className='App-header'>
        <Router>
          <Switch>
            <Route path='/auth-login' component={AuthLogin} />
            <Route path='/select-login' component={SelectLogin} />
            <Route path='/snack-list' component={SnackList} />
            <Route
              path='/transaction-history'
              component={TransactionHistory}/>
            <Route path='/user-profile' component={UserProfile} />
            <Route exact path='/' component={Landing} />
          </Switch>
        </Router>
        <div>Token: {token}</div>
        <div>
          Profile: {profile ? `Welcome, ${profile.username}` : ''}
        </div>
        <button onClick={() => authSetToken('fake_token')}>
          Set Token
        </button>
        <button
          onClick={() =>
            authSetProfile({ id: 1, username: 'FakeUsername' })
          }>
          Set Profile
        </button>
        <p>
          <code>brb building things</code>
        </p>
      </header>
    </div>
  );
};

export default Root;
