const express = require('express');
const app = express();
const server = require('http').Server(app)
const io = require("socket.io")(server);
const { v4: uuidv4 } = require('uuid');
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server, { debug: true })
const PORT = 3000;
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/peerjs', peerServer)

app.get('/', function (req, res) {
  res.redirect(`/${uuidv4()}`)
})

app.get('/:room', function (req, res) {
  res.render('index', { roomId: req.params.room })
})

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('join-room', (roomId, userId) => {
    console.log('message: ' + roomId);
    // io.emit('chat message',"i am from backend")
    socket.join(roomId)
    socket.broadcast.to(roomId).emit("user-connected", userId)
  });
});


server.listen(PORT, () => {
  console.log(`Server started on port number http://localhost:${PORT}/`);
})