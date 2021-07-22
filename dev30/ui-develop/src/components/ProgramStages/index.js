import React, { useState, useEffect } from 'react';
import Button from 'app/components/WrappedMaterialComponents/Buttons/DefaultButton';
import PropTypes from 'prop-types';
import dateFormat from 'helpers/dateFormat';
import Title from 'components/WrappedMaterialComponents/Title';
import Message from 'components/Message';
import DefaultAlert from 'components/WrappedMaterialComponents/Alert/DefaultAlert';
import InputText from 'components/WrappedMaterialComponents/Textfields/InputText';
import InputDate from 'components/WrappedMaterialComponents/Textfields/InputDate';
import { increaseDay } from 'helpers/DateCalculate';
import { ONLY_LETTERS } from 'app/constant/RegexPatterns';
import style from './style.module.css';

/**
 * Displays the ProgramStages view of the application
 * @param {object} selectedProgram is a selected program
 * * @param {number} selectedProgram.id numeric identifier of the program
 * * @param {string} selectedProgram.name the string name of the program
 * * @param {string} selectedProgram.startDate the start date of the program
 * * @param {string} selectedProgram.endDate the end date of the program
 * @param {Stage[]} programStages is a list of stages of a program
 * * @param {number} Stage.id is a identifier of a stage
 * * @param {number} Stage.order is the order of a stage
 * * @param {string} Stage.name is the name of a stage
 * * @param {string} Stage.startDate is the start date of a stage
 * @param {function} updateStages function that update the stages of a program
 * @param {Object} updateStagesError contains the message and code of updateStagesErrorMessage
 * * @param {number} updateStagesError.code is the number of the updateStagesErrorMessage
 * * @param {string} updateStagesError.message is a descriptive message of the updateStagesErrorMessage
 * @param {function} updateStage function that update a stages of the store
 */
function ProgramStages({
  selectedProgram,
  programStages,
  updateStages,
  updateStagesError,
  updateStage,
}) {
  const size = 'h4';
  const datesSize = 'subtitle2';
  const headers = ['Order', 'Stage name', 'Date'];
  const formRef = React.createRef();
  const [isValidForm, setIsValidForm] = useState(true);
  const [editedStages, setEditedStages] = useState([]);
  const hasElements = Boolean(programStages.length);
  const hasStartAndEndDate = Boolean(
    selectedProgram.startDate,
    selectedProgram.endDate
  );

  useEffect(() => {
    setEditedStages([]);
  }, [setEditedStages, selectedProgram]);

  function handleOnClick() {
    updateStages({ stages: editedStages, programId: selectedProgram.id });
    setEditedStages([]);
  }

  function updateStageData(editedStage) {
    updateStage(editedStage);
    const searchedStage = editedStages.find(
      (stage) => stage.id === editedStage.id
    );
    if (searchedStage) {
      const result = editedStages.map((stage) => {
        if (editedStage.id === stage.id) {
          return editedStage;
        }
        return stage;
      });
      setEditedStages([...result]);
    } else {
      setEditedStages([...editedStages, editedStage]);
    }
  }

  function handleNameOnChange(stage, name) {
    updateStageData({ ...stage, name });
  }

  function handleDateOnChange(stage, startDate) {
    updateStageData({ ...stage, startDate });
  }

  function checkForm() {
    setIsValidForm(!formRef.current.checkValidity());
  }

  function getMinDateFromStage({ id, order }) {
    const [firstStage] = programStages;
    if (firstStage.id === id) {
      return selectedProgram.startDate;
    }
    const previousStage = programStages.find(
      (stage) => stage.order === order - 1
    );
    return increaseDay(previousStage.startDate, 1, 'days');
  }

  function getMaxDateFromStage({ id, order }) {
    const lastStage = programStages[programStages.length - 1];
    const nextStage = programStages.find((stage) => stage.order === order + 1);
    if (lastStage.id === id || !nextStage.startDate) {
      return selectedProgram.endDate;
    }
    return nextStage.startDate;
  }

  return (
    <div>
      <div className={style.programTitle}>
        <Title variant={size} label={selectedProgram.name} />
        {hasStartAndEndDate && (
          <div className={style.programDatesTitle}>
            <Title
              variant={datesSize}
              label={dateFormat.getStartAndEndLiteralDate(
                selectedProgram.startDate,
                selectedProgram.endDate
              )}
            />
          </div>
        )}
      </div>
      {hasStartAndEndDate ? (
        hasElements ? (
          <form ref={formRef} onChange={checkForm}>
            <table>
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={`key-header-${header}`}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {programStages.map((stage) => {
                  return (
                    <tr key={`key-row-${stage.id}`}>
                      <th className={style.order}>{stage.order}</th>
                      <th className={style.stageInputCell}>
                        <InputText
                          id="name"
                          value={stage.name}
                          pattern={ONLY_LETTERS}
                          onChange={(value) => handleNameOnChange(stage, value)}
                          className={style.stageInput}
                          required
                        />
                      </th>
                      <th>
                        <InputDate
                          id="date"
                          value={stage.startDate}
                          min={getMinDateFromStage(stage)}
                          max={getMaxDateFromStage(stage)}
                          onChange={(value) => handleDateOnChange(stage, value)}
                          disabled={getMinDateFromStage(stage) === null}
                        />
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {updateStagesError.message && (
              <DefaultAlert
                severity="error"
                message={updateStagesError.message}
              />
            )}
            <Button
              disabled={isValidForm || Boolean(editedStages.length === 0)}
              onClick={handleOnClick}
              label="Save changes"
            />
          </form>
        ) : (
          <Message text="Not contain Stages" />
        )
      ) : (
        <Message text="No program start date defined" />
      )}
    </div>
  );
}

ProgramStages.propTypes = {
  programStages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      order: PropTypes.number,
      startDate: PropTypes.string,
    })
  ),
  selectedProgram: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
  updateStages: PropTypes.func,
  updateStagesError: PropTypes.shape({
    code: PropTypes.number,
    message: PropTypes.string,
  }),
};

ProgramStages.defaultProps = {
  programStages: [],
  selectedProgram: {},
  updateStages: () => {},
  updateStagesError: {},
};

export default ProgramStages;
