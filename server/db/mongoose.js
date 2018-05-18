const mongoose = require('mongoose');

//Telling the doc to use mongoose promise and not just any promise
mongoose.Promise = global.Promise;

//connecing to databse

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose   // mongoose: mongoose
}