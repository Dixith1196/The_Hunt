const express = require('express')
const { Model } = require('mongoose')
const api = express.Router()

const bodyParser = require('body-parser');
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }));
const UserModel = require('../../models/user')


api.post('/Register',(req,res)=>{
    const body = req.body
    const user = new UserModel(body)
    console.log(user,"body is here")
    user.save((err) => {
        if(err){
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