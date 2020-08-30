const express = require('express')
const User = require('./models/user')
const Task = require('./models/task')
const { ObjectID } = require('mongodb')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const auth = require('./middleware/auth')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) =>{
//         res.status(503).send('The site is under maintenance! Check back again later!')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () =>{
    console.log('Server is up on port '+ port);
})

const jwt = require('jsonwebtoken')
const myFunction = async () => {
    const token = jwt.sign({ _id: '213321' }, 'abc1234',{ expiresIn: '7 days'})
    console.log(token);
    console.log(jwt.verify(token, 'abc1234'))
}

myFunction()