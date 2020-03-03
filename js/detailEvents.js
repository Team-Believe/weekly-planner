'use strict';

var headerName = document.getElementById('headerWelcome');
var detailedItem = JSON.parse(localStorage.getItem('detailItem'));
var catList = document.getElementById('categoryList');
var detailSection = document.getElementById('infoSection');
var cat = detailedItem[0];
var title = detailedItem[1];
var showIndex;

headerName.textContent = `${mainUsersArr[cIdx].userName}'s ${cat} Items`;

// Sets the Search Array based on the category 
// saved in local storage
switch(cat){
case 'Meals':
  var SearchArr = mainUsersArr[cIdx].Meals;
  break;
case 'Exercise':
  SearchArr = mainUsersArr[cIdx].Exercise;
  break;
case 'ToDo':
  SearchArr = mainUsersArr[cIdx].ToDo;
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
    if(arr[x].title === task){showIndex = x;}
  }
}

renderCatList(SearchArr, title);

// add the information to the detail section
// based off the key/value pairs listed in the 
// specific object
function renderDetailItem(arr){
  var objKeys = Object.keys(arr[0]);
  var objValues = Object.values(arr[0]);

  for(var x = 1; x < objKeys.length; x++){
    var objType = typeof objValues[x];
    
    // Sets up the Label (if Not a ToDO List)
    if(cat!== 'ToDo'){
      var keyLabel = document.createElement('label');
      keyLabel.textContent = objKeys[x];
      keyLabel.id = `lbl_${objKeys[x]}`;
      detailSection.appendChild(keyLabel);
    }

    // Loops through the value if it is an array/object
    if (objType === 'object'){
      var objLen = Object.values(objValues[x]).length;
      if(objLen === 0){objLen=1;}

      for(var y = 0; y < objLen; y++){

        var arrInput = document.createElement('input');
        // If ToDo List -- creates the Checkbox Before the Label
        if (cat === 'ToDo'){
          arrInput.type = "checkbox";
          keyLabel = document.createElement('label');
          keyLabel.textContent = objKeys[x];
          keyLabel.id = `lbl_${objKeys[x]}`;
          arrInput.appendChild(keyLabel);
          detailSection.appendChild(arrInput);
          // if last list item - adds a button to add more
          if(y === objLen - 1){
            var btnAdd = document.createElement('button');
            btnAdd.id = `toDoAdd`;
            btnAdd.textContent = '+ LI';
            detailSection.appendChild(btnAdd);
          }
        } else {
          arrInput.textContent = Object.values(objValues[x])[y];
          arrInput.id = `arr_${objKeys[x]}`;
          keyLabel.appendChild(arrInput);
        }

      }

      var addBtn = document.createElement('button');
      addBtn.textContent = '+';
      addBtn.id = 'addInput';
      keyLabel.appendChild(addBtn);

    } else {
      var valueInput = document.createElement('input');
      valueInput.textContent = objValues[x];
      valueInput.id = `input_${objKeys[x]}`;
      keyLabel.appendChild(valueInput);
    }
  }
}

renderDetailItem(SearchArr);

var saveInfo = document.getElementById('saveInfo');

saveInfo.addEventListener('click', saveTaskInfo);

function saveTaskInfo(e){

}

catList.addEventListener('click',showTaskInfo);

function showTaskInfo(e){
  console.log(e.target.innerText);
}