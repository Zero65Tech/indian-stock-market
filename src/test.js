const weekdayMap = {
  'Sunday': 0,
  'Monday': 1,
  'Tuesday': 2,
  'Wednesday': 3,
  'Thursday': 4,
  'Friday': 5,
  'Saturday': 6
};

function getLastWeekdayOfMonth(year, month, weekday) {
  let lastDay = new Date(year, month + 1, 0);
  let diff = (lastDay.getDay() - weekday + 7) % 7;
  return new Date(year, month, lastDay.getDate() - diff);
}

function getNthWeekdayOfMonth(year, month, weekday, n) {
  let firstDay = new Date(year, month, 1);
  let firstWeekday = firstDay.getDay();
  let diff = (weekday - firstWeekday + 7) % 7;
  let dayOfMonth = 1 + diff + (n - 1) * 7;

  return new Date(year, month, dayOfMonth);
}

function getExpiry(year, month, expiry) {

  const expiryDetails = expiry.split(" ");

  if(expiryDetails.length === 1) {
    return getLastWeekdayOfMonth(year, month, weekdayMap[expiry]);
  }

  const occurrence = expiryDetails[0];
  const dayName = expiryDetails[1];
  const weekday = weekdayMap[dayName];
  const occurrenceWeek = parseInt(occurrence);

  return getNthWeekdayOfMonth(year, month, weekday, occurrenceWeek);
}

exports.getExpiryDate = (year, month, exchange, { derivativeType }) => {
  const date = new Date(year, month, 1);
  let expiry = null;

  if(exchange === 'NSE') {
    if(date >= new Date(2024, 2, 1) && date < new Date(2025, 0, 1)) {
      expiry = "Wednesday";
    } else {
      expiry = "Thursday";
    }
  } else {
    if(date < new Date(2023, 4, 15)) {
      expiry = "Thursday";
    } else if(date >= new Date(2023, 4, 15) && date < new Date(2024, 6, 1)) {
      expiry = "Friday";
    } else {
      expiry = "Tuesday";
    }

    if(date >= new Date(2024, 6, 1) && derivativeType === 'stock') {
      expiry = "2nd Thursday";
    }
  }

  const expiryDate = getExpiry(year, month, expiry);

  return expiryDate.toLocaleDateString();
};

