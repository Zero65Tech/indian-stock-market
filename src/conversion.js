const holidays = require("./holidays.js");
const { format, parse } = require('date-fns');
const fs       = require("fs");

const dateObject = {};

holidays.forEach((datearray) => {
  datearray.forEach((datestr) => {
    const date = parse(datestr, 'yyyy-MM-dd', new Date());
    const year = format(date, 'yyyy');
    const month = format(date, 'M');
    const day = format(date, 'd');

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
