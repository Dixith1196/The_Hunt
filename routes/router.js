const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser');
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }));
const teamController = require('../controllers/team/teamController')
const userController = require('../controllers/user/userController')
const questController = require('../controllers/quest/questController')
var mongoose = require('mongoose')

const teams = require('../models/team')


router.get('/', (req, res) => {
    res.render('./user/loginpage', { title: 'Login', layout: false})
  })
  
  router.get('/index', (req, res) => {
    res.render('./user/loginpage', { title: 'Login', layout: false})
  })
  
  // Manage top-level request first
  router.get('/Home', (req, res, next) => {
    res.render('./partials/index', { title: 'The Hunt' })
  })
  
  router.get('/user/Login', (req, res, next) => {
    res.render('./user/loginpage', { title: 'Login', layout: false})
  })
  
  
  router.get('/user/Register', (req, res, next) => {
    res.render('./user/signuppage', { title: 'Register', layout: false})
  })
  
  router.get('/user/forgotcode', (req, res, next) => {
    res.render('./user/forgotcode', { title: 'Forgot password', layout: false})
  })
  
  router.get('/user/forgotemail', (req, res, next) => {
    res.render('./user/forgotemail', { title: 'Fotgot email', layout: false})
  })
  
  router.get('/user/newPassword', (req, res, next) => {
    res.render('./user/newpassword', { title: 'New Password', layout: false})
  })
  
  router.get('/404' , (req, res, next) => {
    res.render('./partials/error', { title: 'Error', layout: false})
  })
  
  router.get('/create_competition', (req, res, next) => {
    res.render('../views/competiton/create', { title: 'Create Competition'})
  })
  
  router.get('/createScreen', (req, res, next) => {
    res.render('createScreen', { title: 'Create Screen'})
  })
  
  router.get('/quest/createQuest', (req, res, next) => {
    res.render('./quest/create', { title: "Quest"})
  })
  
  router.get('/user/profile', (req, res, next) => {
    res.render('./player/details', { title: "profile"})
  })
  
  // router.get('/team/getTeam', (req, res, next) => {
  //   console.log(teams,"teams are here")
  //   res.render('./team/details')
  // })

  // router.get('/team', teamController)
  
  router.get('/team/createTeam', (req, res, next) => {
    res.render('./team/create', { title: "Team", require: axios})
  })
  
  router.get('/team/invitePlayers', (req, res, next) => {
    res.render('./team/invitePlayers', { title: "Invite Players"})
  }) 
  router.get('/location/delete', (req, res, next) => {
    res.render('./location/delete', { title: "Locationdelete"})
  })
  
  // Route Requests that start with an expressionn to a controller

  
  router.use('/user', userController)
  router.use('/team', teamController)
  router.use('/quest', questController)
  
  module.exports = router;