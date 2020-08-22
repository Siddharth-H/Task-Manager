const mongoose = require('mongoose')
const validator = require('validator')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// const me = new User({
//     name: ' Mark',
//     email: 'mark@gmail.com',
//     password: 'abc123'
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error!, ',error);
// })



const task = new Task({
    description: 'Complete Mongoose'
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log('Error!', error)
})
