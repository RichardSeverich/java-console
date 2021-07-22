import { createSelector } from 'reselect';
import { PENDING, DONE, ACTIVE } from 'app/constant/ActivitiesStatus';

const listActivities = (state) => state.activities.activities;
/**
 * Function that returns the list filter to checkStatus
 * object of the activities list store
 */
export const filterByStatus = createSelector(
  listActivities,
  (activities) => (checkStatus) => {
    if (!activities) {
      return [];
    }
    const Pending = !checkStatus.pending ? PENDING : '';
    const Done = !checkStatus.done ? DONE : '';
    const Active = !checkStatus.active ? ACTIVE : '';
    return activities.filter(
      (element) =>
        element.status !== Pending &&
        element.status !== Done &&
        element.status !== Active
    );
  }
);

/**
 * Function that returns count to status
 * object of the activities list store
 */
export const countByStatus = createSelector(
  listActivities,
  (activities) => (param) => {
    if (!activities) {
      return 0;
    }
    return activities.filter((element) => element.status === param).length;
  }
);
