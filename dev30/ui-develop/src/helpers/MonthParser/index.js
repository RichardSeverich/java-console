/**
 * Function that returns the name of the month given the
 * number of the month
 * @param {Number} monthNumber the number of the month
 * @return {String} the name of the month
 */
export default function getLiteralMonth(monthNumber) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months[monthNumber];
}
