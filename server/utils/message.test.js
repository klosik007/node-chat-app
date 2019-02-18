var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate correct message object', ()=>{
        var res = generateMessage('Przemek', 'message');

        expect(res.from).toBe('Przemek');
        expect(res.text).toBe('message');
        expect(typeof res.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', ()=>{
    it('should generate correct location object', ()=>{
        //var message = generateLocationMessage('Admin', 1, 1);
        var from = "Przemek";
        var latitude = 12;
        var longtitude = 15;
        var url = 'https://www.google.com/maps?q=12,15';
        var message = generateLocationMessage(from, latitude, longtitude);

        //expect(message.url).toEqual('https://www.google.com/maps?q=1,1');
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});