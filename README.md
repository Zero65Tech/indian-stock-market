
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

### 1. `exports.info(symbol)`

This function analyzes a given trading symbol and returns information about the financial instrument, including script, expiry, expiry date, strike (if applicable), and type (FUT, PE, CE). It supports both monthly and weekly expiries for options.

#### Example Usage:

```javascript
const result = exports.info("NIFTY22JAN12000CE");
// Output: { script: 'NIFTY', exp: '22JAN', expiry: '2024-01-25', strike: 12000, type: 'CE' }
```





| Expiry | Weekly (OPT Only) | Monthly (FUT & OPT) |
|:-|:-:|:-:|
| Stocks | - | Thursday |
| Nifty | Thursday | Thursday |
| Nifty Bank | Wednesday | Thursday |
| Nifty Financial | Tuesday | Tuesday |


    The weekly expiry format is <YY><M><DD>. The month format is 1 for JAN, 2 for FEB, 3, 4, 5, 6, 7, 8, 9, O(capital o) for October, N for November, D for December.
