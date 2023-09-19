// Getting elements
var loginPopup = document.getElementById('loginPopup');
var closePopup = document.getElementsByClassName("close-popup")[0];

const usernameField = document.getElementById("loginUsername");
const passwordField = document.getElementById("loginPassword");
const notificationElement = document.getElementById("notification");

// Open the popup
function showLoginPopup() {
    loginPopup.style.display = "block";
    toggleBackground(true);
}

function closeLoginPopup(){
    loginPopup.style.display = "none";
    usernameField.value = '';
    passwordField.value = '';
    notificationElement.textContent = ''
    toggleBackground(false);
}

// Close the popup
closePopup.onclick = function() {
    closeLoginPopup();
}

// Event for the login button (placeholder logic, you'd connect to your backend)
document.getElementById("loginButton").addEventListener("click", async function() {
    var username = usernameField.value;
    var password = passwordField.value;

    if(username == ""){
        notificationElement.textContent = "Please enter a username and try again";
        return '';
    }
    if(password == ""){
        notificationElement.textContent = "Please enter a password and try again";
        return '';
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"username": username, "password": password})
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            notificationElement.textContent = data.message || `Error: ${response.statusText}`;
            return '';
        } else {
            notificationElement.textContent = "Successfully Logged In!";
            closeLoginPopup();
        }
    } catch (error) {
        console.error('There was an error:', error);
    }
});


// Event for the register button
document.getElementById("registerButton").addEventListener("click", async function() {
    var username = usernameField.value;
    var password = passwordField.value;

    if(username == ""){
        notificationElement.textContent = "Please enter a username and try again";
        return '';
    }
    if(password == ""){
        notificationElement.textContent = "Please enter a password and try again";
        return '';
    }
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"username": username, "password": password})
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            notificationElement.textContent = data.message || `Error: ${response.statusText}`;
            return '';
        } else {
            notificationElement.textContent = "Account Successfully Created!";
            closeLoginPopup();
        }
    } catch (error) {
        console.error('There was an error:', error);
    }
});

const loginLink = document.getElementById('loginLink');

// Add an event listener to the hyperlink
loginLink.addEventListener('click', function(event) {
    event.preventDefault();

    // Call the function that displays the login popup
    showLoginPopup();
});