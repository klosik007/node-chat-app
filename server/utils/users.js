class Users{
    constructor(){
        this.users = [];
    }

    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        var user  = this.users.filter((user)=> user.id === id);
        var userIndex = this.users.indexOf(user);
        this.users.slice(0, userIndex).concat(this.users.slice(userIndex + 1));

        var removedUser = user.map((user) =>user.name);
        return removedUser;
    }

    getUser(id){
        var user  = this.users.filter((user)=> user.id === id);
        var userName = user.map((user)=>user.name);
        
        return userName;
    }

    getUserList(room){
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user)=> user.name);

        return namesArray;
    }
}

module.exports = {Users};

