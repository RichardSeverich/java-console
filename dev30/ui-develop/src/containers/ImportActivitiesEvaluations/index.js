import React from 'react';
import PropTypes from 'prop-types';
import ImportForm from 'app/components/ImportForm';
import getFormDataFromId from 'helpers/ImportFile';
import actions from 'actions/ActivitiesEvaluations';
import { CSV_TYPE } from 'app/constant/FileType';
import {
  getSavedResult,
  getFailedResult,
  getImportError,
} from 'app/selectors/ActivitiesEvaluations';
import { connect } from 'react-redux';
import useCleanUp from 'app/hooks/CleanUp';

/**
 * Import Activities Evaluations Container which displays the Import Form to
 * import activities evaluations for the application
 * @param {Function} importActivitiesEvaluations importActivitiesEvaluations for the store
 * @param {Function} clearImportMessages clears the import result messages of the store
 * @param {String} resultSaved represent the number of records accepted
 * @param {String} resultFailed represents the number of records rejected
 * @param  {String} errorImport represents the import error
 */
function ImportActivitiesEvaluations({
  importActivitiesEvaluations,
  clearImportMessages,
  resultSaved,
  resultFailed,
  errorImport,
}) {
  const ID = 'uploadActivitiesEvaluations';

  function handleImport() {
    const data = getFormDataFromId(ID);
    if (data) {
      importActivitiesEvaluations(data);
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

function mapStateToProps(state) {
  const resultSaved = getSavedResult(state);
  const resultFailed = getFailedResult(state);
  const errorImport = getImportError(state);
  return { resultSaved, resultFailed, errorImport };
}

function mapDispatchToProps(dispatch) {
  function importActivitiesEvaluations(file) {
    dispatch(actions.UPLOAD_ACTIVITIES_EVALUATIONS(file));
  }

  function clearImportMessages() {
    dispatch(actions.CLEAR_MESSAGES());
  }

  return { importActivitiesEvaluations, clearImportMessages };
}

ImportActivitiesEvaluations.propTypes = {
  importActivitiesEvaluations: PropTypes.func,
  clearImportMessages: PropTypes.func,
  resultSaved: PropTypes.string,
  resultFailed: PropTypes.string,
  errorImport: PropTypes.shape({}),
};
ImportActivitiesEvaluations.defaultProps = {
  importActivitiesEvaluations: () => {},
  clearImportMessages: () => {},
  resultSaved: '',
  resultFailed: '',
  errorImport: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportActivitiesEvaluations);
