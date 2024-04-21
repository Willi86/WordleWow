import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import HighScorePage from './frontend/src/HighScorePage.js';

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Set up route to serve words.json
app.get('/words.json', (req, res) => {
    // Set content type for JSON response
    res.setHeader('Content-Type', 'application/json');

    // Read the words.json file
    fs.readFile(path.join(__dirname, 'words.json'), (err, data) => {
        if (err) {
            // If there's an error reading the file, send an error response
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Send the contents of the words.json file as the response
        res.status(200).send(data);
    });
});

//Connect to MongoDB
mongoose.connect('mongodb+srv://WilliamLu:DTgG.q2d.4TseLG@cluster0.fbflxmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// Define MongoDB Model
const User = mongoose.model('User', userSchema);

// Handle form submission
app.post('/api/users', async (req, res) => {
  const { name, email, age } = req.body;

  try {
    // Create a new user document
    const newUser = new User({ name, email, age });
    // Save the user document to the database
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*get the highscore*/ 
// Import the User model if you have defined it
// Define a GET route to fetch user data
// Define a GET route to fetch user data
app.get('/api/users', async (req, res) => {
  try {
    // Query the database to fetch all users
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  console.log("json is fetched")
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
