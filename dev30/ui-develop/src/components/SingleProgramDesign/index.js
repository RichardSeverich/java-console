// import Title from 'components/WrappedMaterialComponents/Title';
import React from 'react';
import PropTypes from 'prop-types';
import ProgramButtonList from 'app/components/ProgramButtonList';
import NotFound from 'app/components/NotFound';
import ImportForm from 'app/components/ImportForm';
import ProgramDetails from 'app/components/ProgramDetails';
import styles from './style.module.css';
/**
 * ProgramProgress displays the program progress UI component including the Program.
 * @param {object} selectedProgram is a selected program.
 * @param {number} selectedProgram.id numeric identifier of the program
 * @param {string} selectedProgram.name the string name of the program
 * @param {array} programs is a list of programs.
 * @param {string} pathWhitoutId the string is the current address without the ID.
 * @param {function} updateProgram function  that update the details of a program
 * @param {function} setPogramToEdit function  that set the details of a program
 */
function SingleProgramDesign({
  selectedProgram,
  programs,
  pathWhitoutId,
  id,
  typeFile,
  handleImport,
  resultSaved,
  resultRejected,
  errorMessage,
  updateProgram,
  setProgramToEdit,
}) {
  if (!selectedProgram.name) {
    return <NotFound />;
  }

  return (
    selectedProgram.name && (
      <div className={styles.container}>
        <ProgramButtonList
          programs={programs}
          path={pathWhitoutId}
          selectedProgram={selectedProgram}
        />
        <div>
          <ProgramDetails
            programId={selectedProgram.id}
            name={selectedProgram.name}
            description={selectedProgram.description}
            startDate={selectedProgram.startDate}
            endDate={selectedProgram.endDate}
            updateProgram={updateProgram}
            setProgramToEdit={setProgramToEdit}
          />
          <ImportForm
            id={id}
            typeFile={typeFile}
            handleImport={handleImport}
            resultSaved={resultSaved}
            resultRejected={resultRejected}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    )
  );
}

SingleProgramDesign.propTypes = {
  selectedProgram: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      programOrder: PropTypes.number,
      programType: PropTypes.string,
      description: PropTypes.string,
      createdAt: PropTypes.string,
    })
  ),
  pathWhitoutId: PropTypes.string,
};

SingleProgramDesign.defaultProps = {
  selectedProgram: {},
  programs: [],
  pathWhitoutId: '',
};

export default SingleProgramDesign;
