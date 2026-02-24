import fs from "fs";

import holidays from "../config/holidays.js";
import specialDays from "../config/special-days.js";

let minified = {};

for (let dateArr of holidays) {
  for (let date of dateArr) {
    let [year, month, day] = date.split("-");
    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);

    minified[year] = minified[year] || {};
    minified[year][month] = minified[year][month] || [];

    minified[year][month].push(day);
  }
}

fs.writeFileSync("src/build/holidays.json", JSON.stringify(minified));

minified = {};

for (let date of specialDays) {
  let [year, month, day] = date.split("-");
  year = parseInt(year);
  month = parseInt(month);
  day = parseInt(day);

  minified[year] = minified[year] || {};
  minified[year][month] = minified[year][month] || [];

  minified[year][month].push(day);
}

fs.writeFileSync("src/build/special-days.json", JSON.stringify(minified));
