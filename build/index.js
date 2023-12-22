const fs = require("fs");

const holidays = require("../src/holidays.js");
const minified = {};

for(let dateArr of holidays) {
  for(let date of dateArr) {

    let [ year, month, day ] = date.split('-');
    year  = parseInt(year);
    month = parseInt(month);
    day   = parseInt(day);

    minified[year] = minified[year] || {};
    minified[year][month] = minified[year][month] || [];

    minified[year][month].push(day);

  }
}

fs.writeFileSync('src/holidays.json', JSON.stringify(minified));
