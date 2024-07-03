import { formatCurreny } from "../scripts/utils/money.js";

describe("test suite : formatCurrency ", () => {
  it("converts cents into dollars", () => {
    expect(formatCurreny(3098)).toEqual("30.98");
  });

  it("works with 0", () => {
    expect(formatCurreny(0)).toEqual("0.00");
  });

  it("rounds up to the nearest cent", () => {
    expect(formatCurreny(3409.9)).toEqual("34.10");
  });
});
