const express = require('express')
const { Model } = require('mongoose')
const api = express.Router()

const bodyParser = require('body-parser');
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }));
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


// GET one

api.get('/edit/:id', (req, res) => {
    LOG.info(`Handling GET /edit/:id ${req}`)
    const id = parseInt(req.params.id)
    TeamModel.find({ teamid: id }, (err, results) => {
      if (err) { 
          return res.end(`Could not find the record`) 
        }
      LOG.info(`RETURNING VIEW FOR${JSON.stringify(results)}`)
      res.locals.student = results[0]
      return res.render('team/edit.ejs')
    })
  })

  // RESPOND WITH DATA MODIFICATIONS 

  // POST new

  api.post('/save',(req,res)=>{
      const body = req.body
      const team = new TeamModel(body)
      console.log(team,"body is here")
      team.save((err) => {
          if(err){
              return res.status().json({"msg": err})
            //   return res.end('ERROR: Team couldnot be saved')
          }else{
            // console.log("successful----", team)
            return res.json({
                "error": false,
                data: team
            })
          }
        
        //   LOG.info(`Saving new Team ${JSON.stringify(team1)}`)
        //   return res.redirect('/teamController')
      })
  })

// POST update with id
api.post('/save/:id', (req, res) => {
    LOG.info(`Handling SAVE request ${req}`)
    const id = parseInt(req.params.id)
    LOG.info(`Handling SAVING ID:${id}`)
    TeamModel.updateOne({teamid: id },
      { // use mongoose field update operator $set
        $set: {
          teamid: parseInt(req.body.teamid),
          teamname: req.body.teamname,
        }
      },
      (err, item) => {
        if (err) { return res.end(`Record with the specified id not found`) }
        LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
        LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
        LOG.info(`SAVING UPDATED product ${JSON.stringify(item)}`)
        return res.redirect('/teamController')
      })
  })

  // DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
    LOG.info(`Handling DELETE request ${req}`)
    const id = parseInt(req.params.id)
    LOG.info(`Handling REMOVING ID=${id}`)
    TeamModel.remove({ teamid: id }).setOptions({ single: true }).exec((err, deleted) => {
      if (err) { return res.end(`Id not found`) }
      console.log(`Permanently deleted item ${JSON.stringify(deleted)}`)
      return res.redirect('/teamController')
    })
  })
module.exports = api