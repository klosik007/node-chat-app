var array = ['Jen', 'Kate', 'Mariah', 'Jon', 'Jenny'];
var userIndex = 4;
var newArray = array.slice(0, userIndex).concat(array.slice(userIndex+1));

console.log(newArray);