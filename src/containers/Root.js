import { Route, Switch, useHistory } from 'react-router-dom';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';

import { COMMON_PAGE_ERROR, ROUTES } from '../constants';
import AdminRoute from '../routes/AdminRoute';
import AuthLogin from '../pages/AuthLogin';
import CommonRoute from '../routes/CommonRoute';
import Cookies from 'js-cookie';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from '../pages/Dashboard';
import Fallback from '../pages/Fallback';
import Inventory from '../pages/Inventory';
import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import PrivateRoute from '../routes/PrivateRoute';
import React from 'react';
import SelectLogin from '../pages/SelectLogin';
import Snacks from '../pages/Snacks';
import Transactions from '../pages/Transactions';
import UserProfile from '../pages/UserProfile';
import Users from '../pages/Users';
import { isAuthenticated } from '../helpers/AuthHelper';
import { setLogout } from '../redux/features/auth/authSlice';
import { theme } from '../styles/theme';
import { useDispatch } from 'react-redux';
import { useGoogleLogout } from 'react-google-login';

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
    history.push(ROUTES.COMMON);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <CssBaseline />
          <Switch>
            <Route path={ROUTES.LOGIN} component={AuthLogin} />
            <Route
              path={ROUTES.COMMON}
              component={() => (
                isAuthenticated()
                  ? <Fallback message={COMMON_PAGE_ERROR} />
                  : <SelectLogin />
              )}
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
            <AdminRoute
              exact
              path={ROUTES.DASHBOARD}
              signOut={signOut}
              component={Dashboard}
            />
            <AdminRoute path={ROUTES.INVENTORY} signOut={signOut} component={Inventory} />
            <AdminRoute exact path={ROUTES.USERS} signOut={signOut} component={Users} />
            <AdminRoute
              path={`${ROUTES.USERS}/:id`}
              signOut={signOut}
              component={UserProfile}
            />
            <Route component={Fallback} />
          </Switch>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Root;
