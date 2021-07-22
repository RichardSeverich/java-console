import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImportForm from 'app/components/ImportForm';
import activitiesActions from 'actions/Activities';
import { JSON_TYPE } from 'app/constant/FileType';
import getFormDataFromId from 'helpers/ImportFile';
import useCleanUp from 'app/hooks/CleanUp';

/**
 * Displays the main import form view of the application
 * @param  {function} ImportActivities function that create the file to activities
 * @param  {} clearImportMessages function that clears the error and import messages
 * @param  {number} ResultSaved number that represent the number of records accepted
 * @param  {number} ResultFailed number that represent the number of records rejected
 * @param  {object} ErrorImport object that represent the import error
 */
function ImportActivities({
  importActivities,
  clearImportMessages,
  resultSaved,
  resultFailed,
  errorImport,
}) {
  const ID = 'uploadActivities';

  function handleImport() {
    const data = getFormDataFromId(ID);
    if (data) {
      importActivities(data);
    }
  }

  useCleanUp(clearImportMessages);

  return (
    <div>
      <ImportForm
        id={ID}
        typeFile={JSON_TYPE}
        handleImport={handleImport}
        resultSaved={resultSaved}
        resultRejected={resultFailed}
        errorMessage={errorImport.message}
      />
    </div>
  );
}

ImportActivities.propTypes = {
  importActivities: PropTypes.func,
  clearImportMessages: PropTypes.func,
  resultSaved: PropTypes.string,
  resultFailed: PropTypes.string,
  errorImport: PropTypes.shape({}),
};
ImportActivities.defaultProps = {
  importActivities: () => {},
  clearImportMessages: () => {},
  resultSaved: '',
  resultFailed: '',
  errorImport: {},
};

function mapStateToProps(state) {
  const resultSaved = state.activities.importResult.saved.toString();
  const resultFailed = state.activities.importResult.failed.toString();
  const errorImport = state.activities.errors.uploadActivities;
  return { resultSaved, resultFailed, errorImport };
}
function mapDispatchToProps(dispatch) {
  function importActivities(file) {
    dispatch(activitiesActions.UPLOAD_ACTIVITIES(file));
  }
  function clearImportMessages() {
    dispatch(activitiesActions.CLEAR_MESSAGES());
  }

  return { importActivities, clearImportMessages };
}
export default connect(mapStateToProps, mapDispatchToProps)(ImportActivities);
