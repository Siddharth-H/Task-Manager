require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5f362bda800319534caf3711').then((task) =>{
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})

const deleteTaskAndCount = async(id) =>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments
    return count
}

deleteTaskAndCount('5f3f8c7dbad7120aec367bcb').then((count) =>{
    console.log(count);
}).catch((e)=>{
    console.log('Error',e);
})