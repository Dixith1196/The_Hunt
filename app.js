// Module Dependencies

const path = require('path')
const express = require ('express')
var mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const engines = require('consolidate')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
// const LOG = require('./utils/logger.js')

// create express app
const app = express()

dotenv.config({ path: '.env' })
console.log('Environment variables loaded into process.env.')

// log port (Heroku issue)
const port = process.env.PORT || 3000
app.listen(port)
console.log(`Running on ${port}`)

// Are we in production or development?
const isProduction = process.env.NODE_ENV === 'production'
console.log(`Environment isProduction = ${isProduction}`)

// Connect to NoSQL datastore........................
console.log(process.env.ATLAS_URI, "uri is here")
// choose the connection
const dbURI = isProduction ? encodeURI("mongodb+srv://vikas2005:vikas2005@cluster0.mkp5q.azure.mongodb.net/test?retryWrites=true&w=majority") : encodeURI(process.env.LOCAL_MONGODB_URI)
console.log('MongoDB URL = ' + dbURI)
console.log(dbURI,"----db url is here")

// get dbName
const DB_NAME = process.env.DB_NAME

// set connection options
const connectionOptions = {
  dbName: DB_NAME,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}

// use mongoose to connect & create a default connection
mongoose.connect(dbURI, connectionOptions, (err, client) => {
  if (err) { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)) }
  console.log('MongoDB connection succeeded.')
})


// Get the default connection
const connection = mongoose.connection


// Resusable function to seed a collection of documents
function seed(collectionName) {
  console.log(`Seeding collection = ${collectionName}`)
  connection.db.collection(collectionName, (err, c) => {
    if (err) { console.log('Error adding collection.') }
    c.countDocuments((err, count) => {
      if (err) { console.log('Error counting documents in collection.') }
      if (count === 0) { c.insertMany(require('./data/' + collectionName + '.json')) }
    })
    c.find({}).toArray((err, data) => {
      if (err) { console.log('Error adding data to collection.') }
      console.log(data)
    })
  })
}
//environment variables
// require('dotenv').config();

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});
// const connection = mongoose.connection;
// connection.once('open', () => {
// console.log("Connected Database Successfully");
// });

// specify desired view engine (EJS)

// set the root view folder

connection.once('open', function () {
  console.log('MongoDB event open')
  console.log(`MongoDB connected ${dbURI}\n`)

  // seed('user')
  // seed('team')

})

// configure app.settings.............................
app.set('host', process.env.HOST)


app.set('views', path.join(__dirname, 'views'))

// specify desired view engine (EJS)
app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)

app.use(expressLayouts)
app.use(express.static("public"));

const router = require('./routes/router')
app.use('/', router)

// log every call and pass it on for handling
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
    next()
  })

app.get("/",(req,res)=>{
    res.send("Hello World!!")
})

// app.listen(3000, () =>{
//     console.log("The server is running on the port 3000")
//     console.log('Press CTRL-C to stop\n')
// })

module.exports = router;