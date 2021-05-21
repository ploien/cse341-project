const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'project/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const home = require('./routes/home');

app.use(home);

app.listen(process.env.PORT || 5000);