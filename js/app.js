'use strict';

var userMeals = [];
var userExercise = [];
var userToDo = [];
var mainUsersArr = [];


//constructor for user
function UserData(userName) {
  this.userName = userName;
  // this.Meals = userMeals;
  // this.Exercise = userExercise;
  // this.ToDo = userToDo;
  mainUsersArr.push(this);

}

//constrcutor for user meals
// function Meals(name) {
//   this.title = name;
//   this.ingredients = [];
//   this.prepDirections = [];
//   this.servings = 0;
//   this.prepTime = 0;
//   this.cookedTime = 0;
//   userMeals.push(this);

// }

//constructor for users exercise
// function Exercise(name) {
//   this.title = name;
//   this.duration = 0;
//   this.typeOfExcercise = '';
//   this.reps = 0;
//   this.calsBurned = 0;
//   userMeals.push(this);

// }

//contructor for users to do list
// function ToDo(name) {
//   this.title = name;
//   this.list = [];
//   userMeals.push(this);

// }

//function to look for existing user name
// function findUser(name) {
//   for (var i = 0; i < mainUsersArr.length; i++) {
//     if (name === mainUsersArr[i].userName) {
//       alert(`Welcome Back ${name}`);
//       // break
//     } else {
//       alert('We need to create user');
//     }

//   }
// }

//Event to get user name from input 
var userNameEvent = document.getElementById('formUserName');



function handleSubmit(e) {
  console.log('Inside the handle submit')
  e.preventDefault();
  new UserData('Roger');
  console.log(e.target);
  var newUserOne = e.target.userName.value;
  new UserData(newUserOne);
  console.log(newUserOne);

};

// new Meals('pasta');
// new Meals('protein shake');
// new Exercise('crossfit');
// new Exercise('yoga');
new UserData('Chuck');
new UserData('Cassandra');
new UserData('Lesley');
new UserData('Rich')

// handleSubmit();
console.log('Stating Event Listener')
userNameEvent.addEventListener('sumbit', handleSubmit);