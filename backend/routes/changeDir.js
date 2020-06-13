const router = require('express').Router();
const path = require("path");
const process = require("process");



router.route('/').get((req, res) => {
    console.log(GLOBALcurrent_dir);
    //looks like a bad idea to track the dir at the back end since it stays 
    //the same with ifferent users
    let changeWorkingDir = function(path){
        return new Promise(function(resolve, reject){
            //don't forget to stringify the path later
            try{
                process.chdir(path);
                resolve( {'msg': "GOOD"});
            }
            catch(err){
                reject( {'msg' : 'ERROR'} );
            }
            
        });
    }
    GLOBALcurrent_dir = "I CHANGED THIS thing"
    res.json(GLOBALcurrent_dir);
});

module.exports = router;
