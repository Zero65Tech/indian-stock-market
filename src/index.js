const holidays = require("./holidays.js");
const specialDays = require("./special-days.js");
const muhuratDay = new Date("2023-11-12").getTime() / 1000 / 60 / 60 / 24; // GMT



function _monthlyExpiry(yy, mon) {

  let year = 2000 + parseInt(yy);
  let month = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC", ].indexOf(mon);
  let day = new Date(year, month + 1, 0).getDate(); // Last day of the month

  while (new Date(year, month, day).getDay() != 4) day--;

  while (true) {
    let date = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day,
    ).padStart(2, "0")}`;
    if (holidays[year - 2011].indexOf(date) == -1) return date;
    day--;
  }
  
}

function _weeklyExpiry(yy, m, dd) {

  // TODO
  
}

exports.info = (symbol) => {

  // FUT - Monthly Expiry (only)

  let match = symbol.match(/^(\S+?)(\d{2})(\w{3})FUT$/);
  if(match) {

    let script = match[1];
    let expiry = _monthlyExpiry(match[2], match[3]);

    return { script, exp: match[2] + match[3], expiry, type: "FUT" };

  }


  // OPT - Monthly Expiry (only)

  match = symbol.match(/^(\S+?)(\d{2})(\w{3})([\d\.]+)(PE|CE)$/);
  if(match) {

    let script = match[1];
    let expiry = _monthlyExpiry(match[2], match[3]);

    return { script, exp: match[2] + match[3], expiry, strike: parseFloat(match[4]), type: match[5] };

  }


  // OPT - Weekly Expiry (only)

  match = symbol.match(/^(NIFTY|BANKNIFTY|FINNIFTY)(\d{2})(\w{1})(\d{2})([\d\.]+)(PE|CE)$/);
  if(match) {

    let script = match[1];
    let expiry = _weeklyExpiry(match[2], match[3], match[4]);

    return { script, exp: match[2] + match[3] + match[4], expiry, strike: parseFloat(match[5]), type: match[6] };

  }


  // MF & EQ

  return { script: symbol };

};



function istDayAndHr(date) {
  let hrs = date.getTime() / 1000 / 60 / 60 + 5.5;
  return [Math.floor(hrs / 24), hrs % 24];
}

exports.isOpen = () => {
  let date = new Date();
  if (exports.isHoliday(date)) return false;

  let [day, hrs] = istDayAndHr(date);
  if (day == muhuratDay) return hrs >= 18.25 && hrs < 19.25;
  else return hrs >= 9 && hrs < 15.5;
};

exports.hasOpened = () => {
  let date = new Date();
  if (exports.isHoliday(date)) return false;

  let [day, hrs] = istDayAndHr(date);
  if (day == muhuratDay) return hrs >= 18.25;
  else return hrs >= 9;
};

exports.hasClosed = () => {
  let date = new Date();
  if (exports.isHoliday(date)) return false;

  let [day, hrs] = istDayAndHr(date);
  if (day == muhuratDay) return hrs >= 19.25;
  else return hrs >= 15.5;
};

exports.isHoliday = (date = new Date()) => {
  let dateStr = date;

  if (typeof date == "object") {
    date = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
    dateStr =
      date.getUTCFullYear() +
      ((date.getUTCMonth() < 9 ? "-0" : "-") + (date.getUTCMonth() + 1)) +
      ((date.getUTCDate() < 10 ? "-0" : "-") + date.getUTCDate());
  } else if (typeof date == "string") {
    date = new Date(date); // GMT
  }

  if (date.getUTCDay() >= 1 && date.getUTCDay() <= 5)
    return holidays[date.getUTCFullYear() - 2011].indexOf(dateStr) != -1;
  else return specialDays.indexOf(dateStr) == -1;
};
