let userInterrupted = false;

function handleQuestion() {
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const messageBox = document.getElementById("messages");
  const question = input.value.trim();
  if (!question) return;

  // Append user's question to chat
  const userMsg = document.createElement("div");
  userMsg.classList.add("message", "user-message");
  userMsg.innerHTML = `<strong>You:</strong> ${question}`;
  messageBox.appendChild(userMsg);
  messageBox.scrollTop = messageBox.scrollHeight;

  input.disabled = true;
  sendBtn.disabled = true;

  document.getElementById("progressBarContainer").classList.remove("hidden");

  // Typing/waiting message
  const thinkingMsg = document.createElement('div');
thinkingMsg.classList.add('message', 'typing-bubble'); // bubble style
thinkingMsg.innerHTML = `Oooh... Excellent question 😏 Let me think<span class="typing-dots"></span>`;
document.querySelector('.messages').appendChild(thinkingMsg);


  let progress = 0;
  const totalTime = 60000; // 60 seconds
  const updateInterval = 100;
  const steps = totalTime / updateInterval;
  const progressBar = document.getElementById("progressBar");
  const askAgainBtn = document.getElementById("askAgainBtn");

  document.addEventListener("keydown", function (e) {
    const active = document.activeElement;
    const isTyping = active.tagName === "INPUT" || active.tagName === "TEXTAREA";

    if (e.code === "Space" && !isTyping) {
      e.preventDefault();
    }

    if (!userInterrupted && progress < 100 && !isTyping) {
      const interMsg = document.createElement("div");
      interMsg.classList.add("message", "bot-message");
      interMsg.innerHTML = `<strong>heyh!!Don't leave me in the middle...I'm almost there...😢</strong>`;
      messageBox.appendChild(interMsg);
      messageBox.scrollTop = messageBox.scrollHeight;
      userInterrupted = true;
    }
  });

  const progressInterval = setInterval(() => {
    progress += 100 / steps;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(progressInterval);
      document.getElementById("progressBarContainer").classList.add("hidden");

      thinkingMsg.remove(); // Remove "thinking..." message

      const finalMsg = document.createElement("div");
      finalMsg.classList.add("message", "bot-message", "fade-in");
      finalMsg.innerHTML = `
        <p><strong>That was amazing... You just waited 60 seconds for me 😌</strong></p>
        <p>
        
        </p>
        <p><em>Sorry! I didn't get you... Ask me one more time — I won't make you wait this long again!</em></p>
      `;
      messageBox.appendChild(finalMsg);
      messageBox.scrollTop = messageBox.scrollHeight;

      askAgainBtn.classList.remove("hidden");
      sendBtn.disabled = false;
    }
  }, updateInterval);
}

function resetChat() {
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  input.value = "";
  input.disabled = false;
  sendBtn.disabled = false;
  document.getElementById("progressBar").style.width = "0%";
  document.getElementById("askAgainBtn").classList.add("hidden");
  userInterrupted = false;
}
