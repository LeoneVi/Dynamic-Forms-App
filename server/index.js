require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mongoose User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Mongoose Form Schema to handle posts with questions, including the answer for fill-in-the-blank questions
const formSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  filename: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  questions: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, auto: true },
      title: { type: String, required: true },
      type: { type: String, required: true }, // multiple-choice, fill-in-the-blank, image-upload
      options: [String], // Multiple-choice options
      answer: String, // Answer for fill-in-the-blank
      image: String, // For image upload
    }
  ]
});

// Mongoose Models
const User = mongoose.model('User', userSchema);
const Form = mongoose.model('Form', formSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes

// Test route to add a user
app.get("/", async (req, res) => {
  const addUser = new User({
    email: "victorialeone9@gmail.com",
    password: "password"
  });

  await addUser.save();

  res.send("User saved");
});

// Route to retrieve a user
app.get('/user', async (req, res) => {
  const myUser = await User.findOne({ email: 'victorialeone9@gmail.com' }).exec();
  if (!myUser) {
    res.status(418).send("User not found");
  } else {
    console.log(myUser);
    res.json(myUser);
  }
});

// User Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();
  if (user) {
    if (user.password === password) {
      res.json({ status: "Success", userId: user._id });
    } else {
      res.json({ status: "Error", message: "Incorrect password" });
    }
  } else {
    res.json({ status: "Error", message: "User does not exist" });
  }
});

// User Signup Route
app.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to create a new post with questions, including answers for fill-in-the-blank
app.post('/posts', async (req, res) => {
  const { userId, filename, title, content, questions } = req.body;

  const newForm = new Form({
    userId,
    filename,
    title,
    content,
    questions,
  });

  try {
    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get all posts for a user
app.get('/posts', async (req, res) => {
  const { userId } = req.query;

  try {
    const forms = await Form.find({ userId }).exec();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get a specific post by ID
app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Form.findById(id).exec();
    if (!post) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update a post
app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, filename, content, questions } = req.body;

  try {
    const updatedPost = await Form.findByIdAndUpdate(id, {
      title,
      filename,
      content,
      questions
    }, { new: true });

    if (!updatedPost) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.json(updatedPost);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(4000, () => {
  console.log(`Server listening on port 4000`);
});