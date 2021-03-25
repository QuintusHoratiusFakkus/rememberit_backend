const {Schema, model, Types} = require('mongoose')

const ToDoSchema = new Schema({
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
  owner: {
    type: Types.ObjectId,
    ref: 'UserModel'
  }
})

module.exports = model('sortedToDos', ToDoSchema)
