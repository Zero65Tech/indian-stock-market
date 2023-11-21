const { info, expiry, isHoliday, isOpen, hasOpened, hasClosed } = require('../src/index')



const infoTestCases = [

  // EQ
  [ "RELIANCE", { script: "RELIANCE" }], // Ends with "CE"
  [ "TCS",      { script: "TCS"      }],
  [ "WIPRO",    { script: "WIPRO"    }],

  // FO · FUT
  ["RELIANCE23NOVFUT", { script: "RELIANCE", expiry: "23NOV", type: "FUT" }],

  // FO · CE
  [ "RELIANCE23APR2300CE",  { script: "RELIANCE",  expiry: "23APR", strike: 2300, type: "CE" } ], // Stock, Monthly Expiry
  [ "654GS203223NOV91.5CE", { script: "654GS2032", expiry: "23NOV", strike: 91.5, type: "CE" } ], // ??, Monthly Expiry

  // FO · PE
  [ "BANKNIFTY23APR40000PE", { script: "BANKNIFTY", expiry: "23APR", strike: 40000, type: "PE" } ], // Index, Monthly Expiry
  [ "BANKNIFTY23D0643000PE", { script: "BANKNIFTY", expiry: "23D06", strike: 43000, type: "PE" } ], // Index, ??
  [ "BANKNIFTY20N0523500PE", { script: "BANKNIFTY", expiry: "20N05", strike: 23500, type: "PE" } ], // Index, ??
  [ "COALINDIA21JUL142.5PE", { script: "COALINDIA", expiry: "21JUL", strike: 142.5, type: "PE" } ], // Stock, Monthly Expiry

];

describe(".info(symbol)", () => {
  for (let [symbol, output] of infoTestCases)
    test(symbol, () => expect(info(symbol)).toStrictEqual(output));
});



const expiryTestCases = [
  ["23JUN", "2023-06-28"], // Wed
  ["23SEP", "2023-09-28"], // Thu
  ["23NOV", "2023-11-30"], // Thu
];

describe(".expiry(ddmon)", () => {
  for (let [ddmon, date] of expiryTestCases)
    test(ddmon, () => expect(expiry(ddmon)).toBe(date));
});



const dateTimeTestCases = [

  // Monday
  [ '2023-01-02T08:59:59+05:30', false, false, false, false ],
  [ '2023-01-02T09:00:00+05:30', false, true,  true,  false ],
  [ '2023-01-02T15:29:59+05:30', false, true,  true,  false ],
  [ '2023-01-02T15:30:00+05:30', false, false, true,  true  ],

  // Friday
  [ '2023-01-06T12:00:00+05:30', false, true, true, false ],

  // Saturday
  [ '2023-01-07T12:00:00+05:30', true, false, false, false ],

  // Sunday
  [ '2023-01-08T12:00:00+05:30', true, false, false, false ],

  // Repulic Day
  [ '2023-01-26T12:00:00+05:30', true, false, false, false ],

  // TODO: Muhurat Day

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

