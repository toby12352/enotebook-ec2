// Handle Settings
var settingsButton = document.getElementById('settings-button');
var settingsOverlay = document.getElementById('settings-overlay');
var closeSettingsButton = document.getElementById('close-settings-button');

var ai_type = document.getElementById('option1');
var tts_enabled = document.getElementById('option2');
var tts_volmue = document.getElementById('volume-slider');
var volume_text = document.getElementById('volume-value');
var tts_speed = document.getElementById('speed-slider');
var speed_text = document.getElementById('speed-value');

// Get the button element
var sendButton = document.getElementById('send-button');

// Get the input field
var messageInput = document.getElementById('message-input');
var loadingGif = document.getElementById('loading-gif');

// Get the chat box
var chatBox = document.getElementById('chat-box');

var messageCache = []
var currentTopic = "";
var messageCache = []

// Get the three response windows:
var response1 = document.getElementById('response1-button');
var response2 = document.getElementById('response2-button');
var response3 = document.getElementById('response3-button');

async function buttonHelper(buttonNumber) {
    var customMessage = "";
    var systemMessage = " ";
    if(buttonNumber == '1'){
        customMessage = document.getElementById('response1-button').innerText;
    }else if(buttonNumber == '2'){
        customMessage = document.getElementById('response2-button').innerText;
    }else if(buttonNumber == '3'){
        systemMessage = `in the style of 3Blue1Brown, tell a story regarding a famous use case for ${currentTopic}, why it is important and explain what ${currentTopic} are.`;
        customMessage = document.getElementById('response3-button').innerText;
    }else{
        console.log("Something went wrong when retrieving button responses!");
        return;
    }
    sendMessage(customMessage, systemMessage);
}

// Function that creates the chat message entity
function createChatMessage(text, sender) {
    var newMessage = document.createElement('div');
    newMessage.classList.add(sender);

    var username = document.createElement('b');
    username.textContent = sender == "user" ? "User:   " : "Jarvis:   ";
    username.style.color = sender == "user" ? "red" : "blue";

    var messageContent = document.createElement('div'); // Create the new div
    messageContent.classList.add('message-content'); // Add the class to apply CSS styles

    var messageText = document.createTextNode(text);
    messageContent.appendChild(messageText); // Append the text to messageContent

    newMessage.appendChild(username);
    newMessage.appendChild(messageContent); // Append messageContent to newMessage

    if (sender == "user") {
        var button = document.createElement('button');
        button.textContent = "";
        button.classList.add('delete-button');
        newMessage.appendChild(button);
    }

    return newMessage;
}

