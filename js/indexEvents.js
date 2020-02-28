'use strict';
//function to look for existing user name
// function findUser(name) {
//   var existingUser = false;
//   for (var i = 0; i < mainUsersArr.length; i++) {
//     if (name === mainUsersArr[i].userName) {
//       console.log('Welcome back dude');
//       existingUser = true;
//       cIdx = i;
//       break;
//     }
//   }
//   if (existingUser === false) {
//     console.log('New user hola');
//     new UserData(name);
//     cIdx = mainUsersArr.length -1;
//   }
// }

//Event to get user name from input
var userNameEvent = document.getElementById('formUserName');
userNameEvent.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  var newUser = e.target.userName.value;
  findUser(newUser);
  toLocalStorage();
  window.location.href = 'main.html';
}