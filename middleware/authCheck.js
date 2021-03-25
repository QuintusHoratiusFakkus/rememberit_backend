const jwt = require('jsonwebtoken')
const UserModel = require('./../models/userModel.js')


class CheckAuthMiddleware {
  checkAuth(req, resp, next) {
    if(!req.headers.auth) {
      return resp.status(401).json({ message: 'Dennied'})
    }
    jwt.verify(req.headers['auth'].split(' ')[1], 'orwqnhqgqxc', async (error, data) => {
      if(error) return resp.status(401).json(error)
      let user = await UserModel.findOne({_id: data.userId})
      req.user = user

      next()
    })
  }
}

module.exports = new CheckAuthMiddleware()
