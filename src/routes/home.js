const express = require('express')
const router = express.Router()
const homeControllers = require('../app/controllers/homeControllers')



router.get('/dashboard', homeControllers.showDashboard)
router.get('/staffs', homeControllers.showStaffs)
router.get('/customers', homeControllers.showCustomers)

router.get('/detailTour', homeControllers.showDetailTour)

router.get('/tours/edit/:slug', homeControllers.editTour)
router.get('/tours', homeControllers.showTours)

router.get('/statistics', homeControllers.showStatistics)
router.get('/', homeControllers.showDashboard)

//handle 
router.post('/handle/editTour', homeControllers.handleEditTour)

module.exports = router