// Get the button element
var sendButton = document.getElementById('send-button');
var stopButton = document.getElementById('stop-button');
var tts_enabled = document.getElementById('option2');

// Get the input field
var messageInput = document.getElementById('message-input');

// Get the chat box
var chatBox = document.getElementById('chat-box');

var last_chat = ""
let lastMessageBox = {
    "object": null,
    "last_message": null
}
var messageCache = []

// SocketIO connection and reciever
const socket = io.connect('http://18.237.102.230:3000/');


var currentText = ""
socket.on('message', (data) => {
    if (data.newReply || !lastMessageBox["object"])
    {
        lastMessageBox["object"] = createChatMessage(data.data, 'bot');
        chatBox.appendChild(lastMessageBox["object"]);
        chatBox.scrollTop = chatBox.scrollHeight;
        currentText = lastMessageBox["object"].querySelector('.message-content').textContent;
    }else{
        const existingText = lastMessageBox["object"].querySelector('.message-content');
        currentText = currentText + data.data;

        existingText.textContent = ""
        
        const formattedText = DOMPurify.sanitize(convertToStyledHTML(currentText));
        lastMessageBox["object"].querySelector('.message-content').innerHTML = formattedText;
    }   

});

// Toggle Darken Background
function toggleBackground(enabled){
    if(enabled){
        messageInput.disabled = true;
        sendButton.disabled = true;
        listenButton.disabled = true;
    }else{
        messageInput.disabled = false;
        sendButton.disabled = false;
        listenButton.disabled = false;
    }

}

function convertToStyledHTML(text) {
    text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
    return text;
}

// Function that creates the chat message entity
function createChatMessage(text, sender) {
    var newMessage = document.createElement('div');
    newMessage.classList.add(sender);

    var username = document.createElement('div');
    username.classList.add('username-content')
    username.textContent = sender == "user" ? "User:   " : "Jarvis:   ";
    username.style.color = sender == "user" ? "red" : "blue";

    var messageContent = document.createElement('div'); 
    messageContent.classList.add('message-content'); 

    
    var safeHTML = DOMPurify.sanitize(convertToStyledHTML(text));
    messageContent.innerHTML = safeHTML;
    //var messageText = document.createTextNode(safeHTML);
    //messageContent.appendChild(messageText);

    newMessage.appendChild(username);
    newMessage.appendChild(messageContent); 

    if (sender == "user") {
        var button = document.createElement('button');
        button.textContent = "";
        button.classList.add('delete-button');
        newMessage.appendChild(button);
    }

    return newMessage;
}

