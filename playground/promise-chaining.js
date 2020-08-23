require('../src/db/mongoose')
const User = require('../src/models/user')

// 5f351cba6fc7534a70586d00

// User.findByIdAndUpdate('5f351cba6fc7534a70586d00', { name: 'Sunny' }).then((user) =>{
//     console.log(user);
//     return User.countDocuments({age:24})
// }).then((result)=>{
//     console.log(result);
// }).catch((e)=>{
//     console.log(e);
// })


const updateAgeAndCount = async(id, age) =>{
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('5f351cba6fc7534a70586d00', 30).then((count) =>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})