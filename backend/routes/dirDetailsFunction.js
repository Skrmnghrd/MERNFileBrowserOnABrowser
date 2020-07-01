const { spawn } = require("child_process");


const promiseDirectoryDetails = function(directory, commands) {

    return new Promise(function(resolve, reject){
        console.log(directory);
       
       
        let ls = spawn("ls", [ String(directory), String(commands) ]); 
       
        ls.stdout.on("data", data => {
            //from a buffer, to string, to an array split by newline
            data = data.toString().split("\n");

            //lazy way to remove last array item :) sorry
            data.pop();
            //removes the pesky . and .. and the extra new line at the end
            
            //stringify to add "" and parse to parse it neatly
            resolve( {"data": JSON.parse(JSON.stringify(data) ) } ); 
 
        });
        ls.stderr.on("data", data => {

            resolve( {"stderr": JSON.parse(JSON.stringify(data.toString()) )} ); 
        });

        ls.on("error", (error) => {
            reject( {'msg': "ERROR"} );
        });
        ls.on("close", (code) => {
            if (code) {
                reject( {'msg': code} );
            }
        });

    });

}

module.exports = promiseDirectoryDetails;