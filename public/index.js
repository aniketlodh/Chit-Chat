var socket=io();
var textarea=document.querySelector("#textarea");
var chatArea=document.querySelector(".chat-area");
var send=document.querySelector("#send");
var name;
while(!name){
  name=prompt("Enter your name");
}
send.addEventListener("click",function(){
  var data= textarea.value;
  if (data.length) {
      sendMessage(data);
  }
  textarea.autofocus;
})
textarea.addEventListener("keyup",function(e){
  if (e.which===13) {
    var data= textarea.value;
    sendMessage(data);
    textarea.autofocus;
  }
})
function sendMessage(msg){
  var message={
    user:name,
    message: msg
  };
  appendMessage(message,"sent");
  textarea.value="";
  scrollToBottom();
  socket.emit("msg",message);
}
function appendMessage(msg,type){
  var mainDiv=document.createElement("div");
  var className=type;
  mainDiv.classList.add(className,"message");
  var material=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
  `;
  mainDiv.innerHTML=material;
  chatArea.appendChild(mainDiv);
}
socket.on("message",function(msg){
  appendMessage(msg,"received");
  scrollToBottom();
})
function scrollToBottom(){
  chatArea.scrollTop=chatArea.scrollHeight;
}
