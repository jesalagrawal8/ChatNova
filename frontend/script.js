const input = document.querySelector("#input");
const chatContainer = document.querySelector("#chat-container");
const askBtn = document.querySelector("#ask");
const newChatBtn = document.querySelector("#new-chat");
const welcomeScreen = document.querySelector("#welcome-screen");
const examplePrompts = document.querySelectorAll(".example-prompt");

let threadId =
  Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

input?.addEventListener("keyup", handleEnter);
askBtn?.addEventListener("click", handleAsk);
newChatBtn?.addEventListener("click", handleNewChat);

// Add click handlers for example prompts
examplePrompts.forEach((prompt) => {
  prompt.addEventListener("click", () => {
    const text = prompt.querySelector("p").textContent.replace(/"/g, "");
    input.value = text;
    handleAsk();
  });
});

// Auto-resize textarea
input?.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
});

const loading = document.createElement("div");
loading.className = "flex items-start gap-4 py-6 px-4 animate-pulse";
loading.innerHTML = `
    <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
        <i class="fas fa-robot text-white"></i>
    </div>
    <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
            <span class="font-semibold">ChatNova</span>
            <div class="flex gap-1">
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
        </div>
    </div>
`;

function scrollToElement(element) {
  setTimeout(() => {
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}

function scrollToBottom() {
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, 100);
}

function setButtonLoading(isLoading) {
  if (isLoading) {
    askBtn.disabled = true;
    askBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    askBtn.classList.add("opacity-50", "cursor-not-allowed");
  } else {
    askBtn.disabled = false;
    askBtn.innerHTML = '<span>Send</span><i class="fas fa-paper-plane"></i>';
    askBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }
}

function hideWelcomeScreen() {
  if (welcomeScreen) {
    welcomeScreen.style.display = "none";
  }
}

function handleNewChat() {
  threadId =
    Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  chatContainer.innerHTML = "";
  if (welcomeScreen) {
    chatContainer.appendChild(welcomeScreen);
    welcomeScreen.style.display = "flex";
    // Re-attach event listeners to new example prompts
    const newExamplePrompts = document.querySelectorAll(".example-prompt");
    newExamplePrompts.forEach((prompt) => {
      prompt.addEventListener("click", () => {
        const text = prompt.querySelector("p").textContent.replace(/"/g, "");
        input.value = text;
        handleAsk();
      });
    });
  }
  input.value = "";
  input.focus();
}

async function generate(text) {
  hideWelcomeScreen();

  // Disable send button and show loading
  setButtonLoading(true);
  input.disabled = true;

  // User message
  const userMsgContainer = document.createElement("div");
  userMsgContainer.className = "flex items-start gap-4 py-6 px-4 bg-[#40414f]";
  userMsgContainer.innerHTML = `
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <i class="fas fa-user text-white"></i>
        </div>
        <div class="flex-1">
            <div class="font-semibold mb-2">You</div>
            <div class="text-gray-100 whitespace-pre-wrap">${escapeHtml(text)}</div>
        </div>
    `;
  chatContainer?.appendChild(userMsgContainer);
  input.value = "";
  input.style.height = "auto";

  chatContainer?.appendChild(loading);
  scrollToBottom();

  try {
    const assistantMessage = await callServer(text);

    const assistantMsgContainer = document.createElement("div");
    assistantMsgContainer.className = "flex items-start gap-4 py-6 px-4";
    assistantMsgContainer.innerHTML = `
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-robot text-white"></i>
            </div>
            <div class="flex-1">
                <div class="font-semibold mb-2">ChatNova</div>
                <div class="text-gray-100 whitespace-pre-wrap">${escapeHtml(assistantMessage)}</div>
            </div>
        `;

    loading.remove();
    chatContainer?.appendChild(assistantMsgContainer);

    // Scroll to the beginning of the response
    scrollToElement(assistantMsgContainer);

    // Re-enable send button and input
    setButtonLoading(false);
    input.disabled = false;
    input.focus();
  } catch (error) {
    loading.remove();
    const errorMsgContainer = document.createElement("div");
    errorMsgContainer.className = "flex items-start gap-4 py-6 px-4";
    errorMsgContainer.innerHTML = `
            <div class="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-exclamation-triangle text-white"></i>
            </div>
            <div class="flex-1">
                <div class="font-semibold mb-2 text-red-400">Error</div>
                <div class="text-gray-100">Sorry, there was an error generating the response. Please try again.</div>
            </div>
        `;
    chatContainer?.appendChild(errorMsgContainer);
    scrollToElement(errorMsgContainer);

    // Re-enable send button and input
    setButtonLoading(false);
    input.disabled = false;
    input.focus();
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

async function callServer(inputText) {
  const response = await fetch("/chat", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ threadId: threadId, message: inputText }),
  });

  if (!response.ok) {
    throw new Error("Error generating the response.");
  }

  const result = await response.json();
  return result.message;
}

async function handleAsk(e) {
  const text = input?.value.trim();
  if (!text) {
    return;
  }

  await generate(text);
}

async function handleEnter(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    const text = input?.value.trim();
    if (!text) {
      return;
    }

    await generate(text);
  }
}
