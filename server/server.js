const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('User connected');

 

    socket.on('join', (params, callback) =>{
        if (!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required.');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        // socket.leave('');
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));


        callback();
    });

    socket.on('createMessage', (newMessage, callback)=>{
        //console.log('createMessage', newMessage);
        var user = users.getUser(socket.id);

        if(user && isRealString(newMessage.text)){
            //io.emit('newMessage', generateMessage(user.name, newMessage.text));
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
        }

        callback('it comes from the server!');
        // socket.broadcast.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime();
        // });
    });

    socket.on('createLocationMessage', (coords)=>{
        var user = users.getUser(socket.id);
        if (user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longtitude));
        }
    });

    socket.on('disconnect', ()=>{
        var user = users.removeUser(socket.id);

        if (user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
        console.log('Client disconnected');

    });
});



app.get('/', (req, res)=>{
    res.render('index.html');
});

server.listen(port, ()=>{
    console.log(`App started on port ${port}`);
});



