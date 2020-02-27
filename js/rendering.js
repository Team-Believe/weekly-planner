'use strict';

// var userMeals = [];
// var userExercise = [];
// var userToDo = [];
// var mainUsersArr = [];

var applyTask = document.getElementById('addNewTask_Form');
var taskCategory = document.getElementById('taskCategory');
var timeDropdown = document.getElementById('daytimeSelected');

applyTask.addEventListener('submit', findDaysApplied);

function findDaysApplied(e){
  e.preventDefault();
  var category = e.target.taskCategory.value;
  var timeOfDay = e.target.daytimeSelected.value;
  var taskEntered = e.target.taskEntered.value;

  console.log('inside event');

  for(var x = 1; x <= 7; x++){

    var dayChecked = document.getElementById(`day${x}_chkbx`);
    var postSection  = document.getElementById(`day${x}_${timeOfDay}`);

    if (dayChecked.checked){
      var taskItem = document.createElement('li');
      taskItem.textContent = `${taskEntered}`;
      postSection.appendChild(taskItem);
      console.log(`day${x} is checked!  category:${category} and TaskTime: ${timeOfDay} --- taskEntered:${taskEntered}`);
      dayChecked.uncheck;
    }
  }

  taskEntered = '';
  category = '';

}




//EVENT: Show/Hide Time of Day Dropdown Menu
// - This event will also populate the dropdown
// - based off the Category selected.  This gives the
// - option for the Meals to be different.
// - Checkbox value is still the same to coincide with the planner lists
//=================================================
taskCategory.addEventListener('change', dayDropdownList);

function dayDropdownList(e){
  e.preventDefault();
  var cat = taskCategory.value;
  var dropDownSection = document.getElementById('timeOfDay_Dropdown');

  var mealArr = ['Breakfast','Lunch','Dinner'];
  var valueArr = ['morning','afternoon','evening'];

  while(timeDropdown.childElementCount > 0) {
    timeDropdown.removeChild(timeDropdown.lastElementChild);
  }

  if(cat === 'Meal'){
    dropDownSection.style.display = 'inline-flex';
    for(var i = 0; i<mealArr.length; i++){
      var selection = document.createElement('option');
      selection.textContent = mealArr[i];
      selection.value = valueArr[i];
      timeDropdown.appendChild(selection);
    }
  } else if (cat === ''){
    dropDownSection.style.display = 'none';
    while(timeDropdown.childElementCount > 0) {
      timeDropdown.removeChild(timeDropdown.lastElementChild);
    }
  }else {
    dropDownSection.style.display = 'inline-flex';
    for(var j = 0; j<valueArr.length; j++){
      selection = document.createElement('option');
      selection.textContent = valueArr[j];
      selection.value = valueArr[j];
      timeDropdown.appendChild(selection);
    }
  }
}
