const express = require('express')
const { Model } = require('mongoose')
const api = express.Router()

const bodyParser = require('body-parser');
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }));
const QuestModel = require('../../models/team')



// GET all the data

api.get('/findall', (req, res) => {
    console.log("find all hits")
    console.log(`The function handling the /findall ${req}`)
    QuestModel.find({}, (err, data) => {
        if (err) {
            return res.end('Error finding the /findall')
        }
        console.log(data, "data is here")
        res.json(data)
    })
})


// GET the data by id

api.get('/findone/:id', (req, res) => {
    console.log(`Handling /findone ${req}`)
    const id = parseInt(req.params.id)
    QuestModel.find({ questid: id }, (err, result) => {
        if (err) { return res.end(`Could not find the record for the teamid: ${id}`) }
        res.json(results[0])
    })
})


// GET to this controller 

api.get('/getQuest', async (req, res) => {
    console.log(`Handling GET / ${req}`)
    await QuestModel.find({}, (err, data) => {
        if (err) {
            return res.end('error on create')
        }
        res.locals.quests = data
        console.log(res.locals.quests, "quests are here")
        res.render('quest/details', { title: 'quest', res })
    })
})

// Respond with views

// GET create

api.get('/create', (req, res) => {
    console.log(`Handling GET /create ${req}`)
    QuestModel.find({}, (err, data) => {
        res.locals.teams = data
        res.locals.team = new Model()
        res.render('quest/create.ejs')
    })
})

// GET /delete/:id

api.post('/delete/:id', (req, res) => {
    console.log(req.params, 'delete hits')
    const id = parseInt(req.params.id)
    QuestModel.remove({ questid: id }).setOptions({ single: true }).exec((err, deleted) => {
        if (err) { return res.end("URL NOT found") }
        console.log(`Permanently deleted item ${JSON.stringify(deleted)}`)
        return res.redirect('/quest/getQuest')
    })
})




// GET one

api.get('/edit/:id', (req, res) => {
    console.log(`Handling GET /edit/:id ${req}`)
    const id = parseInt(req.params.id)
    QuestModel.find({ Questid: id }, (err, results) => {
        if (err) {
            return res.end(`Could not find the record`)
        }
        console.log(`RETURNING VIEW FOR${JSON.stringify(results)}`)
        res.locals.student = results[0]
        return res.render('quest/edit.ejs')
    })
})

// RESPOND WITH DATA MODIFICATIONS 

// POST new

api.post('/save', (req, res) => {
    const body = req.body
    const team = new QuestModel(body)
    console.log(quest, "body is here")
    quest.save((err) => {
        if (err) {
            return res.status().json({ "msg": err })
        } else {
            return res.json({
                "error": false,
                data: team
            })
        }

    })
})

// POST update with id
api.post('/save/:id', (req, res) => {
    console.log(`Handling SAVE request ${req}`)
    const id = parseInt(req.params.id)
    console.log(`Handling SAVING ID:${id}`)
    QuestModel.updateOne({ questid: id },
        { 
            $set: {
                questid: parseInt(req.body.questid),
                questname: req.body.questname,
                queststartlocationlongitude: parseInt(req.body.queststartlocationlongitude),
                queststartlocationlatitude: parseInt(req.body.queststartlocationlongitude),
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
    QuestModel.remove({ questid: id }).setOptions({ single: true }).exec((err, deleted) => {
        if (err) { return res.end(`Id not found`) }
        console.log(`Permanently deleted item ${JSON.stringify(deleted)}`)
        return res.redirect('/questController')
    })
})
module.exports = api