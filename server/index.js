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

// Export the user model

const User = mongoose.model("User", userSchema);

mongoose.connect(process.env.MONGODB_CONNECTION);
  
   //   useNewUrlParser: true,
    //  useUnifiedTopology: true,

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
// access this using localhost:4000
// only call it once
// it should create a user

      await addUser.save()

      res.send("saved")
})

app.get('/user', async (req, res) => {//
      const myUser = await User.findOne({email:'victorialeone9@gmail.com'}).exec()
      if (!myUser) {
            res.status(418)
      }
// once the above function works, this function should work
      //res.send("poop");
      console.log("test")
      console.log(myUser)
      res.send(myUser)
});


app.post('/login', async (req, res) => {//
      console.log(req.body)
      const email = req.body.email
      const password = req.body.password
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

app.listen(4000, () => {
      console.log(`server listening on port ${process.env.PORT}`);
});