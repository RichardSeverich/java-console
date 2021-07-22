import React from 'react';
import ProgramButtonList from 'app/components/ProgramButtonList';
import ImportForm from 'app/components/ImportForm';
import PropTypes from 'prop-types';
import styles from './style.module.css';

/**
 *
 * @param {array} programs contains the list of programs.
 * @param {string} path the string is the current address without the ID.
 * @param {id} id specific id for Import form component
 * @param {string} typeFile type of file to be import
 * @param {function} handleImport function that consumes the import service
 * @param {string} resultSaved object that represents result of de successful import
 * @param {string} resultRejected object that represents result of de successful import
 * @param {string} errorMessage Message of the error to be show
 */
function ProgramsDesign({
  programs,
  path,
  id,
  typeFile,
  handleImport,
  resultSaved,
  resultRejected,
  errorMessage,
}) {
  return (
    <div className={styles.container}>
      <ProgramButtonList programs={programs} path={path} />
      <ImportForm
        id={id}
        typeFile={typeFile}
        handleImport={handleImport}
        resultSaved={resultSaved}
        resultRejected={resultRejected}
        errorMessage={errorMessage}
      />
    </div>
  );
}

ProgramsDesign.propTypes = {
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      programOrder: PropTypes.number,
      programType: PropTypes.string,
    })
  ),
  path: PropTypes.string,
  id: PropTypes.string,
  handleImport: PropTypes.func,
  resultSaved: PropTypes.string,
  resultRejected: PropTypes.string,
  typeFile: PropTypes.string,
  errorMessage: PropTypes.string,
};

ProgramsDesign.defaultProps = {
  programs: [],
  path: '',
  id: '',
  handleImport: () => {},
  resultSaved: '',
  resultRejected: '',
  typeFile: '',
  errorMessage: '',
};

export default ProgramsDesign;
