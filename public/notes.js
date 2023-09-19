const dropdown = document.getElementById('file-dropdown');



// Fetch the list of files from the server
function populateDropdown(){
  fetch('/get-files')
    .then(response => response.json())
    .then(files => {
      // Clear the dropdown
      dropdown.innerHTML = '';

      // Populate the dropdown with the list of files
      files.forEach(file => {
        const option = document.createElement('option');
        option.value = file;
        option.textContent = file;
        dropdown.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Failed to get list of files:', error);
    });
}


function extractContentFromDelta(delta) {
  let content = "";
  if (delta.ops) {
    for (let op of delta.ops) {
      if (typeof op.insert === 'string') {
        content += op.insert;
      }
    }
  }
  return content;
}

async function generateFlashCards() {
  var temp_contents = quill.getContents(); 
  const cur_contents = extractContentFromDelta(temp_contents);
  // Module Preprocessing
  
  var reply_message = await getTextReply(cur_contents, "Generate 5 flashcards based on the student's notes");

  var flashcard_deck = {
    ops: [
      { insert: "", "attributes": {"bold": true, "header": 1} },
      { insert: reply_message },
    ]
  };


  var content = flashcard_deck; 

  // Send the content to the server for saving
  fetch('/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({filename: "Flashcard Deck", content: content})
  }).then(response => {
    if (response.ok) {
      alert("File saved successfully!");
    } else {
      alert("Failed to save file.");
    }
  });
  populateDropdown();
  //var newReply = createChatMessage(reply_message + "\n", 'bot');
  //chatBox.appendChild(newReply);

}

async function generateStudyGuide() {
  var temp_contents = quill.getContents(); 
  const cur_contents = extractContentFromDelta(temp_contents);
  // Module Preprocessing
  
  var reply_message = await getTextReply(cur_contents, "Generate a study guide for a student based on this information and supplement any information");

  var flashcard_deck = {
    ops: [
      { insert: "", "attributes": {"bold": true, "header": 1} },
      { insert: reply_message },
    ]
  };


  var content = flashcard_deck; 

  // Send the content to the server for saving
  fetch('/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({filename: "Study Guide", content: content})
  }).then(response => {
    if (response.ok) {
      alert("File saved successfully!");
    } else {
      alert("Failed to save file.");
    }
  });
  populateDropdown();
}

async function generatePracticeTest() {
  var temp_contents = quill.getContents(); 
  const cur_contents = extractContentFromDelta(temp_contents);
  // Module Preprocessing
  
  var reply_message = await getTextReply(cur_contents, "Generate a multiple choice practice test for a student based on their notes and the content that they are covering. Do not include the answers");

  var flashcard_deck = {
    ops: [
      { insert: "", "attributes": {"bold": true, "header": 1} },
      { insert: reply_message },
    ]
  };


  var content = flashcard_deck; 

  // Send the content to the server for saving
  fetch('/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({filename: "Practice Test", content: content})
  }).then(response => {
    if (response.ok) {
      alert("File saved successfully!");
    } else {
      alert("Failed to save file.");
    }
  });
  populateDropdown();
}


function applyTemplate() {
  var selectedTemplate = document.getElementById("template-dropdown").value;
  var template = templatesCache[selectedTemplate];
  if (template) {
      quill.setContents(template); // Set the contents of the Quill editor
  }
  // Hide the dropdown menu after applying the template
  document.getElementById("template-dropdown-container").style.display = "none";
}


function closeModal() {
  const modal = document.getElementById('saveModal');
  modal.style.display = 'none';
}

var newTemplate = {
  ops: [
    { insert: ""},
  ]
};

var cornellTemplate = {
  "ops": [
    {"insert": "Questions/Keywords\n", "attributes": {"bold": true, "header": 1}},
    {"insert": "\n", "attributes": {"table": "row"}},
    {"insert": "\n", "attributes": {"table": "cell"}},
    {"insert": "Notes\n", "attributes": {"bold": true, "header": 1}},
    {"insert": "\n", "attributes": {"table": "row"}},
    {"insert": "\n", "attributes": {"table": "cell"}},
    {"insert": "\n", "attributes": {"table": "row"}},
    {"insert": "\n", "attributes": {"table": "cell"}},
    {"insert": "\n", "attributes": {"table": "row"}},
    {"insert": "\n", "attributes": {"table": "cell"}},
    {"insert": "\n", "attributes": {"table": "row"}},
    {"insert": "\n", "attributes": {"table": "cell"}},
    {"insert": "\n", "attributes": {"table": "row"}},
    {"insert": "\n", "attributes": {"table": "cell"}},
    {"insert": "Summary\n", "attributes": {"bold": true, "header": 1}},
    {"insert": "\n", "attributes": {"table": "row"}},
    {"insert": "\n", "attributes": {"table": "cell"}}
]
}

var cornellTemplate = {
  "ops": [
    {"insert": "Questions/Keywords\n", "attributes": {"bold": true, "header": 1}},
    {"insert": "\n"},
    {"insert": "\n"},
    {"insert": "Notes\n", "attributes": {"bold": true, "header": 1}},
    {"insert": "\n"},
    {"insert": "\n"},
    {"insert": "\n"},
    {"insert": "\n"},
    {"insert": "\n"},
    {"insert": "\n"},
    {"insert": "\n"},
    {"insert": "Summary\n", "attributes": {"bold": true, "header": 1}},
    {"insert": "\n"},
    {"insert": "\n"}
]
}

