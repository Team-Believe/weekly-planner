'use strict';

var headerName = document.getElementById('headerWelcome');
var detailedItem = JSON.parse(localStorage.getItem('detailItem'));
var catList = document.getElementById('categoryList');
var detailSection = document.getElementById('infoSection');
var detailForm = document.getElementById('detailedInfo');
var detailHeader = document.getElementById('detailHeader');
var btnAddNewToDo;
var cat = detailedItem[0];
var title = detailedItem[1];
var showIndex;

headerName.textContent = `${mainUsersArr[cIdx].userName}'s ${cat} Items`;
document.getElementById('taskCat').value = cat;

// Sets the Search Array based on the category
// saved in local storage
switch(cat){
case 'Meals':
  var SearchArr = mainUsersArr[cIdx].Meals;
  renderCatList(SearchArr, title);
  renderDetailItem(SearchArr,title);
  break;
case 'Exercise':
  SearchArr = mainUsersArr[cIdx].Exercise;
  renderCatList(SearchArr, title);
  renderDetailItem(SearchArr,title);
  break;
case 'ToDo':
  SearchArr = mainUsersArr[cIdx].ToDo;
  renderCatList(SearchArr, title);
  setupToDo(SearchArr, title);
  break;
default:
  SearchArr = [];
}

// adds the specific Category Information
// to the side list of the detail page
function renderCatList(arr, task){
  for(var x = 0; x < arr.length; x++){
    var listItem = document.createElement('li');
    listItem.textContent = arr[x].title;
    catList.appendChild(listItem);
    if(arr[x].title === task){
      detailedItem.push(x);
      localStorage.setItem('detailItem',JSON.stringify(detailedItem));
      showIndex = x;
    }
  }
}

var saveInfo = document.getElementById('saveInfo');

saveInfo.addEventListener('click', saveTaskInfo);

function saveTaskInfo(e){
  e.preventDefault();
  var objKey = Object.keys(SearchArr[showIndex]);
  var objValues = Object.values(SearchArr[showIndex]);

  for(var k = 1; k<objKey.length; k++){
    var objType = typeof objValues[k];
    if (objType === 'object'){
      var countDiv = document.getElementById(`${objKey[k]}`).childElementCount;
      for(var d = 0; d<countDiv; d++){
        var elID = `${objKey[k]}_${d}`;
        var inputFld = document.getElementById(elID);
        var objAddEl = eval(`SearchArr[${showIndex}].${objKey[k]}`);
        objAddEl[d] = inputFld.value;
      }
    } else {
      elID = `${objKey[k]}`;
      inputFld = document.getElementById(elID);
      var inputNum = getTimeMinutes(inputFld.value);
      SearchArr[showIndex][elID] = inputNum;
    }
  }
  toLocalStorage();
}

// EVENT: call the correct function to render detail
// -- based off the category selected
catList.addEventListener('click',showTaskInfo);

function showTaskInfo(e){
  var task = e.target.innerText;
  findTaskIndex(SearchArr, task);
  var lkupCat = detailedItem[0];

  if(lkupCat === 'ToDo'){
    setupToDo(SearchArr, task);
  } else {
    renderDetailItem(SearchArr,task);
  }
}

// Searches the selected task
// -- adds info to `detailedItem`
// -- sets to local storage
function findTaskIndex(arr, task){
  var lkupCat = detailedItem[0];
  detailedItem = [];
  for(var x = 0; x < arr.length; x++){
    if(arr[x].title === task){
      detailedItem[0] = lkupCat;
      detailedItem[1] = task;
      detailedItem[2] = x;
      localStorage.setItem('detailItem',JSON.stringify(detailedItem));
      showIndex = x;
      // break;
    }
  }
}

// EVENT: add in new array input box
detailSection.addEventListener('click',addInput);

function addInput(e){
  var clkSect = e.target.id;

  if(clkSect === null ||clkSect === '' || clkSect.search('add_') < 0){
    detailForm.removeEventListener('click',addInput);
  } else {
    e.preventDefault();
    var sect = clkSect.substr(4, clkSect.length);
    var addToDiv = document.getElementById(`${sect}`);
    var sectCt = addToDiv.childElementCount;
    var newInput = document.createElement('input');
    newInput.id = `${sect}_${sectCt}`;
    addToDiv.appendChild(newInput);
  }
}

