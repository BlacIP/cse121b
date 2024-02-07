/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name: "Boluwatife Adebiyi Omotoyinbo",
    photo: 'images/my_image.jpeg',
    favoriteFoods: ['Pizza', 'Ice Cream', 'Sushi', 'Pasta'],
    hobbies: ["Reading", "Design", "Movies" ],
    placesLived: []
};


/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push({
    place: "Lagos, Nigeria",
    length: "5 years"
});
myProfile.placesLived.push({
    place: "Ibadan, Nigeria",
    length: "17 years"
});

myProfile.placesLived.push({
    place: "Ekiti, Nigeria",
    length: "3 years"
});



/* DOM Manipulation - Output */

/* Name */
document.querySelector('#name').textContent = myProfile.name

/* Photo with attributes */
document.querySelector('#photo').src = myProfile.photo;
document.querySelector('#photo').alt = myProfile.name;

/* Favorite Foods List*/
myProfile.favoriteFoods.forEach(food => {
   let li = document.createElement('li');
    li.textContent = food;
    document.querySelector('#favorite-foods').appendChild(li);
});


/* Hobbies List */
myProfile.hobbies.forEach(hobbies => {
    let li = document.createElement('li');
     li.textContent = hobbies;
     document.querySelector('#hobbies').appendChild(li);
 });

/* Places Lived DataList */
let dl = document.querySelector('#places-lived');
myProfile.placesLived.forEach(location => {
    // Create <dt> element for the place
    let dt = document.createElement('dt');
    dt.textContent = location.place;

    // Create <dd> element for the length
    let dd = document.createElement('dd');
    dd.textContent = location.length;

    // Append <dt> and <dd> to <dl>
    dl.appendChild(dt);
    dl.appendChild(dd);
});

