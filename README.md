# Indian Stock Market

This npm package provides utilities to work with the Indian stock market, including functions to determine market holidays, expiry dates for futures and options, and market open/close status.

## Installation

```sh
npm install @zero65tech/indian-stock-market
```

## Usage

### Importing the package

```javascript
const stockMarket = require('@zero65tech/indian-stock-market');
```

### Functions

#### `info(symbol)`

Deprecated. Use `foInfo(name)` instead.

#### `foInfo(name)`

Returns information about the futures or options contract.

```javascript
const info = stockMarket.foInfo('NIFTY21OCTFUT');
console.log(info);
// { symbol: 'NIFTY', exp: '21OCT', expiry: '2021-10-28', type: 'FUT' }
```

#### `isOpen()`

Checks if the market is currently open.

```javascript
const open = stockMarket.isOpen();
console.log(open); // true or false
```

#### `hasOpened()`

Checks if the market has opened today.

```javascript
const opened = stockMarket.hasOpened();
console.log(opened); // true or false
```

#### `hasClosed()`

Checks if the market has closed today.

```javascript
const closed = stockMarket.hasClosed();
console.log(closed); // true or false
```

#### `isHoliday(date)`

Checks if the given date is a market holiday. If no date is provided, it checks for today.

```javascript
const holiday = stockMarket.isHoliday(new Date('2021-10-02'));
console.log(holiday); // true or false
```

### License

This project is licensed under the MIT License.