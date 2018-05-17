// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const obj = new ObjectID();
// console.log(obj)

const user = {name: 'Cody', age: 24}

const {name} = user; //making new variables from object properties
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')

    // db.collection('Todos').find({
    //     _id: ObjectID('5afca7fd279db0f06837a305')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, (err) => {
    //     console.log('Unable to fetch todos')
    // })

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos')
    // })

    db.collection('Users').find({
        name: 'Cody'
    }).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2))
    })

    // db.close();
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