require('dotenv').config()

const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios');
const fs = require('fs');
const cors = require('cors');
const socketIo = require('socket.io');
const app = express();
var port = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static('node_modules'));
app.use('/dist', express.static('dist'));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/get-chat-reply', async function(req, res) {
    const userMessage = req.body.message;
    const conversation_data = req.body.data;
    const sysMessage = req.body.sys_message;

    // Axios POST request to the Flask server
    axios.post('http://18.237.102.230:5000/get-chat-reply', { message: userMessage, conv_data: conversation_data, sys_message: sysMessage})
        .then(response => {
            // The reply from the Python script is in response.data.reply
            res.json({ reply: response.data.reply });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ reply: 'An error occurred while getting a reply from the API.' });
        });
});

app.post('/get-audio-reply', async function(req, res) {
    const userMessage = req.body.message;
    const audioType = req.body.audio_type
    const audioVolume = req.body.audio_volume
    const audioSpeed = req.body.audio_speed
    // Axios POST request to the Flask server
    axios.post('http://18.237.102.230:5000/get-chat-reply-audio', { message: userMessage, ai_type: audioType }, { responseType: 'arraybuffer' })
        .then(audioResponse => {
            // Send the audio responses
            res.setHeader('Content-Type', 'audio/wav');
            res.send(Buffer.from(audioResponse.data, 'binary'));
        })
        .catch(audioError => {
            console.error(audioError);
            res.status(500).json({ reply: 'An error occurred while getting a reply from the API.' });
        });
});

app.post('/get-audio-reply-free', async function(req, res) {
    const userMessage = req.body.message;
    // Axios POST request to the Flask server
    axios.post('http://18.237.102.230:5000/get-chat-reply-audio-free', { message: userMessage }, { responseType: 'arraybuffer' })
        .then(audioResponse => {
            // Send the audio responses
            res.setHeader('Content-Type', 'audio/mp3');
            res.send(Buffer.from(audioResponse.data, 'binary'));
        })
        .catch(audioError => {
            console.error(audioError);
            res.status(500).json({ reply: 'An error occurred while getting a reply from the API.' });
        });
});

app.post('/relay-message', (req, res) => {
    const messageData = req.body.data;
    const isNewReply = req.body.newReply
    io.emit('message', {data: messageData, newReply: isNewReply});  // Emit to all connected clients
    res.send('Relayed');
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const usersTxtPath = path.join(__dirname, 'database', 'users.txt');

  if (!username || !password) {
      return res.status(400).send('Missing username or password');
  }
  
  // Read the contents of the users.txt file
  fs.readFile(usersTxtPath, 'utf-8', (err, data) => {
    if (err) {
        res.status(500).json({ message: 'Server error while reading users' });
        return;
    }

    // Check if the user exists
    const users = data.split('\n');
    if (!users.includes(username)) {
        res.status(400).json({ message: 'User does not exist' });
        return;
    }

    // If user exists, read the user's JSON file
    const userJsonPath = path.join(__dirname, 'database', `${username}.json`);
    fs.readFile(userJsonPath, 'utf-8', (err, userData) => {
        if (err) {
            res.status(500).json({ message: 'Server error while reading user data' });
            return;
        }

        const userContent = JSON.parse(userData);

        if (userContent.password !== password) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }

        res.status(200).json({ message: 'Successfully logged in' });
    });
});
});

app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const usersTxtPath = path.join(__dirname, 'database', 'users.txt');

  if (!username || !password) {
      return res.status(400).send('Missing username or password');
  }

  // Ensure a users.txt file exists
  if (!fs.existsSync(usersTxtPath)) {
    // The file does not exist, create it
    fs.writeFileSync(usersTxtPath, '', 'utf8');
  }

  // Check if username exists in users.txt
  fs.readFile(usersTxtPath, 'utf8', (err, data) => {
      if (err) throw err;

      const users = data.split('\n');
      if (users.includes(username)) {
          return res.status(400).json({ message: "Username already exists" });
      }

      // Add new username to users.txt
      fs.appendFile(usersTxtPath, username + '\n', (err) => {
          if (err) throw err;

          // Create new [username].json file
          const userContent = {
              username: username,
              password: password, // This should be hashed later
              tokens: 0,
              notes: []
          };

          fs.writeFile('database/' + username + '.json', JSON.stringify(userContent), (err) => {
              if (err) throw err;
              res.json('User registered successfully');
          });
      });
  });
});




app.get('/get-files', (req, res) => {
    fs.readdir(DATA_DIR, (err, files) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to get list of files.');
        return;
      }
      // Filter out non-JSON files and remove the ".json" extension
      const jsonFiles = files.filter(file => file.endsWith('.json'))
                              .map(file => file.slice(0, -5));
      res.send(jsonFiles);
    });
  });

app.post('/save', (req, res) => {
    const filename = req.body.filename;
    const content = req.body.content;
    const filePath = path.join(DATA_DIR, filename + '.json');
    
    fs.writeFile(filePath, JSON.stringify(content), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to save file.');
        return;
      }
      res.send('File saved successfully!');
    });
  });

  app.get('/load/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(DATA_DIR, filename + '.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to load file.');
        return;
      }
      res.send(data);
    });
  });









const ipAddress = '18.237.102.230:3000';
const io = socketIo(ipAddress);


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


// If any route is not found, render 404 page
app.get('*', function (req, res) {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

const server = http.createServer(app);

server.listen(port, '0.0.0.0', function () {
    console.log("== Server is listening on port", port);
});

/*
* FEATURE LIST:
* - Background color picker
* - Anki Flashcard generation
* - Speakable notes
* - Read out notes?
* - Note analytics
* - Token checker
* - User profiles
* - Work on the UI a bit
* - TTS streaming
* - Handwriting/OCR





* - Text stream periods with the custom TTS
* - Cut off speaking early
* - Chat box have a read out loud button
* - Regenerate response button
* - Keyword recognition
* - Streamable text
* - Multiprocess journey questions
* - Polish Navigation bar
* - User accounts/history
* - Version History
*/


/*
* Added Settings Page
* Added Multiple TTS
* Updated Nav Bar
* Updated Chat GUI
* Swapped to Python
*/

