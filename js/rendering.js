'use strict';

// Global Variables of Elements Needed
var applyTask = document.getElementById('addNewTask_Form');
var taskCategory = document.getElementById('taskCategory');
var timeDropdown = document.getElementById('daytimeSelected');
var dropDownSection = document.getElementById('timeOfDay_Dropdown');

//EVENT: Apply li to the Weekly Planner based on Days checked
// - the time of day selected will place in the corresponding ul
// - adds the task name to the li
// - gives the li an ID of: '[Category]Task' - for styling
//============================================================
applyTask.addEventListener('submit', findDaysApplied);

function findDaysApplied(e){
  e.preventDefault();
  var category = e.target.taskCategory.value;
  var timeOfDay = e.target.daytimeSelected.value;
  var taskEntered = e.target.taskEntered.value;

  for(var x = 1; x <= 7; x++){

    var dayChecked = document.getElementById(`day${x}_chkbx`);
    var postSection  = document.getElementById(`day${x}_${timeOfDay}`);

    if (dayChecked.checked){
      var taskItem = document.createElement('li');
      taskItem.textContent = `${taskEntered}`;
      taskItem.id = `${category}Task`;
      postSection.appendChild(taskItem);
    }
  }

  applyTask.reset();
  dropDownSection.style.display = 'none';
}
//https://www.w3schools.com/howto/howto_js_todolist.asp


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
