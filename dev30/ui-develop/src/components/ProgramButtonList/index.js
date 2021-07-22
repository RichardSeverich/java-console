import React from 'react';
import ProgramButton from 'app/components/ProgramButton';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './style.module.css';
/**
 * Displays a button that represents a program on the left menu of the main view
 * @param  {object} program Object that represents a single program, from mappers.
 * * @param  {number} program.id single numeric indetifier of a program
 * * @param  {number} program.programOrder the numeric order of the program
 * * @param  {string} program.programType the string type name of the program
 * * @param  {string} program.description a string description of the program
 * @param  {string} path is a path from program selection.
 * @param {object} selectedProgram object that represents a selected program.
 * * @param {number} selectedProgram.id is the numeric identifier of the selected program
 * * @param {string} selectedProgram.name is the name of the selected program
 */
export default function ProgramButtonList({ programs, path, selectedProgram }) {
  const history = useHistory();
  function handleProgramRedirect(id) {
    return history.push(`${path}/${id}`);
  }

  return (
    <div className={style.sideBar}>
      {programs.map((program) => (
        <ProgramButton
          key={program.id}
          program={program}
          onClick={() => handleProgramRedirect(program.id)}
          selectedProgram={selectedProgram}
        />
      ))}
    </div>
  );
}

ProgramButtonList.propTypes = {
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      programOrder: PropTypes.number,
      programType: PropTypes.string,
      description: PropTypes.string,
    })
  ),
};
