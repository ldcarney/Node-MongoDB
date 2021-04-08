const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

function validateGenre(genre){
    //Validate Genre, if invalid return 404
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate({name: String(genre)});
}

exports.Genre = Genre;
exports.validate = validateGenre;