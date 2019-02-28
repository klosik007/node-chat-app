const expect = require('expect');

const {Users} = require('./users');

describe('Users', ()=>{
    var users;

    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },
        {
            id: '2',
            name: 'Julie',
            room: 'Node Course'
        },
        {
            id: '3',
            name: 'Andrej',
            room: 'React Course'
        }];
    });

    it('should create new user', ()=>{
        var users = new Users();
        var user = {
            id: '123',
            name: 'Przemek',
            room: 'Dooo'
        };

        users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', ()=>{
        var userToRemove = '1';
        var removedUser = users.removeUser(userToRemove);

        expect(removedUser.id).toBe(userToRemove);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user' ,()=>{
        var userToRemove = '12';
        var removedUser = users.removeUser(userToRemove);

        expect(removedUser).toBe(undefined);
        expect(users.users.length).toBe(3);
    });

    it('should get user', ()=>{
        var userToGet = '1';
        var user = users.getUser(userToGet);
        expect(user.id).toEqual(userToGet);
    });

    it('should not get a user', ()=>{
        var userToGet = '12';
        var user = users.getUser(userToGet);
        expect(user).toBe(undefined);
    });

    it('should return names for node course', ()=>{
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });
});