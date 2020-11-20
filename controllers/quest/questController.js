const express = require('express')
const { Model } = require('mongoose')
const api = express.Router()

const bodyParser = require('body-parser');
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }));
const QuestModel = require('../../models/quest')


api.post('/save',(req,res)=>{
    const body = {
        questname: req.body.questname,
        queststartlocationlongitude: req.body.queststartlocationlongitude,
        queststartlocationlatitude: req.body.queststartlocationlatitude,
    }
    const Quest = new QuestModel(body)
    console.log(body,"body is here")
    Quest.save((err) => {
        if(err){
            console.log(err,"Err is here-----")
            return res.status().json({"msg": err})
        }else{
          return res.json({
              "error": false,
              data: Quest
          })
        }
    })
})

api.get('/getQuest', async (req,res)=>{
    console.log(`Handling GET / ${req}`)
     await QuestModel.find({},(err,data)=>{
          if (err) {
              return res.end('error on create')
          }
          res.locals.quests = data
          console.log(res.locals.quests, "quests are here")
          res.send({
              error: false,
              data: QuestModel
          })
        //   res.render('quest/details', {title: 'team', res})
      })
  })


module.exports = api;
