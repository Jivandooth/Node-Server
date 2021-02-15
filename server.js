// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').load()
// }
const express = require('express')
const app = express()
// const expressLayout = require('express-ejs-layouts')
const port = 1234

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://127.0.0.1:27017/mydb",
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(db => {
    console.log("Database connected");
  }).catch(error => console.log("Could not connect to mongo db " + error));
  
const indexRouter = require('./routes/index');
app.use('/', indexRouter)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})