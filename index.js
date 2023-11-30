const express = require('express')
const app = express()
const http = require('http').createServer(app)
const dotenv = require("dotenv").config();

const PORT = process.env.PORT;

http.listen(PORT, ()=>{
    // console.log(`Listining on ${PORT}`);
})

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})


const io= require('socket.io')(http)
// console.log("Start");

const users = {};
// console.log(users);
// console.log(Object.keys(users).length);



io.on('connection', socket => {
    // console.log('connected');
    socket.on('new-user-joined', Name  =>{
        // console.log("New user" ,Name);
        users[socket.id] = Name;
        socket.broadcast.emit('user-join',Name)
        
    });
    socket.on('send', massage =>{
        socket.broadcast.emit('recive',{massage: massage, Name: users[socket.id]})
    });
    socket.on('disconnect', massage =>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
    
});