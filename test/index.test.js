const { info, isHoliday, isOpen, hasOpened, hasClosed } = require('../src/index')



const infoTestCases = [

  /*
    FO Monthly Expiry:
      Stocks, Nifty, Nifty Bank:
        - Last Thursday of the Month
      Nifty Financial:
        - Last Tuesday of the Month
  */


  // EQ

  [ "RELIANCE", { script: "RELIANCE" }], // Ends with "CE"
  [ "TCS",      { script: "TCS"      }],
  [ "WIPRO",    { script: "WIPRO"    }],


  // FO · FUT

  [ "RELIANCE23JUNFUT", { script: "RELIANCE", exp: "23JUN", expiry:"2023-06-28", type: "FUT" } ], // Wednesday (Thursday Holiday)
  [ "RELIANCE23SEPFUT", { script: "RELIANCE", exp: "23SEP", expiry:"2023-09-28", type: "FUT" } ],
  [ "RELIANCE23NOVFUT", { script: "RELIANCE", exp: "23NOV", expiry:"2023-11-30", type: "FUT" } ],

  [ "NIFTY23NOVFUT",     { script: "RELIANCE", exp: "23NOV", expiry:"2023-11-30", type: "FUT" } ],

  [ "BANKNIFTY23NOVFUT", { script: "RELIANCE", exp: "23NOV", expiry:"2023-11-30", type: "FUT" } ],

  [ "FINNIFTY23NOVFUT",  { script: "RELIANCE", exp: "23NOV", expiry:"2023-11-28", type: "FUT" } ],


  // FO · CE

  [ "WIPRO23NOV397.5CE", { script: "WIPRO", exp: "23NOV", expiry:"2023-11-30", strike: 397.5, type: "CE" } ],
  [ "WIPRO23NOV400CE",   { script: "WIPRO", exp: "23NOV", expiry:"2023-11-30", strike: 400  , type: "CE" } ],
  [ "WIPRO23NOV402.5CE", { script: "WIPRO", exp: "23NOV", expiry:"2023-11-30", strike: 402.5, type: "CE" } ],

  // FO · PE

  [ "WIPRO23NOV397.5PE", { script: "WIPRO", exp: "23NOV", expiry:"2023-11-30", strike: 397.5, type: "PE" } ],
  [ "WIPRO23NOV400PE",   { script: "WIPRO", exp: "23NOV", expiry:"2023-11-30", strike: 400  , type: "PE" } ],
  [ "WIPRO23NOV402.5PE", { script: "WIPRO", exp: "23NOV", expiry:"2023-11-30", strike: 402.5, type: "PE" } ],

  [ "BANKNIFTY23APR40000PE", { script: "BANKNIFTY", exp: "23APR", expiry:"2023-04-29", strike: 40000, type: "PE" } ], // Index, Monthly Expiry
  [ "BANKNIFTY23D0643000PE", { script: "BANKNIFTY", exp: "23D06", expiry:"2023-12-06", strike: 43000, type: "PE" } ], // Index, ??
  [ "BANKNIFTY20N0523500PE", { script: "BANKNIFTY", exp: "20N05", expiry:"2020-11-05", strike: 23500, type: "PE" } ], // Index, ??

];

describe(".info(symbol)", () => {
  for (let [symbol, output] of infoTestCases)
    test(symbol, () => expect(info(symbol)).toStrictEqual(output));
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

    beforeAll(() => jest.useFakeTimers({ now: new Date(dateTime) }));

    test('.isHoliday(dateStr)', () => expect(isHoliday(dateTime.substring(0,10))).toBe(bool1));

    test('.isHoliday()', () => expect(isHoliday()).toBe(bool1));
    test('.isOpen()',    () => expect(isOpen())   .toBe(bool2));
    test('.hasOpened()', () => expect(hasOpened()).toBe(bool3));
    test('.hasClosed()', () => expect(hasClosed()).toBe(bool4));

  })
}

