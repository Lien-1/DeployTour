
const mongoose = require('mongoose')
// const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
// var slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);

const KhachHang = new Schema({
  MaKhachHang: { type: String, maxLength: 100 },
  HoTen: { type: String },
  CMND: { type: String },
  GioiTinh: { type: Date},
  SDT: { type: String},
  MaDoan: { type: String},
},{
  timestamps: true
});

// KhachHang.plugin(mongooseDelete,{ overrideMethods: 'all' });
module.exports = mongoose.model('KhachHang', KhachHang);
