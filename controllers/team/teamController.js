const express = require('express')
const api = express.Router()
const TeamModel = require('../../models/team')
const LOG = require('../../utils/logger')


// Get all the data

api.get('/findall', (req, res) => {
    LOG.info(`The function handling the /findall ${req}`)
    TeamModel.find({}, (err, data) => {
        if (err) {
            return res.end('Error finding the /findall')
        }
        res.json(data)
    })
})


// Get the data by id

api.get('/findone/:id', (req, res) => {
    LOG.info(`Handling /findone ${req}`)
    const id = parseInt(req.params.id)
    TeamModel.find({ teamid: id }, (err, result) => {
        if (err) { return res.end(`Could not find the record for the teamid: ${id}`) }
        res.json(results[0])
    })
})
