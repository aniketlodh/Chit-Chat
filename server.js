var express=require("express");
var app=express();
var http=require("http").createServer(app);
var PORT=process.env.PORT || 3000;
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

var io=require("socket.io")(http);
io.on("connection",function(socket){
  console.log("connected");
  socket.on("msg",function(msg){
    socket.broadcast.emit("message",msg);
  })
})

http.listen(PORT,function(){
  console.log("server started");
})
