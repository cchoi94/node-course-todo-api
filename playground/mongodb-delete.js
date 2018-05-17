const {MongoClient, ObjectId} = require ('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // //deleteMany
    // db.collection('Todos').deleteMany({
    //     text: 'Each lunch'
    // }).then((result) => {
    //     console.log(result); //result.n is how many were deleted, and if result.ok == ok: 1, then success
    // })
    
    // //deleteOne
    // db.collection('Todos').deleteOne({
    //     text: 'Each lunch'
    // }).then((result) => {
    //     console.log(result);
    // })
    
    // //findOneAndDelete // finds the first one then deletes it
    // db.collection('Todos').findOneAndDelete({
    //     completed: false
    // }).then((result) => {
    //     console.log(result);
    // })


    // db.collection('Users').deleteMany({
    //     name: 'Cody'
    // }).then((result) => {
    //     console.log(result)
    // })

    // db.collection('Users').findOneAndDelete({
    //     _id: new ObjectId('5afdcea3e21bdffce9f8898d')
    // }).then((result) => {
    //     console.log(JSON.stringify(result, undefined, 2))
    // })

    //db.close();

    // db.collection('Users').insertOne({
    //     name: 'Dave',
    //     location: 'Toronto'
    // }).then((result) => {
    //     console.log(JSON.stringify(result, undefined, 2))
    // })

})