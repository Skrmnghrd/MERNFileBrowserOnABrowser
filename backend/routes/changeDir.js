const router = require('express').Router();
const path = require("path");
const process = require("process");

const dirDetails = require('./dirDetailsFunction');


router.route('/').post((req, res) => {
    //how do you call a method from another router?
    const directory = String(req.body.directory);
    const commands = String(req.body.command);

    let changeWorkingDir = function(directory, commands){

        return new Promise(function(resolve, reject){
            //don't forget to stringify the path later
            

            dirDetails(directory, commands)
            .then( (res) => {
                console.log(res);
                resolve( {"msg" : res} );
            })
            .catch( (err) => {
                console.log(err);
                reject( {'msg' : err} );
            });

        });
    }

    changeWorkingDir(directory, commands).then((resolve) => {
        console.log(resolve);
        res.json(resolve);
    }).catch( (reject ) => {
        res.json(reject);
    });


});



module.exports = router;
