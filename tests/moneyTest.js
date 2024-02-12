import {formatCurrency} from "../scripts/utils/money.js";

// Note : Groups of related test are called test suite

console.log('Test suite : format currency');

// Basic test case
console.log('Converts cents into dollars');

if(formatCurrency(2095) === '20.95'){
  console.log('Passed');
}
else{
  console.log('Failed');
}

// Edge test case
console.log('works with 0');

if(formatCurrency(0) === '0.00'){
  console.log('Passed');
}
else{
  console.log('Failed');
}

console.log('Rounds up to nearest cents');

if(formatCurrency(2000.5) === '20.01'){
  console.log('Passed');
}
else{
  console.log('Failed');
}

console.log('Rounds up to nearest cents');

if(formatCurrency(2000.4) === '20.00'){
  console.log('Passed');
}
else{
  console.log('Failed');
}