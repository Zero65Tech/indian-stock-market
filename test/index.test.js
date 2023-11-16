const {
  info,
  expiry,
  isOpen,
  hasOpened,
  hasClosed,
  isHoliday,
} = require("../src/index");

// TESTING .info()
const symbolsArrayPE = [
  "BANKNIFTY20NOV23500PE",
  "BANKNIFTY23APR40000PE",
  "RELIANCE23APR2300PE",
  "M21OCT720PE",
  "COALINDIA21JUL142.5PE",
];
const symbolsArrayCE = ["RELIANCE23APR2300CE"];
const symbolsArrayFUT = ["RELIANCE23NOVFUT"];
const symbolsArrayOthers = ["WIPRO", "TCS", "INFY", "RELIANCE"];

describe(".info(NSE-PE)", () => {
  test('BANKNIFTY20NOV23500PE', () => {
    let ret = info('BANKNIFTY20NOV23500PE');
    expect(ret.script).toBe('BANKNIFTY');
    expect(ret.expiry).toBe('20NOV');
    expect(ret.strike).toBe(23500);
    expect(ret.type)  .toBe('PE');
  });
});

describe(".info() Testing", () => {
  symbolsArrayPE.forEach((pe) => {
    test(`PE test case - ${pe}`, () => {
      expect(info(pe)).toHaveProperty("script");
      expect(info(pe)).toHaveProperty("expiry");
      expect(info(pe)).toHaveProperty("strike");
      expect(info(pe)).toHaveProperty("type");
    });
  });
  symbolsArrayCE.forEach((ce) => {
    test(`CE test case - ${ce}`, () => {
      expect(info(ce)).toHaveProperty("script");
      expect(info(ce)).toHaveProperty("expiry");
      expect(info(ce)).toHaveProperty("strike");
      expect(info(ce)).toHaveProperty("type");
    });
  });
  symbolsArrayFUT.forEach((fut) => {
    test(`FUT test case - ${fut}`, () => {
      expect(info(fut)).toHaveProperty("script");
      expect(info(fut)).toHaveProperty("expiry");
      expect(info(fut)).toHaveProperty("type");
    });
  });
  symbolsArrayOthers.forEach((oth) => {
    test(`Other than PE,CE,FUT test case - ${oth}`, () => {
      expect(info(oth)).toHaveProperty("script");
    });
  });
});

// TESTING .expiry()
const expiryArray = ["20N0V", "23APR", "21OCT", "23DEC", "11OCT"];

describe(".expiry() Testing", () => {
  expiryArray.forEach((exp) => {
    test(`${exp} test case`, () => {
      expect(expiry(exp)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});

// TESTING .isOpen()
const isopenArrayTrue = [
  // Time in GMT
  "2023-11-06T03:30:00Z",
  "2023-11-06T09:59:00Z",
  "2023-11-06T06:30:00Z",
  "2020-11-14T12:45:00Z",
  "2020-02-01T12:45:00Z",
];
const isopenArrayFalse = [
  // Time in GMT
  "2023-11-06T03:29:00Z",
  "2023-11-06T10:00:00Z",
  "2023-11-06T11:30:00Z",
  "2023-10-02T03:30:00Z",
  "2020-11-14T13:45:00Z",
];

describe(".isOpen() Testing", () => {
  isopenArrayTrue.forEach((isopentrue) => {
    test(`${isopentrue} GMT should return True (Market Open)`, () => {
      const mockDate = new Date(isopentrue);

      const originalDate = global.Date;
      global.Date = jest.fn(() => mockDate);

      expect(isOpen()).toBe(true);

      global.Date = originalDate;
    });
  });
  isopenArrayFalse.forEach((isopenfalse) => {
    test(`${isopenfalse} GMT should return False (Market Close)`, () => {
      const mockDate = new Date(isopenfalse);

      const originalDate = global.Date;
      global.Date = jest.fn(() => mockDate);

      expect(isOpen()).toBe(false);

      global.Date = originalDate;
    });
  });
});

// TESTING .hasOpened()
const hasOpenedArrayTrue = [
  // Time in GMT
  "2023-11-06T03:30:00Z",
  "2020-11-14T12:45:00Z",
  "2020-02-01T12:45:00Z",
];
const hasOpenedArrayFalse = ["2023-11-06T03:29:00Z", "2023-10-02T03:30:00Z"]; // Time in GMT

describe(".hasOpened() Testing", () => {
  hasOpenedArrayTrue.forEach((hasopentrue) => {
    test(`${hasopentrue} GMT should return True (Market Opened)`, () => {
      const mockDate = new Date(hasopentrue);

      const originalDate = global.Date;
      global.Date = jest.fn(() => mockDate);

      expect(hasOpened()).toBe(true);

      global.Date = originalDate;
    });
  });
  hasOpenedArrayFalse.forEach((hasopenfalse) => {
    test(`${hasopenfalse} GMT should return False (Market Closed)`, () => {
      const mockDate = new Date(hasopenfalse);

      const originalDate = global.Date;
      global.Date = jest.fn(() => mockDate);

      expect(hasOpened()).toBe(false);

      global.Date = originalDate;
    });
  });
});

// TESTING .hasClosed()
const hasClosedArrayTrue = ["2023-11-06T10:00:00Z", "2020-11-14T13:45:00Z"]; // Time in GMT
const hasClosedArrayFalse = [
  // Time in GMT
  "2023-11-06T03:30:00Z",
  "2023-10-02T03:30:00Z",
  "2020-11-14T12:45:00Z",
  "2020-02-01T12:45:00Z",
];

describe(".hasClosed() Testing", () => {
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
const isHolidayArraytrue = ["2023-10-24", "2023-11-04", "2021-08-19"];
const isHolidayArrayfalse = ["2023-11-12", "2014-03-22"];

describe(".isHoliday() Testing", () => {
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
