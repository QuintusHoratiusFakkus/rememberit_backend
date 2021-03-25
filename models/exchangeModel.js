const {Schema, model, Types} = require('mongoose')

const ToDoExchangeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required.']
  },
  date: {
    type: Date
  },
  creationDate: {
    type: Date, default: Date.now
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  from: {
    type: Types.ObjectId,
    ref: 'UserModel'
  },
  to: {
    type: Types.ObjectId,
    ref: 'UserModel'
  }
})

module.exports = model('toDosExchange', ToDoExchangeSchema)
