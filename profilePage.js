'use strict';

var allEvents = document.getElementById('userEventsChart');
var headerName = document.getElementById('headerWelcome');
headerName.textContent = `${mainUsersArr[cIdx].userName}'s Week`;

var updateName = document.getElementById('updateName');
updateName.addEventListener('submit', updateNmaeSubmit);
function updateNmaeSubmit(e) {
  e.preventDefault();
  var newName = e.target.newUserName.value;
  updateNameFindUser(newName);
  toLocalStorage();
}
function updateNameFindUser(name) {
  var existingUser = false;
  for (var i = 0; i < mainUsersArr.length; i++) {
    if (name.toLowerCase() === mainUsersArr[i].userName.toLowerCase()) {
      existingUser = true;
      Alert.render(`An account with username '${name}' already exist`);
      break;
    }
  }
  if (existingUser === false) {
    mainUsersArr[cIdx].userName = name;
    Alert.render(`Your username was successfully updated to '${name}'`);
    allEvents.textContent = `${mainUsersArr[cIdx].userName}'s Activities`;
    headerName.textContent = `${mainUsersArr[cIdx].userName} Profile`;
  }
}
function CustomAlert() {
  this.render = function(dialog) {
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var dialogoverlay = document.getElementById('dialogoverlay');
    var dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = 'block';
    dialogoverlay.style.height = winH+'px';
    dialogbox.style.left = (winW/2) - (550 * .5)+'px';
    dialogbox.style.top = '100px';
    dialogbox.style.display = 'block';
    document.getElementById('dialogboxhead').innerHTML = 'Username already in used';
    document.getElementById('dialogboxbody').innerHTML = dialog;
    document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
  };
  this.ok = function(){
    document.getElementById('dialogbox').style.display = 'none';
    document.getElementById('dialogoverlay').style.display = 'none';
  };
}
var Alert = new CustomAlert();
//In case we want to show a Profile Chart
function renderProfileChart() {
  var ctx = document.getElementById('profileChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Exercise', 'Meal', 'To Do', 'Activities'],
      datasets: [{
        label:'Exercise',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'teal',
          'coral',
          'yellow',
          'cornflowerblue'
        ],
        borderColor: [
          'black'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
