const express = require('express')
const User = require('./models/user')
const Task = require('./models/task')
const { ObjectID } = require('mongodb')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) =>{
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    } catch (e){
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch(e){
        res.status(500).send(e)
    }
})

app.get('/users/:id', async (req, res) =>{
    const _id = req.params.id

    try{
        const user = await User.findById( _id )
        if(!user) return res.status(400).send("No User found!")
        res.send(user)
    } catch (e){
        res.status(500).send(e)
    }
})

app.post('/tasks', async (req, res) => {
    
    try{
        const task = await new Task(req.body)
        res.send(task)
    }catch (e){
        res.status(400).send(e)
    }
})


app.get('/tasks', async (req, res) =>{
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
})

app.get('/tasks/:id', async (req, res) =>{
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
        if(!task) return res.status(404).send("No task found!")
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})


app.listen(port, () =>{
    console.log('Server is up on port '+ port);
})