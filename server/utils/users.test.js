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
        var users = new Users();
        var userToRemove = {
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        };

        var removedUser = users.removeUser(userToRemove.id);

        expect(removedUser).toEqual([userToRemove.name]);
    });

    it('should not remove a user' ,()=>{
        // var users = new Users();
        // var userToRemove = {
        //     id: '4',
        //     name: 'Nathan',
        //     room: 'Node Course'
        // };

        // var removedUser = users.removeUser(userToRemove.id);

        // expect(removedUser).toEqual([userToRemove]);
    });

    it('should get user', ()=>{
        // var users = new Users();

    });

    it('should not get a user', ()=>{

    });

    it('should return names for node course', ()=>{
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });
});