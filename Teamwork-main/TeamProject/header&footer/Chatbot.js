// Chatbot.js

window.addEventListener("load", initChatbot);

function initChatbot() {
    const container = document.getElementById('Chatbot-container');
    const { openChatBtn, chatbotContainer } = bindChatbot();
    container.appendChild(openChatBtn);
    container.appendChild(chatbotContainer);
    setupChatbotEvents({ openChatBtn, chatbotContainer });
}

function bindChatbot() {
    const openChatBtn = document.createElement('button');
    openChatBtn.id = 'openChatBtn';
    openChatBtn.setAttribute('aria-label', '챗봇 열기');
    openChatBtn.textContent = '💬';

    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbotContainer';
    chatbotContainer.innerHTML = `
        <h2 id="title">
            <img src="../../header&footer/assect/coma2.png"
                alt="남자아이" style="vertical-align: middle; height: 30px;">
            지역유치원 챗봇
            <img src="../../header&footer/assect/coma1.png"
                alt="여자아이" style="vertical-align: middle; height: 30px;">
        </h2>
        <div id="chat"></div>
        <div class="input-container">
            <input type="text" id="userInput" placeholder="메시지를 입력하세요" aria-label="메시지 입력" />
            <button id="sendBtn" aria-label="메시지 전송"></button>
        </div>
    `;

    return { openChatBtn, chatbotContainer };
}

function setupChatbotEvents({ openChatBtn, chatbotContainer }) {
    openChatBtn.addEventListener("click", () => {
        chatbotContainer.classList.toggle("open");
        
        // 챗봇이 열릴 때와 닫힐 때 버튼의 텍스트를 변경합니다.
        if (chatbotContainer.classList.contains("open")) {
            openChatBtn.textContent = '✕';
            openChatBtn.classList.add('open');
        } else {
            openChatBtn.textContent = '💬';
            openChatBtn.classList.remove('open');
        }
        
        document.body.style.overflow = chatbotContainer.classList.contains("open") ? "hidden" : "auto";
    });

    const chat = document.getElementById("chat");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    sendBtn.addEventListener("click", () => {
        const message = userInput.value.trim();
        if (message === "") return;

        appendMessage("🧑 사용자", message);
        respond(message);
        userInput.value = "";
    });

    userInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") sendBtn.click();
    });

    function appendMessage(sender, text) {
        const messageRow = document.createElement("div");
        messageRow.classList.add("message-row");
        const profileImg = document.createElement("div");
        profileImg.classList.add("profile-img");

        if (sender === "🧑 사용자") {
            messageRow.classList.add("user");
            profileImg.classList.add("user-profile");
        } else if (sender === "🤖 챗봇") {
            messageRow.classList.add("bot");
            profileImg.classList.add("bot-profile");
        } else if (sender === "✨ Gemini") {
            messageRow.classList.add("gemini");
            profileImg.classList.add("gemini-profile");
        }

        const messageContent = document.createElement("div");
        messageContent.classList.add("message-content");

        const messageBubble = document.createElement("div");
        messageBubble.classList.add("message-bubble");
        messageBubble.textContent = text;

        const messageTime = document.createElement("div");
        messageTime.classList.add("message-time");
        const now = new Date();
        messageTime.textContent = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

        if (sender === "🧑 사용자") {
            messageContent.appendChild(messageBubble);
            messageContent.appendChild(messageTime);
            messageRow.appendChild(messageContent);
            messageRow.appendChild(profileImg);
        } else {
            messageRow.appendChild(profileImg);
            messageContent.appendChild(messageBubble);
            messageContent.appendChild(messageTime);
            messageRow.appendChild(messageContent);
        }

        chat.appendChild(messageRow);
        chat.scrollTop = chat.scrollHeight;
    }

    function askGeminiAPI(message) {
        const GEMINI_API_KEY = "AIzaSyCMO0Edup71uWOyMrkMON6dXm3AlaWm4zY";
        const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

        fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: message
                    }]
                }]
            })
        })
        .then(response => response.json())
        .then(data => {
            const geminiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "답변을 찾지 못했어요 😅";
            appendMessage("✨ Gemini", geminiReply);
        })
        .catch(error => {
            console.error("Gemini 통신 오류:", error);
            appendMessage("✨ Gemini", "오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
        });
    }

    function respond(message) {
        let response = "";

        if (message.trim() === "1") {
            response = "송구영 팀장님";
        } else if (message.trim() === "2") {
            response = "김경식 팀원";
        } else if (message.trim() === "3") {
            response = "김상명 팀원";
        } else if (message.trim() === "4") {
            response = "김현민 팀원";
        } else if (message.trim() === "5") {
            response = "조민서 팀원";
        } else {
            const askGemini = confirm("이 질문은 목록에 없어요. Gemini에게 물어볼까요?");
            if (askGemini) {
                askGeminiAPI(message);
                return;
            } else {
                response = "알겠습니다! 다른 질문 있으면 알려주세요 😄";
            }
        }

        appendMessage("🤖 챗봇", response);
    }
}