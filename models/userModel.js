const {Schema, model, Types} = require('mongoose')

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'E-mail is required field.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required field.']
  },
  sortedToDos: [{
    type: Types.ObjectId,
    ref: 'sortedToDos'
  }]
}, {collection: ''})

module.exports = model('UserModel', UserSchema)
