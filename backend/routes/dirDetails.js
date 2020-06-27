const router = require('express').Router();
const { spawn } = require("child_process");

//what
//this is the quivalent of the LS dir

// main route for directory details
// usage: post a json with this format
// 
/*
{ 
    "directory" : 'your dir here',
    "command" : "-l or -a ",
}

replies with either
{
    "msg" : "GOOD", "STDERR", "CODE"
}
*/
//

router.route('/').post((req, res) => {
    //use spawn for alot of outputs
    console.log(req.body);

    var return_me = { 
        "data" : "",
        "stderr" : "",
        "error" : "",
        "close" : "",
        "resolve" : "",
        "reject" : "",
    };

    let promiseDirectoryDetails = function(directory, commands) {
        return new Promise(function(resolve, reject){
            console.log("Called");
            //convert dir to string for sec reasons
           
            //let ls = spawn("ls", [ [String(directory), " ", String(commands)].join("") ]);
            let ls = spawn("ls", [ String(directory), String(commands) ]); 

            ls.stdout.on("data", data => {
                //from a buffer, to string, to an array split by newline
                data = data.toString().split("\n");

                //lazy way to remove last array item :) sorry
                data.pop();
                
                //stringify to add "" and parse to parse it neatly
                
                return_me.data = JSON.parse(JSON.stringify(data) );
                //console.log(return_me.data );
                return_me.resolve = {"msg": "GOOD"};
                resolve( {"msg": "GOOD"} ); 
     
            });
            ls.stderr.on("data", data => {
                return_me.resolve = {"msg": "STDERR"};
                resolve( {"msg": "STDERR"} ); 
            });
            ls.on("error", (error) => {
                return_me.reject ={'msg': "ERROR"};
                reject( {'msg': "ERROR"} );
            });
            ls.on("close", (code) => {
                if (code) {
                    return_me.reject = {'msg': "CODE"};
                    reject( {'msg': "CODE"} );
                }
            });

        });
    
    }
    
    const directory = String(req.body.directory);
    const command = String(req.body.command);

    promiseDirectoryDetails(directory, command).then((resolve) => {
        console.log(resolve);
        res.json(return_me);
    }).catch( (reject) => { 

    res.json(reject);
    })
});




module.exports = router;

