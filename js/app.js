'use strict';

var userMeals = [];
var userExercise = [];
var userToDo = [];
var mainUsersArr = [];


//constructor for user
function UserData(userName) {
  this.userName = userName;
  this.Meals = userMeals;
  this.Exercise = userExercise;
  this.ToDo = userToDo;
  mainUsersArr.push(this);
}

//constrcutor for user meals
function Meals(name) {
  this.title = name;
  this.ingredients = [];
  this.prepDirections = [];
  this.servings = 0;
  this.prepTime = 0;
  this.cookedTime = 0;
  userMeals.push(this);
}

//constructor for users exercise
function Exercise(name) {
  this.title = name;
  this.duration = 0;
  this.typeOfExcercise = '';
  this.reps = 0;
  this.calsToBurn = 0;
  userMeals.push(this);
}

//contructor for users to do list
function ToDo(name) {
  this.title = name;
  this.list = [];
  userMeals.push(this);
}

//function to look for existing user name
function findUser(name) {
  var existingUser = false;
  for (var i = 0; i < mainUsersArr.length; i++) {
   if (name === mainUsersArr[i].userName) {
      console.log('Welcome back dude')
      existingUser = true;
      break;
    } 
  }
  if (existingUser === false) {
    console.log('New user hola')
    new UserData(name);
  }
}

//Event to get user name from input 
var userNameEvent = document.getElementById('formUserName');
userNameEvent.addEventListener('submit', handleSubmit);


function handleSubmit(e) {

  // Check if "Chuck is in the Main Arr users
  // if Chuck is there ...
  //  PopulateUsers()
  // pass through object index info
  // if Chuck is NOT there ...
  //  new UserData()
  //  toLocalStorage()
  onclick
  e.preventDefault();
  var newUser = e.target.userName.value;
  findUser(newUser);
  // new UserData(newUser);
  toLocalStorage();
}

// new Meals('pasta');
// new Meals('protein shake');
// new Exercise('crossfit');
// new Exercise('yoga');
// new UserData('Chuck');
// new UserData('Cassandra');
// new UserData('Lesley');
// new UserData('Rich');

function toLocalStorage(){
  var stringArr = JSON.stringify(mainUsersArr);
  localStorage.setItem('swMainUsers', stringArr);
}

function populateUsers(){
  if (localStorage.getItem('swMainUsers')) {
    console.log(`there is something in local storage`);
    var allStoredUsers = JSON.parse(localStorage.getItem('swMainUsers'));
    for (var i = 0; i < allStoredUsers.length; i++) {
      new UserData(allStoredUsers[i].userName);
    }
  } else {
      console.log(`there is no local storage`);
      new Meals('pasta');
      new Meals('protein shake');
      new Exercise('crossfit');
      new Exercise('yoga');
      new UserData('Chuck');
      new UserData('Cassandra');
      new UserData('Lesley');
      new UserData('Rich');
    }
}

populateUsers();