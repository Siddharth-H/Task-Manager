const express = require('express')
const User = require('./models/user')
const Task = require('./models/task')
const { ObjectID } = require('mongodb')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) =>{
    const user = new User(req.body)
    user.save().then(() =>{
        res.send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((error)=>{
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) =>{
    const _id = req.params.id
    User.findById( _id ).then((user)=>{
        if(!user) return res.status(400).send("No User found!")
        res.send(user)
    }).catch((error) =>{
        res.status(500).send("Server Error")
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})


app.get('/tasks', (req, res) =>{
    Task.find({}).then((tasks)=>{
        if(!tasks) return res.status(404).send("No tasks recorded!")
        res.send(tasks)
    }).catch((error) =>{
        res.status(500).send("Server error")
    })
})

app.get('/tasks/:id', (req, res) =>{
    const _id = req.params.id
    Task.findById(_id).then((task) =>{
        if(!task) return res.status(404).send("No task found!")
        res.send(task)
    }).catch((error) =>{
        res.status(500).send("Server Error!")
    })
})


app.listen(port, () =>{
    console.log('Server is up on port '+ port);
})