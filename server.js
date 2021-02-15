if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const port = 3000

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(db => {
    console.log("Database connected");
  }).catch(error => console.log("Could not connect to mongo db " + error));
  
app.use('/', indexRouter)
app.listen(process.env.PORT || 3000)