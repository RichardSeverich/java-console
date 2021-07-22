import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CookiesService from 'app/services/CookieService';

/**
 * Redirects any private view to a public one if a criteria is meet.
 */
function PrivateRoute({ component: Component, ...leftOverProps }) {
  return (
    <Route
      {...leftOverProps}
      render={(props) =>
        CookiesService.getCookie('token') ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;
