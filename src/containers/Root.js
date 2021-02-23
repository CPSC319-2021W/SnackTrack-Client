import { Route, Switch, useHistory } from 'react-router-dom';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';

import AuthLogin from '../pages/AuthLogin';
import CommonRoute from '../routes/CommonRoute';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fallback from '../pages/Fallback';
import PrivateRoute from '../routes/PrivateRoute';
import { ROUTES } from '../constants';
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
          <CommonRoute
            path={ROUTES.SNACKS}
            signOut={signOut}
            switchUser={switchUser}
            component={Snacks}
          />
          <PrivateRoute
            path={ROUTES.TRANSACTIONS}
            signOut={signOut}
            component={Transactions}
          />
          <PrivateRoute path={ROUTES.PROFILE} signOut={signOut} component={UserProfile} />
          <Route component={Fallback} />
        </Switch>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Root;
