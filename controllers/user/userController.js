const express = require('express')
// const { Model } = require('mongoose')
const api = express.Router()
const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }));
const User = require('../../models/user')

console.log("user hits----")

api.post('/try', (req,res) => {
   console.log("try here login")
  User.findOne({"email": req.body.email}).then(user => {
    if(!user) res.status(404).json({'err': "no user there"})
    else{
      bcrypt.compare(req.body.password, user.password, (error, match) => {
        if(error) res.status(500).json(error)
        if(match) res.status(200).json({"user": user})
      })
    }
  })
  .catch(err => {
    console.log(err,"error is here")
  })
})


api.post('/signup', async (req,res)=>{
  console.log("signup hits------")
    const body = req.body
    console.log(body, "body is here")
    const user = new User(body)
    console.log(user,"body is here")
    await user.save((err) => {
        if(err){
          console.log(err,"error is here")
            return res.status().json({"msg": err})
          //   return res.end('ERROR: Team couldnot be saved')
        }else{
          // console.log("successful----", team)
          return res.json({
              "error": false,
              data: user
          })
        }
      
      //   LOG.info(`Saving new Team ${JSON.stringify(team1)}`)
      //   return res.redirect('/teamController')
    })
})

module.exports = api