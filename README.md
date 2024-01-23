
# indian-stock-market

This utility provides functions to manage and query information related to trading schedules, market openings, and expiries for Indian Stock Market. The utility is written in JavaScript and can be used in Node.js environments.

## Features

- Checks whether Market is Open or Closed.
- Checks if given date is Market Holiday.
- Provides Monthly and Weekly Expiry dates for FUT and Options.
- CE (Call Option), PE (Put Option), FUT,  Symbols matching with its complete breakdown in required format.
- Provides you with complete list of Public Holidays and Special days.
- Updated list of Public Holidays and Special days every year.


## Usage

To get started with the Indian Stock Market package, follow these steps:

### Package Installation
```bash
  npm install @zero65tech/indian-stock-market
```

### Import Functions in your project
```javascript
  const { info, isOpen, hasOpened, hasClosed, isHoliday } = require('@zero65tech/indian-stock-market')
``` 
## Functions explanation

#### Note:
- This utility uses IST (Indian Standard Time) for date and time calculations.
- All times are represented in a 24-hour format

### 1. `info(symbol)`

This function analyzes a given trading symbol and returns information about the financial instrument, including script, expiry, expiry date, strike (if applicable), and type (FUT, PE, CE). It supports both monthly and weekly expiries for options.

#### Example Usage:

```javascript
const result = exports.info("NIFTY22JAN12000CE");
// Output: { script: 'NIFTY', exp: '22JAN', expiry: '2024-01-25', strike: 12000, type: 'CE' }
```

### 2. `isOpen()`

This function checks if the market is currently open based on the Indian Standard Time (IST). It considers holidays and special days.

#### Example Usage:

```javascript
const isOpen = exports.isOpen();
// Output: true or false
```

### 3. `hasOpened()`

This function checks if the market has opened for the current day based on Indian Standard Time (IST). It considers holidays and special days.

#### Example Usage:

```javascript
const hasOpened = exports.hasOpened();
// Output: true or false
```

### 4. `exports.hasClosed()`

This function checks if the market has closed for the current day based on Indian Standard Time (IST). It considers holidays and special days.

#### Example Usage:

```javascript
const hasClosed = exports.hasClosed();
// Output: true or false
```

### 5. `exports.isHoliday(date)`

This function checks if a given date is a holiday. By default, it checks the current date if no date is provided. The function considers predefined holidays and special days.

#### Example Usage:

```javascript
const isHoliday = exports.isHoliday(new Date("2024-01-01"));
// Output: true or false
``` 






| Expiry | Weekly (OPT Only) | Monthly (FUT & OPT) |
|:-|:-:|:-:|
| Stocks | - | Thursday |
| Nifty | Thursday | Thursday |
| Nifty Bank | Wednesday | Thursday |
| Nifty Financial | Tuesday | Tuesday |


    The weekly expiry format is <YY><M><DD>. The month format is 1 for JAN, 2 for FEB, 3, 4, 5, 6, 7, 8, 9, O(capital o) for October, N for November, D for December.
