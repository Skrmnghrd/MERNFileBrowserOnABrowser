
const router = require('express').Router();
const { spawn } = require("child_process");
const fs = require('fs');

//what
//this is the copy module

// 
// usage: post a json with this format
// { 
//    "source" : 'your SOURCE PATH here',
//    "destination" : 'your DEST PATH here'
//  }
//

router.route('/').post((req, res) => {
    
    console.log(req.body);

    var return_me = { "data" : "xdata"};
/* 
TODO: FIX THE PROMISES, 

3.Rename the file with trailing number eg test => test1.txt => test2.txt
*/
    let promiseFileCopy = function(source, destination) {
        return new Promise(function(resolve, reject){
            //convert source and dest to string
            //fixed paths for now
            //dest name check
            fs.access('test2.txt', fs.F_OK, (err) => {
                if (err) {
                    //file does not exist so copy it
                    fs.copyFile(source, destination, (err) => {
                        if (err) {
                            return({'msg': 'error'});
                        }
                        return( { 'msg': 'success'});
                    })
                    resolve({'msg' : 'success'});
                }
                else {
                    reject({'msg': 'duplicate'});
                    console.log('FILE RAN AFTER REJECT');
                }
            })
        })
    
    }
    
    promiseFileCopy('test.txt', 'test2.txt').then((resolve) => {
        console.log(resolve);
        res.json(return_me.data);
    }).catch( (reject) =>{
        console.log("Error", reject );
    })
});


module.exports = router;


