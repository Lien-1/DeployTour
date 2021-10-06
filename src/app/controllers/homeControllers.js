const mongoose = require('mongoose')
const cloudinary = require('cloudinary');
const LichTrinh = require('../models/LichTrinh')
const DoanDuLich = require('../models/DoanDuLich')
const KhachHang = require('../models/KhachHang')
const Tour = require('../models/Tour')
const NhanVien = require('../models/NhanVien')
const NhanVienTour = require('../models/NhanVienTour')
const LoaiTour = require('../models/LoaiTour')
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
        let findNhanVien = NhanVien.find({}).lean()
        let findNhanVienTour = NhanVienTour.find({}).lean()
        Promise.all([findNhanVien,findNhanVienTour])
            .then( values =>{
                let [nhanviens, nhanvientours] = values
                res.json({
                    nhanviens,
                    nhanvientours
                })
            })
    }
    showCustomers(req, res) {
        let findDoanDuLich = DoanDuLich.find({}).lean()
        let findKhachHang = KhachHang.find().lean()
        Promise.all([findDoanDuLich, findKhachHang])
            .then(values => {
                let [doandulichs, khachhangs] = values
                Promise.all([convertListOfNumberMemberEachDoanDuLich(doandulichs)])
                    .then( listDoanDuLichAndMembers =>{
                        res.render('customers',{
                            "doandulichs" :listDoanDuLichAndMembers[0],
                            khachhangs
                        })
                    })
            })
    }
    showDetailTour(req, res) {
        let MaTour = req.params.MaTour
        // lấy ảnh từ cloud
        let getImgFromCloud = cloudinary.v2.api.resources({
            type: 'upload',
            prefix: `TourDuLich/${MaTour}` // add your folder   
        }, function (error, result) {
            // console.log(result, error)
            arrImg = result
        });
        let tour = Tour.find({ "MaTour": MaTour }).lean()
        let lichtrinhs = LichTrinh.find({ "MaTour": MaTour }).lean()

        Promise.all([tour, lichtrinhs, getImgFromCloud])
            .then(values => {
                let [detailTour, detailLichTrinh, ...p] = values
                console.log(detailTour, detailLichTrinh)
                res.render('tours/detailtour', {
                    detailTour,
                    detailLichTrinh,
                    img: arrImg["resources"],
                })

            })
    }

    //GET /tours
    showTours(req, res) {
        let joinTourAndLichTrinh = Tour.aggregate([
            {
                $lookup: {
                    from: "loaitours",       // other table name
                    localField: "MaLoaiTour",   // name of users table field
                    foreignField: "MaLoaiTour", // name of userinfo table field
                    as: "loaitours"         // alias for userinfo table
                }
            },
            { $unwind: "$loaitours" },     // $unwind used for getting data in object or for one record only

            {
                $project: {
                    MaTour: 1,
                    TenTour: 1,
                    ThoiGianTour: 1,
                    TenLoaiTour: "$loaitours.TenLoaiTour",
                    MaLoaiTour: "$loaitours.MaLoaiTour",

                }
            }
        ])

        Promise.all([joinTourAndLichTrinh, Tour.find().lean(), LoaiTour.find().lean()])
            .then(values => {
                let [tableTours, tours, loaitours] = values
                let maxTour = getLastMaTour(tours)
                // console.log(maxTour)
                console.log(loaitours)
                res.render('tours', {
                    tableTours,
                    "maxTour": [{ max: maxTour }],
                    loaitours,
                })
            })
    }

    editTour(req, res) {
        let listTour = Tour.find({ MaTour: req.params.slug }).lean()
        let listLichTrinh = LichTrinh.find({ MaTour: req.params.slug }).lean()
        Promise.all([listTour, listLichTrinh]).then(data => {
            let [tours, lichtrinhs] = data
            res.render('tours/editTour', {
                tours,
                lichtrinhs,
            })
        })
    }

    showStatistics(req, res) {
        res.render('statistics')
    }

    // [POST] handle edit tour
    handleEditTour(req, res) {
        let updateTour = Tour.updateOne({ MaTour: req.body.MaTour }, { TenTour: req.body.TenTour, MoTa: req.body.MoTa })
        let updateLichTrinh = convertObj(req.body)
        //     .then(()=> res.redirect('/tours'))
        Promise.all([updateTour, updateLichTrinh])
            .then(() => res.redirect('/tours'))
    }

    // [POST] handle add tour
    handleAddTour(req, res) {
        // lấy ảnh
        cloudinary.v2.api.resources({
            type: 'upload',
            prefix: `TourDuLich/${req.body.MaTour}` // add your folder   
        }, function (error, result) {
            // console.log(result, error)
            arrImg = result
        });

        let urlImg = ''
        if (arrImg["resources"][0]?.["url"])
            urlImg = new String(arrImg["resources"][0]["url"])

        // console.log(req.body)
        let { MaTour, TenTour, GiaTour, MaLoaiTour, ThoiGianTour, MoTa, ...lichtrinhs } = req.body

        let insertTour = Tour.collection.insertOne({
            "MaTour": MaTour,
            "TenTour": TenTour,
            "ThoiGianTour": ThoiGianTour,
            "AnhDaiDien": urlImg.replace('http', 'https'),
            "MoTa": MoTa,
            "MaLoaiTour": MaLoaiTour,
        })
        let insertLichTrinh = LichTrinh.collection.insertMany(convertDoubleObjForTour(lichtrinhs, MaTour))
        Promise.all([insertTour, insertLichTrinh]).then(() => {
            res.redirect('/tours')
        })
    }
}

