import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImportForm from 'app/components/ImportForm';
import { CREATED_USER_FILE, CLEAR_MESSAGES } from 'actions/User';
import { CSV_TYPE } from 'app/constant/FileType';
import getFormDataFromId from 'app/helpers/ImportFile';
import useCleanUp from 'app/hooks/CleanUp';

/**
 * Display the main import form view de users
 * @param  {function} ImportUsers function that creates the users import file
 * @param  {} clearImportMessages function that clears the error and import messages
 * @param  {number} Success number that represent the number of records accepted
 * @param  {number} rejected number that represent the number of record rejected
 * @param  {object} ErrorImport object that represent the import error
 */
function Import({
  importUsers,
  clearImportMessages,
  success,
  rejected,
  errorImport,
}) {
  const ID = 'uploadUsers';

  function handleImport() {
    const data = getFormDataFromId(ID);
    if (data) {
      importUsers(data);
    }
  }

  useCleanUp(clearImportMessages);

  return (
    <div>
      <ImportForm
        id={ID}
        typeFile={CSV_TYPE}
        handleImport={handleImport}
        resultSaved={success}
        resultRejected={rejected}
        errorMessage={errorImport.message}
      />
    </div>
  );
}

Import.propTypes = {
  importUsers: PropTypes.func,
  clearImportMessages: PropTypes.func,
  success: PropTypes.string,
  rejected: PropTypes.string,
  errorImport: PropTypes.shape({}),
};
Import.defaultProps = {
  importUsers: () => {},
  clearImportMessages: () => {},
  success: '',
  rejected: '',
  errorImport: {},
};

function mapStateToProps(state) {
  const success = state.userMaintenance.userCreateFile.saved.toString();
  const rejected = state.userMaintenance.userCreateFile.failed.toString();
  const errorImport = state.userMaintenance.error;
  return { success, rejected, errorImport };
}

function mapDispatchToProps(dispatch) {
  function importUsers(payload) {
    dispatch(CREATED_USER_FILE(payload));
  }

  function clearImportMessages() {
    dispatch(CLEAR_MESSAGES());
  }

  return { importUsers, clearImportMessages };
}

export default connect(mapStateToProps, mapDispatchToProps)(Import);
