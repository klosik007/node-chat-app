var moment = require('moment');

var date = moment();
//console.log(date.format('MMM YYYY'));

// 9:00 pm
console.log(date.format('h:mm a'));

var sometimeStamp = moment().valueOf();
console.log(sometimeStamp);

var createdAt = 1000;
var date = moment(createdAt);
console.log(date.format('h:mm a'));