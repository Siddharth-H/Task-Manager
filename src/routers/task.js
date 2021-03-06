const express =require('express')
const router = express.Router()
const Task = require('../models/task')
const User = require('../models/user')

router.post('/tasks', async (req, res) => {
    try{
        const task = await new Task(req.body)
        await task.save()
        res.send(task)
    }catch (e){
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) =>{
    try{
        const tasks = await Task.find({})
        res.send(tasks)
        // console.log(tasks)
    }catch(e){
        res.status(500).send(e)
        // console.log(e);
    }
})

router.get('/tasks/:id', async (req, res) =>{
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
        if(!task) return res.status(404).send("No task found!")
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => updates.includes(update))

    if(!isValidOperation) return res.status(400).send({error: 'Invalid update!'})

    try{
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators: true})
        const task = await Task.findById(req.params.id)

        if(!task) return res.status(404).send()
        await updates.forEach((update) =>{
            task[update] = req.body[update]
        })
        await task.save()
        res.status(200).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', async(req, res) =>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) return res.status(404).send()
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
} )

module.exports = router