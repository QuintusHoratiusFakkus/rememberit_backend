const ToDoModel = require('./../models/toDoModel.js')
const UserModel = require('./../models/userModel.js')
const ToDoExchange = require('./../models/exchangeModel.js')

class ActionController{
  async post_toDo(req, resp) {
    try {
      const body = req.body
      const user = req.user

      const toDo = new ToDoModel({
        title: body.title,
        date: body.selectedDate,
        image: body.image,
        description: body.toDo,
        owner: user._id
      })

      await toDo.save()

      resp.status(201).json({message: 'Success'})
    } catch(error) {
      resp.status(409).json({message: error})
    }
  }

  async get_toDosList(req, resp) {
    try {
      const userId = req.user._id
      let date = req.query.date

      // if(new Date(date) == 'Invalid Date') {
      //   date = +date
      // }

      const lastMidnight = new Date(date).setHours(0,0,0,0)
      const nextMidnight = new Date(date).setHours(23,59,0,0)

      const toDosList = await ToDoModel.find({
        owner: userId,
        date: {$gte: lastMidnight, $lte: nextMidnight}
      }, {_id: 1, title: 1}, (error) => {
        if(error) resp.status(401).json(error)
      })

      resp.json(toDosList)
    } catch(error) {
      resp.status(409).json({message: error})
    }
  }

  async get_toDoData(req, resp) {

    const toDoId = req.query.id

    const toDo = await ToDoModel.findById(
      toDoId,
      {owner: 0, creationDate: 0},
      (error) => {
        if(error) resp.status(401).json(error)
      }
    )

    resp.json(toDo)
  }

  async delete_toDo(req, resp) {

    const toDoId = req.query.id

    if(!toDoId) {
      resp.status(401).json({message: 'Id is not defined'})
    }

    const toDo = await ToDoModel.findByIdAndDelete(
      toDoId,
      (error) => {
        if(error) resp.status(401).json(error)
      }
    )

    resp.json({message: 'Success'})
  }

  async put_toDo(req, resp) {

    const body = req.body

    const toDo = await ToDoModel.findByIdAndUpdate(
      body.id,
      {
        date: body.selectedDate,
        image: body.image,
        description: body.toDo
      },
      (error) => {
        if(error) resp.status(401).json(error)
      }
    )

    resp.json({message: 'Success'})
  }

  async delete_user(req, resp) {

    const id = req.user

    if(!id) {
      resp.status(401).json({message: 'Unlogined action'})
    }

    await ToDoModel.deleteMany(
      {owner: id}
    )

    await UserModel.findByIdAndDelete(id)

    resp.json({message: 'Success'})
  }

  async get_toDosForCalendar(req, resp) {
    try {
      const userId = req.user._id
      const body = req.query

      const toDosArr = await ToDoModel.find({
        owner: userId,
        date: {$gte: body.startCell, $lte: body.endCell}
      }, {_id: 1, title: 1, date: 1})

      resp.json(toDosArr)
    } catch(error) {
      resp.status(409).json({message: error})
    }
  }

  async post_toAnotherUser(req, resp) {
    try {
      const body = req.body
      const user = req.user

      const receiver = await UserModel.findOne({email: body.email})

      const toDo = new ToDoExchange({
        title: body.title,
        date: body.selectedDate,
        image: body.image,
        description: body.toDo,
        from: user._id,
        to: receiver._id
      })

      await toDo.save()

      resp.status(201).json({message: 'Success'})
    } catch(error) {
      resp.status(409).json({message: error})
    }
  }

  async post_users(req, resp) {

    resp.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    })
    resp.flushHeaders()
    const userId = req.user._id

    function constructSSE(resp, id, data) {
      resp.write('id: ' + JSON.stringify(id) + '\n');
      resp.write('data: ' + JSON.stringify(data) + '\n\n');
    }

    let activeIDs = await ToDoExchange.find({
      to: userId
    }, {from: 1, _id: 0})

    let set = new Set()
    for (let user of activeIDs) {
      set.add(''+user.from)
    }
    let set2 = Array.from(set)

    const users = await Promise.all(set2.map(async el => {
      let user = await UserModel.find({
        _id: el
      }, {email: 1})

      return user[0].email
    }))

    console.log('itogoUsers', users)
    constructSSE(resp, 123, users)

    resp.on('close', () => {
        console.log('client dropped me')
        resp.end()
    })
  }

}

module.exports = new ActionController()
