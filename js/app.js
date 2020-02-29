'use strict';

var userMeals = [];
var userExercise = [];
var userToDo = [];
var mainUsersArr = [];
var usersPlanner = [];
var cIdx;

//constructor for user
function UserData(userName, userMeals=[], userExercise=[], userToDo=[], usersPlanner=[]) {
  this.userName = userName;
  this.Meals = userMeals;
  this.Exercise = userExercise;
  this.ToDo = userToDo;
  this.Planner = usersPlanner;
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
  userExercise.push(this);
}

//contructor for users to do list
function ToDo(name) {
  this.title = name;
  this.list = [];
  userToDo.push(this);
}
//contructor for users set Planner
function TaskByDay (Day, category, Task, Time){
  this.day = Day;
  this.category = category;
  this.task = Task;
  this.time = Time;
  usersPlanner.push(this);
}

//function to look for existing user name
function findUser(name) {
  var existingUser = false;
  for (var i = 0; i < mainUsersArr.length; i++) {
    if (name === mainUsersArr[i].userName) {
      console.log('Welcome back dude');
      existingUser = true;
      localStorage.setItem('CurrentUser', JSON.stringify(i));
      break;
    }
  } 
  if (existingUser === false) {
    console.log('New user hola');
    new UserData(name);
    localStorage.setItem('CurrentUser', JSON.stringify(mainUsersArr.length -1)); 
  }
  console.log(cIdx);
}

cIdx = JSON.parse(localStorage.getItem('CurrentUser'));


function toLocalStorage(){
  var stringArr = JSON.stringify(mainUsersArr);
  localStorage.setItem('swMainUsers', stringArr);
  // var currUser = JSON.stringify(cIdx);
  // localStorage.setItem('CurrentUser', JSON.stringify(cIdx));
}
function populateUsers(){
  if (localStorage.getItem('swMainUsers')) {

    console.log('there is something in local storage');
    var allStoredUsers = JSON.parse(localStorage.getItem('swMainUsers'));
    // console.log(mainUsersArr);
    // console.log(allStoredUsers);
    for (var i = 0; i < allStoredUsers.length; i++) {
      new UserData(allStoredUsers[i].userName, allStoredUsers[i].Meals, allStoredUsers[i].Exercise, allStoredUsers[i].ToDo, allStoredUsers[i].TaskByDay);
    }


  } else {
    console.log('there is no local storage');
    new Meals('pasta');
    new Meals('protein shake');
    new Exercise('crossfit');
    new Exercise('yoga');
    new UserData('Chuck', userMeals);
    new UserData('Cassandra',[],userExercise);
    new UserData('Lesley', userMeals, userExercise);
    new UserData('Rich', userMeals, userExercise);
  }
}

populateUsers();