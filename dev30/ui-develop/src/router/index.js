import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import LoginContainer from 'app/containers/Login';
import MenuContainer from 'app/containers/Home';
import ChangePassword from 'app/containers/ChangePassword';
import NotFound from 'app/components/NotFound';
import Root from 'app/containers/Root';
import { connect } from 'react-redux';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

/**
 * Router that feeds all available routers for the application
 * If the route is public and should redirect to home if a user is logged in, use PublicRoute
 * If the route is private and should redirect to login is a user is NOT logged in use PrivateRoute
 * For other routers use Route.
 */
function MainRouter() {
  return (
    <Router>
      <Route path="/" component={Root} />
      <Switch>
        <PublicRoute path="/login" component={LoginContainer} />
        <PrivateRoute path="/home" component={MenuContainer} />
        <Route path="/change" component={ChangePassword} />
        <Route path="/404" component={NotFound} />
        <Redirect from="" to="/home" exact />
      </Switch>
    </Router>
  );
}

function mapStateToProps(state) {
  const user = state.login;
  return { user };
}

export default connect(mapStateToProps)(MainRouter);
