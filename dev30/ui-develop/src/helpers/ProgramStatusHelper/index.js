/**
 * Function that returns the status of a program evaluating
 * the start and end dates given.
 * @param {Date} startDate current start date of a program
 * @param {Date} endDate current end date of a program
 * @return {String} 'In progres' if current date is between
 * start and end dates. 'In design' if current date is lower
 * that start date. 'Done' if current date is higher than end date
 */
export default function getProgramStatus(startDate, endDate) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (currentDate >= startDate && currentDate <= endDate) {
    return 'In progress';
  }

  if (currentDate < startDate) {
    return 'In design';
  }

  return 'Done';
}