var cornellTemplate2 = {
  "ops": [
    {"insert": "Cornell Notes\n", "attributes": {"bold": true, "header": 1}},
    {"insert": "\n"},
    
    {"insert": {"table": "new", "rows": 1, "cols": 2}},
    {"insert": {"table": "cell", "row": 0, "cell": 0}},
    {"insert": "Questions/Keywords\n"},
    
    {"insert": {"table": "cell", "row": 0, "cell": 1}},
    {"insert": "Notes\n"},
    
    {"insert": "\n"},

    {"insert": {"table": "new", "rows": 4, "cols": 2}},
    {"insert": {"table": "cell", "row": 1, "cell": 0}},
    {"insert": "\n"},
    {"insert": {"table": "cell", "row": 1, "cell": 1}},
    {"insert": "\n"},

    // ... Add more rows as needed ...

    {"insert": "Summary\n", "attributes": {"bold": true, "header": 1}},
    {"insert": "\n"},
    // Add more space for Summary or additional structures as desired
  ]
}

var twoColumnTemplate = {
  ops: [

    { insert: "Main Ideas/Questions", attributes: { "table": "row", "bold": true, "header": 1} },
    { insert: "\n\n", attributes: { "table": "col"} },
    { insert: "\n\n", attributes: { "table": "row"} },
    { insert: "\n\n", attributes: { "table": "row"} },
    { insert: "\n\n", attributes: { "table": "row"} },
    { insert: "\n\n", attributes: { "table": "row"} },
    { insert: "\n\n", attributes: { "table": "row"} },
    { insert: "\n\n", attributes: { "table": "row"} },
    { insert: "\n\n", attributes: { "table": "row"} },
    { insert: "\n\n", attributes: { "table": "row"} },
    { insert: "\n\n", attributes: { "table": "row"} },
    { insert: "\n\n", attributes: { "table": "row"} },
    { insert: "\n\n", attributes: { "table": "row"} },

    //{ insert: "Supporting Details/Answers", attributes: { "table": "row", "bold": true, "header": 1} },
  ]
};

var twoColumnTemplate = {"ops":[{"attributes":{"bold":true},"insert":"Main Ideas/Questions"},{"attributes":{"table":"col"},"insert":"\n\n"},{"attributes":{"bold":true},"insert":"Supporting Details/Answers"},{"attributes":{"table":"cell"},"insert":"\n\n"}]}

var templatesCache = {
  "New File": newTemplate,
  "Cornell": cornellTemplate,
  "Two-Column": twoColumnTemplate, 
};




// Quill Display Creation

var FontAttributor = Quill.import('attributors/class/font');
FontAttributor.whitelist = ['arial', 'georgia', 'times-new-roman', 'roboto', 'patrick-hand', 'courier-prime', 'lora'];
Quill.register(FontAttributor, true);

var Size = Quill.import('attributors/style/size');
Size.whitelist = ['8px', '9px', '10px', '11px', '12px', '14px', '18px', '24px', '30px', '36px', '48px', '60px', '72px', '96px'];
Quill.register(Size, true);







var quill = new Quill('#editor', {
  modules: {
    table: false,
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block'],
      [{ 'color': ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f', '#000', '#fff'] }],
      [{ 'font': ['arial', 'georgia', 'times-new-roman', 'roboto', 'patrick-hand', 'courier-prime','lora'] }],
      [{ 'size': ['8px', '9px', '10px', '11px', '12px', '14px', '18px', '24px', '30px', '36px', '48px', '60px', '72px', '96px'] }],
    ]
  },
  placeholder: '',
  theme: 'snow'  // or 'bubble'
});


quill.setContents(twoColumnTemplate);


function showSaveModal() {
  var modal = document.getElementById("saveModal");
  modal.style.display = "block";
}

function saveFile() {
  var modal = document.getElementById("saveModal");
  modal.style.display = "none";
  
  var filename = document.getElementById("filename").value;
  var content = quill.getContents(); 

  // Send the content to the server for saving
  fetch('/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({filename: filename, content: content})
  }).then(response => {
    if (response.ok) {
      alert("File saved successfully!");
    } else {
      alert("Failed to save file.");
    }
  });
  populateDropdown();
}

function loadFile() {
  var select = document.getElementById("file-dropdown");
  var filename = select.value;

  fetch(`/load/${filename}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      quill.setContents(data); // Assuming you're using Quill
    });
}

window.addEventListener("DOMContentLoaded", function() {
  // Populate the dropdown menu with the template names
  var templateDropdown = document.getElementById("template-dropdown");
  for (var templateName in templatesCache) {
      var option = document.createElement("option");
      option.value = templateName;
      option.text = templateName;
      templateDropdown.appendChild(option);
  }
  
  // Add an event listener to show the dropdown menu
  document.getElementById("choose-template-button").addEventListener("click", function() {
      var dropdownContainer = document.getElementById("template-dropdown-container");
      dropdownContainer.style.display = dropdownContainer.style.display === "none" ? "block" : "none";
  });
});

async function getTextReply(input_message, system_message="", subprocess=false) {
  data_package = {
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


const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', closeModal);

populateDropdown();