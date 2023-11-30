let Name;

do {
  Name = prompt("Enter your name to Join chat");
  
} while (!Name);


const socket = io();

const form = document.getElementById("send-msg");
const msgInput = document.getElementById("msg");
const msgContaner = document.querySelector(".con");
const head = document.querySelector(".p");
// const h4 = document.getElementById("h4");
var audio = new Audio("/Resources/Message_Sound.mp3");

// const Name = prompt("Enter your name to Join chat");

socket.emit("new-user-joined", Name);
head.innerHTML = `${Name}`;

const users1={};
users1[socket.id] = Name;
console.log(users1);



appendMsg = (data, type) => {
  let h4 = document.createElement("h4");
  let p = document.createElement("div");
  let msgdiv = document.createElement("div");
  h4.innerText = `${data.Name}:`;
  p.innerText = data.massage;
  h4.classList.add("h4");
  p.classList.add("p1");
  msgdiv.classList.add("massage");
  msgdiv.classList.add(type);
  msgdiv.append(h4);
  msgdiv.append(p);
  msgdiv.style.backgroundColor='#ffe895';
  msgdiv.style.backgroundImage='linear-gradient(45deg, #f7e6a8 0%, #FF5ACD 100%)';
  msgContaner.append(msgdiv);

  if (type == "left") {
    audio.play();
  }
};


appendMsg1 = (data, type) => {
  let h4 = document.createElement("h4");
  let p = document.createElement("div");
  let msgdiv = document.createElement("div");
  h4.innerText = "You:";
  p.innerText = data.massage;
  h4.classList.add("h4");
  p.classList.add("p1");
  msgdiv.classList.add("massage");
  msgdiv.classList.add(type);
  msgdiv.append(h4);
  msgdiv.append(p);
  msgdiv.style.backgroundColor='#8EC5FC';
  msgdiv.style.backgroundImage='linear-gradient(62deg, #90c8ff 0%, #d6b1f9 100%)';
  msgContaner.append(msgdiv);

  if (type == "left") {
    audio.play();
  }
};


appendleave = (data, type) => {
  let h4 = document.createElement("h4");
  let msgdiv = document.createElement("div");
  h4.innerText = data;
//   msgdiv.innerText = 'Left the ';
  msgdiv.classList.add("massage");
  msgdiv.classList.add(type);
  msgdiv.style.backgroundColor='red';
  msgContaner.append(msgdiv);
  msgdiv.append(h4);

  if (type == "left") {
    audio.play();
  }
};


appendJoin = (data, type) => {
  let h4 = document.createElement("h4");
  let msgdiv = document.createElement("div");
  h4.innerText = data;
//   msgdiv.innerText = 'Left the ';
  msgdiv.classList.add("massage");
  msgdiv.classList.add(type);
  msgdiv.style.backgroundColor='#99ff33'; 
  msgContaner.append(msgdiv);
  msgdiv.append(h4);

  if (type == "left") {
    audio.play();
  }
};



form.addEventListener("submit", (e) => {
  e.preventDefault();
  const massage = msgInput.value;
  data1 = { massage: massage, Name: Name };
  appendMsg1(data1, "right");
  socket.emit("send", massage);
  msgInput.value = "";
  ScrollToBottom();
});



socket.on("user-join", (Name) => {
  appendJoin(`${Name} join the chat`, "left");
  ScrollToBottom()
});

socket.on("recive", (data) => {
  appendMsg(data, "left");
  ScrollToBottom();
});



socket.on("left", (Name) => {
    if (Name!='null') {
        appendleave(`${Name} left the chat`, "left");
        ScrollToBottom()
    }
  
});


function ScrollToBottom() {
  msgContaner.scrollTop = msgContaner.scrollHeight;
}

