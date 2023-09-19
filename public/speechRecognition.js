var listenButton = document.getElementById('listen-button');
var allow_speech = document.getElementById('speech_option');

const keyphrase = "Jarvis";
let isListening = false;
let recognition;

async function startSpeechRecognition() {
    // Check if SpeechRecognition is supported
    if (!('webkitSpeechRecognition' in window)) {
        alert('Your browser does not support speech recognition. Try Google Chrome.');
    } else {
        if(allow_speech.checked){
            listenButton.textContent = "Listening...";
            isListening = true;
            console.log("Speech to Text Enabled");

            while(allow_speech.checked && isListening){
                try {
                    await continousSpeech();
                } catch (err){
                    console.error(err);
                }
            }
        }
        listenButton.textContent = "Listen";
    }
}

function stopSpeechRecognition() {
    isListening = false;
    listenButton.textContent = "Listen";
    if (recognition) {
        recognition.stop();
        recognition = null; // optionally reset the instance
    }
}

function continousSpeech(){
    return new Promise((resolve, reject) => {
        let currentTranscript = '';
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true; // Listen continuously
        recognition.interimResults = true; // Provide interim results

        recognition.onresult = (event) => {
            let interimTranscript = '';

            // Go through all the results
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    currentTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
                console.log(" - " + transcript);
            }

            // Check if the keyword is present in the final transcript
            if (currentTranscript.includes(keyphrase) || currentTranscript.includes(keyphrase.toLowerCase())) {
                recognition.stop();
                resolve(finalTranscript(currentTranscript));
            }
        }

        recognition.onend = () => {
            // If the transcript ends abruptly
            //console.log("Interim Transcript has ended");
            if(allow_speech.checked){
                resolve();
            }else{
                reject('Speech recognition stopped');
            }
        }
        recognition.start();
    });
}

function finalTranscript(additionalText){

    let words = additionalText.split(" ");
    let cutIndex = words.indexOf(keyphrase);

    if (cutIndex !== -1) {
        words = words.slice(cutIndex + 1);
    }
    additionalText = words.join(" ");

    return new Promise((resolve, reject) => {
        if(additionalText == ""){
            listenButton.textContent = "Recording!";
            const recordingRecognition = new webkitSpeechRecognition()
            recordingRecognition.continuous = false;
            recordingRecognition.maxAlternatives = 10;
            recordingRecognition.interimResults = false;
            
            recordingRecognition.onresult = (recordingEvent) => {
                let recordingTranscript = "";

                for (let i = recordingEvent.resultIndex; i < recordingEvent.results.length; i++) {
                    recordingTranscript += recordingEvent.results[i][0].transcript;
                }

                console.log(`Recorded transcript: ${recordingTranscript}`);
                if(parseMessage(recordingTranscript)) {
                    sendMessage(recordingTranscript);
                }
                listenButton.textContent = "Listening...";
            };

            recordingRecognition.onend = () => {
                console.log("Transcript Recording has ended");
                listenButton.textContent = "Listening...";
                resolve();
            }

            recordingRecognition.start();

            // Stop the recording after 5 seconds
            setTimeout(() => recordingRecognition.stop(), 5000);
        }else{
            if(parseMessage(additionalText)) {
                sendMessage(additionalText);
            }
            resolve();
        }
    });
}

function parseMessage(inputMessage){
    var cleaned_message = inputMessage.toLowerCase()
    var action_completed = true;
    switch(cleaned_message){
        case "stop playing":
            stopSpeaking()
            break;
        default:
            action_completed = false;
            break;
    }

    if(cleaned_message.includes("nevermind") || cleaned_message.includes("never mind")){
        action_completed = true;
    }
    
    if(action_completed){
        return false
    }
    return true
}

listenButton.addEventListener('click', function() {
    if (isListening) {
        stopSpeechRecognition();
        isListening = false;
    } else {
        startSpeechRecognition();
        isListening = true;
    }
});