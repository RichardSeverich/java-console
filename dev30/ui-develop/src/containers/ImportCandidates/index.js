import React from 'react';
import actions from 'actions/Candidates';
import ImportForm from 'app/components/ImportForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getSavedResult,
  getFailedResult,
  getImportError,
} from 'app/selectors/Candidates';
import { CSV_TYPE } from 'app/constant/FileType';
import getFormDataFromId from 'app/helpers/ImportFile';
import useCleanUp from 'app/hooks/CleanUp';

/**
 * Import Candidates Container which displays the Import Form to
 * import candidates for the application
 * @param {Function} importCandidates that importCandidates for the store
 * @param {Function} clearImportMessages that clears the import result messages of the store
 * @param {String} resultSaved that represent the number of records accepted
 * @param {String} resultFailed that represent the number of records rejected
 * @param  {String} errorImport that represent the import error
 */
function ImportCandidates({
  importCandidates,
  clearImportMessages,
  resultSaved,
  resultFailed,
  errorImport,
}) {
  const ID = 'uploadCandidates';

  function handleImport() {
    const data = getFormDataFromId(ID);
    if (data) {
      importCandidates(data);
    }
  }

  useCleanUp(clearImportMessages);

  return (
    <ImportForm
      id={ID}
      typeFile={CSV_TYPE}
      handleImport={handleImport}
      resultSaved={resultSaved}
      resultRejected={resultFailed}
      errorMessage={errorImport.message}
    />
  );
}

ImportCandidates.propTypes = {
  importCandidates: PropTypes.func,
  clearImportMessages: PropTypes.func,
  resultSaved: PropTypes.string,
  resultFailed: PropTypes.string,
  errorImport: PropTypes.shape({}),
};

ImportCandidates.defaultProps = {
  importCandidates: () => {},
  clearImportMessages: () => {},
  resultSaved: '',
  resultFailed: '',
  errorImport: {},
};

function mapStateToProps(state) {
  const resultSaved = getSavedResult(state);
  const resultFailed = getFailedResult(state);
  const errorImport = getImportError(state);
  return { resultSaved, resultFailed, errorImport };
}

function mapDispatchToProps(dispatch) {
  function importCandidates(file) {
    dispatch(actions.UPLOAD_CANDIDATES(file));
  }

  function clearImportMessages() {
    dispatch(actions.CLEAR_MESSAGES());
  }

  return { importCandidates, clearImportMessages };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportCandidates);