async function sendMessage(pushedMessage = "") {
    var message = pushedMessage || messageInput.value;
    if (message == "") {
        return;
    }
    messageInput.disabled = true;
    sendButton.disabled = true;
    
    var newMessage = createChatMessage(message, 'user');
    chatBox.appendChild(newMessage);
    messageInput.value = '';


    const response_time_start = Date.now(); 
    // Module Preprocessing
    if(module_type.value == "language"){
        // Determine the user's comprehension level
        var user_comprehension = await getTextReply(message, "Determine the user's comprehension in the language they spoke in, on a K-12 scale. If there hasn't been enough text, default to 5th grade. Reply in the format: {language}, {comprehension level}th grade");
        // Create the judgements
        var system_judgements = await getTextReply(`Create some advice for a student learning  learning ${user_comprehension}. Judge their message below for spelling or grammar errors. List out any spelling or grammar errors found.\n\n${message}`)
        // Highlight the sentences
        var system_corrections = await getTextReply(`Apply formatting to the message: ${message}\nif there are any spelling errors can you mark them by surrounding them with "~" symbol and if there are any grammar errors, mark them by surrounding them with "#" symbol. Reply with the students original message with the highlighting applied. If there are no errors then do not modify the message.\nBased on the following advice: ${system_judgements}`)
        
        newMessage.setAttribute('title', system_judgements)
        // Process highlighting
        console.log(user_comprehension);
        console.log(system_judgements);
        console.log(system_corrections);
        var reply_message = await getTextReply(message);
        system_level = "";
    }else{
        var reply_message = await getTextReply(message);
    }
    const response_time_end = Date.now(); 
    var time_in_milliseconds = response_time_end - response_time_start
    const str_length = reply_message.length;
    console.log(`Reply Finished: ${str_length} characters finished in ${time_in_milliseconds} ms (Avg ${str_length/((time_in_milliseconds  - 700) / 1000)} chars per second)`);
    const start = Date.now();
    //var newReply = createChatMessage(reply_message + "\n", 'bot');
    //chatBox.appendChild(newReply);
    chatBox.scrollTop = chatBox.scrollHeight;

    var messageBlock = {
        "user_message": message,
        "system_message": "",
        "response_message": reply_message,
        "debug_info": {
            "response_time": time_in_milliseconds,
            "tokens_used": 0,
            "user_tokens": 0,
            "response_tokens": 0
        }
    };
    messageCache.push(messageBlock);


    last_chat = reply_message;
    messageInput.disabled = false;
    sendButton.disabled = false;
    messageInput.focus();

    if(tts_enabled.checked){
        if(ai_type.value == "instant"){
            speak()
        }else{
            console.log("Generating Audio\n");
            const reply_audio = await getAudioReply(reply_message);
            console.log(reply_audio);
            const audioUrl = URL.createObjectURL(reply_audio);
            console.log(audioUrl);
            const audio = new Audio(audioUrl);
            const end = Date.now();
            var time_in_milliseconds = end - start
            console.log(`Audio Finished: ${str_length} characters finished in ${time_in_milliseconds} ms (Avg ${str_length/(time_in_milliseconds / 1000)} chars per second)`);
            audio.play();
        }
    }
    return Promise.resolve();
}

async function getTextReply(input_message, system_message="", subprocess=false) {
    var data_package = {
        message: input_message,
        data: messageCache,
        sys_message: system_message
    };
    if(subprocess){
        data_package["data"] = {};
    };
    const response = await fetch('/get-chat-reply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data_package)
    });
    if(!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return '';
    }
    const data = await response.json();
    console.log(data);
    return data.reply;
}

async function getAudioReply(input_message) {
    if(ai_type.value == "aiTTS" || ai_type.value == "11aiTTS"){
        const response = await fetch('/get-audio-reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: input_message, audio_type: ai_type.value, audio_volume: tts_volmue, audio_speed: tts_speed})
        });
        if(!response.ok) {
            console.error(`Error: ${response.statusText}`);
            return '';
        }
        const audio_blob = await response.blob();
        return audio_blob;
    }else{
        const response = await fetch('/get-audio-reply-free', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: input_message})
        });
        if(!response.ok) {
            console.error(`Error: ${response.statusText}`);
            return '';
        }
        const audio_blob = await response.blob();
        return audio_blob;
    }
}

function stopSpeaking(){
    window.speechSynthesis.cancel();
}

// Chat button listeners

// Add a "click" event listener to the button
sendButton.addEventListener('click', () => sendMessage());

// Add a "keypress" event listener to the input field
messageInput.addEventListener('keypress', async function(event) {
    // Check if the key pressed was "Enter"
    if (event.key === 'Enter') {
        // Prevent the default action to stop the form from being submitted
        event.preventDefault();
        sendMessage();
    }
});


// Retrieving Chat History for 1 user
// I. work on seemless jarvis integration
// 1. Webhook so streamable text from chatGPT AND user voice

// Mute for Jarvis for different versions
// Ability to upload text files
// Add Hover events to messagse



// 1. Webhook so streamable text from chatGPT AND user voice
// I. work on seemless jarvis integration
// 2. Jarvis Mute/Unmute
// 3. Ability to change jarvis' Name
// 4. Ability to upload text files
// 5. Ability to stop other audio clips from playing sound
// 6. Ability to change AI apis