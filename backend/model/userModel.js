const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type: String,
        require: [true, 'Please add your name']
    },
    email : {
        type: String,
        require: [true, 'Please add your name'],
        unique: true
    },
    password : {
        type: String,
        require: [true, 'Please add your name']
    }},
    {
        timestamps : true,
    }
)
module.exports = mongoose.model('Users',userSchema)