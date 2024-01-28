/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add ( number1, number2) {
    return number1 + number2;
}
function addNumbers() {
    let addNumber1 = Number(document.querySelector('#add1').value);
    let addNumber2 = Number(document.querySelector('#add2').value);

    document.querySelector('#sum').value = add(addNumber1, addNumber2);
}
document.querySelector('#addNumbers').addEventListener('click', addNumbers);

/* Function Expression - Subtract Numbers */
const subtract = function(number1, number2) {
    return number1 - number2;
};
const subtractNumbers = function() {
    let subNumber1 = Number(document.querySelector('#subtract1').value);
    let subNumber2 = Number(document.querySelector('#subtract2').value);

    document.querySelector('#difference').value = subtract(subNumber1, subNumber2);
};
document.querySelector('#subtractNumbers').addEventListener('click', subtractNumbers);

/* Arrow Function - Multiply Numbers */
const multiply = (number1, number2) => number1 * number2;
const multiplyNumbers = () => {
    let factor1 = Number(document.querySelector('#factor1').value);
    let factor2 = Number(document.querySelector('#factor2').value);

    document.querySelector('#product').value = multiply(factor1, factor2);
};
document.querySelector('#multiplyNumbers').addEventListener('click', multiplyNumbers);


/* Open Function Use - Divide Numbers */
function divide(dividend, divisor) {
    if (divisor === 0) {
        return 'Error: Division by zero'; // Handle division by zero
    }
    return dividend / divisor;
}
const divideNumbers = () => {
    let dividend = Number(document.querySelector('#dividend').value);
    let divisor = Number(document.querySelector('#divisor').value);

    document.querySelector('#quotient').value = divide(dividend, divisor);
};
document.querySelector('#divideNumbers').addEventListener('click', divideNumbers);


/* Decision Structure */
document.querySelector('#getTotal').addEventListener('click', function() {
    let subtotal = Number(document.querySelector('#subtotal').value);
    let isMember = document.querySelector('#member').checked;
    let total = isMember ? subtotal * 0.8 : subtotal; // Apply 20% discount if a member

    document.querySelector('#total').textContent = `Total Due: $${total.toFixed(2)}`;
});


/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let arrayString = numbersArray.join(', ');
document.querySelector('#array').textContent = arrayString;


/* Output Odds Only Array */
let oddNumbers = numbersArray.filter(num => {
  return num % 2 !== 0;  
});

document.querySelector('#odds').innerHTML = oddNumbers;

/* Output Evens Only Array */
let evenNumbers = numbersArray.filter(number => {
    return number % 2 === 0; 
  });
  
  document.querySelector('#evens').innerHTML = evenNumbers;

/* Output Sum of Org. Array */
let sum = numbersArray.reduce((sum, number) => {
    return sum + number;
  }, 0); 
  
  document.querySelector('#sumOfArray').textContent = sum;

/* Output Multiplied by 2 Array */
let multiplied = numbersArray.map(number => {
    return number * 2;  
  });
  
  document.querySelector('#multiplied').textContent = multiplied;

/* Output Sum of Multiplied by 2 Array */
let sumOfMultiplied = multiplied.reduce((acc, number) => {
    return acc + number;
  }, 0);
  
  document.querySelector('#sumOfMultiplied').textContent = sumOfMultiplied;