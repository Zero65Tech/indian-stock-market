const { isOpen, hasOpened, hasClosed, isHoliday } = require("../src/index");

// TESTING .isOpen()
const isopenArray = [
  // [test case, expected output]
  // Time in GMT
  ["2023-11-06T03:30:00Z", true],
  ["2023-11-06T09:59:00Z", true],
  ["2023-11-06T06:30:00Z", true],
  ["2020-11-14T12:45:00Z", true],
  ["2020-02-01T12:45:00Z", true],

  ["2023-11-06T03:29:00Z", false],
  ["2023-11-06T10:00:00Z", false],
  ["2023-11-06T11:30:00Z", false],
  ["2023-10-02T03:30:00Z", false],
  ["2020-11-14T13:45:00Z", false],
];

describe(".isOpen() Testing", () => {
  isopenArray.forEach((i) => {
    test(`${i[0]} testcase`, () => {
      const mockDate = new Date(i[0]);

      const originalDate = global.Date;
      global.Date = jest.fn(() => mockDate);

      expect(isOpen()).toBe(i[1]);

      global.Date = originalDate;
    });
  });
});

// TESTING .hasOpened()
const hasOpenedArray = [
  // [test case, expected output]
  // Time in GMT
  ["2023-11-06T03:30:00Z", true],
  ["2020-11-14T12:45:00Z", true],
  ["2020-02-01T12:45:00Z", true],

  ["2023-11-06T03:29:00Z", false],
  ["2023-10-02T03:30:00Z", false],
];

describe(".hasOpened() Testing", () => {
  hasOpenedArray.forEach((i) => {
    test(`${i[0]} testcase`, () => {
      const mockDate = new Date(i[0]);

      const originalDate = global.Date;
      global.Date = jest.fn(() => mockDate);

      expect(hasOpened(i[0])).toBe(i[1]);

      global.Date = originalDate;
    });
  });
});

// TESTING .hasClosed()
const hasClosedArray = [
  // [test case, expected output]
  // Time in GMT
  ["2023-11-06T10:00:00Z", true],
  ["2020-11-14T13:45:00Z", true],

  ["2023-11-06T03:30:00Z", false],
  ["2023-10-02T03:30:00Z", false],
  ["2020-11-14T12:45:00Z", false],
  ["2020-02-01T12:45:00Z", false],
];

describe(".hasClosed() Testing", () => {
  hasClosedArray.forEach((i) => {
    test(`${i[0]} testcase`, () => {
      const mockDate = new Date(i[0]);

      const originalDate = global.Date;
      global.Date = jest.fn(() => mockDate);

      expect(hasClosed(i[0])).toBe(i[1]);

      global.Date = originalDate;
    });
  });
});

// TESTING .isHoliday()
const isHolidayArray = [
  // [test case, expected output]
  ["2023-10-24", true],
  ["2023-11-04", true],
  ["2021-08-19", true],
  ["2023-11-12", false],
  ["2014-03-22", false],
];

describe(".isHoliday() Testing", () => {
  isHolidayArray.forEach((i) => {
    test(`${i[0]} testcase`, () => {
      expect(isHoliday(i[0])).toBe(i[1]);
    });
  });
});
