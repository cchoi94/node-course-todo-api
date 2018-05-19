const {ObjectId} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((result) => {
//     console.log(JSON.stringify(result, undefined, 2))
// })
// doesn't return what has been removed


Todo.findOneAndRemove({
    _id: '5b00873eec9ed2af5380bbf4'
}).then((todo) => {
    console.log(todo);
})