// add the information to the detail section
// based off the key/value pairs listed in the
// specific objects (Meals/Exercises)
function renderDetailItem(arr,task){
  var objKeys = Object.keys(arr[showIndex]);
  var objValues = Object.values(arr[0]);

  // Removes all previous listed div elements
  while(detailSection.childElementCount > 0) {
    detailSection.removeChild(detailSection.lastElementChild);
  }

  document.getElementById('titleName').textContent = task;

  //Loops through each Key of the Object
  for(var x = 1; x < objKeys.length; x++){
    var objType = typeof objValues[x]; //Gets the object value
    var elID = `${objKeys[x]}`;
    console.log(`elID: ${elID}`);
    // Sets up the Label (if Not a ToDO List: Meals/Exercise)
    //--creates element id: ex: 'lbl_Exercise'
    //--appends to the div:'infoSection'
    var keyLabel = document.createElement('label');
    keyLabel.textContent = objKeys[x];
    keyLabel.class = `lbl_${objKeys[x]}`;
    detailSection.appendChild(keyLabel);

    // Loops through the value if it is an array/object
    if (objType === 'object'){

      var divInput = document.createElement('div');
      divInput.id = `${objKeys[x]}`;
      detailSection.appendChild(divInput);

      //sets objLen to 1, if nothing is listed
      var objLen = Object.values(objValues[x]).length;
      if(objLen === 0){objLen=1;}

      //Loops through the Key Array value, sets up Input Box
      for(var y = 0; y < objLen; y++){
        var arrInput = document.createElement('input');
        console.log('hopeful Value:' + SearchArr[showIndex][elID][y]);
        // arrInput.textContent = Object.values(objValues[x])[y];
        arrInput.id = `${objKeys[x]}_${y}`;
        arrInput.className = `arr_${objKeys[x]}`;
        divInput.appendChild(arrInput);
        arrInput.textContent = SearchArr[showIndex][elID][y];
      }
      //Create the Add button for the array
      var addBtn = document.createElement('button');
      addBtn.textContent = '+';
      addBtn.id = `add_${objKeys[x]}`;
      keyLabel.appendChild(addBtn);

    } else { //Create the label with input value
      var xKey = `${objKeys[x]}`;
      var valueInput = document.createElement('input');
      if(xKey === 'prepTime' || xKey === 'cookedTime'){
        console.log('passthrough:' + SearchArr[showIndex][elID]);
        var txt = returnTime(SearchArr[showIndex][elID]);
      } else {
        txt = SearchArr[showIndex][elID];
      }
      console.log(txt);
      valueInput.id = `${objKeys[x]}`;
      keyLabel.appendChild(valueInput);
      valueInput.textContent = txt;
    }
  }
}

// add the information to the detail section
// based off the key/value pairs listed in the
// (ToDo Lists)
function setupToDo(arr, title){
  var listCt = arr[showIndex].list.length;
  document.getElementById('titleName').textContent = title;

  // If the AddNew div section has NOT been setup
  // -- it adds in the div/input/button
  if(document.getElementById('addNewDetailTask') === null){
    var newItemSect = document.createElement('div');
    newItemSect.className = 'addNewToDo';
    detailHeader.appendChild(newItemSect);
    var newInput = document.createElement('input');
    newInput.placeholder = 'Enter New Task';
    newInput.id = 'addNewTask';
    newItemSect.appendChild(newInput);
    btnAddNewToDo = document.createElement('button');
    btnAddNewToDo.textContent = 'Add Task';
    btnAddNewToDo.id = 'addNewDetailTask';
    newItemSect.appendChild(btnAddNewToDo);
  } else {
    // if the AddNew section already setup
    // -- removes all the previous elements listed
    while(detailSection.childElementCount > 0) {
      detailSection.removeChild(detailSection.lastElementChild);
    }
  }
  // Loops through the list length
  // --adds in a Div with 2 boxes/paragraph
  // -- setup for check/delete options
  for(var x = 0; x < listCt; x++){
    var itemDiv = document.createElement('div');
    itemDiv.className = `list_${x}`;
    detailSection.appendChild(itemDiv);
    var arrItem = document.createElement('p');
    arrItem.textContent = arr[showIndex].list[x];
    itemDiv.appendChild(arrItem);

    var itemDelete = document.createElement('div');
    itemDelete.textContent = 'X';
    itemDelete.id = 'toDoDelete';
    itemDiv.appendChild(itemDelete);
  }
}


// ADD_NEW: To Do task
if(document.getElementById('addNewDetailTask') !== null){
  btnAddNewToDo.addEventListener('click',addDivToDO);
}

function addDivToDO(e){
  e.preventDefault();
  var taskCt = detailSection.childElementCount;
  var itemDiv = document.createElement('div');
  itemDiv.className = `list_${taskCt}`;
  detailSection.appendChild(itemDiv);
  var arrItem = document.createElement('p');
  arrItem.textContent = document.getElementById('addNewTask').textContent;
  itemDiv.appendChild(arrItem);

  var itemDelete = document.createElement('div');
  itemDelete.textContent = 'X';
  itemDelete.id = 'toDoDelete';
  itemDiv.appendChild(itemDelete);
}

function getTimeMinutes(str){
  var txt = str.toLowerCase();
  if(txt.search('h')>=0){
    var t = txt.slice(0,txt.search('h'));
    t = Number(t.trim(t));
    t = t * 60;
  }else if(txt.search('m')>=0){
    t = txt.slice(0,txt.search('m'));
    t = Number(t.trim(t));
  } else if(txt.search('d')>=0){
    t = txt.slice(0,txt.search('d'));
    t = t * 1440;
  } else{
    t = Number(txt);
  }
  return t;
}

function returnTime(num){
  if (num >= 1440){
    var t = num/1440;
    var len = `${t} day(s)`;
  } else if (num >= 60){
    t = num/60;
    len = `${t} hours`;
  } else {
    len = `${t} min`;
  }
  return len;
}
