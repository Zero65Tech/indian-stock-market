const holidays = require("./holidays.js");
const moment   = require("moment");
const fs       = require("fs");

const dateObject = {};

holidays.forEach((datearray) => {
  datearray.forEach((datestr) => {
    const date  = moment(datestr, 'YYYY-MM-DD');
    const year  = date.year();
    const month = date.month() + 1;
    const day   = date.date();

    if (!dateObject[year]) dateObject[year] = {};

    if (!dateObject[year][month]) dateObject[year][month] = [];

    dateObject[year][month].push(day);
  });
});

const filewrite = JSON.stringify(dateObject, (key, value) => {
    if (Array.isArray(value)) return `[${value.join(', ')}]`;

    return value

    }, 2)
    .replace(/"(\d+)":/g, '$1:')
    .replace(/"/g, '')


const jsonDate = `module.exports = ${filewrite};`;
const path     = './src/holidaysObject.js';

fs.writeFileSync(path, jsonDate);
