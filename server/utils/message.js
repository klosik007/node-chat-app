var moment = require('moment');

var generateMessage = (from, text) =>{
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

var generateLocationMessage = (from, latitude, longtitude)=>{
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longtitude}`,
        createdAt: moment().valueOf()
    }
};

module.exports = {generateMessage, generateLocationMessage};