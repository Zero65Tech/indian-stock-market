# Indian Stock Market

This npm package provides utilities to work with the Indian stock market, including functions to determine market holidays, expiry dates for futures and options, and market open/close status.

## Installation

```sh
npm install @zero65tech/indian-stock-market
```

## Usage

### Importing the package

```javascript
const ism = require('@zero65tech/indian-stock-market');
```

### Functions

#### `fo(name)`

Returns information about the futures or options contract.

```javascript
const info = ism.fo('NIFTY21OCTFUT');
console.log(info);
// { symbol: 'NIFTY', exp: '21OCT', expiry: '2021-10-28', type: 'FUT' }
```

#### `isOpen()`

Checks if the market is currently open.

```javascript
const open = ism.isOpen();
console.log(open); // true or false
```

#### `hasOpened()`

Checks if the market has opened today.

```javascript
const opened = ism.hasOpened();
console.log(opened); // true or false
```

#### `hasClosed()`

Checks if the market has closed today.

```javascript
const closed = ism.hasClosed();
console.log(closed); // true or false
```

#### `isHoliday(date)`

Checks if the given date is a market holiday. If no date is provided, it checks for today.

```javascript
const holiday = ism.isHoliday();
console.log(holiday); // true or false
```

```javascript
const holiday = ism.isHoliday('2021-10-02');
console.log(holiday); // true or false
```

```javascript
const holiday = ism.isHoliday(new Date('2021-10-02'));
console.log(holiday); // true or false
```

### License

This project is licensed under the MIT License.