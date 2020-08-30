const express =require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/users', async (req, res) =>{
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    } catch (e){
        res.status(400).send(e)
    }
})


router.post('/users/login', async (req, res) =>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/signup', async (req, res) => {
    try{
        const user = await new User(req.body)
        const token = await user.generateAuthToken()
        await user.save()
        res.send({user, token})

    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/users', auth, async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch(e){
        res.status(500).send(e)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})
router.get('/users/:id', async (req, res) =>{
    const _id = req.params.id

    try{
        const user = await User.findById( _id )
        if(!user) return res.status(400).send("No User found!")
        res.send(user)
    } catch (e){
        res.status(500).send(e)
    }
})
router.patch('/users/:id', async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) return res.status(400).send({error: 'Invalid updates!'})

    try{
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true, useFindAndModify: false })
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).send()
        await updates.forEach((update) => user[update] = req.body[update])
        user.save()
        res.status(200).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async(req, res) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id, { useFindAndModify: false })
        if(!user) return res.status(404).send()
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
} )

module.exports = router