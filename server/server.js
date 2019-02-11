const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('User connected');

    socket.emit('newMessage', {
        from: "klosik007",
        text: 'some text to be sent to frontend',
        createdAt: Date.now()
    });

    socket.on('createMessage', (newMessage)=>{
        console.log('createMessage', newMessage);
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



