const express = require('express')
const router = express.Router()



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
    res.render('./competition/create', { title: 'Register'})
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
  
  
  router.get('/team/createTeam', (req, res, next) => {
    res.render('./team/create', { title: "Team"})
  })
  
  
  router.get('/team/invitePlayers', (req, res, next) => {
    res.render('./team/invitePlayers', { title: "Invite Players"})
  }) 
  router.get('/location/delete', (req, res, next) => {
    res.render('./location/delete', { title: "Locationdelete"})
  })
  

  module.exports = router;