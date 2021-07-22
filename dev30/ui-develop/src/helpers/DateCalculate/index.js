import moment from 'moment';

/**
<<<<<<< HEAD
=======
 * Function that decreases a date by a ceratain amount of units
 * @param {string} date is the date that we want to decrease
 * @param {number} amount is the amount of units to decrease
 * @param {string} decreaseUnit is the units to decrease per amount
 */
export function decreaseDay(date, amount, decreaseUnit) {
  if (date) {
    return moment(date, 'YYYY-MM-DD')
      .subtract(amount, decreaseUnit)
      .format('YYYY-MM-DD');
  }
  return date;
}

/**
>>>>>>> e01387502ff9595eecce66bcdf9d4f3e9a9cbf71
 * Function that increases a date by a ceratain amount of units
 * @param {string} date is the date that we want to increase
 * @param {number} amount is the amount of units to increase
 * @param {string} increaseUnit is the units to increase per amount
 */
export function increaseDay(date, amount, increaseUnit) {
  if (date) {
    return moment(date, 'YYYY-MM-DD')
      .add(amount, increaseUnit)
      .format('YYYY-MM-DD');
  }
  return date;
}
