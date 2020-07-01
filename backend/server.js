
//import libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require("child_process");
const path = require("path");
const process = require("process");


const app = express();
const port = process.env.PORT || 3001;

//current dir
global.GLOBALcurrent_dir  =  path.normalize(process.cwd());
//global current dir we're working on

//routes


const dirDetailsRouter = require('./routes/dirDetails');
const fileCopyRouter = require('./routes/fileCopy');
const changeDir = require('./routes/changeDir');


app.use(cors());
app.use(bodyParser.json());

//process.chdir("../shared_folder");

app.use('/dirDetails', dirDetailsRouter);
app.use('/fileCopy', fileCopyRouter);
app.use('/changeDir', changeDir);

app.listen(port, () => {
    console.log(`Server is running! on port: ${port} `);
    
})
