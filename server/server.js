const express = require('express');
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
    const todo = new Todo ({
        text: req.body.text
    });
    console.log(todo)

    todo.save().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err)
    })
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        })
    }, (err) => {
        res.state(400).send(err)
    })
})

app.listen(3000, () => {
    console.log('Started on port 3000')
})

module.exports = {app}