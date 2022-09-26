const express = require('express')
const userController = require('../../controllers/userController')
const auth = require('../../controllers/auth')
const { verifySignUp } = require('../../middleware/index')

const router = express.Router()

//
router.post('/signup', [
  verifySignUp.checkDuplicateUsernameOrEmail
],
  auth.signup)

router.post('/signin', auth.signin)

router.post('/create', userController.create)

router.post('/sendEmailToUsers', userController.sendEmailToUsers)

router.get('/getAllUser', userController.getAllUser)

router.put('/subscribenewsletter/:id', userController.subscribeNewsletter)

module.exports = router 