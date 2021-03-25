const UserModel = require('./../models/userModel.js')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

class RegistrationController{
  async post_registration(req, resp) {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      return resp.status(409).json({
        errors: errors.array()
      })
    }

    const body = req.body
    const user = new UserModel({
      email: body.email,
      password: bcrypt.hashSync(body.password, 2)
    })

    const emailDup = await UserModel.findOne({email: body.email})
    if(emailDup){
      return resp.status(409).json({
        errors: [
          {msg: 'User with this email already exist.',
          param: 'email'}
        ]
      })
    }

    if (!bcrypt.compareSync(body.passwordConfirm, user.password)) {
      return resp.status(409).json({
        errors: [
          {msg: `Passwords doesn't equal.`,
          param: 'password'}
        ]
      })
    }

    if(user.validateSync()) {
      return resp.status(409).json(user.validateSync())
    }

    await user.save()
    resp.status(201).json({
      errors: [
        {msg: `Access.`,
        param: 'email'}
      ]
    })
  }
}

module.exports = new RegistrationController();
