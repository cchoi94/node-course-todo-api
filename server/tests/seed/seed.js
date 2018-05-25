const{ObjectId} = require ('mongodb')
const jwt = require('jsonwebtoken')

const {Todo} = require('./../../models/todos')
const {User} = require('./../../models/user')

const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const users = [{
    _id : userOneId,
    email: 'cody@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'thecode@example.com',
    password: 'userTwoPass'
}]

const todos = [{
    _id: new ObjectId(),
    text: 'First text todo'
}, {
    _id: new ObjectId(),
    text: 'Second text todo',
    completed: true,
    completedAt: 1234
}]

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done()
    })
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        const userOne = new User(users[0]).save();
        const userTwo = new User (users[1]).save();

        return Promise.all([userOne, userTwo]).then
    }).then(() => {
        done()
    })
}

module.exports = {todos, populateTodos, users, populateUsers}