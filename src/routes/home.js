const express = require('express')
const router = express.Router()
const homeControllers = require('../app/controllers/homeControllers')



router.get('/dashboard', homeControllers.showDashboard)
router.get('/staffs', homeControllers.showStaffs)
router.get('/customers', homeControllers.showCustomers)
router.get('/tours', homeControllers.showTours)
router.get('/statistics', homeControllers.showStatistics)
router.get('/', homeControllers.showDashboard)


module.exports = router