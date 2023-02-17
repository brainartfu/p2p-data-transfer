const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server)
var random = require('random-string-alphanumeric-generator');
const path = require('path')
const { AwakeHeroku } = require('awake-heroku');

AwakeHeroku.add({
    url: "https://cuckooapp.herokuapp.com"
})

app.use(express.static('./client/build'));

app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, "client","build","index.html"));
})

const users={}

io.on('connection', socket => {
    //generate username against a socket connection and store it
    const userid=random.randomLetters(6, "lowercase");
    if(!users[userid]){
        users[userid] = socket.id
    }
    console.log(users)
    //send back username
    socket.emit('yourID', userid)
    io.sockets.emit('allUsers', users)
    
    socket.on('disconnect', ()=>{
        delete users[userid]
    })

    socket.on('callUser', (data)=>{
        console.log('callUser: ', data.from, '->', data.userToCall)
        console.log('signal', data.signalData)
        io.to(users[data.userToCall]).emit('hey', {signal: data.signalData, from: data.from})
    })

    socket.on('acceptCall', (data)=>{
        console.log('acceptCall', data.from, '->', data.to)
        console.log('accep-signal', data.signal)
        io.to(users[data.to]).emit('callAccepted', {signal: data.signal, from: data.from})
    })

    socket.on('close', (data)=>{
        io.to(users[data.to]).emit('close')
    })

    socket.on('rejected', (data)=>{
        io.to(users[data.to]).emit('rejected')
    })
})

const port = process.env.PORT || 8000

server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})