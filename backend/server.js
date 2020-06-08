
//import libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require("child_process");


const app = express();
const port = process.env.PORT || 3001;

//routes
const dirDetailsRouter = require('./routes/dirDetails');
const fileCopyRouter = require('./routes/fileCopy')

app.use(cors());
app.use(bodyParser.json());

app.use('/dirDetails', dirDetailsRouter);
app.use('/fileCopy', fileCopyRouter);

app.listen(port, () => {
    console.log(`Server is running! on port: ${port} `);
})
