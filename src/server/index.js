var app = require ('express')();
var http = require ('http').createServer(app);
var io = require('socket.io')(http, 
    {
        cors: {
          methods: ["GET", "POST"],
          allowedHeaders: ['Content-Type', 'Authorization'],
          credentials: true
        }
    });

// app.get('/', function (req, res) {
//     res.send('<h1>Hello World<h1>');
// });

io.on('connection', function(socket) {
    // notify existing users
    console.log('a user connected');
    socket.on('chat message', function(msg){
        console.log('message' + JSON.stringify(msg));
        io.emit('chat message', msg);
    });
});

http.listen(3001, function(){
    console.log('listening on port 3001');
})
