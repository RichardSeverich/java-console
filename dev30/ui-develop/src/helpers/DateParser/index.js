import moment from 'moment';
/**
 * Function that returns a new Date given the format yyyy-MM-dd
 * @param {String} date current format of date
 * @return {Date} a new date based on the format date passed if
 * date exists, otherwise returns null
 */
function getDate(date) {
  if (date) {
    const [year, month, day] = date.split('-');
    return new Date(year, month - 1, day);
  }

  return null;
}

/**
 * Function that returns the current Date in format YYYY-MM-DD
 * @return {Date} a new date based on the format date passed
 */
function getCurrentDate() {
  const today = new Date().toISOString().slice(0, 10);
  return today;
}

/**
 * Function that returns a new Date whit the format MMM-dd
 * @param {String} date current format of date
 * @return {Date} a new date based on the format date passed
 */
function getMonthAndDay(date) {
  const monthAndDay = moment(date).format('MMM DD');
  return monthAndDay;
}

export default {
  getDate,
  getCurrentDate,
  getMonthAndDay,
};
