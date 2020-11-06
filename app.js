// Module Dependencies

const path = require("path")
const express = require ("express")
const app = express()
const expressLayouts = require('express-ejs-layouts')
const LOG = require('./utils/logger.js')


// specify desired view engine (EJS)

// set the root view folder
app.set('views', path.join(__dirname, 'views'))


// log every call and pass it on for handling
app.use((req, res, next) => {
    LOG.debug(`${req.method} ${req.url}`)
    next()
  })

app.get("/",(req,res)=>{
    res.send("Hello World!!")
})

app.listen(3000, () =>{
    console.log("The server is running on the port 3000")
    console.log('Press CTRL-C to stop\n')
})

module.exports = app