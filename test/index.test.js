const { info, isHoliday, isOpen, hasOpened, hasClosed } = require('../src/index')



const infoTestCases = [

  /*

    FUT & OPT Monthly Expiry:
      Stocks, Nifty, Nifty Bank:
        - Last Thursday of the Month
      Nifty Financial:
        - Last Tuesday of the Month

    FUT Weekly Expiry:
      - NA

    OPT Weekly Expiry:
      Stocks:
        - NA
      Nifty:
        - Thursday
      Nifty Bank:
        - Wednesday
      Nifty Financial
        - Tuesday

    Weekly Expiry Nomenclature:
      N = November
      D = December

  */


  // EQ

  [ "RELIANCE", { script: "RELIANCE" }], // Ends with "CE"
  [ "TCS",      { script: "TCS"      }],
  [ "WIPRO",    { script: "WIPRO"    }],


  // FO · FUT

  [ "RELIANCE23JUNFUT", { script: "RELIANCE", exp: "23JUN", expiry:"2023-06-28", type: "FUT" } ], // Wednesday (Thursday Holiday)
  [ "RELIANCE23SEPFUT", { script: "RELIANCE", exp: "23SEP", expiry:"2023-09-28", type: "FUT" } ],
  [ "RELIANCE23NOVFUT", { script: "RELIANCE", exp: "23NOV", expiry:"2023-11-30", type: "FUT" } ],
  [ "RELIANCE23DECFUT", { script: "RELIANCE", exp: "23DEC", expiry:"2023-12-28", type: "FUT" } ],

  [ "NIFTY23NOVFUT",     { script: "NIFTY",     exp: "23NOV", expiry:"2023-11-30", type: "FUT" } ],
  [ "BANKNIFTY23NOVFUT", { script: "BANKNIFTY", exp: "23NOV", expiry:"2023-11-30", type: "FUT" } ],
  [ "FINNIFTY23NOVFUT",  { script: "FINNIFTY",  exp: "23NOV", expiry:"2023-11-28", type: "FUT" } ],


  // FO · CE

  [ "WIPRO23NOV397.5CE", { script: "WIPRO", exp: "23NOV", expiry:"2023-11-30", strike: 397.5, type: "CE" } ],
  [ "WIPRO23NOV400CE",   { script: "WIPRO", exp: "23NOV", expiry:"2023-11-30", strike: 400  , type: "CE" } ],
  [ "WIPRO23NOV402.5CE", { script: "WIPRO", exp: "23NOV", expiry:"2023-11-30", strike: 402.5, type: "CE" } ],

  // [ "NIFTY23D0720000CE", { script: "NIFTY", exp: "23D07", expiry: "2023-12-07", strike: 20000, type: "CE" } ], // weekly
  // [ "NIFTY23D1420000CE", { script: "NIFTY", exp: "23D14", expiry: "2023-12-14", strike: 20000, type: "CE" } ], // weekly
  // [ "NIFTY23D2120000CE", { script: "NIFTY", exp: "23D21", expiry: "2023-12-21", strike: 20000, type: "CE" } ], // weekly
  [ "NIFTY23DEC20000CE", { script: "NIFTY", exp: "23DEC", expiry: "2023-12-28", strike: 20000, type: "CE" } ],

  // [ "BANKNIFTY23D0645000CE", { script: "BANKNIFTY", exp: "23D06", expiry: "2023-12-06", strike: 450000, type: "CE" } ], // weekly
  // [ "BANKNIFTY23D1345000CE", { script: "BANKNIFTY", exp: "23D13", expiry: "2023-12-13", strike: 450000, type: "CE" } ], // weekly
  // [ "BANKNIFTY23D2045000CE", { script: "BANKNIFTY", exp: "23D20", expiry: "2023-12-20", strike: 450000, type: "CE" } ], // weekly
  [ "BANKNIFTY23DEC45000CE", { script: "BANKNIFTY", exp: "23DEC", expiry: "2023-12-28", strike: 45000, type: "CE" } ],

  // [ "FINNIFTY23D0520000CE", { script: "FINNIFTY", exp: "23D05", expiry: "2023-12-05", strike: 20000, type: "CE" } ], // weekly
  // [ "FINNIFTY23D1220000CE", { script: "FINNIFTY", exp: "23D14", expiry: "2023-12-14", strike: 20000, type: "CE" } ], // weekly
  // [ "FINNIFTY23D1920000CE", { script: "FINNIFTY", exp: "23D19", expiry: "2023-12-19", strike: 20000, type: "CE" } ], // weekly
  [ "FINNIFTY23DEC20000CE", { script: "FINNIFTY", exp: "23DEC", expiry: "2023-12-26", strike: 20000, type: "CE" } ],


  // FO · PE

  [ "ITC23NOV432.5PE", { script: "ITC", exp: "23NOV", expiry:"2023-11-30", strike: 432.5, type: "PE" } ],
  [ "ITC23NOV435PE",   { script: "ITC", exp: "23NOV", expiry:"2023-11-30", strike: 435  , type: "PE" } ],
  [ "ITC23NOV437.5PE", { script: "ITC", exp: "23NOV", expiry:"2023-11-30", strike: 437.5, type: "PE" } ],

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

