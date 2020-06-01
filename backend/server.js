
//import libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//require('dotenv').config();



//import the route backend apis
const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

const mongoose = require('mongoose');
//mongoose is the middle ware used to talk to mongodb

const uri = 'mongodb://127.0.0.1/mern-exercise-tracker';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });


const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MONGO DB BACK IN BUSINESS BOIIIS");
})


const app = express();
const port = process.env.PORT || 3000;

//ue the libraries you imported
app.use(cors());
app.use(bodyParser.json());


//use the routes you made
//app.use('/route_name', Js_file_to_use);
//makes the route endpoint / then uses the file logic in "name" 
app.use('/exercises', exerciseRouter);  
app.use('/users', usersRouter);

//change this later
/*
app.get('/', function (req, res) {
    res.send('<html><body><h1>Hello World</h1></body></html>');
});
*/

app.listen(port, () => {
    console.log(`Server is running! on port: ${port} `);
})