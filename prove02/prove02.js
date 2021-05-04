const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const addBookRoute = require('./routes/addBook');
const viewBooksRoute = require('./routes/viewBooks');

app.set('view engine', 'ejs');
app.set('views', 'prove02/views');

app.use(express.static(path.join(__dirname, 'public'))); //Allows the public directory to be accessed from the front end, so style sheet can be included
app.use(bodyParser.urlencoded({ extended: false }));

app.use(viewBooksRoute);
app.use(addBookRoute.routes);    

app.listen(5000);