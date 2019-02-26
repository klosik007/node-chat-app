const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('User connected');

 

    socket.on('join', (params, callback) =>{
        if (!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and room name are required.');
        }

        socket.join(params.room);
        // socket.leave('');
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));


        callback();
    });

    socket.on('createMessage', (newMessage, callback)=>{
        console.log('createMessage', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback('it comes from the server!');
        // socket.broadcast.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime();
        // });
    });

    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longtitude));
    });

    socket.on('disconnect', ()=>{
        console.log('Client disconnected');
    });
});



app.get('/', (req, res)=>{
    res.render('index.html');
});

server.listen(port, ()=>{
    console.log(`App started on port ${port}`);
});



