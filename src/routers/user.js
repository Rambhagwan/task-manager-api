const express = require('express')
const User = require('../models/user')
const multer = require('multer')
const router = new express.Router()
const sharp = require('sharp')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendDeleteEmail } = require('../emails/account')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
      await user.save()
      sendWelcomeEmail(user.email, user.name)
      const token = await user.generateAuthToken()
      res.status(201).send({user, token})
    } catch(e) {
      res.status(400).send(e)
    }
    


    // user.save().then((result) => {
    //   res.status(201).send(user)
    // }).catch((err) => {
    //   // res.status(400)
    //   // res.send(err)
    //   res.status(400).send(err)
    // })
})

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateAuthToken()

        res.send({user, token})
    } catch(e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/users',auth, async (req, res) => {
  try{
    const users =await User.find({})
    res.send(users)
  }catch(e){
    res.status(500).send()
  }
  

  // User.find({}).then((users) => {
  //   res.send(users)
  // }).catch((e) => {
  //   res.status(500).send()
  // })
})
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// router.get('/users/:id', async (req, res) => {
//   const _id = req.params.id
//   try{ 
//     const user = await User.findById(_id)
//     if (!user) {
//       return res.status(404).send()
//     }
//     res.send(user)
//   }catch(e) {
//     res.status(500).send()
//   }})

router.patch('/users/me', auth, async (req, res) => {
    const allowedUpdates =['name', 'email', 'password', 'age']
    const updates = Object.keys(req.body)

    const isValidOperations = updates.every((update) => {
      return allowedUpdates.includes(update)
    })

    if (!isValidOperations) {
      return res.status(404).send({error: 'Invalid Operations'})
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    } catch(e) {
        res.status(400).send(e)
    }



})

//   router.patch('/users/:id', async (req, res) => {
//     const allowedUpdates =['name', 'email', 'password', 'age']
//     const updates = Object.keys(req.body)

//     const isValidOperations = updates.every((update) => {
//       return allowedUpdates.includes(update)
//     })

//     if (!isValidOperations) {
//       return res.status(404).send({error: 'Invalid Operations'})
//     }

    


//     try{

//         const user = await User.findById(req.params.id)

//         updates.forEach((update) => {
//             user[update] = req.body[update]
//         })
//         await user.save()
//     //   const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

//       if (!user) {
//         return res.status(404).send()
//       }

//       res.send(user)
//     }catch(e){
//       res.status(404).send(e)
//     }
//   })

  router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    sendDeleteEmail(req.user.email, req.user.name)

    res.send(req.user)
  }catch(e) {
    res.status(500).send()
  }
})

const upload = multer({
  // dest: 'avatars',
  limits: {
    fileSize: 1000000
  },
  fileFilter (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('please upload a jpg/jpeg/png image'))
    }
    cb(undefined, true)
  }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()

  req.user.avatar = buffer
  // console.log(req.file.buffer)

  await req.user.save()
  res.send({user: req.user})
}, (error, req, res, next) => {
  res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) =>{
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar){
      throw new Error()
    }

    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
  } catch(e){
    res.status(404).send()
  }
})

module.exports = router