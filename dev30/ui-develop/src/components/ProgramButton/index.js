import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';
/**
 * Displays a button that represents a program on the left menu of the main view
 * @param  {object} program Object that represents a single program, from mappers.
 * * @param  {number} program.id single numeric indetifier of a program
 * * @param  {number} program.programOrder the numeric order of the program
 * * @param  {string} program.programType the string type name of the program
 * * @param  {string} program.description a string description of the program
 * @param  {function} onClick Function to be called once a program button has been clicked.
 * @param {object} selectedProgram object that represents a selected program.
 * * @param {number} selectedProgram.id is the numeric identifier of the selected program
 * * @param {string} selectedProgram.name is the name of the selected program
 */
function ProgramButton({ program, onClick, selectedProgram }) {
  const isSelected = program.id === selectedProgram.id;

  function handleClick() {
    onClick(program);
  }
  return (
    <div
      role="button"
      tabIndex={0}
      className={`${style.wrapper} ${isSelected && style.selected}`}
      onClick={handleClick}
    >
      <div className={style.name}>{program.programType}</div>
      <div className={style.number}>{program.programOrder}</div>
    </div>
  );
}

ProgramButton.propTypes = {
  program: PropTypes.shape({
    id: PropTypes.number,
    programOrder: PropTypes.number,
    programType: PropTypes.string,
    description: PropTypes.string,
  }),
  onClick: PropTypes.func,
  selectedProgram: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

ProgramButton.defaultProps = {
  program: {},
  onClick: () => {},
  selectedProgram: {},
};

export default ProgramButton;
