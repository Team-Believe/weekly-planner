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
  this.typeOf = '';
  this.reps = 0;
  this.calsBurned = 0;
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
  for (var i = 0; i < mainUsersArr.length; i++) {
    if (name === mainUsersArr[i].userName) {
      alert(`Welcome Back ${name}`);
    } else {
      alert('We need to create user');
    }

  }
}

new Meals('pasta');
new Meals('protein shake');
new Exercise('crossfit');
new Exercise('yoga');
new UserData('Chuck');
new UserData('Cassandra');
new UserData('Lesley');
