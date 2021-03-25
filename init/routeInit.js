const authentication = require('./../routes/authentication.js')
const actions = require('./../routes/actions.js')
const auth_middleware = require('./../middleware/authCheck.js')

const route_init = (app, base_url) => {
  app.use(base_url, authentication)
  app.use(base_url, auth_middleware.checkAuth, actions)
}

module.exports = route_init
