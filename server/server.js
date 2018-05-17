const mongoose = require('mongoose');

//Telling the doc to use mongoose promise and not just any promise
mongoose.Promise = global.Promise;

//connecing to databse

mongoose.connect('mongodb://localhost:27017/TodoApp');

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

const newTodo = new Todo({
    text: 'Flex on people'
});

const otherTodo = new Todo({
    text: '                   edit this video '
});

// newTodo.save().then((doc) => {
//     console.log('Saved Todo', doc)
// }, (err) => {
//     console.log('Unable to save todo')
// });

otherTodo.save().then((doc) => {
    console.log('Saved other Todo', JSON.stringify(doc, undefined, 2))
}, (err) => {
    console.log('Unable to save Todo')
})

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

const userEmail = new User ({
    email: 'cchoi_2294@hotmail.com'
})

userEmail.save().then((doc) => {
    console.log('Saved Email', JSON.stringify(doc, undefined, 2))
}, (err) => {
    console.log('Unable to save Todo')
})