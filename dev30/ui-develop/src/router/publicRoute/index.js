import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CookiesService from 'app/services/CookieService';

/**
 * Redirects any public view to a private one if a criteria is meet.
 */
const PublicRoute = ({ component: Component, ...leftOverProps }) => {
  return (
    <Route
      {...leftOverProps}
      render={(props) =>
        CookiesService.getCookie('token') ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
