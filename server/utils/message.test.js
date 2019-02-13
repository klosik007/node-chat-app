var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate correct message object', ()=>{
        var res = generateMessage('Przemek', 'message');

        expect(res.from).toBe('Przemek');
        expect(res.text).toBe('message');
        expect(res.createdAt).toBeA('number');
    });
});