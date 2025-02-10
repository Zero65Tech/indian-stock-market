const holidays    = require("./holidays.json");
const specialDays = require("./special-days.json");
const specialday  = new Date("2025-10-21").getTime() / 1000 / 60 / 60 / 24; // GMT



exports.eq = (name) => {
  const match = name.match(/^(.*?)-([A-Z]{1,2})$/);
  return match
      ? { symbol: match[1], series: match[2] }
      : { symbol: name, series: null };
}



function monthlyExpiry(yy, mon, weekday) {

  const yyyy = 2000 + parseInt(yy);
  const mm = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC", ].indexOf(mon);
  let dd = new Date(yyyy, mm + 1, 0).getDate(); // Last day of the month

  while(new Date(yyyy, mm, dd).getDay() != weekday)
    dd--;

  for(; dd >= 1; dd--) {
    const date = `${ yyyy }-${ String(mm + 1).padStart(2, '0') }-${ String(dd).padStart(2, '0') }`;
    if(holidays[yyyy] === undefined || holidays[yyyy][mm + 1] === undefined || !holidays[yyyy][mm + 1].includes(dd))
      return date;
  }

}

function weeklyExpiry(yy, m, dd) {
  const year = '20' + yy;
  const mm = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'O', 'N', 'D' ].indexOf(m);
  return `${ year }-${ String(mm + 1).padStart(2, "0") }-${ dd }`;
}

exports.info = (symbol) => {

  console.warn('.info() is deprecated. Use .fo() instead.');

  // FUT - Monthly Expiry (only)

  let match = symbol.match(/^(\S+?)(\d{2})([A-Z]{3})FUT$/);
  if(match) {
    let script = match[1];
    let expiry = monthlyExpiry(match[2], match[3], script == 'FINNIFTY' ? 2 : 4);
    return { script, exp: match[2] + match[3], expiry, type: "FUT" };
  }

  // OPT - Monthly Expiry

  match = symbol.match(/^(\S+?)(\d{2})([A-Z]{3})([\d.]+)(PE|CE)$/);
  if(match) {
    let script = match[1];
    let expiry = monthlyExpiry(match[2], match[3], script == 'FINNIFTY' ? 2 : 4);
    return { script, exp: match[2] + match[3], expiry, strike: parseFloat(match[4]), type: match[5] };
  }

  // OPT - Weekly Expiry

  match = symbol.match(/^(NIFTY|BANKNIFTY|FINNIFTY)(\d{2})(\w{1})(\d{2})([\d.]+)(PE|CE)$/);
  if(match) {
    let script = match[1];
    let expiry = weeklyExpiry(match[2], match[3], match[4]);
    return { script, exp: match[2] + match[3] + match[4], expiry, strike: parseFloat(match[5]), type: match[6] };
  }

  // MF & EQ

  return { script: symbol };

};

exports.fo = (name) => {

  // FUT - Monthly Expiry (only)

  let match = name.match(/^(\S+?)(\d{2})([A-Z]{3})FUT$/);
  if(match) {
    let symbol = match[1];
    let expiry = monthlyExpiry(match[2], match[3], symbol == 'FINNIFTY' ? 2 : 4);
    return { symbol, exp: match[2] + match[3], expiry, type: "FUT" };
  }

  // OPT - Monthly Expiry

  match = name.match(/^(\S+?)(\d{2})([A-Z]{3})([\d.]+)(PE|CE)$/);
  if(match) {
    let symbol = match[1];
    let expiry = monthlyExpiry(match[2], match[3], symbol == 'FINNIFTY' ? 2 : 4);
    return { symbol, exp: match[2] + match[3], expiry, strike: parseFloat(match[4]), type: match[5] };
  }

  // OPT - Weekly Expiry

  match = name.match(/^(NIFTY|BANKNIFTY|FINNIFTY)(\d{2})(\w{1})(\d{2})([\d.]+)(PE|CE)$/);
  if(match) {
    let symbol = match[1];
    let expiry = weeklyExpiry(match[2], match[3], match[4]);
    return { symbol, exp: match[2] + match[3] + match[4], expiry, strike: parseFloat(match[5]), type: match[6] };
  }

  return null;

};



function istDayAndHr(date) {
  let hrs = date.getTime() / 1000 / 60 / 60 + 5.5;
  return [ Math.floor(hrs / 24), hrs % 24 ];
}

exports.isOpen = () => {

  let date = new Date();
  if(exports.isHoliday(date))
    return false;

  let [day, hrs] = istDayAndHr(date);
  if(day == specialday)
    return hrs >= 18 && hrs < 19.25;
  else
    return hrs >= 9 && hrs < 15.5;

};

exports.hasOpened = () => {

  let date = new Date();
  if(exports.isHoliday(date))
    return false;

  let [day, hrs] = istDayAndHr(date);
  if(day == specialday)
    return hrs >= 18;
  else
    return hrs >= 9;

};

exports.hasClosed = () => {

  let date = new Date();
  if(exports.isHoliday(date))
    return false;

  let [day, hrs] = istDayAndHr(date);
  if(day === specialday)
    return hrs >= 19.25;
  else
    return hrs >= 15.5;

};



exports.isHoliday = (date = new Date()) => {

  if(typeof date == "object")
    date = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
  else if(typeof date == "string")
    date = new Date(date); // GMT

  let yyyy = date.getUTCFullYear();
  let mm   = date.getUTCMonth() + 1;
  let dd   = date.getUTCDate();

  if(specialDays[yyyy] !== undefined
      && specialDays[yyyy][mm] !== undefined
      && specialDays[yyyy][mm].includes(dd))
    return false;

  if(date.getUTCDay() < 1 || date.getUTCDay() > 5)
    return true;

  return holidays[yyyy] !== undefined
      && holidays[yyyy][mm] !== undefined
      && holidays[yyyy][mm].includes(dd);

};
