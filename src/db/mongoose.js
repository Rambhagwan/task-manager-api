const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL, 
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     password: {
//         type: String,
//         trim: true,
//         validate(value) {
//             if (value.length < 7 || value.toLowerCase().includes('password')){
//                 throw new Error("choose strong password")
//             }
//         }
//     },
//     email:{
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         minlength: 7,
//         validate(value) {
//             if (!validator.isEmail(value)){
//                 throw new Error("Invalid Email")
//             }
            
//         }
//     },
//     age: {
//         default: 0,
//         type: Number
//     }
// })

// const me = new User({
//     name: "            adJan    ", 
//     password: "     jkfpasrd    ",
//     email: "jfJKKIkd@gmail.com",
// })

// me.save().then((reseult) => {
//     console.log(reseult)
// }).catch((error) => {
//     console.log('Error', error)
// })

// const Task = mongoose.model('tasks', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const work = new Task({
//     description: "some work",
//     completed: "fals de"
// })

// work.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })