const holidays = require("./holidaysObject.js")
const specialDays = require("./special-days.js");
const { differenceInMinutes, startOfDay, format } = require("date-fns")



function monthlyExpiry(yy, mon, weekday) {

  let year  = 2000 + parseInt(yy);
  let month = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC", ].indexOf(mon);
  let day   = new Date(year, month + 1, 0).getDate(); // Last day of the month

  while(new Date(year, month, day).getDay() != weekday)
    day--;

  while (true) {
    let date = format(new Date(year, month, day), 'yyyy-MM-dd');
    if(holidays[year][month+1] != day)
      return date;
    day--;
  }
  
}


function weeklyExpiry(yy, m, dd) {

  let year = '20' + yy
  let month = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'O', 'N', 'D' ].indexOf(m);
  return format(new Date(year, month, dd), 'yyyy-MM-dd');

}

exports.info = (symbol) => {

  // FUT - Monthly Expiry (only)

  let match = symbol.match(/^(\S+?)(\d{2})([A-Z]{3})FUT$/);
  if(match) {
    let script = match[1];
    let expiry = monthlyExpiry(match[2], match[3], script == 'FINNIFTY' ? 2 : 4);
    return { script, exp: match[2] + match[3], expiry, type: "FUT" };
  }

  // OPT - Monthly Expiry

  match = symbol.match(/^(\S+?)(\d{2})([A-Z]{3})([\d\.]+)(PE|CE)$/);
  if(match) {
    let script = match[1];
    let expiry = monthlyExpiry(match[2], match[3], script == 'FINNIFTY' ? 2 : 4);
    return { script, exp: match[2] + match[3], expiry, strike: parseFloat(match[4]), type: match[5] };
  }

  // OPT - Weekly Expiry

  match = symbol.match(/^(NIFTY|BANKNIFTY|FINNIFTY)(\d{2})(\w{1})(\d{2})([\d\.]+)(PE|CE)$/);
  if(match) {
    let script = match[1];
    let expiry = weeklyExpiry(match[2], match[3], match[4]);
    return { script, exp: match[2] + match[3] + match[4], expiry, strike: parseFloat(match[5]), type: match[6] };
  }

  // MF & EQ

  return { script: symbol };

};


function istDayAndHr(date) {
  const startOfDayDate = startOfDay(new Date());
  return differenceInMinutes(date, startOfDayDate) / 60;
}

function Datestr(date) {
  return format(date, 'yyyy-MM-dd');
}


exports.isOpen = () => {

  let date = new Date();
  if (exports.isHoliday(date)) return false;

  let hrs = istDayAndHr(date);

  if(specialDays.indexOf(Datestr(date)) != -1) {
    return hrs >= 18.25 && hrs < 19.25;
  }
  return hrs >= 9 && hrs < 15.5;

};

exports.hasOpened = () => {

  let date = new Date();
  if (exports.isHoliday(date)) return false;

  let hrs = istDayAndHr(date);

  if(specialDays.indexOf(Datestr(date)) != -1) return hrs >= 18.25

  return hrs >= 9;

};

exports.hasClosed = () => {

  let date = new Date();
  if (exports.isHoliday(date)) return false;

  let hrs = istDayAndHr(date);

  if(specialDays.indexOf(Datestr(date)) != -1) return hrs >= 19.25;
  
  return hrs >= 15.5;

};

exports.isHoliday = (date = new Date()) => {

  let datestr = Datestr(date);
  const [ yy, mm, dd ] = datestr.split('-');
  let year = parseInt(yy)
  let month = parseInt(mm)
  let din = parseInt(dd)
  let day = date.getDay()

  if (day >= 1 && day <= 5) return holidays[year][month] == din

  else return specialDays.indexOf(datestr) == -1

};
