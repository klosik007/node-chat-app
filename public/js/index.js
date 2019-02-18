var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: 'klosik007',
    //     text: 'kklkllm'
    // });
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message){
    console.log('New message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.emit('createMessage', {
    from: 'Frank',
    text: 'I will conquer you!'
}, function (message){
    console.log('got it', message);
});

jQuery('#message-form').on('submit', function (e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){

    });
})