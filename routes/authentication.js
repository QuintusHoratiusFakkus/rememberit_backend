const {Router} = require('express')
const RegistrationController = require('./../controllers/registrations.js')
const LoginController = require('./../controllers/login.js')
const {check} = require('express-validator')


const router = Router()

router.post(
  '/registration',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Password is week')
    .isStrongPassword({minSymbols: 0}).isLength({max: 32})
  ],
  (req, resp) => {
    RegistrationController.post_registration(req, resp)
  }
)

router.get(
  '/login',
  [
    check('email', 'E-mail or password is incorrect.').isEmail()
  ],
  (req, resp) => {
    LoginController.get_login(req, resp)
  }
)

module.exports = router
