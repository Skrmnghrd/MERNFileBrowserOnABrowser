const router = require('express').Router();
const { spawn } = require("child_process");


// main route for directory details
// usage: post a json with this format
// { "directory" : 'your dir here' }
//

router.route('/').post((req, res) => {
        //use spawn for alot of outputs
    console.log(req.body);

    var return_me = { "data" : "xdata"};

    let promiseDirectoryDetails = function(directory) {
        return new Promise(function(resolve, reject){

            //convert dir to string for sec reasons
            let ls = spawn("ls", [String(directory)]); 
            ls.stdout.on("data", data => {
                //from a buffer, to string, to an array split by newline
                data = data.toString().split("\n");

                //lazy way to remove last array item :) sorry
                data.pop();
                
                //stringify to add "" and parse to parse it neatly
                return_me.data = JSON.parse(JSON.stringify(data) );
                //console.log(return_me.data );

                resolve("Promise DirDet: Success!"); 
                // call this or things won't stop looping here

                //add reject in the future
            });
        });
    
    }
    
    promiseDirectoryDetails(req.body.directory).then((resolve) => {
        console.log(resolve);
        res.json(return_me.data);
    }).catch( (reject) =>{
        console.log("Error", reject );
    })
});




module.exports =router;


