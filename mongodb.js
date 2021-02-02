// const mongodb = require('mongodb')

// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
// const id = new ObjectID
// console.log(id, id.getTimestamp())
MongoClient.connect(connectionURL, { useNewUrlParser: true}, { useUnifiedTopology: true },  (error, client) =>{
    if (error){
        return console.log("unable to connect to database")
    }
    const db = client.db(databaseName)

    // const updatePromise = db.collection('user').updateOne({
    //     _id: new ObjectID("600690e799a5391ee0b37992")
    // },{
    //     $inc: {
    //         age: 1
    //     }
    // })

    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((eroor) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany(
    //     {
    //         completed: false
    //     }, 
    //     {
    //         $set: {
    //             completed: true
    //         }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('user').deleteOne({
        name: 'Ram'
    }
    ).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })

    // db.collection('user').findOne({_id: ObjectID("600690e799a5391ee0b37992")}, (error, user) => {
    //     if (error){
    //         return console.log("user not find")
    //     }
    //     console.log(user)
    // })

    // db.collection('user').find({age: 27}).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('tasks').findOne({_id : new ObjectID("6006969bcc49d23324550c5b")}, (error, task) => {
    //     if (error){
    //         return console.log("unable to fetch task")
    //     }
    //     console.log(task)
    // })

    // db.collection('tasks').find({completed: true}).toArray((err, tasks) => {
    //     console.log(tasks)
    // })
    // db.collection('user').insertOne({
    //     _id: id,
    //     name: 'Lakshay',
    //     age: 22
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('user').insertMany([
    //     {
    //         name: 'Jen',
    //         age:34
    //     },
    //     {
    //         name : 'viru',
    //         age: 45
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('unable to add users')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Nodejs',
    //         completed: false

    //     },
    //     {
    //         description: 'Getting Job',
    //         completed: true
    //     },
    //     {
    //         description: 'Watching Tandav',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Not able to add tasks')
    //     }
    //     console.log(result.ops)
    // })
})