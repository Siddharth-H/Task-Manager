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

    //Update Operations
    // db.collection('users').updateOne({
    //     _id: new ObjectID("5f29e2e70269166be4ac0e6a")
    // }, {
    //     $set: {
    //         name: 'Josh'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})