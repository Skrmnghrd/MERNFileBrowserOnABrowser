const router = require('express').Router();
const { spawn } = require("child_process");
//let means we can only use it in this file or block, no where else
//import this Exercise object from schema



//begin Add route, #to add a new user
router.route('/').get((req, res) => {
        //use spawn for alot of outputs
    var return_me = { "data" : "xdata"};
    /* 
    https://stackoverflow.com/questions/35318442/how-to-pass-parameter-to-a-promise-function
    
    */
    let promiseDirectoryDetails = new Promise(function(err, data){
        
        let ls = spawn("ls", ['.']); //. for now, change later

        ls.stdout.on("data", data => {
            return_me.data = data;
            console.log('IT WORKS');
            resolve({ msg: 'It works' });
        })
    })

    promiseDirectoryDetails.then((result) => {
        //console.log(return_me.data.toString());
        res.json(return_me.data.toString());
    }).catch( (error) =>{
        console.log("Error", error );
    })
});




module.exports =router;


