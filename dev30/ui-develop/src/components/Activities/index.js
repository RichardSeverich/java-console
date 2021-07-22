import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DefaultCheckbox from 'app/components/WrappedMaterialComponents/Checkboxes/DefaultCheckbox';
import CustomTable from '../Table/index';
import style from './style.module.css';
/**
 * Activities display the component with a list of activities
 * @param  {array} activitiesList array of activities, each element will its properties
 * @param  {object} countActivities object that represent count to type status activities
 * * @param {number} countActivities.active is a number count active
 * * @param {number} countActivities.done is a number count done
 * * @param {number} countActivities.pending is a number count pending
 * @param  {object} checkStatus change the status check in true or false
 * * @param {boolean} checkStatus.active is a boolean check active
 * * @param {boolean} checkStatus.done is a boolean check done
 * * @param {boolean} checkStatus.pending is a boolean check pending
 * @param  {function} onChangeStatus it is function that change state checkStatus
 */
function Activities({
  activitiesList,
  countActivities,
  checkStatus,
  onChangeStatus,
}) {
  const header = [
    { name: 'Name', render: (item) => item.name },
    { name: 'Location', render: (item) => item.location },
    {
      name: 'Date',
      render: (item) => moment(item.date).format('DD/MM/YYYY, hh:mm'),
    },
    { name: 'Type', render: (item) => item.type },
    { name: 'Status', render: (item) => item.status },
  ];
  return (
    <div>
      <div className={style.header}>
        <h3 className={style.title}>Activities</h3>
        <div>
          <DefaultCheckbox
            label={`Active (${countActivities.active})`}
            checked={checkStatus.active}
            onChange={() => onChangeStatus('active', checkStatus.active)}
            value={checkStatus.active}
            disabled={Boolean(!countActivities.active)}
          />
          <DefaultCheckbox
            label={`Pending (${countActivities.pending})`}
            checked={checkStatus.pending}
            onChange={() => onChangeStatus('pending', checkStatus.pending)}
            disabled={Boolean(!countActivities.pending)}
          />
          <DefaultCheckbox
            label={`Done (${countActivities.done})`}
            checked={checkStatus.done}
            onChange={() => onChangeStatus('done', checkStatus.done)}
            disabled={Boolean(!countActivities.done)}
          />
        </div>
      </div>
      <div className={`${style.innerContainer}  scrollbar`}>
        <CustomTable headers={header} data={activitiesList} />
      </div>
    </div>
  );
}
Activities.propTypes = {
  activitiesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      location: PropTypes.string,
      date: PropTypes.string,
      type: PropTypes.string,
      status: PropTypes.string,
    })
  ),
  countActivities: PropTypes.shape({
    done: PropTypes.number,
    pending: PropTypes.number,
    active: PropTypes.number,
  }),
  checkStatus: PropTypes.shape({
    done: PropTypes.bool,
    pending: PropTypes.bool,
    active: PropTypes.bool,
  }),
  onChangeStatus: PropTypes.func,
};
Activities.propDefault = {
  activitiesList: [],
  countActivities: {
    done: 0,
    pending: 0,
    active: 0,
  },
  checkStatus: {
    done: true,
    pending: true,
    active: true,
  },
  onChangeStatus: () => {},
};

export default Activities;
