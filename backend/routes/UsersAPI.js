const express = require('express')
const router = express.Router()
const {registerUser, loginUser, self} = require('../controllers/UserControllers')
const protect =  require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/', protect, self)

module.exports = router