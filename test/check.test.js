const { isOpen, hasOpened, hasClosed, isHoliday } = require('../src/index')

// TESTING .isOpen(), .hasOpened(), .hasClosed()
const isopenArray = [
  // [test case, .isOpen output, .hasOpened output, .hasClosed output]
  // Time in GMT
  ['2023-11-06T03:30:00Z', true, true, false],
  ['2023-11-06T09:59:00Z', true, true, false],
  ['2023-11-06T06:30:00Z', true, true, false],
  ['2020-11-14T12:45:00Z', true, true, false],
  ['2020-02-01T12:45:00Z', true, true, false],
  ['2023-11-06T03:29:00Z', false, false, false],
  ['2023-11-06T10:00:00Z', false, true, true],
  ['2023-11-06T11:30:00Z', false, true, true],
  ['2023-10-02T03:30:00Z', false, false, false],
  ['2020-11-14T13:45:00Z', false, true, true]
]

for (const [dateTime, bool1, bool2, bool3] of isopenArray) {
  describe(`${dateTime} testcase`, () => {
    beforeAll(() => {
      jest.useFakeTimers({ now: new Date(dateTime) })
    })

    test('.isOpen()', () => {
      expect(isOpen()).toBe(bool1)
    })

    test('.hasOpened()', () => {
      expect(hasOpened()).toBe(bool2)
    })

    test('.hasClosed()', () => {
      expect(hasClosed()).toBe(bool3)
    })
  })
}

// TESTING .isHoliday()
const isHolidayArray = [
  // [test case, expected output]
  ['2023-10-24', true],
  ['2023-11-04', true],
  ['2021-08-19', true],
  ['2023-11-12', false],
  ['2014-03-22', false]
]

describe('.isHoliday() Testing', () => {
  isHolidayArray.forEach((i) => {
    test(`${i[0]} testcase`, () => {
      expect(isHoliday(i[0])).toBe(i[1])
    })
  })
})
