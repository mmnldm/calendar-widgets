/**
 * Calculates the number of days in a given month and year.
 *
 * @param {number} year - The year for which to calculate the number of days (e.g. 2023).
 * @param {number} month - The month for which to calculate the number of days (1-12).
 * @returns {number} The number of days in the specified month and year.
 */
const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

/**
 * Determines whether a given year is a valid year between 1900 and 2100.
 *
 * @param {number} year - The year to validate (e.g. 2023).
 * @returns {boolean} True if the year is valid, false otherwise.
 */
const isValidYear = (year) => {
  const date = new Date(year, 1, 1);
  const y = date.getFullYear();
  if (isNaN(y) || y.length !== 4) {
    return false;
  }
  return true;
};

/**
 * Formats a date in a locale-specific format.
 *
 * @param {number} month - The month of the date (1-12).
 * @param {number} day - The day of the date (1-31).
 * @param {number} year - The year of the date (e.g. 2023).
 * @param {string} [locale] - The locale to use when formatting the date. Defaults to the user's locale.
 * @returns {string} A formatted date string in a locale-specific format.
 */
const formatDate = (month, day, year, locale = undefined) => {
  const date = new Date(year, month - 1, day); // Month index starts from 0
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString(locale, options);
};

/**
 * Generates an array of formatted date strings representing each day in a given month and year.
 *
 * @param {number} month - The month for which to generate the list of days (1-12).
 * @param {number} year - The year for which to generate the list of days (e.g. 2023).
 * @returns {Array} An array of formatted date strings representing each day in the specified month and year.
 */
const listDaysInMonth = (month, year) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  let dates = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDate = formatDate(month, day, year);
    dates.push(formattedDate);
  }

  return dates;
};

const months$2 = [
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
  'December'
];

const months$1 = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre'
];

const locale = {
  en: {
    months: months$2
  },
  es: {
    months: months$1
  }
};

/**
 * Generates an object representing a calendar year with the number of days and a list of days for each month.
 *
 * @param {number} year - The year for which to generate the calendar (e.g. 2023).
 * @returns {object} An object representing a calendar year with the number of days and a list of days for each month.
 * @throws {object} An error object with a message if the year is not a valid year between 1900 and 2100.
 */
const getCalendarYear = (year) => {  
  if (isValidYear(year)) {
    return {
      error: {
        body: 'The argument passed to `calendar(\'YYYY\')` must be a valid year between 1900 and 2100. You passed ' + year + '.',
      },
    };
  }

  return months.reduceRight((collector, current) => ({
    [current.toLowerCase()]: {
      count: getDaysInMonth(year, months.indexOf(current) + 1),
      collection: listDaysInMonth(year, months.indexOf(current) + 1)
    },
    ...collector
  }), {});
};

export { formatDate, getCalendarYear, getDaysInMonth, isValidYear, listDaysInMonth, locale };
