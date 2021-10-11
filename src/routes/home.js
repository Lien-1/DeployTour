const express = require('express')
const router = express.Router()
const homeControllers = require('../app/controllers/homeControllers')



router.get('/dashboard', homeControllers.showDashboard)
router.get('/staffs', homeControllers.showStaffs)
router.get('/customers', homeControllers.showCustomers)

// router.get('/detailTour', homeControllers.showDetailTour)

router.get('/tours/edit/:slug', homeControllers.editTour)
router.get('/tours/:MaTour', homeControllers.showDetailTour)
router.get('/tours', homeControllers.showTours)

router.get('/statistics', homeControllers.showStatistics)
router.get('/', homeControllers.showDashboard)

//handle 
router.post('/handle/editTour', homeControllers.handleEditTour)
router.post('/handle/addTour', homeControllers.handleAddTour)
router.post('/handle/addDoanDuLich', homeControllers.handleAddDoanDuLich)
router.post('/handle/editNgayKhoiHanh', homeControllers.handleEditNgayKhoiHanh)
router.post('/handle/finishDoanDuLich', homeControllers.handleFinishDoanDuLich)

// add
router.get('/add/doandulich', homeControllers.addDoanDuLich)
module.exports = router