const { isOpen, hasOpened, hasClosed, isHoliday } = require('../src/index')



const dateTimeTestCases = [
  [ '2023-11-06T03:30:00Z', false, true,  true,  false ],
  [ '2023-11-06T09:59:00Z', false, true,  true,  false ],
  [ '2023-11-06T06:30:00Z', false, true,  true,  false ],
  [ '2020-11-14T12:45:00Z', false, true,  true,  false ],
  [ '2020-02-01T12:45:00Z', false, true,  true,  false ],
  [ '2023-11-06T03:29:00Z', false, false, false, false ],
  [ '2023-11-06T10:00:00Z', false, false, true,  true  ],
  [ '2023-11-06T11:30:00Z', false, false, true,  true  ],
  [ '2023-10-02T03:30:00Z', true,  false, false, false ],
  [ '2020-11-14T13:45:00Z', false, false, true,  true  ]
]

for(const [ dateTime, bool1, bool2, bool3, bool4 ] of dateTimeTestCases) {
  describe(dateTime, () => {

    beforeAll(() => jest.useFakeTimers({ now: new Date(dateTime) }))

    test('.isHoliday(dateStr)', () => expect(isHoliday(dateTime.substring(0,10))).toBe(bool1));

    test('.isHoliday()', () => expect(isHoliday()).toBe(bool1));
    test('.isOpen()',    () => expect(isOpen())   .toBe(bool2));
    test('.hasOpened()', () => expect(hasOpened()).toBe(bool3));
    test('.hasClosed()', () => expect(hasClosed()).toBe(bool4));

  })
}
