const holidays    = require("./holidays.json");
const specialDays = require("./special-days.json");
const specialday  = new Date("2025-10-21").getTime() / 1000 / 60 / 60 / 24; // GMT



exports.eq = (name) => {
  const match = name.match(/^(.*?)-([A-Z]{1,2})$/);
  return match
    ? { symbol: match[1], scrip: match[1], series: match[2] }
    : { symbol: name,     scrip: name,     series: null };
}



function monthlyExpiry(yy, mon, weekday) {

  const yyyy = 2000 + parseInt(yy);
  const mm = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ].indexOf(mon);

  let dd = new Date(yyyy, mm + 1, 0).getDate(); // Last day of the month
  while(new Date(yyyy, mm, dd).getDay() != weekday)
    dd--;

  for(; dd >= 1; dd--) {
    const dateObj = new Date(yyyy, mm, dd);
    const dayOfWeek = dateObj.getDay();

    const date = `${ yyyy }-${ String(mm + 1).padStart(2, '0') }-${ String(dd).padStart(2, '0') }`;
    const isHoliday = holidays[yyyy] !== undefined && holidays[yyyy][mm + 1] !== undefined && holidays[yyyy][mm + 1].includes(dd);
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isSpecial = specialDays[yyyy] !== undefined && specialDays[yyyy][mm + 1] !== undefined && specialDays[yyyy][mm + 1].includes(dd);

    if(!isHoliday && (!isWeekend || isSpecial))
      return date;
  }

}

function weeklyExpiry(yy, m, dd) {
  const yyyy = 2000 + parseInt(yy);
  const mm = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'O', 'N', 'D' ].indexOf(m);
  let day = parseInt(dd);

  for(; day >= 1; day--) {
    const dateObj = new Date(yyyy, mm, day);
    const dayOfWeek = dateObj.getDay();
    const date = `${ yyyy }-${ String(mm + 1).padStart(2, "0") }-${ String(day).padStart(2, "0") }`;

    const isHoliday = holidays[yyyy] !== undefined && holidays[yyyy][mm + 1] !== undefined && holidays[yyyy][mm + 1].includes(day);
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isSpecial = specialDays[yyyy] !== undefined && specialDays[yyyy][mm + 1] !== undefined && specialDays[yyyy][mm + 1].includes(day);

    if(!isHoliday && (!isWeekend || isSpecial)) {
      return date;
    }
  }
}

function monthlyExpiryType2(yy, m, dd) {
  const yyyy = 2000 + parseInt(yy);
  const mm = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'O', 'N', 'D' ].indexOf(m);
  let day = parseInt(dd);

  for(; day >= 1; day--) {
    const dateObj = new Date(yyyy, mm, day);
    const dayOfWeek = dateObj.getDay();
    const date = `${ yyyy }-${ String(mm + 1).padStart(2, "0") }-${ String(day).padStart(2, "0") }`;

    const isHoliday = holidays[yyyy] !== undefined && holidays[yyyy][mm + 1] !== undefined && holidays[yyyy][mm + 1].includes(day);
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isSpecial = specialDays[yyyy] !== undefined && specialDays[yyyy][mm + 1] !== undefined && specialDays[yyyy][mm + 1].includes(day);

    if(!isHoliday && (!isWeekend || isSpecial)) {
      return date;
    }
  }
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

const expiryMap = {
  // NSE
  'FINNIFTY': 2,
  'MIDCPNIFTY': 1,
  'BANKNIFTY': 3,
  'NIFTYNXT50': 5,

  // BSE
  'BANKEX': 1,
  'SENSEX': 5,
}
// Note : All monthly BankNifty contracts will expire on Wednesday after 1st MAR 2024. Before it, expiry was on Thursday. https://nsearchives.nseindia.com/content/circulars/FAOP60011.pdf

const getweekday = (yyyy, mm, scrip) => {
  if(scrip === 'BANKNIFTY' && yyyy < 2024) return 4;
  if(scrip === 'BANKNIFTY' && yyyy === 2024 && mm <= 1) return 4;
  if((['SENSEX50', 'BANKEX', 'SENSEX'].includes(scrip)) && yyyy >= 2025) return 2;
  if(yyyy >= 2025) return 4;   // 2025 is year
  return expiryMap[scrip] || 4;
}

exports.fo = (name) => {

  // NSE

  // FUT - Monthly Expiry (only)

  let match = name.match(/^(\S+?)(\d{2})([A-Z]{3})FUT$/);
  if(match) {
    const yyyy = 2000 + parseInt(match[2]);
    const mm = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ].indexOf(match[3]);
    let scrip = match[1];
    let expiry = monthlyExpiry(match[2], match[3], getweekday(yyyy, mm, scrip));
    return { symbol: scrip, scrip, exp: match[2] + match[3], expiry, type: "FUT" };
  }

  // OPT - Monthly Expiry

  match = name.match(/^(\S+?)(\d{2})([A-Z]{3})([\d.]+)(PE|CE)$/);
  if(match) {
    const yyyy = 2000 + parseInt(match[2]);
    const mm = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ].indexOf(match[3]);
    let scrip = match[1];
    let expiry = monthlyExpiry(match[2], match[3], getweekday(yyyy, mm, scrip));
    return { symbol: scrip, scrip, exp: match[2] + match[3], expiry, strike: parseFloat(match[4]), type: match[5] };
  }

  // OPT - Weekly Expiry

  match = name.match(/^(NIFTY|BANKNIFTY|FINNIFTY|MIDCPNIFTY)(\d{2})(\w{1})(\d{2})([\d.]+)(PE|CE)$/);
  if(match) {
    let scrip = match[1];
    let expiry = weeklyExpiry(match[2], match[3], match[4]);
    return { symbol: scrip, scrip, exp: match[2] + match[3] + match[4], expiry, strike: parseFloat(match[5]), type: match[6] };
  }

  // BSE

  // FUT - Weekly Expiry
  match = name.match(/^(\S+?)(\d{2})(\w{1})(\d{2})FUT$/);
  if(match) {
    let scrip = match[1];
    let expiry = monthlyExpiryType2(match[2], match[3], match[4]);
    return { symbol: scrip, scrip, exp: match[2] + match[3] + match[4], expiry, type: "FUT" };
  }

  // OPT - Weekly Expiry

  match = name.match(/^(\S+?)(\d{2})(\w{1})(\d{2})([\d.]+)(PE|CE)$/);
  if(match) {
    let scrip = match[1];
    let expiry = weeklyExpiry(match[2], match[3], match[4]);
    return { symbol: scrip, scrip, exp: match[2] + match[3] + match[4], expiry, strike: parseFloat(match[5]), type: match[6] };
  }

  // Note: Single Stock derivative expiry shigt to second thursday of month. https://www.bseindia.com/markets/MarketInfo/DispNewNoticesCirculars.aspx?page=20240430-50


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
