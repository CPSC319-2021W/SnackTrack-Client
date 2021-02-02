import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../index.css";
import Landing from "../pages/LandingPage";
import AuthLogin from "../pages/AuthLogin";
import SelectLogin from "../pages/SelectLogin";
import SnackList from "../pages/SnackList";
import TracsactionsHistory from "../pages/TransactionsHistory";
import UserProfile from "../pages/UserProfile";

const Root = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="auth-login" component={AuthLogin} />
            <Route path="select-login" component={SelectLogin} />
            <Route path="snack-list" component={SnackList} />
            <Route
              path="transactions-history"
              component={TracsactionsHistory}
            />
            <Route path="user-profile" component={UserProfile} />
            <Route exact path="/" component={Landing} />
          </Switch>
        </Router>
        <p>
          <code>brb building things</code>
        </p>
      </header>
    </div>
  );
};

export default Root;
