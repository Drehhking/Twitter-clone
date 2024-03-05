const chatInput = document.querySelector(".chat-input textarea")
const sendChatBtn = document.querySelector(".chat-input span")
const chatbox = document.querySelector(".chatbox")

let userMessage;
const API_KEY = "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";

const  createChatLi = (message, className) => {
    // create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? ` <p>${message}</p> ` :   ` <p>${message}</p> `
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p")

    const requestOPtions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${"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"}`
        },
        body: JSON.stringify({
            model:"gpt-3.5-turbo",
            messages: [{"role": "user", "content": userMessage}]
        })
    }
// send POST request to API, get response
    fetch(API_URL, requestOPtions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "hello";
    })
}
const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;


    // Append the user's message to the chatbox
   chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
       const incomingChatLi = createChatLi("Thinking...", "incoming")
        chatbox.appendChild(incomingChatLi)
        generateResponse(incomingChatLi);
    }, 600);
    
}


sendChatBtn.addEventListener("click", handleChat)
