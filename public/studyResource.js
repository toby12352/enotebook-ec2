const openStudyResourceButton = document.getElementById("openStudyResource");
const favorites = document.getElementById("favorites");
const studyResourceContainer = document.getElementById("studyResourceContainer");
const jsonBoxes = document.getElementById("resources");
const addToResources = document.getElementById("addToResources");
const addToResourcesOverlay = document.getElementById("addToResources-overlay");
const closeButton = document.getElementById('close-settings-button');

// Get user inputs on AddToResource
const websiteName = document.getElementById("website-name");
const description = document.getElementById("description");
const link = document.getElementById("link");

//JSON format user's input
const userInput = {
    "name": websiteName.value,
    "description": description.value,
    "url": link.value
};

openStudyResourceButton.addEventListener("click", function() {

    if(studyResourceContainer.style.left === "-500px"){
        studyResourceContainer.style.left = "60px";
    } else {
        studyResourceContainer.style.left = "-500px";
    }

});

addToResources.addEventListener("click", function(){
    // Toggle addToResource button
    if (addToResourcesOverlay.style.display === 'none') {
        messageInput.disabled = true;
        sendButton.disabled = true;
        addToResourcesOverlay.style.display = 'flex';
    } else {
        messageInput.disabled = false;
        sendButton.disabled = false;
        addToResourcesOverlay.style.display = 'none';
    }
});

closeButton.addEventListener('click', function() {
    console.log('CloseButton Clicked');
    messageInput.disabled = false;
    sendButton.disabled = false;
    addToResourcesOverlay.style.display = 'none';
});

function addToFavorites(resource){
    // const clone = resource.cloneNode(true);
    favorites.appendChild(resource);
}

function removeFromFavorites(resource){
    favorites.removeChild(resource);
    jsonBoxes.appendChild(resource);
}

function sortStudyBoxesAlphabetically() {
    const elements = Array.from(jsonBoxes.children);
    elements.sort((a, b) => {
        const textA = a.querySelector(".resource-name").textContent.toLowerCase();
        const textB = b.querySelector(".resource-name").textContent.toLowerCase();
        return textA.localeCompare(textB);
    });
    elements.forEach((element) => {
        jsonBoxes.appendChild(element);
    });
}

function toggleFavorites(starIcon, resource){
    console.log(favorites)
    const isFav = starIcon.dataset.favorites === "true";

    if(isFav){
        starIcon.src = "images/star-regular.png";
        starIcon.dataset.favorites = "false";
        removeFromFavorites(resource);
        sortStudyBoxesAlphabetically();
    }
    else{
        starIcon.src = "images/star-solid.png";
        starIcon.dataset.favorites = "true";
        addToFavorites(resource);
    }
}

function createResourceBox(resource){
    const resourceBox = document.createElement("div");
    resourceBox.id = "resource-box";

    const resourceURL = document.createElement("a");
    resourceURL.href = resource.url;
    resourceURL.target = "_blank";

    const resourceName = document.createElement("div");
    resourceName.classList.add("resource-name");
    resourceName.textContent = resource.name;

    resourceURL.appendChild(resourceName)

    const resourceDescription = document.createElement("div");
    resourceDescription.classList.add("resource-description");
    resourceDescription.textContent = resource.description;

    const starIcon = document.createElement("img");
    starIcon.src = "images/star-regular.png";
    starIcon.alt = "favorites_Icon";
    starIcon.classList.add("star-icon");
    starIcon.dataset.favorites = "false";

    resourceBox.appendChild(starIcon)
    resourceBox.appendChild(resourceURL);
    resourceBox.appendChild(resourceDescription);

    starIcon.addEventListener("click", function(){
        toggleFavorites(starIcon, resourceBox);
    })

    return resourceBox;
}

fetch("/data/studyresource.json")
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        jsonData.sort(function(a,b){
            return a.name.localeCompare(b.name);
        });

        jsonData.forEach(function(resource){
            const box = createResourceBox(resource);
            box.classList.add("custom-box");
            jsonBoxes.appendChild(box);
        });
    })
    .catch(function(error){
        console.error("Error fetching study resource data:", error);
    });
