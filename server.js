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
  "mongodb://user:IejXrylNxuLTEKPv@cluster0-shard-00-00.lefur.mongodb.net:27017,cluster0-shard-00-01.lefur.mongodb.net:27017,cluster0-shard-00-02.lefur.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-u8uu83-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(db => {
    console.log("Database connected");
  }).catch(error => console.log("Could not connect to mongo db " + error));

app.use('/auth', authRoutes);
app.use('/', requireToken, (req, res) => {
  res.send({"Mobile ": req.user.mobile})
});
app.listen(process.env.PORT || port)