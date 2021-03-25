const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/default.json')
const route_init = require('./init/routeInit.js')
const body_parser = require('body-parser')
const cors = require('cors')

const app = express()
const PORT = config.port || 3001

async function start() {
  try {
    app.use(cors())
    app.use(body_parser.urlencoded({limit: '60mb', extended: true }));
    app.use(body_parser.json({limit: '60mb'}));

    route_init(app, config.base_url)

    await mongoose.connect(`${config.db.protocol}${config.db.host}:${config.db.port}/${config.db.db_name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    app.listen(PORT, () =>{
      console.log(`Server running on ${PORT} port`)
    })
  } catch(e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
