/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
const fullName = 'Boluwatife Adebiyi Omotoyinbo';
const currentYear = new Date().getFullYear();
let profilePicture = 'images/my_image.jpeg';




/* Step 3 - Element Variables */
const nameElement = document.getElementById('name');
const foodElement = document.getElementById('food');
const yearElement = document.querySelector('#year');
let imageElement = document.getElementsByTagName('img')[0];




/* Step 4 - Adding Content */
nameElement.innerHTML = `<strong>${fullName}</strong>`;
document.getElementById('year').textContent = currentYear;
imageElement.setAttribute('src', profilePicture);
imageElement.setAttribute('alt', `Profile image of ${fullName}`);






/* Step 5 - Array */
let favFoods = ['Pizza', 'Ice Cream', 'Sushi', 'Pasta'];
foodElement.innerHTML = favFoods.join(', ');

let anotherFavFood = 'Chocolate';
favFoods.push(anotherFavFood);
foodElement.innerHTML += `<br>${favFoods.join(', ')}`;

favFoods.shift();
foodElement.innerHTML += `<br>${favFoods.join(', ')}`;

favFoods.pop();
foodElement.innerHTML += `<br>${favFoods.join(', ')}`;






