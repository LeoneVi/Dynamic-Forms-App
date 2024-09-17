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

module.exports = userModel;

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

app.get('/user', async (req, res) => {//
      const myUser = await User.findOne({email:'victorialeone9@gmail.com'}).exec()
      if (!myUser) {
            res.status(418)
      }

      console.log(myUser)
      res.send(myUser)
});

// To Login
app.post('/login', async (req, res) => {//

      const email = req.body.email
      const password = req.body.password
      userModel.findOne({email : email})
      .then(user => {
            if(user) {
                  if(user.password === password){
                        res.json("Success")
                  }else{
                        res.json("The password is incorrect")
                  }
            }else{
                  res.json("No record existed")
            }
      })
      
   //   const myUser = await User.findOne({email, password}).exec()
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
app.post("/signup", async (req,res) => {
      userModel.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.json(err))
})

app.listen(4000, () => {
      console.log(`server listening on port ${process.env.PORT}`);
});