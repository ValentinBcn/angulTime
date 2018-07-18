var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var path = require('path');

var users = []


app.use(express.static(path.join(__dirname,'dist/angulaRealTime')));



app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/angulaRealTime/index.html'))
})

io.sockets.on('connection',(socket)=>{
    socket.on('askToUser', ()=>{
            console.log("on me demande les", users);
            socket.broadcast.emit('listUsers',users);
        
    })
    
    socket.on('derange',(data)=>{
        console.log(data)
        socket.broadcast.emit('message',data)
    })

    socket.on('username', (userName)=>{
        users.push( {id : socket.id, name: userName})
        socket.broadcast.emit('addUser',{id : socket.id, name: userName});
        console.log(users)
    })

    socket.on('alertTo', (message)=>{
        console.log('alert recu dans le serveur je renvoie ', message)
        socket.broadcast.to(message.id).emit('alertToMe',message)
    })
});

server.listen(process.env.PORT || 4600 );
