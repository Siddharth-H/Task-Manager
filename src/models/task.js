const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false

    }
})

// taskSchema.pre('save', async function(next){
//     const task = this
//     if(task.isModified()){
//         task.
//     }
// })
const Task = mongoose.model('Task', taskSchema)

module.exports = Task