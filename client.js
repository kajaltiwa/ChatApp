
const socket = io("localhost:8000");
const first = document.querySelector(".first");
const input = document.querySelector("#input");

const name = prompt("Enter your Name to Join the Chat :");

socket.emit("new-user-joined", name);

function generateMessage(message, side) {
  let div = document.createElement("div");
  div.classList.add("alert");
  if (side === "center") {
    div.classList.add("alert-light");
    div.classList.add("center");
  } 
  else if (side === "left") {
    div.classList.add("alert-primary");
    div.classList.add("left");
  } 
  else {
    div.classList.add("alert-secondery");
    div.classList.add("right");
  }
  div.innerHTML = message;
  first.appendChild(div);
}

function sendMessage(){
   if(input.value!==""){
    let message = input.value
    generateMessage(`${message} : You`,"right")
    input.value = ""

    socket.emit("send",message)
   }
}

socket.on("user-joined", (name) => {
  if(name)
  generateMessage(`${name} Joined the Chat`, "center");
});

socket.on("user-left",(name)=>{
  if(name)
    generateMessage(`${name} Left the Chat`,"center")
})

socket.on("receive", ({message,name}) => {
  generateMessage(`${name} : ${message}`, "left");
});

