import getLiteralMonth from 'helpers/MonthParser';
import DateParser from 'helpers/DateParser';

/**
 * Function that returns a date in literal way 'May 2020'
 * @param {Date} date is a date with the format 'YYYY-MM-DD'
 */
function getLiteralMonthAndYear(date) {
  if (date) {
    return `${getLiteralMonth(date.getUTCMonth())} ${date.getUTCFullYear()}`;
  }
  return date;
}

/**
 * Function that returns a format '{YYYY-MM-DD} - {YYYY-MM-DD}'
 * if the end date is
 * @param {string} startDate
 * @param {string} endDate
 */
function getStartAndEndLiteralDate(startDate, endDate) {
  return `${getLiteralMonthAndYear(DateParser.getDate(startDate))}${
    endDate ? ` - ${getLiteralMonthAndYear(DateParser.getDate(endDate))}` : ''
  }`;
}

export default {
  getLiteralMonthAndYear,
  getStartAndEndLiteralDate,
};
