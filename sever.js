
const server = require("socket.io")(8000,{
  cors:"http://localhost:5500"
})


const users = {} 

server.on("connect", (socket) => {
  socket.on("new-user-joined",name => {
    users[socket.id] = name
    socket.broadcast.emit("user-joined",name)
  })
  socket.on("send",message=>{
    socket.broadcast.emit("receive", {name: users[socket.id], message:message})
  })

  socket.on("disconnect",()=>{
    socket.broadcast.emit("user-left",users[socket.id])
    delete users[socket.id]
  })
})