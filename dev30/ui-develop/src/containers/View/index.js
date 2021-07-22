import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingComponent from 'app/components/Loading';
import ErrorComponent from 'app/components/Error';

/**
 * Login view, where the user fills their email and password
 * @param  {boolean} loading Represents if the service is currently loading
 * @param  {Object} error Error state containing:
 * * @param  {number} error.code Error code of the error
 * * @param  {string} error.message Message of the error
 * @param  {Object} component Component to show if there is no loading and no error
 */
function View({ loading, error, component }) {
  return (
    <div>
      {loading && <LoadingComponent />}
      {error.code && (
        <ErrorComponent code={error.code} message={error.message} />
      )}
      {!loading && !error.code && <> {component} </>}
    </div>
  );
}

View.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.shape(),
};

View.defaultProps = {
  loading: false,
  error: {},
};

function mapStateToProps(state) {
  const { loading } = state.loadingError;
  const { error } = state.loadingError;
  return { loading, error };
}

export default connect(mapStateToProps)(View);
