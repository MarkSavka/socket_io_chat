$(function () {
    var socket = io();
    $('form').submit(function(e) {
        e.preventDefault(); // prevents page reloading

        // *****************************************
        $('.messages').append('<div class="flex_right"><div class="right_msg msg">' + $('#input_message').val() + '</div></div>')
        console.log($('#input_message').val())

        
        socket.emit('chat message', $('#input_message').val());
        // *****************************************

        $('#input_message').val('');
        return false;
    });
    socket.on('chat message', function(msg){
        $('.messages').append('<div class="flex_left"><div class="left_msg msg">' + msg + '</div></div>');
    });
});
(() => {
    let nickname = '';
    for(;nickname > 0;){
        nickname = prompt('What u nickname ?', undefined)
    }
    socket.emit('get-nickname', nickname);
})()