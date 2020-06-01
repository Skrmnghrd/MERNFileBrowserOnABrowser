
//import libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require("child_process");
const { spawn } = require("child_process");

//require('dotenv').config();



//import the route backend apis
//const exerciseRouter = require('./routes/exercises');
//const usersRouter = require('./routes/users');

//const mongoose = require('mongoose');
//mongoose is the middle ware used to talk to mongodb

//const uri = 'mongodb://127.0.0.1/mern-exercise-tracker';
//mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });


//const connection = mongoose.connection;
//connection.once('open', () => {
//    console.log("MONGO DB BACK IN BUSINESS BOIIIS");
//})


const app = express();
const port = process.env.PORT || 3001;

//ue the libraries you imported
app.use(cors());
app.use(bodyParser.json());


//use the routes you made
//app.use('/route_name', Js_file_to_use);
//makes the route endpoint / then uses the file logic in "name" 
//app.use('/exercises', exerciseRouter);  
//app.use('/users', usersRouter);

//change this later
/*
app.get('/', function (req, res) {
    res.send('<html><body><h1>Hello World</h1></body></html>');
});
*/


app.listen(port, () => {
    console.log(`Server is running! on port: ${port} `);
})

//app.get('/', (req, res) => {
//    res.send('<html><body><h1>Hello</h1></body></html>');
//})

exec("ls -la", (error, stdout, stderr) =>{
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
})

const dir = '.';

function lsThisDir(dir) {
    let ls = spawn("ls", [String(dir)]);
    let return_me = {
        "data": "",
        "stderr": "",
        "error": "",
        "code": "",
    };

    ls.stdout.on("data", data => {
        return_me.data = data;
        //returns a buffer, or stream so it don't eat up memory.
        console.log(return_me.data.toString());
    });

    ls.stderr.on("data", data =>{
        //console.log(`stderr: ${data}`);  
        return_me.stderr = data;
    });
    
    ls.on("error", (error) => {
        //console.log(`error: ${error.message} `);
        return_me.error = error;
    });
    
    ls.on("close", code =>{
        //console.log(`exited with ${code}`);
        return_me.code = code;
    })

    return return_me;
}

console.log(lsThisDir(".").data);