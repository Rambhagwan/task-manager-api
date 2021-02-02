const express = require('express')
const Task = require('../models/task')
const app = new express.Router()
const auth = require('../middleware/auth')

app.post('/tasks', auth,  async (req, res) => {
    // const task = await new Task(req.body)
    const task = new Task({
      ...req.body,
      owner: req.user._id
    })

    try{
      await task.save()
      res.status(201).send(task)
    }catch(e) {
      res.status(400).send(err)
    }
    
    // task.save().then((result) => {
    //   res.status(201).send(task)
    // }).catch((err) => {
    //   res.status(400).send(err)
    // })
  })
  
  //GET /tasks?completed=true
  // GET /tasks?limit=10&skip=0
  // GET /tasks?sortBy=createdAt:asc(or dsc)
  app.get('/tasks',auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
      match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':')
      sort[parts[0]] = parts[1] ==='desc' ? -1 : 1
    }
    console.log(sort)
    try{
      // const tasks = await Task.find({owner: req.user._id})
      // res.send(tasks)
      //alternative
      await req.user.populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip:  parseInt(req.query.skip),
          sort
        }
      }).execPopulate()
      res.send(req.user.tasks)

    }catch(e){
      res.status(500).send(e)
    }
    
    // Task.find({}).then((tasks) => {
    //   res.send(tasks)
    // }).catch((err) => {
    //   res.status(500).send()
    // })
  })
  
  app.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try{
      const task = await Task.findOne({_id, owner: req.user._id})
      if (!task) {
        return res.status(404).send()
      }
      res.send(task)
    }catch(e){
      res.status(500).send()
    }
  
    // Task.findById(_id).then((task) => {
    //   if (!task) {
    //     return res.status(404).send()
    //   }
    //   res.send(task)
    // }).catch((err) => {
    //   res.status(500).send()
    // })
  })
  
  app.patch('/tasks/:id',auth, async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidOperations = updates.every((update) => {
      return allowedUpdates.includes(update)
    })
  
    if (!isValidOperations) {
      return res.status(404).send({error: 'Invalid updates'})
    }
  
    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        
    //   const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
      if (!task) {
        return res.status(404).send({error: 'task not found'})
      }
      updates.forEach((update) => {
        task[update] = req.body[update]
      })
      await task.save()
  
      return res.send(task)
  
  
    }catch{
      return res.status(404).send({error: 'in catch block'})
    }
  
  })
  
  app.delete('/tasks/:id',auth, async (req, res) => {
    const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
    try{
      if (!task){
        return res.status(404).send({error: "Task not found with this id"})
      } 
      res.send(task)
    } catch(e) {
      res.status(500).send(e)
    }
  
  })

  module.exports = app