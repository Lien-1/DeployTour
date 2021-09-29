const LichTrinh = require('../models/LichTrinh')
const Tour = require('../models/Tour')
const cloudinary = require('cloudinary');
let arrImg

cloudinary.config({
    cloud_name: "di2u0wa8l", // add your cloud_name
    api_key: "489298223688526", // add your api_key
    api_secret: "3ZyNlAWsakqP6J5HBhP3RlTcJ1o", // add your api_secret
    secure: true
});

cloudinary.v2.api.resources({
    type: 'upload',
    prefix: 'TourDuLich/tour1' // add your folder   
}, function (error, result) {
    // console.log(result, error)
    arrImg = result
});

class homeControllers {
    //GET /
    showHome(req, res) {
        LichTrinh.find({})
            .then(lichtrinh => res.render('dashboard'))
    }

    showDashboard(req, res) {
        Tour.find({}).lean()
            .then(tour => res.render('dashboard', {
                tour,

            }))
    }
    showStaffs(req, res) {
        LichTrinh.find({}).lean()
            .then(lichtrinh => res.render('staffs', {
                img: arrImg["resources"],
                lichtrinh: lichtrinh,
            }))

        // res.send(arrImg)
    }
    showCustomers(req, res) {
        res.render('customers')
    }
    showDetailTour(req, res) {
        // res.send(req.query)
        cloudinary.v2.api.resources({
            type: 'upload',
            prefix: `TourDuLich/${req.query.MaTour}` // add your folder   
        }, function (error, result) {
            // console.log(result, error)
            arrImg = result
        });

        LichTrinh.find({ MaTour: req.query.MaTour }).lean()
            .then(lichtrinh => res.render('detailtour', {
                lichtrinh,
                TenTour: req.query.TenTour,
                ThoiGianTour: req.query.ThoiGianTour,
                MoTa: req.query.MoTa,
                img: arrImg["resources"],
            })
            )
    }
    showTours(req, res) {
        res.render('tours')
    }

    showStatistics(req, res) {
        res.render('statistics')
    }


}

module.exports = new homeControllers()