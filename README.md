
# Indian-Stock-Market

Welcome to the Indian Stock Market project by Zero65Tech! This project is designed to provide tools to help you with real-time stock market data handling and analytics for the Indian stock market.




## Table of Content
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Utilities Explanation](#utilities-explanation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
## Introduction
Welcome to the Indian Stock Market toolkit, a comprehensive set of tools and utilities crafted by Zero65 Technologies to empower stock market enthusiasts, traders, and analysts in navigating the dynamic landscape of the Indian stock market. Whether you're a seasoned investor or a budding trader, our toolkit is designed to streamline your data handling and analysis processes, providing you with valuable insights and facilitating informed decision-making.
## Features

- Checks whether Market is Open or Closed.
- Checks if given date is Market Holiday.
- Provides Monthly and Weekly Expiry dates for FUT and Options.
- CE (Call Option), PE (Put Option), FUT,  Symbols matching with its complete breakdown in required format.
- Provides you with complete list of Public Holidays and Special days.
- Updated list of Public Holidays and Special days every year.


## Installation

To get started with the Indian Stock Market package, follow these steps:

#### Package Installation -
```bash
  npm install @zero65/indian-stock-market
```

#### Import Functions in your file -
```bash
  const { info, isOpen, hasOpened, hasClosed, isHoliday } = require('@zero65/indian-stock-market')
``` 
## Utilities Explanation 

- **info**( _symbol_ ) -
    - Input :- Complete Symbol string
    - Return :- Object
    - Explanation :- Takes complete Symbol as string and returns an object with keys  
        - _script, exp, expiry, strike, type_ for **Options** 
        - _script, exp, expiry, type_ for **FUT**
- **isOpen**( ) -
    - Input :- _None_
    - Return :- Boolean
    - Explanation :- Internally, it takes the current date and time as input and returns **true** if stock market is open, and **false** if it is closed.
- **hasOpened**( ) -
    - Input :- _None_
    - Return :- Boolean
    - Explanation :- Internally, it takes the current date and time as input and returns **true** if stock market has opened, and **false** if it has not opened for the day.  
       (**_Note:_** _It will return true even if the market is closed but had opened earlier on that particular day._)
- **hasClosed**( ) -
    - Input :- _None_
    - Return :- Boolean
    - Explanation :- Internally, it takes the current date and time as input and returns **true** if the stock market was closed, and **false** if it is open or has not opened at all.
- **isHoliday**( _date_ ) -
    - Input :- Date in the string format 'yyyy-mm-dd' or _None (Input is optional)_  
    - Return :- Boolean
    - Explanation :- It takes a date in the string format 'yyyy-mm-dd' as input, or if no input is given, it assigns the current date internally. It then returns **true** if the assigned date is a stock market holiday and **false** otherwise.
## Usage/Examples

```javascript
```





| Expiry | Weekly (OPT Only) | Monthly (FUT & OPT) |
|:-|:-:|:-:|
| Stocks | - | Thursday |
| Nifty | Thursday | Thursday |
| Nifty Bank | Wednesday | Thursday |
| Nifty Financial | Tuesday | Tuesday |


    The weekly expiry format is <YY><M><DD>. The month format is 1 for JAN, 2 for FEB, 3, 4, 5, 6, 7, 8, 9, O(capital o) for October, N for November, D for December.
