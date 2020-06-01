const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, minlength: 3 },
    description: { type: String, required: true, minlength: 3 },
    duration: { type: String, required: true },
    date: {type: Date, required: true },
}, {
    timestamps: true,
});

const Exercise = mongoose.model('Exercise', userSchema);

module.exports = Exercise;