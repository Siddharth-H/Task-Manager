// CRUD create read update delete

// const mongodb = require('mongodb')

// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const database = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) =>{
    if(error){
        return console.log('Error: ',error);
    }

    const db = client.db(database)

    // db.collection('users').findOne({ name: 'Siddharth', age: 55 }, (error, user) =>{
    //     if(error) return console.log('Unable to find the user!');
    //     console.log(user);
    // })

    // db.collection('users').find({age: 24}).toArray((error, users) => {
    //     console.log(users);
    // })

    db.collection('tasks').findOne({ _id: new ObjectID("5f296ae1b064156c28e208c7") }, (error, task) => {
        if(error) return console.log("Error: ", error)
        console.log(task);
    })

    db.collection('tasks').find({ completed: false}).toArray((error, tasks) => {
        if(error) return console.log('Unable to retrieve tasks!');
        console.log(tasks);
    })
})