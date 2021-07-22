import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImportForm from 'app/components/ImportForm';
import teamsActions from 'app/actions/Teams';
import { JSON_TYPE } from 'app/constant/FileType';
import getFormDataFromId from 'app/helpers/ImportFile';
import useCleanUp from 'app/hooks/CleanUp';

/**
 * Displays the import form view for teams
 * @param  {} importTeams function that create the file to teams
 * @param  {} clearImportMessages function that clears the error and import messages
 * @param  {} resultSaved number that represent the number of records accepted
 * @param  {} resuldFailed number that represent the number of records rejected
 * @param  {} errorImport object that represent the import error
 */

function ImportTeamsView({
  importTeams,
  clearImportMessages,
  resultSaved,
  resultFailed,
  errorImport,
}) {
  const ID = 'uploadTeams';

  function handleImport() {
    const data = getFormDataFromId(ID);
    if (data) {
      importTeams(data);
    }
  }

  useCleanUp(clearImportMessages);

  return (
    <>
      <ImportForm
        id={ID}
        typeFile={JSON_TYPE}
        handleImport={handleImport}
        resultSaved={resultSaved}
        resultRejected={resultFailed}
        errorMessage={errorImport.message}
      />
    </>
  );
}

ImportTeamsView.propTypes = {
  importTeams: PropTypes.func,
  clearImportMessages: PropTypes.func,
  resultSaved: PropTypes.string,
  resultFailed: PropTypes.string,
  errorImport: PropTypes.shape({}),
};

ImportTeamsView.defaultProps = {
  importTeams: () => {},
  clearImportMessages: () => {},
  resultSaved: '',
  resultFailed: '',
  errorImport: {},
};

function mapStateToProps(state) {
  const resultSaved = state.teams.importResult.saved.toString();
  const resultFailed = state.teams.importResult.failed.toString();
  const errorImport = state.teams.errors.import;
  return { resultSaved, resultFailed, errorImport };
}

function mapDispatchToProps(dispatch) {
  function importTeams(file) {
    dispatch(teamsActions.IMPORT_TEAMS(file));
  }

  function clearImportMessages() {
    dispatch(teamsActions.CLEAR_MESSAGES());
  }

  return { importTeams, clearImportMessages };
}
export default connect(mapStateToProps, mapDispatchToProps)(ImportTeamsView);
