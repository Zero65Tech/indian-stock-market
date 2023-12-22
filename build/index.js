const fs       = require("fs");
const holidays = require("../src/holidays.js");

const dateObject = {};

for(let dateArr of holidays) {
  for(let date of dateArr) {

    let [ year, month, day ] = date.split('-');
    year  = parseInt(year);
    month = parseInt(month);
    day   = parseInt(day);

    dateObject[year] = dateObject[year] || {};
    dateObject[year][month] = dateObject[year][month] || [];

    dateObject[year][month].push(day);

  }
}

const filewrite = JSON.stringify(dateObject, (key, value) => {
    if (Array.isArray(value)) return `[${value.join(', ')}]`;

    return value

    }, 2)
    .replace(/"(\d+)":/g, '$1:')
    .replace(/"/g, '')


const jsonDate = `module.exports = ${filewrite};`;
const path     = './src/holidaysObject.js';

fs.writeFileSync(path, jsonDate);
