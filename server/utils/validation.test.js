const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', ()=>{
    it('should reject non-string values', ()=>{
        var nonstring = 456896;

        expect(isRealString(nonstring)).toBeFalsy();
    });

    it('should reject string with only spaces', ()=>{
        var spaces = '    ';

        expect(isRealString(spaces)).toBeFalsy();
    });

    it('should allow string with non-space characters', ()=>{
        var string = 'ghy bnmk';

        expect(isRealString(string)).toBeTruthy();
    });
});