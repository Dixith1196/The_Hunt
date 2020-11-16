const express = require('express')
const { Model } = require('mongoose')
const api = express.Router()

const bodyParser = require('body-parser');
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }));
const TeamModel = require('../../models/team')
// const LOG = require('../../utils/logger')


// GET all the data

api.get('/findall', (req, res) => {
  console.log("find all hits")
  console.log(`The function handling the /findall ${req}`)
    TeamModel.find({}, (err, data) => {
        if (err) {
            return res.end('Error finding the /findall')
        }
        console.log(data,"data is here")
        res.json(data)
    })
})


// GET the data by id

api.get('/findone/:id', (req, res) => {
  console.log(`Handling /findone ${req}`)
    const id = parseInt(req.params.id)
    TeamModel.find({ teamid: id }, (err, result) => {
        if (err) { return res.end(`Could not find the record for the teamid: ${id}`) }
        res.json(results[0])
    })
})


// GET to this controller 

api.get('/getTeam', async (req,res)=>{
  console.log(`Handling GET / ${req}`)
   await TeamModel.find({},(err,data)=>{
        if (err) {
            return res.end('error on create')
        }
        res.locals.teams = data
        console.log(res.locals.teams, "teams are here")
        res.render('team/details', {title: 'team', res})
    })
})

// Respond with views

// GET create

api.get('/create',(req,res)=>{
  console.log(`Handling GET /create ${req}`)
    TeamModel.find({},(err,data)=>{
        res.locals.teams =data
        res.locals.team = new Model()
        res.render('team/create.ejs')
    })
})

// GET /delete/:id

api.post('/delete/:id', (req, res) => {
  console.log(req.params,'delete hits')
  // LOG.info(`Handling DELETE request ${req}`)
  const id = parseInt(req.params.id)
  // LOG.info(`Handling REMOVING ID=${id}`)
  TeamModel.remove({ teamid: id }).setOptions({ single: true }).exec((err, deleted) => {
    if (err) { return res.end("URL NOT found") }
    console.log(`Permanently deleted item ${JSON.stringify(deleted)}`)
    return res.redirect('/team/getTeam')
  })
})




// GET one

api.get('/edit/:id', (req, res) => {
  console.log(`Handling GET /edit/:id ${req}`)
    const id = parseInt(req.params.id)
    TeamModel.find({ teamid: id }, (err, results) => {
      if (err) { 
          return res.end(`Could not find the record`) 
        }
        console.log(`RETURNING VIEW FOR${JSON.stringify(results)}`)
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
  console.log(`Handling SAVE request ${req}`)
    const id = parseInt(req.params.id)
    console.log(`Handling SAVING ID:${id}`)
    TeamModel.updateOne({teamid: id },
      { // use mongoose field update operator $set
        $set: {
          teamid: parseInt(req.body.teamid),
          teamname: req.body.teamname,
        }
      },
      (err, item) => {
        if (err) { return res.end(`Record with the specified id not found`) }
        console.log(`ORIGINAL VALUES ${JSON.stringify(item)}`)
        console.log(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
        console.log(`SAVING UPDATED team ${JSON.stringify(item)}`)
        return res.redirect('/teamController')
      })
  })

  // DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
  console.log(`Handling DELETE request ${req}`)
    const id = parseInt(req.params.id)
    console.log(`Handling REMOVING ID=${id}`)
    TeamModel.remove({ teamid: id }).setOptions({ single: true }).exec((err, deleted) => {
      if (err) { return res.end(`Id not found`) }
      console.log(`Permanently deleted item ${JSON.stringify(deleted)}`)
      return res.redirect('/teamController')
    })
  })
module.exports = api