if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require('./models/user');
const authRoutes = require('./routes/auth');
const requireToken = require('./middleware/requireToken');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(db => {
    console.log("Database connected");
  }).catch(error => console.log("Could not connect to mongo db " + error));
  
app.use('/auth', authRoutes);
app.use('/', requireToken, (req, res) => {
  res.send("Your Email is " + req.user.email)
})
app.listen(process.env.PORT || port)