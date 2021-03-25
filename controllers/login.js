const UserModel = require('./../models/userModel.js')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class LoginController{
  async get_login(req, resp) {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      return resp.status(409).json({
        errors: errors.array()
      })
    }

    const {email, password} = req.query

    const user = await UserModel.findOne({email});

    if(user) {
      if(bcrypt.compareSync(password, user.password)) {
        let token = jwt.sign({userId: user._id}, 'orwqnhqgqxc')
        resp.setHeader(`auth`, `Bearer ${token}`)

        resp.json({message: 'Success'})
      } else {
        return resp.status(409).json({
          errors: [
            {msg: 'E-mail or password is incorrect.',
            param: 'email'}
          ]
        })
      }
    } else {
      return resp.status(409).json({
        errors: [
          {msg: 'E-mail or password is incorrect.',
          param: 'email'}
        ]
      })
    }
  }
}

module.exports = new LoginController()
