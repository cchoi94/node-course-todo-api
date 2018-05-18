const mongoose = require('mongoose')

const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true, //mongoose validator
        minlength: 1, //mongoose validator
        trim: true, //remove leading or trailing white space, mongoose validator
    },
    completed: {
        type: Boolean,
        default: false //mongoose validator
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {
    Todo
}