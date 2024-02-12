import {formatCurrency} from "../../scripts/utils/money.js";

// tests also called spec

describe('Test suite : formatCurrency',() => {
  // for naming function jsamine have it()
  it('Converts cents into dollars',() => {
    // jasime have expect() to compare values instead of using if..else
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0',() => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('Rounds up to nearest cents',() => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('Rounds up to nearest cents',() => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });
});
