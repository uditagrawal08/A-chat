const http= require("http")
const express= require("express")
const path = require("path")
const app= express()
const { Server } = require('socket.io');
const server= http.createServer(app)

const io=new Server(server)

app.use(express.static(path.resolve(__dirname, "public")))
app.get("/", (req, res) => {
    res.sendFile("/public/index.html")
})


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });