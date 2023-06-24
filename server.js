const exp = require("express")
//const dotenv = require('dotenv').config()
const app = exp();

const { MongoClient } = require('mongodb')

app.listen(5000 , () => console.log('server listening on port 5000...'))


const path=require("path")
//connect express with react build
app.use(exp.static(path.join(__dirname,'./build')))



const userApp = require('./APIs/Userapi')
 app.use('/user-api', userApp)

 const chatsApp = require('./APIs/chats-api')
 app.use('/chats-api',chatsApp)


const MONGODB_URI = "mongodb+srv://admin4988:admin4988@chatingapp.m6n54mb.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

client.connect()
.then((dbRef) => {

    const dbObj = dbRef.db('chatdb')
    const usersCollectionObj = dbObj.collection('Userprofiles')
    const ChatCollections = dbObj.collection('ChatCollections')
    app.set('usersCollectionObj', usersCollectionObj)
    app.set('ChatCollections',ChatCollections)
    app.set('dbObj', dbObj);

    console.log('DB Connection Success..')
})
.catch(err => console.log('DB error' + err.message   ))



const pageRefresh = (req, res, next) => {
    res.sendFile(path.join(__dirname, './build/index.html'))
}
app.use("*", pageRefresh)

const invalidPathMiddleware = (request, response, next) => {
    response.send({message: 'Invalid Path'})
}
app.use(invalidPathMiddleware)

const errhandlingMiddleware = (error, request, response, next) => {
    response.send({message: error.message})
}
app.use(errhandlingMiddleware)