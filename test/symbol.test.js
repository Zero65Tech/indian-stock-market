const { info, expiry } = require("../src/index");

/*

  .info(symbol) Testing

*/

const infoTestCases = [
  // EQ

  ["RELIANCE", { script: "RELIANCE" }], // Ends with "CE"
  ["TCS", { script: "TCS" }],
  ["WIPRO", { script: "WIPRO" }],

  // FO · FUT

  ["RELIANCE23NOVFUT", { script: "RELIANCE", expiry: "23NOV", type: "FUT" }],

  // FO · CE

  [
    "RELIANCE23APR2300CE", // Stock, Monthly Expiry
    { script: "RELIANCE", expiry: "23APR", strike: 2300, type: "CE" },
  ],
  [
    "654GS203223NOV91.5CE", // ??, Monthly Expiry
    { script: "654GS2032", expiry: "23NOV", strike: 91.5, type: "CE" },
  ],

  // FO · PE

  [
    "BANKNIFTY23APR40000PE", // Index, Monthly Expiry
    { script: "BANKNIFTY", expiry: "23APR", strike: 40000, type: "PE" },
  ],
  [
    "BANKNIFTY23D0643000PE", // Index, ??
    { script: "BANKNIFTY", expiry: "23D06", strike: 43000, type: "PE" },
  ],
  [
    "BANKNIFTY20N0523500PE", // Index, ??
    { script: "BANKNIFTY", expiry: "20N05", strike: 23500, type: "PE" },
  ],
  [
    "COALINDIA21JUL142.5PE", // Stock, Monthly Expiry
    { script: "COALINDIA", expiry: "21JUL", strike: 142.5, type: "PE" },
  ],
];

describe(".info(symbol)", () => {
  for (let [symbol, output] of infoTestCases)
    test(symbol, () => expect(info(symbol)).toStrictEqual(output));
});

/*

  .expiry(ddmon) Testing

*/

const expiryTestCases = [
  ["23JUN", "2023-06-28"], // Wed
  ["23SEP", "2023-09-28"], // Thu
  ["23NOV", "2023-11-30"], // Thu
];

describe(".expiry(ddmon)", () => {
  for (let [ddmon, date] of expiryTestCases)
    test(ddmon, () => expect(expiry(ddmon)).toBe(date));
});
