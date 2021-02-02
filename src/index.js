const express = require('express')
require('./db/mongoose')
const { findByIdAndUpdate, findById } = require('./models/user')
// api key for sendgrid
// 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

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
// const port = process.env.PORT || 3000
const port = process.env.PORT

// middleware example
// app.use((req, res, next) => {
//   console.log(req.method, req.path)
//   next()
// })

// const multer = require('multer')
// const upload = multer({
//   dest: 'images',
//   limits: {
//     fileSize : 1000000
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)){
//       return cb(new Error('Please upload a word doc '))
//     }

//     // cb(new Error('File must be a PDF'))
//     cb(undefined, true)
//   },
// })



// app.post('/upload', upload.single('upload'), (req, res) => {
//   res.send()
// }, (error, req, res, next)=> {
//   res.status(400).send({error: error.message})
// })


app.use(express.json()) // parse incoming json to object

app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
  console.log('server is running on port ' + port)  
})

