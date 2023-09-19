// Handle Settings
var settingsButton = document.getElementById('settings-button');
var settingsOverlay = document.getElementById('settings-overlay');
var closeSettingsButton = document.getElementById('close-settings-button');

let settings = {
    ai_type: "instant",
    module_type: "default",
    tts_enabled: null,
    speech_syn: null,
    tts_volume: 100,
    tts_speed: 100,
    color_theme: "default"
}

var ai_type = document.getElementById('option1');
var module_type = document.getElementById('module_type');
var tts_enabled = document.getElementById('option2');
var tts_volmue = document.getElementById('volume-slider');
var volume_text = document.getElementById('volume-value');
var tts_speed = document.getElementById('speed-slider');
var speed_text = document.getElementById('speed-value');
var color_theme = document.getElementById('color-picker');

// Save Settings to local storage
function saveSettings() {
    localStorage.setItem('settings', JSON.stringify(settings));
}

// Load Settings from local storage
function loadSettings() {
    document.getElementById('option1').value = settings.ai_type;
    document.getElementById('module_type').value = settings.module_type;
    document.getElementById('option2').checked = settings.tts_enabled;
    document.getElementById('option2').checked = settings.speech_syn;
    document.getElementById('volume-slider').value = settings.tts_volume;
    document.getElementById('speed-slider').value = settings.tts_speed;

    document.getElementById('volume-value').textContent = settings.tts_volume + "%";
    document.getElementById('speed-value').textContent = settings.tts_speed + "%";

    document.getElementById('color-picker').value = settings.color_theme;

    let storedSettings = localStorage.getItem('settings');
    if (storedSettings) {
        saved_settings = JSON.parse(storedSettings);

        // Update  HTML elements with the loaded settings
        document.getElementById('option1').value = saved_settings.ai_type;
        document.getElementById('module_type').value = saved_settings.module_type;
        document.getElementById('option2').checked = saved_settings.tts_enabled;
        document.getElementById('option2').checked = saved_settings.speech_syn;
        document.getElementById('volume-slider').value = saved_settings.tts_volume;
        document.getElementById('speed-slider').value = saved_settings.tts_speed;

        // Update displayed values for volume and speed
        document.getElementById('volume-value').textContent = saved_settings.tts_volume + "%";
        document.getElementById('speed-value').textContent = saved_settings.tts_speed + "%";

        // Update Color Theme
        document.getElementById('color-picker').value = saved_settings.color_theme;
    }
}


//Settings Listeners
document.getElementById('option1').addEventListener('change', function(e) {
    settings.ai_type = e.target.value;
    saveSettings();
});

document.getElementById('module_type').addEventListener('change', function(e) {
    settings.module_type = e.target.value;
    saveSettings();
});

document.getElementById('option2').addEventListener('change', function(e) {
    settings.tts_enabled = e.target.value;
    saveSettings();
});

document.getElementById('volume-slider').addEventListener('change', function(e) {
    settings.tts_volume = e.target.value;
    saveSettings();
});

document.getElementById('volume-value').addEventListener('change', function(e) {
    settings.volume_text = e.target.value;
    saveSettings();
});

document.getElementById('speed-slider').addEventListener('change', function(e) {
    settings.tts_speed = e.target.value;
    saveSettings();
});

document.getElementById('speed-value').addEventListener('change', function(e) {
    settings.speed_text = e.target.value;
    saveSettings();
});

colorThemes = {
    "default": {
        "--theme-main-color": "#fff",
        "--theme-background-color": "#f0f0f0",
        "--theme-chatbox-color": "#fff",
        "--theme-disabled-color": "#c4c4c4",
        "--theme-nav-color": "#1b1b1b",
        "--theme-nav-text-color": "#fff",
        "--theme-user-background": "#eeeeee",
        "--theme-reply-background": "#e6e6e6",
        "--theme-text-color": "#000000"
    },
    "dark": {
        "--theme-main-color": "#686b70",
        "--theme-background-color": "#f0f0f0",
        "--theme-chatbox-color": "#686b70",
        "--theme-disabled-color": "#c4c4c4",
        "--theme-nav-color": "#1b1b1b",
        "--theme-nav-text-color": "#686b70",
        "--theme-user-background": "#2e2e2e",
        "--theme-reply-background": "#1c1c1c",
        "--theme-text-color": "#fff"
    }
}



document.getElementById('color-picker').addEventListener('change', function(e) {
    settings.color_picker = e.target.value;
    saveSettings();
    console.log(settings.color_picker)
    for (let element in colorThemes[settings.color_picker]) {
        console.log(element)
        document.documentElement.style.setProperty(element, colorThemes[settings.color_picker][element]);
    }
});


window.onload = loadSettings;

settingsButton.addEventListener('click', function() {
    // Toggle the settings overlay
    if (settingsOverlay.style.display === 'none') {
        settingsOverlay.style.display = 'flex';
        toggleBackground(true);
    } else {
        settingsOverlay.style.display = 'none';
        toggleBackground(false);
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