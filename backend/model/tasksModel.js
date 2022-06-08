const mongoose = require('mongoose')

const tasksSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    task: {
        type: String,
        require: [true,'Please add a name to your Task']
    },
    description: {
        type: String,
        require: [true,'Please add a description to your Task']
    }},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Tasks',tasksSchema)