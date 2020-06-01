const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get( (req, res) => {
    User.find()
        //returns a promise
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error:' + err));
    console.log('User get accessed');
});

router.route('/add').post((req, res) => {
    const username = String(req.body.username);
    const newUser = new User({username})

    newUser.save()
        //returns a promise
        .then( () => res.json('User Added in backend'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete( (req, res) =>{
    User.findByIdAndDelete(String(req.params.id) )
    .then( () => res.json('User Deleted') )
    .catch(err => res.status(400).json('Error:' + String(err)));
})

module.exports = router;
//module.exports.router; throws, you need to import a middlefunction not an object