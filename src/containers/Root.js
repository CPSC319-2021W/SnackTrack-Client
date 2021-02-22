import { Route, Switch, useHistory } from 'react-router-dom';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';

import AuthLogin from '../pages/AuthLogin';
import CssBaseline from '@material-ui/core/CssBaseline';
import Landing from '../pages/LandingPage';
import Layout from '../components/Layout';
import React from 'react';
import SelectLogin from '../pages/SelectLogin';
import Snacks from '../pages/Snacks';
import Transactions from '../pages/Transactions';
import UserProfile from '../pages/UserProfile';
import { setLogout } from '../redux/features/auth/authSlice';
import theme from '../styles/theme';
import { useDispatch } from 'react-redux';
import { useGoogleLogout } from 'react-google-login';

const Root = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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
          <Layout logOut={signOut} history={history}>
            <Route path='/snacks' component={Snacks} />
            <Route path='/transactions' component={Transactions} />
            <Route path='/user-profile' component={UserProfile} />
          </Layout>
          <Route exact path='/' component={Landing} />
        </Switch>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Root;