async function sendMessage(pushedMessage = "", systemMessage = "") {
    var message = "";
    var messageInjection = "";
    if(pushedMessage == ""){
        message = messageInput.value;
    }else{
        message = pushedMessage;
    }
    if (message == "") {
        return Promise.resolve();
    }
    messageInput.disabled = true;
    sendButton.disabled = true;
    loadingGif.style.display = "block";
    
    var newMessage = createChatMessage(message, 'user');
    chatBox.appendChild(newMessage);
    messageInput.value = '';

    if(systemMessage == ""){
        messageInjection = "A student is trying to understand the following subject. Explain the following topic in an introductary way. If the student states they understand the basics of the topic, explain the topic in greater depth. The student asks: ";
    }else{
        messageInjection = systemMessage;
    }

    var askedQuestion = messageInjection + message;

    const msg_start = Date.now(); 
    var reply_message = await getTextReply(askedQuestion);
    const msg_end = Date.now();
    var time_in_milliseconds = msg_end - msg_start
    const str_length = reply_message.length;
    console.log(`Reply Finished: ${str_length} characters finished in ${time_in_milliseconds} ms (Avg ${str_length/((time_in_milliseconds  - 700) / 1000)} chars per second)`);
    const start = Date.now();
    var newReply = createChatMessage(reply_message + "\n", 'bot');
    chatBox.appendChild(newReply);
    chatBox.scrollTop = chatBox.scrollHeight;

    var messageBlock = {
        "user_message": message,
        "system_message": messageInjection,
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
    loadingGif.style.display = "none";

     // Extract Main Topic:
    var summary_extract = "In 5 words or less, determine what the main topic of the following paragraph is about: ";
    summary_extract = summary_extract + reply_message;
    var summary = await getTextReply(summary_extract)
    console.log(`The chat topic can be summerized to: ${summary}`);
    currentTopic = summary;
 
     // Generate 3 choices:
    var modified_reply_message = "Generate three follow up questions a student may have from the following: ";
 
    modified_reply_message = modified_reply_message + reply_message + " The first followup question should probe for more advanced knowledge in the subject. The second followup question should ask about a similar topic. The third followup question should ask for a way to perceieve the concept (for example: more detailed text, a visualization, a description, any method that is best suited to explaining the topic at hand). Put >> before each question";
 
    var questions_generated = await getTextReply(modified_reply_message);
    console.log("Choices have been generated!");
    console.log(questions_generated);
    await updateButtons(questions_generated);


    

    if(tts_enabled.checked){
        if(ai_type.value == "instant"){
            if ('speechSynthesis' in window) {
                console.log(last_chat)
                var utterance = new SpeechSynthesisUtterance(last_chat);
                // Use default system voice
                utterance.voice = speechSynthesis.getVoices()[0];
                // Set utterance properties
                utterance.pitch = 1.0;
                utterance.rate = Math.round((0.2 + (tts_speed.value / 100)),2);
                utterance.volume =  Math.round((tts_volmue.value / 100),2);
                // Speak the text
                window.speechSynthesis.speak(utterance);
            } else {
                alert('Your browser does not support the Web Speech API');
            }
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

async function getTextReply(input_message) {
    const response = await fetch('/get-chat-reply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: input_message, data: messageCache})
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

async function updateButtons(message){
    message = message.replace(/^[:\n]+/, '');
    var markerIndex = message.indexOf(">>");
    message = message.substring(markerIndex);

    console.log(message);

    const trimmedMessage = message.startsWith('>>') ? message.slice(2) : message; // Remove leading '>>' if present
    const questions = trimmedMessage.split('>>'); // Splits the message into an array using '>>' as a delimiter

    // Clean up the array by removing any empty strings
    const cleanedQuestions = questions.filter(function (question) {
        return question.trim() !== '';
    });

    // Assign each question to a button. Note that the array starts from index 0.
    if (cleanedQuestions[0]) {
        document.getElementById('response1-button').innerText = cleanedQuestions[0].trim();
    }
    if (cleanedQuestions[1]) {
        document.getElementById('response2-button').innerText = cleanedQuestions[1].trim();
    }
    if (cleanedQuestions[2]) {
        document.getElementById('response3-button').innerText = cleanedQuestions[2].trim();
    }
}

//Settings Listeners

settingsButton.addEventListener('click', function() {
    // Toggle the settings overlay
    if (settingsOverlay.style.display === 'none') {
        messageInput.disabled = true;
        sendButton.disabled = true;
        settingsOverlay.style.display = 'flex';
    } else {
        messageInput.disabled = false;
        sendButton.disabled = false;
        settingsOverlay.style.display = 'none';
    }
});

closeSettingsButton.addEventListener('click', function() {
    settingsOverlay.style.display = 'none';
    messageInput.disabled = false;
    sendButton.disabled = false;
});

tts_volmue.addEventListener("input", function() {
    volume_text.textContent = tts_volmue.value + "%";
});

tts_speed.addEventListener("input", function() {
    speed_text.textContent = tts_speed.value  + "%";
});

// Add a "click" event listener to the button
sendButton.addEventListener('click', sendMessage);

response1.addEventListener('click', function() { buttonHelper('1'); });
response2.addEventListener('click', function() { buttonHelper('2'); });
response3.addEventListener('click', function() { buttonHelper('3'); });

// Add a "keypress" event listener to the input field
messageInput.addEventListener('keypress', async function(event) {
    // Check if the key pressed was "Enter"
    if (event.key === 'Enter') {
        // Prevent the default action to stop the form from being submitted
        event.preventDefault();
        await sendMessage();
    }
});