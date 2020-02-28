'use strict';

var userMeals = [];
var userExercise = [];
var userToDo = [];
var mainUsersArr = [];
var cIdx;

//constructor for user
function UserData(userName, userMeals, userExercise, userToDo) {
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

  userExercise.push(this);

}
//contructor for users to do list
function ToDo(name) {
  this.title = name;
  this.list = [];
  userToDo.push(this);
}

//function to look for existing user name
function findUser(name) {
  var existingUser = false;
  for (var i = 0; i < mainUsersArr.length; i++) {
    if (name === mainUsersArr[i].userName) {
      console.log('Welcome back dude');
      existingUser = true;
      cIdx = i;
      break;
    }
  } 
  if (existingUser === false) {
    console.log('New user hola');
    new UserData(name);
    cIdx = mainUsersArr.length -1;
  }
  console.log(cIdx);
}
// //Event to get user name from input
// var userNameEvent = document.getElementById('formUserName');
// userNameEvent.addEventListener('submit', handleSubmit);
// function handleSubmit(e) {

//   // onclick;
//   e.preventDefault();
//   var newUser = e.target.userName.value;
//   findUser(newUser);
//   toLocalStorage();
//   // window.location.href = 'main.html';
// }


function toLocalStorage(){
  var stringArr = JSON.stringify(mainUsersArr);
  localStorage.setItem('swMainUsers', stringArr);
  var currUser = JSON.stringify(cIdx);
  localStorage.setItem('CurrentUser', currUser);
}
function populateUsers(){
  if (localStorage.getItem('swMainUsers')) {

    console.log('there is something in local storage');
    var allStoredUsers = JSON.parse(localStorage.getItem('swMainUsers'));
    // console.log(mainUsersArr);
    // console.log(allStoredUsers);
    for (var i = 0; i < allStoredUsers.length; i++) {
      new UserData(allStoredUsers[i].userName, allStoredUsers[i].Meals, allStoredUsers[i].Exercise, allStoredUsers[i].ToDo);
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

// // Global Variables of Elements Needed
// var applyTask = document.getElementById('addNewTask_Form');
// var taskCategory = document.getElementById('taskCategory');
// var timeDropdown = document.getElementById('daytimeSelected');
// var dropDownSection = document.getElementById('timeOfDay_Dropdown');

// //EVENT: Apply li to the Weekly Planner based on Days checked
// // - the time of day selected will place in the corresponding ul
// // - adds the task name to the li
// // - gives the li an ID of: '[Category]Task' - for styling
// //============================================================
// applyTask.addEventListener('submit', findDaysApplied);

// function findDaysApplied(e){
//   e.preventDefault();
//   var category = e.target.taskCategory.value;
//   var timeOfDay = e.target.daytimeSelected.value;
//   var taskEntered = e.target.taskEntered.value;

//   for(var x = 1; x <= 7; x++){

//     var dayChecked = document.getElementById(`day${x}_chkbx`);
//     var postSection  = document.getElementById(`day${x}_${timeOfDay}`);

//     if (dayChecked.checked){
//       var taskItem = document.createElement('li');
//       taskItem.textContent = `${taskEntered}`;
//       taskItem.id = `${category}Task`;
//       postSection.appendChild(taskItem);
//     }
//   }

//   applyTask.reset();
//   dropDownSection.style.display = 'none';
// }
// //https://www.w3schools.com/howto/howto_js_todolist.asp


// //EVENT: Show/Hide Time of Day Dropdown Menu
// // - This event will also populate the dropdown
// // - based off the Category selected.  This gives the
// // - option for the Meals to be different.
// // - Checkbox value is still the same to coincide with the planner lists
// //=================================================
// taskCategory.addEventListener('change', dayDropdownList);

// function dayDropdownList(e){
//   e.preventDefault();
//   var cat = taskCategory.value;
//   var mealArr = ['Breakfast','Lunch','Dinner'];
//   var valueArr = ['morning','afternoon','evening'];

//   while(timeDropdown.childElementCount > 0) {
//     timeDropdown.removeChild(timeDropdown.lastElementChild);
//   }

//   if(cat === 'Meal'){
//     dropDownSection.style.display = 'inline-flex';
//     for(var i = 0; i<mealArr.length; i++){
//       var selection = document.createElement('option');
//       selection.textContent = mealArr[i];
//       selection.value = valueArr[i];
//       timeDropdown.appendChild(selection);
//     }
//   } else if (cat === ''){
//     dropDownSection.style.display = 'none';
//     while(timeDropdown.childElementCount > 0) {
//       timeDropdown.removeChild(timeDropdown.lastElementChild);
//     }
//   }else {
//     dropDownSection.style.display = 'inline-flex';
//     for(var j = 0; j<valueArr.length; j++){
//       selection = document.createElement('option');
//       selection.textContent = valueArr[j];
//       selection.value = valueArr[j];
//       timeDropdown.appendChild(selection);
//     }
//   }
// }




