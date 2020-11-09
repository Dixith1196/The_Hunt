// Module Dependencies

const path = require('path')
const express = require ('express')
var mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const engines = require('consolidate')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const LOG = require('./utils/logger.js')

// create express app
const app = express()

dotenv.config({ path: '.env' })
LOG.info('Environment variables loaded into process.env.')

// log port (Heroku issue)
const port = process.env.PORT || 3000
app.listen(port)
LOG.info(`Running on ${port}`)

// Are we in production or development?
const isProduction = process.env.NODE_ENV === 'production'
LOG.info(`Environment isProduction = ${isProduction}`)

// Connect to NoSQL datastore........................

// choose the connection
const dbURI = isProduction ? encodeURI(process.env.ATLAS_URI) : encodeURI(process.env.LOCAL_MONGODB_URI)
LOG.info('MongoDB URL = ' + dbURI)

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
  if (err) { LOG.error('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)) }
  LOG.info('MongoDB connection succeeded.')
})


// Get the default connection
const connection = mongoose.connection

// Resusable function to seed a collection of documents
function seed(collectionName) {
  LOG.info(`Seeding collection = ${collectionName}`)
  connection.db.collection(collectionName, (err, c) => {
    if (err) { LOG.error('Error adding collection.') }
    c.countDocuments((err, count) => {
      if (err) { LOG.error('Error counting documents in collection.') }
      if (count === 0) { c.insertMany(require('./data/' + collectionName + '.json')) }
    })
    c.find({}).toArray((err, data) => {
      if (err) { LOG.error('Error adding data to collection.') }
      LOG.info(data)
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
  LOG.info('MongoDB event open')
  LOG.info(`MongoDB connected ${dbURI}\n`)

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
    LOG.debug(`${req.method} ${req.url}`)
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