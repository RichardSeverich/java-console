import React, { useState, useEffect } from 'react';
import InputDate from 'app/components/WrappedMaterialComponents/Textfields/InputDate';
import DefaultCheckbox from 'app/components/WrappedMaterialComponents/Checkboxes/DefaultCheckbox';
import EditTextFile from 'app/components/WrappedMaterialComponents/Textfields/EditTextArea';
import Button from 'app/components/WrappedMaterialComponents/Buttons/DefaultButton';
import { increaseDay, decreaseDay } from 'app/helpers/DateCalculate';
import PropTypes from 'prop-types';
import style from './style.module.css';
/**
 * Displays the programDetails view of the application
 * @param  {number} programId numeric identifier of the program
 * @param  {string} name the string name of the program
 * @param  {string} description the string description of the program
 * @param  {string} startDate startDate is the start date of a program
 * @param  {string} endDate endDate is the end date of a program
 * @param  {function} updateProgram function that update the details of a program
 * @param  {function} setPogramToEdit function  that set the details of a program
 */
function ProgramDetails({
  programId,
  name,
  description,
  startDate,
  endDate,
  updateProgram,
  setProgramToEdit,
}) {
  const [editedProgram, setEditedProgram] = useState({});
  const [valueSelected, setValueSelected] = useState([]);

  const isButtonValid = (valueSelected) => {
    return Boolean(valueSelected.length);
  };
  const rowDescription = 5;
  function valueDate(date) {
    return date || '';
  }
  const handleChangeValue = (e) => {
    if (valueSelected.includes(e)) {
      const changes = valueSelected.filter((value) => value !== e);
      return setValueSelected(changes);
    }
    const changes = valueSelected.concat(e);
    return setValueSelected(changes);
  };

  const changeValue = (value) => {
    if (startDate) {
      handleChangeValue(value);
    }
  };

  function clearValues() {
    setEditedProgram({});
    setValueSelected([]);
  }

  function editProgramTemporally(key, value) {
    const currentProperty = { key: '', id: '' };
    currentProperty[key] = value;
    currentProperty['id'] = programId;
    setEditedProgram({ ...editedProgram, ...currentProperty });
    setProgramToEdit(currentProperty);
  }

  function handleStartDateOnChange(value) {
    editProgramTemporally('startDate', value);
    handleChangeValue(value);
  }

  function handleEndDateOnChange(value) {
    editProgramTemporally('endDate', value);
    changeValue(value);
  }

  function handleDescriptionOnChange(value) {
    editProgramTemporally('description', value);
    changeValue(value);
  }

  function handleOnClickSaveChanges() {
    updateProgram(editedProgram);
    clearValues();
  }

  function getMaxDate() {
    const previousDate = startDate;
    return increaseDay(previousDate, 1, 'days');
  }

  function getMinDate() {
    const nextDate = endDate;
    return decreaseDay(nextDate, 1, 'days');
  }

  useEffect(() => {
    return () => {
      clearValues();
    };
  }, [programId]);

  return (
    <div className={style.container}>
      <form noValidate autoComplete="off">
        <h3>{name}</h3>
        <div className={style.dates}>
          <div className={style.date}>
            <h5>Start Date</h5>
            <InputDate
              value={valueDate(startDate)}
              onChange={(value) => handleStartDateOnChange(value)}
              max={getMinDate(endDate)}
            />
          </div>
          <div className={style.date}>
            <h5>End Date</h5>
            <InputDate
              value={valueDate(endDate)}
              onChange={(value) => handleEndDateOnChange(value)}
              min={getMaxDate(startDate)}
            />
          </div>
        </div>
        <div className={style.checkbox}>
          <DefaultCheckbox
            label="Start automatically"
            disabled={false}
            checked
          />
        </div>
        <div className={style.editText}>
          <EditTextFile
            programDescription={description}
            label="Description"
            className={style.editTextFile}
            rows={rowDescription}
            onChange={(value) => handleDescriptionOnChange(value)}
          />
        </div>
        <div className={style.button}>
          <Button
            className={style.buttonSave}
            label="Save changes"
            onClick={handleOnClickSaveChanges}
            disabled={!isButtonValid(valueSelected)}
          />
        </div>
      </form>
    </div>
  );
}

ProgramDetails.propTypes = {
  programId: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  updateProgram: PropTypes.func,
  setProgramToEdit: PropTypes.func,
};

ProgramDetails.defaultProps = {
  programId: '',
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  updateProgram: () => {},
  setProgramToEdit: () => {},
};

export default ProgramDetails;