module.exports = new homeControllers()

// another function to handler
async function convertListOfNumberMemberEachDoanDuLich(doandulichs) {
    let arr = []
    for (const element of doandulichs) {
        await KhachHang.count({ "MaDoan": element.MaDoan })
            .then((number) => {
                arr.push({
                    ...element,
                    SoLuongThanhVien: number,
                })
            })
    }
    console.log(arr)
    return arr
}
function getLastMaTour(tours) {

    let maxNumberMaTour = parseInt(tours[tours.length - 1].MaTour.split('MT')[1]) + 1
    let maxMaTour = "MT" + maxNumberMaTour
    console.log(maxMaTour)
    return maxMaTour

}
function convertObj(body) {
    let { MaTour, TenTour, MoTa, ...lichtrinh } = body
    // console.log(convertDoubleObj(lichtrinh))
    convertDoubleObj(lichtrinh).forEach(element => {
        LichTrinh.updateOne({ "MaTour": MaTour, "SoThuTuDiaDiem": element.SoThuTuDiaDiem }, { "NoiDung": element.NoiDung, "NgayGio": element.NgayGio })
            .then((success) => console.log(success))
        // console.log({ NoiDung: element.NoiDung, NgayGio: element.NgayGio })

    })
}
function convertDoubleObj(obj) {
    let arr = []
    let i = 0
    let sum = 0
    let ngaygio
    for (const index in obj) {
        ++sum
        ++i
        if (i != 2) {
            ngaygio = obj[index]
        }
        else {
            arr.push({
                SoThuTuDiaDiem: sum / 2,
                NgayGio: ngaygio,
                NoiDung: obj[index],
            })
            i = 0
        }
    }
    return arr
}

function convertDoubleObjForTour(obj, MaTour) {
    let arr = []
    let i = 0
    let sum = 0
    let ngaygio
    for (const index in obj) {
        ++sum
        ++i
        if (i != 2) {
            ngaygio = obj[index]
        }
        else {
            arr.push({
                "MaTour": MaTour,
                SoThuTuDiaDiem: sum / 2,
                NgayGio: ngaygio,
                NoiDung: obj[index],
            })
            i = 0
        }
    }
    return arr
}

