const { spawn } = require("child_process");
/* 
This will be the route where we check the file if it's
a folder, or a filetype of smth

future versions will include diffrent icons for the file type
we might need a front end web designer for this
*/

const promiseClassifyFiles = function(data_array) {
    //idk man, segragate is hard to spell

    return new Promise(function(resolve, reject){
        data_array
        /* 
        psuedo code
        resolve:
            data array map
                if x in array is dir:
                    add to directory 
                else:
                    add to files obviously 
        reject:
            err handling
        */

    });

}

module.exports = promiseClassifyFiles;
