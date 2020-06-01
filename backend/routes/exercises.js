const router = require('express').Router();

let Exercise = require('../models/exercise.model');
//let means we can only use it in this file or block, no where else
//import this Exercise object from schema

router.route('/').get( (req, res) => {
    Exercise.find()
        //returns a promise
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error:' + err));
});

//begin Add route, #to add a new user
router.route('/add').post((req, res) => {
    const username = String(req.body.username);
    const description = String(req.body.description);
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration, 
        date,
    });
    //del in prod
    console.log("EXERCISE ADDED");
    newExercise.save()
        //returns a promise
        .then( () => res.json('Exercise Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});


//begin find by route
router.route("/:id").get( (req, res) =>{
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json("Error: " + err ));
});

//tesst func, does nothing but echo
router.route("/test/:id").get( (req, res) =>{
    //basically echoes the :id 
    //send an HTML
    res.send('<h3>'+String(req.params.id)+'</h3>');

    //send a conventional json :)
     //res.json(String(req.params.id));
});

//begin delete function
router.route('/:id').delete( (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then( () => res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error: ' + String(err)));
});


//begin update
router.route('/update/:id').post( (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = String(req.body.username);
            exercise.description = String(req.body.description);
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            let usage = `USAGE:
            {
                "username": "string",
                "description": "string",
                "duration": int,
                "date": "12/08/20
            }`
            //modified the error, sends an HTML file for rendering 
            exercise.save()
                .then( () => res.json('Exercise Updated! IdNum: ' + String(req.params.id)))
                .catch( err => res.status(400).json('Error' + err + 'Usage' + usage
                ));
        })
        .catch(err => res.status(400).json('Error: ' + err ));
});

module.exports =router;