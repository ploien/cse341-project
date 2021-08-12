/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling. 
 * They're for information purposes only.
 * 
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course. 
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = 'mongodb+srv://dummyUser1:F6gMTEUWwAqfQ55r@cluster0.zjkof.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
const app = express();

const store = new MongoDBStore({
   uri: MONGODB_URI,
   collection: 'sessions'
})

app.use(session({
   secret: 'my secret',
   resave: false,
   saveUninitialized: false,
   store: store
}))

app.use(flash());

//Route setup. You can implement more in the future!

//Require all paths from the route folder
const routes = require('./routes');

app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   // For view engine as Pug
   //.set('view engine', 'pug') // For view engine as PUG. 
   // For view engine as hbs (Handlebars)
   //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
   //.set('view engine', 'hbs')
   .use(express.urlencoded({ extended: false })) // For parsing the body of a POST
   .use(express.json())
   .use('/', routes)

mongoose
   .connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
   .then(result => {
      app.listen(PORT, () => console.log(`Listening on ${PORT}`));
   })
   .catch(err => console.log(err))
