async function speak() {
    if ('speechSynthesis' in window) {
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
}
