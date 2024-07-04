import { formatCurreny } from "../../scripts/utils/money.js";
console.log("test suite : formatCurrency");

console.log("converts cents into dollars");
if (formatCurreny(3097) === "30.97") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("works with 0");
if (formatCurreny(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("rounds upto the nearest cent");
if (formatCurreny(3097.4) === "30.97") {
  console.log("passed");
} else {
  console.log("failed");
}
