let userInterrupted = false;

function handleQuestion() {
  const input = document.getElementById("userInput");
  const messageBox = document.getElementById("messages");
  const question = input.value.trim();
  if (!question) return;

  input.disabled = true;
  document.getElementById("progressBarContainer").classList.remove("hidden");
  messageBox.innerHTML = `<p><em>Oooh… Excellent question 😏 Let me think...</em></p>`;

  let progress = 0;
  const progressBar = document.getElementById("progressBar");
  const askAgainBtn = document.getElementById("askAgainBtn");

  const progressInterval = setInterval(() => {
    progress += 1;
    progressBar.style.width = progress + "%";

    // If user tries to interact
    window.onclick = () => {
      if (!userInterrupted && progress < 100) {
        messageBox.innerHTML = `<p><strong>Don’t leave me in the middle 😢</strong></p>`;
        userInterrupted = true;
      }
    };

    if (progress >= 100) {
      clearInterval(progressInterval);
      document.getElementById("progressBarContainer").classList.add("hidden");
      messageBox.innerHTML = `<p><strong>That was amazing... You just waited ${progress} seconds for me 😌</strong></p>`;
      askAgainBtn.classList.remove("hidden");
    }
  }, 100);
}

function resetChat() {
  document.getElementById("userInput").value = "";
  document.getElementById("userInput").disabled = false;
  document.getElementById("messages").innerHTML = "";
  document.getElementById("progressBar").style.width = "0%";
  document.getElementById("askAgainBtn").classList.add("hidden");
  userInterrupted = false;
}
