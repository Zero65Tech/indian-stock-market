const {
  info,
  expiry,
  isOpen,
  hasOpened,
  hasClosed,
  isHoliday,
} = require('../src/index');

// TESTING .info()
const symbolsArray = [
  // PE test cases
  'BANKNIFTY20NOV23500PE',
  'BANKNIFTY23APR40000PE',
  'RELIANCE23APR2300PE',
  'M21OCT720PE',
  'COALINDIA21JUL142.5PE',
  // CE test cases
  'RELIANCE23APR2300CE',
  // FUT test cases
  'RELIANCE23NOVFUT',
];

describe('.symbolsMatch() Testing', () => {
  symbolsArray.forEach((symb) => {
    if (symb.endsWith('PE')) {
      test(`PE testing ${symb}`, () => {
        expect(info(symb)).toHaveProperty('script');
        expect(info(symb)).toHaveProperty('expiry');
        expect(info(symb)).toHaveProperty('strike');
        expect(info(symb)).toHaveProperty('type');
      });
    } else if (symb.endsWith('CE')) {
      test(`CE testing ${symb}`, () => {
        expect(info(symb)).toHaveProperty('script');
        expect(info(symb)).toHaveProperty('expiry');
        expect(info(symb)).toHaveProperty('strike');
        expect(info(symb)).toHaveProperty('type');
      });
    } else if (symb.endsWith('FUT')) {
      test(`FUT testing ${symb}`, () => {
        expect(info(symb)).toHaveProperty('script');
        expect(info(symb)).toHaveProperty('expiry');
        expect(info(symb)).toHaveProperty('type');
      });
    } else {
      test(`Others testing ${symb}`, () => {
        expect(info(symb)).toHaveProperty('script');
      });
    }
  });
});

// TESTING .expiryDate()
const expiryArray = ['20N0V', '23APR', '21OCT', '23DEC'];

describe('.expiryDate() Testing', () => {
  expiryArray.forEach((exp) => {
    test(`${exp} testcase`, () => {
      expect(expiry(exp)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});

// TESTING .isOpen()
const isopenArrayTrue = [
  // Time in GMT
  '2023-11-06T03:30:00Z',
  '2023-11-06T09:59:00Z',
  '2023-11-06T06:30:00Z',
  // '2020-11-14T12:45:00Z', // todo
];
const isopenArrayFalse = [
  // Time in GMT
  '2023-11-06T03:29:00Z',
  '2023-11-06T10:00:00Z',
  '2023-11-06T11:30:00Z',
  '2023-10-02T03:30:00Z',
  '2020-11-14T13:45:00Z',
];

describe('.isOpen() Testing', () => {
  isopenArrayTrue.forEach((istrue) => {
    test(`${istrue} GMT should return True (Market Open)`, () => {
      const mockDate = new Date(istrue);

      const originalDate = global.Date;
      global.Date = jest.fn(() => mockDate);

      expect(isOpen()).toBe(true);

      global.Date = originalDate;
    });
  });
  isopenArrayFalse.forEach((isfalse) => {
    test(`${isfalse} GMT should return False (Market Close)`, () => {
      const mockDate = new Date(isfalse);

      const originalDate = global.Date;
      global.Date = jest.fn(() => mockDate);

      expect(isOpen()).toBe(false);

      global.Date = originalDate;
    });
  });
});

// TESTING .hasOpened()
const hasOpenedArrayTrue = ['2023-11-06T03:30:00Z', '2020-11-14T12:45:00Z']; // Time in GMT
const hasOpenedArrayFalse = ['2023-11-06T03:29:00Z', '2023-10-02T03:30:00Z']; // Time in GMT

describe('.hasOpened() Testing', () => {
  hasOpenedArrayTrue.forEach((istrue) => {
    test(`${istrue} GMT should return True (Market Opened)`, () => {
      const mockDate = new Date(istrue);

      const originalDate = global.Date;
      global.Date = jest.fn(() => mockDate);

      expect(hasOpened()).toBe(true);

      global.Date = originalDate;
    });
  });
  hasOpenedArrayFalse.forEach((isfalse) => {
    test(`${isfalse} GMT should return False (Market Closed)`, () => {
      const mockDate = new Date(isfalse);

      const originalDate = global.Date;
      global.Date = jest.fn(() => mockDate);

      expect(hasOpened()).toBe(false);

      global.Date = originalDate;
    });
  });
});

// TESTING .hasClosed()
const hasClosedArrayTrue = ['2023-11-06T10:00:00Z', '2020-11-14T13:45:00Z'];
const hasClosedArrayFalse = [
  // Time in GMT
  '2023-11-06T03:30:00Z',
  '2023-10-02T03:30:00Z',
  // '2020-11-14T12:45:00Z', // todo
];

describe('.hasClosed() Testing', () => {
  hasClosedArrayTrue.forEach((istrue) => {
    test(`${istrue} GMT should return True (Market Closed)`, () => {
      const mockDate = new Date(istrue);

      const originalDate = global.Date;
      global.Date = jest.fn(() => mockDate);

      expect(hasClosed()).toBe(true);

      global.Date = originalDate;
    });
  });
  hasClosedArrayFalse.forEach((isfalse) => {
    test(`${isfalse} GMT should return False (Market Open)`, () => {
      const mockDate = new Date(isfalse);

      const originalDate = global.Date;
      global.Date = jest.fn(() => mockDate);

      expect(hasClosed()).toBe(false);

      global.Date = originalDate;
    });
  });
});

// TESTING .isHoliday()
const isHolidayArraytrue = ['2023-10-24', '2023-11-04', '2021-08-19'];
const isHolidayArrayfalse = ['2023-11-12', '2014-03-22'];

describe('.isHoliday() Testing', () => {
  isHolidayArraytrue.forEach((holdate) => {
    test(`${holdate} testcase should return true (Holiday)`, () => {
      expect(isHoliday(holdate)).toBeTruthy();
    });
  });
  isHolidayArrayfalse.forEach((holdate) => {
    test(`${holdate} testcase should return false (not a Holiday)`, () => {
      expect(isHoliday(holdate)).toBeFalsy();
    });
  });
});
