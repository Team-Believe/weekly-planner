'use strict';

var userMeals = [];
var userExercise = [];
var userToDo = [];
var mainUsersArr = [];
var userPlanner = [];
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
  userPlanner.push(this);
}

//function to look for existing user name
function findUser(name) {
  var existingUser = false;
  for (var i = 0; i < mainUsersArr.length; i++) {
    if (name === mainUsersArr[i].userName) {
      existingUser = true;
      localStorage.setItem('CurrentUser', JSON.stringify(i));
      break;
    }
  } 
  if (existingUser === false) {
    new UserData(name);
    localStorage.setItem('CurrentUser', JSON.stringify(mainUsersArr.length -1)); 
  }
}

// Set Global variable of the Current user Index
cIdx = JSON.parse(localStorage.getItem('CurrentUser'));


function toLocalStorage(){
  var stringArr = JSON.stringify(mainUsersArr);
  localStorage.setItem('swMainUsers', stringArr);
}
function populateUsers(){
  if (localStorage.getItem('swMainUsers')) {
    var allStoredUsers = JSON.parse(localStorage.getItem('swMainUsers'));
    for (var i = 0; i < allStoredUsers.length; i++) {
      new UserData(allStoredUsers[i].userName, allStoredUsers[i].Meals, allStoredUsers[i].Exercise, allStoredUsers[i].ToDo, allStoredUsers[i].TaskByDay);
    }
  } else {
    new Meals('pasta');
    new Meals('protein shake');
    new Exercise('crossfit');
    new Exercise('yoga');
    new UserData('Chuck', userMeals, userExercise);
    new UserData('Cassandra',[],userExercise);
    new UserData('Lesley', userMeals, userExercise);
    new UserData('Rich', userMeals, userExercise);
  }
}

populateUsers();