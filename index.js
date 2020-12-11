var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/verstka'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/verstka/chat.html');
});


io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('chat message', "user connected")

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('chat message', "user disconected")
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        if(msg === "exit")
          socket.disconnect()
        socket.broadcast.emit('chat message', msg);
    });

    

});

http.listen(6969, () => {
  console.log('listening on *:3000');
});