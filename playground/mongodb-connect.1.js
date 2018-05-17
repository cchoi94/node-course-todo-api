// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const obj = new ObjectID();
console.log(obj)

const user = {name: 'Cody', age: 24}

const {name} = user; //making new variables from object properties
console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')

    // db.collection('Todos').insertOne({
    //     text:'something to do',
    //     completed: false
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err)
    //     }
    //     console.log(JSON.stringify(res.ops, undefined, 2))    
    // })

    // db.collection('Users').insertOne({
    //     name: 'Cody',
    //     age: 24,
    //     location: 'Toronto'
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert users', err)
    //     }
    //     console.log(JSON.stringify(res.ops, undefined, 2))
        //res.ops are all the objects inserted
        //res.ops[0]._id.getTimestamp() gets the time of when the _id was created, thus meaning when this object was created
    // })

    db.close();
});

//v3 format

// const MongoClient = require('mongodb').MongoClient;

// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
//     if (err) {
//         return console.log('Unable to connect to MongoDB server')
//     }
//     console.log('Connected to MongoDB server');
//     const db = client.db('TodoApp')

//     db.collection('Todos').insertOne({
//         text:'something to do',
//         completed: false
//     }, (err, res) => {
//         if (err) {
//             return console.log('Unable to insert todo', err)
//         }
//         console.log(JSON.stringify(res.ops, undefined, 2))    
//     });

//     client.close()
// })