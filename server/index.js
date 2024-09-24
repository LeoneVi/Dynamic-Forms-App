require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;  // Change this line to export User

mongoose.connect(process.env.MONGODB_CONNECTION);

const db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
      console.log('Connected to MongoDB');
});

app.get("/", async (req, res) => {
      const addUser  = new User({
            email: "victorialeone9@gmail.com",
            password: "password"
      })

      await addUser.save()

      res.send("saved")
})

app.get('/user', async (req, res) => {
      const myUser = await User.findOne({email:'victorialeone9@gmail.com'}).exec()
      if (!myUser) {
            res.status(418)
      }

      console.log(myUser)
      res.send(myUser)
});

// To Login
app.post('/login', async (req, res) => {
      const email = req.body.email
      const password = req.body.password

      User.findOne({email: email})
      .then(user => {
            if(user) {
                  if(user.password === password){
                        res.json({ status: "Success", userId: user._id });
                  }else{
                        res.json("The password is incorrect")
                  }
            }else{
                  res.json("No record existed")
            }
      })
      
      const myUser = await User.findOne({email, password}).exec()
      if (!myUser) {
            console.log("not found")
            res.status(404)
      }
      else {
            console.log("found")
            res.status(200)
      }
});

// To Signup 
app.post("/signup", async (req, res) => {
      console.log(req.body)
      User.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.json(err))
})

// For forms
const formSchema = new mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Automatically generate a unique ID
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      filename: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    });
    
const Form = mongoose.model('Form', formSchema); 

// route to create new post
app.post('/posts', async (req, res) => {
      console.log("posts connected to the backend!")
      const { userId, filename, title, content } = req.body;
    
      const newForm = new Form({
        userId,
        filename,
        title, 
        content,
      });
    
      try {
        const savedForm = await newForm.save();
        res.status(201).json({
          id: savedForm._id,
          userId: savedForm.userId,
          filename: savedForm.filename,
          title: savedForm.title,
          content: savedForm.content,
        });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });
    


// route to get posts by user
app.get('/posts', async (req, res) => {
      const { userId } = req.query;
    
      try {
        const forms = await Form.find({ userId }).exec();
        res.json(forms);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

// route to get a specific post
app.get('/posts/:id', async (req, res) => {
      const { id } = req.params;
    
      try {
        const post = await Form.findById(id).exec();
        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }
        res.json(post);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

// route to update a post
app.put('/posts/:id', async (req, res) => {
      const { id } = req.params;
      const { title, filename, content } = req.body;
    
      try {
        const updatedPost = await Form.findByIdAndUpdate(id, {
          title, filename, content
        }, { new: true });
    
        if (!updatedPost) {
          return res.status(404).json({ error: "Post not found" });
        }
    
        res.json(updatedPost);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
    
    
app.listen(4000, () => {
      console.log(`server listening on port ${process.env.PORT}`);
});