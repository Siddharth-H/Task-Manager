const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value){
            if(value.includes("password")){
                throw new Error('The password contains the word password.')
            }
        }
    }
})

userSchema.statics.findByCredentials = async(email, password)  =>{
    const user = await User.findOne({ email })
    if(!user) throw new Error('Unable to Login')
    const isMatch = await bcrypt.compare(password, user.password)
    console.log("isMatch = ",isMatch);
    if(!isMatch) throw new Error('Incorrect password')
    return user
}

userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    console.log(user);
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User