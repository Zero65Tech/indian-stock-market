import fs from "fs";

import holidays from "../config/holidays.js";
import specialDays from "../config/special-days.js";

function minify(dates) {
  let minified = {};
  for (let date of dates) {
    let [year, month, day] = date.split("-");
    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);

    minified[year] = minified[year] || {};
    minified[year][month] = minified[year][month] || [];

    minified[year][month].push(day);
  }
  return minified;
}

fs.writeFileSync("src/build/holidays.json", JSON.stringify(minify(holidays)));
fs.writeFileSync("src/build/special-days.json", JSON.stringify(minify(specialDays)));
