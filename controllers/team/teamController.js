const express = require('express')
const { Model } = require('mongoose')
const api = express.Router()
const TeamModel = require('../../models/team')
const LOG = require('../../utils/logger')


// GET all the data

api.get('/findall', (req, res) => {
    LOG.info(`The function handling the /findall ${req}`)
    TeamModel.find({}, (err, data) => {
        if (err) {
            return res.end('Error finding the /findall')
        }
        res.json(data)
    })
})


// GET the data by id

api.get('/findone/:id', (req, res) => {
    LOG.info(`Handling /findone ${req}`)
    const id = parseInt(req.params.id)
    TeamModel.find({ teamid: id }, (err, result) => {
        if (err) { return res.end(`Could not find the record for the teamid: ${id}`) }
        res.json(results[0])
    })
})


// GET to this controller 

api.get('/',(req,res)=>{
    LOG.info(`Handling GET / ${req}`)
    TeamModel.find({},(err,data)=>{
        if (err) {
            return res.end('error on create')
        }
        res.locals.teams = data
        res.render('user/index.js')
    })
})

// Respond with views

// GET create

api.get('/create',(req,res)=>{
    LOG.info(`Handling GET /create ${req}`)
    TeamModel.find({},(err,data)=>{
        res.locals.teams =data
        res.locals.team = new Model()
        res.render('team/create')
    })
})

// GET /delete/:id

api.get('/delete/:id',(req, res)=>{
    LOG.info(`Handling GET /delete/:id ${req}`)
    const id = parseInt(req.params.id)
    TeamModel.find({teamid:id},(err, results) =>{
        if(err) {
            return res.end(`Could not find the record to delete`)
        }
        LOG.info(`RETURNING VIEW FOR ${JSON.stringify(results)}`)
        res.locals.team = results[0]
        return res.render(`team/delete.ejs`)
    })
})