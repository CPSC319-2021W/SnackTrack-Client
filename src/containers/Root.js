import React from 'react';

import { Route, Switch, useHistory } from 'react-router-dom';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useDispatch } from 'react-redux';
import { useGoogleLogout } from 'react-google-login';

import AdminRoute from '../routes/AdminRoute';
import CommonRoute from '../routes/CommonRoute';
import PrivateRoute from '../routes/PrivateRoute';
import { ROUTES } from '../constants';
import { isAuthenticated } from '../helpers/AuthHelper';
import { setLogout } from '../redux/features/auth/authSlice';
import theme from '../styles/theme';

import AuthLogin from '../pages/AuthLogin';
import Dashboard from '../pages/Dashboard';
import Fallback from '../pages/Fallback';
import Inventory from '../pages/Inventory';
import SelectLogin from '../pages/SelectLogin';
import Snacks from '../pages/Snacks';
import Transactions from '../pages/Transactions';
import UserAccount from '../pages/UserAccount';
import Users from '../pages/Users';

const Root = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const authLogoutSuccess = () => dispatch(setLogout());

  const onSuccess = () => {
    Cookies.remove('auth');
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
          <Route path={ROUTES.LOGIN} component={AuthLogin} />
          <Route
            path={ROUTES.SELECT}
            component={() => (isAuthenticated() ? <Fallback /> : <SelectLogin />)}
          />
          <CommonRoute
            exact
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
          <AdminRoute exact path={ROUTES.ADMIN} signOut={signOut} component={Dashboard} />
          <AdminRoute path={ROUTES.INVENTORY} signOut={signOut} component={Inventory} />
          <AdminRoute exact path={ROUTES.USERS} signOut={signOut} component={Users} />
          <AdminRoute path={`${ROUTES.USERS}/:id`} signOut={signOut} component={UserAccount} />
          <Route component={Fallback} />
        </Switch>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Root;
