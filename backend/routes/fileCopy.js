
const router = require('express').Router();
const { spawn } = require("child_process");
const fs = require('fs');

//what
//this is the copy module

// 
// usage: post a json with this format
// { 
//    "source" : 'C://users/paulo/filename.txt',
//    "destination" : 'C://users/paulo/new_filename.txt'
//  }
//

router.route('/').post((req, res) => {
    
    console.log(req.body);

    var return_me = { "data" : "xdata"};
/* 
TODO:
2. Get the filepath later on.
3.Rename the file with trailing number eg test => test1.txt => test2.txt
*/
    let promiseFileCopy = function(source, destination) {
        return new Promise(function(resolve, reject){

            //dest name check
            source = String(source);
            destination = String(destination);

            //check if file exists
            fs.access(String(destination), fs.F_OK, (err) => {
                if (err) {
                    //file does not exist so copy it
                    fs.copyFile(source, destination, (err) => {
                        if (err) {
                            return_me.data = {'msg': 'error'}
                            reject({'msg': 'error'});
                        }else {
                            return_me.data = {'msg' : 'success'}
                            resolve({'msg' : 'success'});
                        }
                    })
                    
                }
                else {
                    return_me.data = {'msg': 'duplicate'} 
                    reject({'msg': 'duplicate'});
                }
            })
            //end fs.access
        })
    
    }
    

    const source = String(req.body.source);
    const destination = String(req.body.destination);


    promiseFileCopy(source, destination).then((resolve) => {
        console.log(resolve);
        res.json(return_me.data);
    }).catch( (reject) =>{
        console.log("Error", reject );
    })
});


module.exports = router;


