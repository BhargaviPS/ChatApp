const socket = io("https://254949b8-eab1-4470-8452-5c67ee52928a-00-2tqe476v7c4fq.sisko.replit.dev");

// Ask for username
let username = prompt("Enter your name");
socket.emit("join", { username });

const msgInput = document.getElementById("msgInput");
const messagesDiv = document.getElementById("messages");
const typingDiv = document.getElementById("typing");

// Send message
function sendMessage() {
  const msg = msgInput.value;
  if (msg.trim() !== "") {
    socket.emit("send_message", { message: msg });
    msgInput.value = "";
    typingDiv.innerText = "";
  }
}

// Display incoming messages
socket.on("receive_message", (data) => {
  const msgElement = document.createElement("div");
  msgElement.classList = data.username === username ? "text-end" : "text-start";
  msgElement.innerHTML = `<span class="badge bg-${data.username === username ? 'primary' : 'secondary'}">${data.username}</span> <span class="ms-2">${data.message}</span>`;
  messagesDiv.appendChild(msgElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Show system messages
socket.on("system", (msg) => {
  const systemMsg = document.createElement("div");
  systemMsg.classList = "text-center text-muted";
  systemMsg.innerText = msg;
  messagesDiv.appendChild(systemMsg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
