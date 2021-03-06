require('./config/config')

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb')
const _ = require('lodash')

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
    const todo = new Todo ({
        text: req.body.text
    });

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

app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    
    if(!ObjectId.isValid(id)) {
        return res.status(404).send()    
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
           return res.status(404).send()
        }
        res.send({todo})
    }).catch((err) => {
        res.status(400).send()
    })
})

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
        return res.status(404).send()
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        res.send({todo})
    }).catch((err) => {
        res.status(404).send()
    })
})

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id
    const body = _.pick(req.body, ['text', 'completed']); //lodash is used here 
    // this has a subset of things the user passed to us, we dont want to use to just update anything they want

    if (!ObjectId.isValid(id)) {
        return res.status(404).send()
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true //returns original
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((err) => {
        res.status(404).send()
    })
})

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);

    // User.findByToken

    user.save().then(() => {
        return user.generateAuthToken(); //return here cause were expecting a chaining promise
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.get('/users/me', authenticate, (req, res) => { //if there are 3 arguments, the second one is the middlware
//     const token = req.header('x-auth');
    
//     User.findByToken(token).then((user) => {
//         console.log('sup fam', user)
//         if(!user) {
//             return Promise.reject()
//         }

//         res.send(user);
//     }).catch((err) => {
//         res.status(401).send()
//     })

    res.send(req.user)
})

app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password'])
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user)
        })
    }).catch((err) => {
        res.status(404).send();
    })
})

app.listen(port, () => {
    console.log(`Started on port ${port}`)
})

module.exports = {app}