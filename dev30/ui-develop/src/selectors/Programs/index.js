import { createSelector } from 'reselect';

const programsSelector = (state) => state.program.programs;
/**
 * Function that returns the first of list programs
 * object of the program store
 */
export const getFirstProgram = createSelector(programsSelector, (programs) => {
  if (!programs.length) {
    return 0;
  }
  return programs[0].id;
});
