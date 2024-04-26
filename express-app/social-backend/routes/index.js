const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const router = express.Router();
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const app = express();
//port for express server
const port = 3006;

const upload = multer({ dest: 'uploads/' });
// Directory path
const directory = './uploads';

app.use(bodyParser.json());
//cors cross origin resource sharing to allow client to connect with server
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['POST']
}));

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Lmmpa@910019',
  port: 5432,
});

app.get('/', (req, res) => {
  res.send('Express is running!');
});

// Sign up endpoint
app.post('/signup', async (req, res) => {
  const {username, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
    client.release();
    res.status(200).send('Signup successful');
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error signing up');
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query to fetch user with the provided username and password
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const result = await pool.query(query, [username, password]);

    // Check if a user with the provided credentials exists
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Authentication successful
    return res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

// Post endpoint
app.post('/addPost', upload.single('image'), async (req, res) => {
  const { description } = req.body;
  const image = req.file;

  // Read the image file
  const imageData = fs.readFileSync(image.path);

  // Encode the image data as a Buffer
  const imageBuffer = Buffer.from(imageData);

  // Create uploads directory if it doesn't exist
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
    console.log('Uploads directory created successfully');
  } else {
    console.log('Uploads directory already exists');
  }

  // Check if all required fields are provided
  if (!description || !image) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Query to insert post data into the post table
    const query = 'INSERT INTO posts (description, image_upload) VALUES ($1, $2)';
    await pool.query(query, [description, imageBuffer]);

    // Send a success response
    return res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error adding post:', error);
    return res.status(500).json({ error: 'Failed to add post' });
  }
});

app.get('/posts', async (req, res) => {
  try {
    // Query to select all posts from the database
    const query = 'SELECT * FROM posts';
    const posts = await pool.query(query);

    // Send the retrieved posts as JSON response
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


module.exports = router;