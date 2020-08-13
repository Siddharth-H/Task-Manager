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

    //Delete Operation
    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        description : "CRUD operations in DB"
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})