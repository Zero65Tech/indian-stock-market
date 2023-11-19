const { info, expiry } = require("../src/index");

// TESTING .info()
const symbolsArray = [
  /* [
       symbol test case, 
       { expected output }
     ] 
  */

  [
    "BANKNIFTY23APR40000PE",
    { script: "BANKNIFTY", expiry: "23APR", strike: 40000, type: "PE" },
  ],
  [
    "BANKNIFTY20N0523500PE",
    { script: "BANKNIFTY", expiry: "20N05", strike: 23500, type: "PE" },
  ],
  [
    "COALINDIA21JUL142.5PE",
    { script: "COALINDIA", expiry: "21JUL", strike: 142.5, type: "PE" },
  ],
  [
    "BANKNIFTY23D0643000PE",
    { script: "BANKNIFTY", expiry: "23D06", strike: 43000, type: "PE" },
  ],
  ["M21OCT720PE", { script: "M", expiry: "21OCT", strike: 720, type: "PE" }],

  [
    "RELIANCE23APR2300CE",
    { script: "RELIANCE", expiry: "23APR", strike: 2300, type: "CE" },
  ],
  [
    "654GS203223NOV91.5CE",
    { script: "654GS2032", expiry: "23NOV", strike: 91.5, type: "CE" },
  ],

  ["RELIANCE23NOVFUT", { script: "RELIANCE", expiry: "23NOV", type: "FUT" }],

  ["WIPRO", { script: "WIPRO" }],
  ["TCS", { script: "TCS" }],
  ["RELIANCE", { script: "RELIANCE" }],
];

describe(".info() Testing", () => {
  symbolsArray.forEach((i) => {
    test(`${i[0]} test case`, () => {
      expect(info(i[0])).toStrictEqual(i[1]);
    });
  });
});

// TESTING .expiry()
const expiryArray = [
  //[test case, expected output]
  ["20NOV", "2020-11-26"],
  ["23APR", "2023-04-27"],
  ["11OCT", "2011-10-26"],
];

describe(".expiry() Testing", () => {
  expiryArray.forEach((i) => {
    test(`${i[0]} test case`, () => {
      expect(expiry(i[0])).toBe(i[1]);
    });
  });
});
