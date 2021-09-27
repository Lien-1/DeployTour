const express = require('express')
const router = express.Router()
const homeControllers = require('../app/controllers/homeControllers')


router.get('/views', homeControllers.showViews)
router.get('/', homeControllers.showHome)


module.exports = router