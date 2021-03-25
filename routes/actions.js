const {Router} = require('express')
const ActionController = require('./../controllers/actions.js')

const router = Router()

router.post(
  '/createToDo', (req, resp) => {
    ActionController.post_toDo(req, resp)
  }
)

router.get(
  '/toDosList', (req, resp) => {
    ActionController.get_toDosList(req, resp)
  }
)

router.get(
  '/toDoData', (req, resp) => {
    ActionController.get_toDoData(req, resp)
  }
)

router.put(
  '/toDoEdit', (req, resp) => {
    ActionController.put_toDo(req, resp)
  }
)

router.delete(
  '/toDoDelete', (req, resp) => {
    ActionController.delete_toDo(req, resp)
  }
)

router.delete(
  '/deleteUser', (req, resp) => {
    ActionController.delete_user(req, resp)
  }
)

router.get(
  '/toDoByDate', (req, resp) => {
    ActionController.get_toDosForCalendar(req, resp)
  }
)

router.post(
  '/exchange', (req, resp) => {
    ActionController.post_toAnotherUser(req, resp)
  }
)

router.get(
  '/users', (req, resp) => {
    ActionController.post_users(req, resp)
  }
)

module.exports = router
